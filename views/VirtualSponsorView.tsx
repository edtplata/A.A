import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { sendMessageToAI, startChat } from '../services/geminiService';
import { SendIcon, SpeakerIcon, StopSoundIcon } from '../components/Icons';

const VirtualSponsorView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startChat();
    
    // Cleanup speechSynthesis on component unmount
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSpeak = (text: string, id: number) => {
    const isThisMessageSpeaking = window.speechSynthesis.speaking && speakingMessageId === id;

    // Always stop any currently playing speech before starting a new one or stopping.
    window.speechSynthesis.cancel();

    if (isThisMessageSpeaking) {
      setSpeakingMessageId(null);
      return; // The user just wanted to stop the current speech.
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES'; // Set language to Spanish for better pronunciation
    utterance.onend = () => {
      setSpeakingMessageId(null);
    };
    utterance.onerror = (event) => {
      console.error('SpeechSynthesisUtterance.onerror', event);
      setError('Lo siento, ocurrió un error con la función de voz.');
      setSpeakingMessageId(null);
    };

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Stop any speaking when a new message is sent
    window.speechSynthesis.cancel();
    setSpeakingMessageId(null);

    const userMessage: ChatMessage = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);
    
    // Use a temporary ID for the placeholder that will be preserved during streaming
    const modelMessageId = Date.now() + 1;
    setMessages(prev => [...prev, { id: modelMessageId, role: 'model', text: '' }]);

    try {
      const stream = await sendMessageToAI(input);
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
            const lastMessage = prev[prev.length - 1];
            if (lastMessage && lastMessage.role === 'model') {
                const updatedMessages = [...prev];
                updatedMessages[prev.length - 1] = { ...lastMessage, text: lastMessage.text + chunkText };
                return updatedMessages;
            }
            return prev;
        });
      }
    } catch (err) {
      console.error(err);
      setError('Lo siento, ocurrió un error al contactar a tu Padrino Virtual. Por favor, intenta de nuevo.');
      setMessages(prev => prev.filter(msg => msg.id !== modelMessageId)); // Remove the placeholder on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[75vh] bg-white rounded-lg shadow-lg">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-brand-secondary">Padrino Virtual</h2>
        <p className="text-sm text-slate-500">Un espacio seguro para compartir. Estoy aquí para escuchar.</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.role === 'model' && (
              <>
                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-slate-200 text-brand-secondary rounded-bl-none">
                  {msg.text || <span className="animate-pulse">...</span>}
                </div>
                {msg.text && !isLoading && (
                  <button
                    onClick={() => handleSpeak(msg.text, msg.id)}
                    className="p-1 rounded-full text-slate-500 hover:bg-slate-200 hover:text-brand-primary transition-colors mb-1 flex-shrink-0"
                    aria-label={speakingMessageId === msg.id ? "Detener lectura" : "Leer mensaje en voz alta"}
                  >
                    {speakingMessageId === msg.id ? <StopSoundIcon /> : <SpeakerIcon />}
                  </button>
                )}
              </>
            )}
            {msg.role === 'user' && (
              <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-2xl bg-brand-primary text-white rounded-br-none">
                {msg.text}
              </div>
            )}
          </div>
        ))}
         <div ref={messagesEndRef} />
      </div>

      {error && <p className="p-4 text-center text-red-500">{error}</p>}

      <div className="p-4 border-t">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
            className="flex-1 w-full px-4 py-2 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-primary"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-brand-primary text-white p-3 rounded-full hover:bg-sky-700 disabled:bg-slate-400 transition-colors"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default VirtualSponsorView;
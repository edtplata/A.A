
import React, { useState } from 'react';
import { CommunityPost } from '../types';
import Card from '../components/Card';
import { useAppContext } from '../context/AppContext';

const CommunityView: React.FC = () => {
  const { user } = useAppContext();
  const [posts, setPosts] = useState<CommunityPost[]>([
    { id: 1, author: 'Hermano_4521', text: 'Solo por hoy. Agradecido por otro día sobrio. ¡Sigan adelante!', timestamp: 'Hace 2 horas' }
  ]);
  const [newPost, setNewPost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    const post: CommunityPost = {
      id: Date.now(),
      author: user.name,
      text: newPost,
      timestamp: 'Justo ahora'
    };
    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-brand-secondary">Comunidad</h2>
        <p className="text-slate-500 mt-1">Comparte tu experiencia, fortaleza y esperanza.</p>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="p-4 border-b">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Comparte algo con la comunidad..."
            className="w-full p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            rows={3}
          />
          <button
            type="submit"
            className="mt-2 bg-brand-primary text-white font-bold py-2 px-4 rounded-lg hover:bg-sky-700 disabled:bg-slate-400 transition-colors"
            disabled={!newPost.trim()}
          >
            Publicar Anónimamente
          </button>
        </form>
      </Card>

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id}>
            <div className="p-4">
              <p className="text-slate-800">{post.text}</p>
              <div className="flex justify-between items-center mt-4 text-sm text-slate-500">
                <span>Por: <strong>{post.author}</strong></span>
                <span>{post.timestamp}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CommunityView;

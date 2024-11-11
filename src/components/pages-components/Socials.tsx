"use client"

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const LinkSocialMedia = () => {
  const [platform, setPlatform] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch('/api/social-media', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, url }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setPlatform('');
        setUrl('');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Link Your Social Media Profiles</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Platform (e.g., Twitter, LinkedIn)"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <Input
          type="url"
          placeholder="Profile URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <Button
          type="submit"
          disabled={loading}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Linking...' : 'Link Profile'}
        </Button>
        {message && <p className="text-green-500">{message}</p>}
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
};

export default LinkSocialMedia;

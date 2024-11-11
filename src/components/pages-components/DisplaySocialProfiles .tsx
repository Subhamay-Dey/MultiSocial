"use client"
import { useEffect, useState } from 'react';

interface SocialProfile {
  id: string;
  platform: string;
  url: string;
}

const DisplaySocialProfiles = () => {
  const [profiles, setProfiles] = useState<SocialProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch('/api/display-socials');
        const data = await response.json();

        if (response.ok) {
          setProfiles(data);
        } else {
          setError(data.message || 'Failed to load profiles.');
        }
      } catch (err) {
        setError('An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <p>Loading profiles...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (profiles.length === 0) return <p>No social profiles linked yet.</p>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Linked Social Profiles</h2>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.id} className="flex justify-between items-center p-2 border rounded">
            <span>{profile.platform}</span>
            <a href={profile.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              View Profile
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplaySocialProfiles;

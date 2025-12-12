'use client';

import { useState } from 'react';

export default function DriveAdminPanel() {
    const [folderId, setFolderId] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleRefresh = async () => {
        setLoading(true);
        setMessage('');
        try {
            const res = await fetch(`/api/drive-images?refresh=true&folderId=${folderId}`);
            const data = await res.json();
            if (res.ok) {
                setMessage(`Success! Found ${data.images.length} images.`);
            } else {
                setMessage('Failed to refresh.');
            }
        } catch (e) {
            console.error(e);
            setMessage('Error connecting to API.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-900 border border-white/10 rounded-xl max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold text-white mb-4">Gallery Admin</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-400 mb-1">Drive Folder ID</label>
                    <input
                        type="text"
                        value={folderId}
                        onChange={(e) => setFolderId(e.target.value)}
                        placeholder="Enter Folder ID"
                        className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-2 text-white"
                    />
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="w-full bg-church-gold text-black font-semibold py-2 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50"
                >
                    {loading ? 'Syncing...' : 'Sync Gallery'}
                </button>

                {message && (
                    <p className={`text-sm ${message.includes('Success') ? 'text-green-400' : 'text-red-400'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

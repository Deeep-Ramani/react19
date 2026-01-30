import { useOptimistic, useState } from 'react';

// Fake async server call
async function likeOnServer(currentCount) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // Simulate occasional server errors
  if (Math.random() < 0.1) {
    throw new Error('Failed to save like');
  }
  return currentCount + 1;
}

export function OptimisticExample() {
  const [actualLikes, setActualLikes] = useState(0);
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    actualLikes,
    (current, delta) => current + delta
  );
  const [isLiking, setIsLiking] = useState(false);
  const [error, setError] = useState(null);

  async function handleClick() {
    if (isLiking) return;
    
    setIsLiking(true);
    setError(null);
    
    // Optimistically update UI
    addOptimisticLike(1);
    
    try {
      const newCount = await likeOnServer(actualLikes);
      setActualLikes(newCount);
    } catch (err) {
      setError(err.message);
      // Optimistic update will revert automatically
    } finally {
      setIsLiking(false);
    }
  }

  const isPendingOptimistic = optimisticLikes !== actualLikes;

  return (
    <section>
      <h2>❤️ useOptimistic</h2>
      <p>
        Click the button to "like". The counter updates{' '}
        <strong>optimistically</strong> while the fake server request is in
        flight, providing instant feedback. If the request fails, it reverts
        automatically.
      </p>

      <div className="card vertical">
        <h3>Like Counter</h3>
        
        <div className="counter-display">
          {optimisticLikes} {optimisticLikes === 1 ? 'Like' : 'Likes'}
        </div>

        <button onClick={handleClick} disabled={isLiking}>
          {isLiking ? '⏳ Liking...' : '❤️ Like This'}
        </button>

        <div className="hint">
          {isPendingOptimistic && (
            <span className="status-badge pending">
              ⚡ Optimistic update pending...
            </span>
          )}
          {!isPendingOptimistic && !isLiking && (
            <span className="status-badge success">
              ✓ Synced with server
            </span>
          )}
        </div>

        {error && (
          <div className="result" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', marginTop: '1rem' }}>
            <strong>❌ Error</strong>
            <p style={{ color: '#f87171' }}>{error}</p>
          </div>
        )}

        <p className="hint" style={{ marginTop: '1rem' }}>
          <strong>How it works:</strong> The UI updates instantly (optimistic), then
          syncs with the server. The counter shows {actualLikes} confirmed{' '}
          {actualLikes === 1 ? 'like' : 'likes'}.
        </p>
      </div>
    </section>
  );
}

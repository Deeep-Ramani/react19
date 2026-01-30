import { useState, useDeferredValue, useMemo } from 'react';

export function DeferredValueExample() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const list = useMemo(() => 
    Array.from({ length: 5000 }, (_, i) => `Item ${i + 1}`),
    []
  );

  const normalizedDeferred =
    typeof deferredQuery === 'string' ? deferredQuery.toLowerCase() : '';

  const filtered = useMemo(() =>
    list.filter((item) =>
      item.toLowerCase().includes(normalizedDeferred)
    ),
    [list, normalizedDeferred]
  );

  const isPending = query !== deferredQuery;

  return (
    <section>
      <h2>⏱️ useDeferredValue</h2>
      <p>
        <code>useDeferredValue</code> lets you defer updating a part of the UI.
        Type in the input below to filter a large list. The input stays
        responsive while the expensive filter operation uses the deferred value.
      </p>

      <div className="card vertical">
        <h3>Search Large Dataset</h3>
        
        <div className="field">
          <span>Search Query</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to filter 5,000 items..."
            autoComplete="off"
          />
        </div>

        <div className="hint">
          <strong>Status:</strong>{' '}
          {isPending ? (
            <span className="status-badge pending">
              ⚡ Deferred update in progress...
            </span>
          ) : (
            <span className="status-badge success">
              ✓ Up to date
            </span>
          )}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <p className="hint">
            <strong>Current query:</strong> "{query}" <br />
            <strong>Deferred query:</strong> "{deferredQuery}" <br />
            <strong>Results:</strong> {filtered.length.toLocaleString()} items
          </p>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '1rem', color: '#d1d5db' }}>
            Filtered Results:
          </h4>
          <ul className="big-list">
            {filtered.length === 0 ? (
              <li style={{ color: '#9ca3af', fontStyle: 'italic' }}>
                No items match your search
              </li>
            ) : (
              filtered.slice(0, 100).map((item) => (
                <li key={item}>{item}</li>
              ))
            )}
            {filtered.length > 100 && (
              <li className="hint" style={{ marginTop: '0.5rem' }}>
                ... and {(filtered.length - 100).toLocaleString()} more items
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="hint" style={{ marginTop: '1.5rem' }}>
        <strong>💡 How it works:</strong> The input value updates immediately for
        responsive typing, but the expensive filtering operation uses the deferred
        value, preventing the UI from freezing during updates.
      </div>
    </section>
  );
}

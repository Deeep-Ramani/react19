import { useRef, useState, useEffect } from 'react';

function FocusInput({ inputRef }) {
  return (
    <input
      ref={inputRef}
      placeholder="This input auto-focuses on mount"
      style={{
        padding: '0.75rem 1rem',
        borderRadius: '0.5rem',
        border: '2px solid #6366f1',
        background: 'rgba(15, 23, 42, 0.6)',
        color: '#f3f4f6',
        fontSize: '1rem',
        width: '100%',
      }}
    />
  );
}

export function RefsExamples() {
  const [show, setShow] = useState(true);
  const [highlightColor, setHighlightColor] = useState('tomato');
  const callbackRef = useRef(null);

  // Ref as a prop - auto-focus on mount
  const controlledRef = useRef(null);

  useEffect(() => {
    if (controlledRef.current) {
      controlledRef.current.focus();
    }
  }, []);

  function setCallbackRef(node) {
    // Cleanup previous ref
    if (callbackRef.current && typeof callbackRef.current.cleanup === 'function') {
      callbackRef.current.cleanup();
    }

    // Setup new ref
    if (node) {
      node.style.outline = `3px solid ${highlightColor}`;
      node.style.transition = 'all 0.3s ease';
      
      callbackRef.current = {
        node,
        cleanup() {
          node.style.outline = '';
        },
      };
    } else {
      callbackRef.current = null;
    }
  }

  return (
    <section>
      <h2>🎯 Ref Improvements</h2>
      <p>
        React 19 makes refs more powerful and flexible. You can now pass refs as
        regular props without <code>forwardRef</code>, and ref callbacks support
        automatic cleanup functions.
      </p>

      <div className="card vertical">
        <h3>1️⃣ Ref as a Prop</h3>
        <p className="hint" style={{ marginBottom: '1rem' }}>
          In React 19, refs can be passed as normal props to components, no
          <code> forwardRef</code> wrapper needed!
        </p>
        <FocusInput inputRef={controlledRef} />
        <p className="hint" style={{ marginTop: '0.75rem' }}>
          ✨ This input automatically receives focus on mount via ref prop
        </p>
      </div>

      <div className="card vertical">
        <h3>2️⃣ Ref Cleanup Functions</h3>
        <p className="hint" style={{ marginBottom: '1rem' }}>
          Ref callbacks can now return cleanup functions, similar to useEffect.
          Perfect for managing side effects like event listeners or styles.
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <button onClick={() => setShow((s) => !s)}>
            {show ? '👁️ Hide' : '👁️ Show'} Highlighted Box
          </button>
          <select
            value={highlightColor}
            onChange={(e) => setHighlightColor(e.target.value)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              background: 'rgba(15, 23, 42, 0.6)',
              color: '#f3f4f6',
            }}
          >
            <option value="tomato">🔴 Red</option>
            <option value="#6366f1">🔵 Blue</option>
            <option value="#10b981">🟢 Green</option>
            <option value="#f59e0b">🟡 Orange</option>
          </select>
        </div>

        {show && (
          <div ref={setCallbackRef} className="highlight-box">
            <strong>✨ I have a colored outline via a ref callback!</strong>
            <p className="hint" style={{ marginBottom: 0, marginTop: '0.5rem' }}>
              The outline is applied when mounted and cleaned up when unmounted.
              Change the color above to see it update.
            </p>
          </div>
        )}
        
        {!show && (
          <div className="hint" style={{ padding: '1.5rem', textAlign: 'center', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '0.5rem' }}>
            👻 Box is hidden - cleanup function was called!
          </div>
        )}
      </div>

      <div className="hint" style={{ marginTop: '1.5rem' }}>
        <strong>💡 Key Benefits:</strong> Simpler ref forwarding, automatic cleanup,
        and better encapsulation of component logic without extra wrappers.
      </div>
    </section>
  );
}

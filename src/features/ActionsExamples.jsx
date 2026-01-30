import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

// Fake async server action with validation
async function saveMessage(prevState, formData) {
  const message = formData.get('message');
  const email = formData.get('email');
  
  if (!message || message.trim().length === 0) {
    return {
      status: 'error',
      error: 'Message is required.',
      data: null,
    };
  }
  
  if (message.trim().length < 5) {
    return {
      status: 'error',
      error: 'Message must be at least 5 characters long.',
      data: null,
    };
  }
  
  if (email && !email.includes('@')) {
    return {
      status: 'error',
      error: 'Please provide a valid email address.',
      data: null,
    };
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    status: 'success',
    data: {
      message,
      email: email || 'Not provided',
      timestamp: new Date().toISOString(),
    },
    error: null,
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? '⏳ Saving...' : '✉️ Save Message'}
    </button>
  );
}

export function ActionsExamples() {
  const [state, formAction, isPending] = useActionState(saveMessage, {
    status: 'idle',
    data: null,
    error: null,
  });

  return (
    <section>
      <h2>🎬 React Actions: useActionState & useFormStatus</h2>
      <p>
        This example demonstrates React 19's new Actions feature with{' '}
        <code>useActionState</code> and <code>useFormStatus</code>. The form
        handles async submissions with automatic pending states and validation.
      </p>

      <form action={formAction} className="card vertical">
        <h3>Submit a Message</h3>
        
        <div className="field">
          <span>Message *</span>
          <textarea
            name="message"
            placeholder="Type your message here..."
            rows={4}
          />
        </div>

        <div className="field">
          <span>Email (optional)</span>
          <input
            type="email"
            name="email"
            placeholder="your.email@example.com"
          />
        </div>

        <SubmitButton />

        <p className="hint">
          ⚡ Form Status: {' '}
          <span className={`status-badge ${isPending ? 'pending' : state.status}`}>
            {isPending ? 'Processing' : state.status}
          </span>
        </p>
      </form>

      {state.error && (
        <div className="result" style={{ borderColor: 'rgba(239, 68, 68, 0.4)' }}>
          <strong>❌ Error</strong>
          <p style={{ color: '#f87171' }}>{state.error}</p>
        </div>
      )}

      {state.status === 'success' && state.data && (
        <div className="result" style={{ borderColor: 'rgba(34, 197, 94, 0.4)' }}>
          <strong>✅ Success!</strong>
          <pre>{JSON.stringify(state.data, null, 2)}</pre>
        </div>
      )}
    </section>
  );
}

import { Suspense, use, createContext, useState } from 'react';

// A promise that resolves after a delay
function fetchGreeting(delay = 1500) {
  return new Promise((resolve) => {
    setTimeout(() => resolve('Hello from a promise used with use()!'), delay);
  });
}

// A promise that fetches user data
function fetchUserData(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: 'React Developer',
        role: 'Frontend Engineer',
        joinedAt: '2024-12-22',
      });
    }, 1200);
  });
}

const MessageContext = createContext(Promise.resolve('Hello from context with use()!'));

function GreetingFromPromise({ promise }) {
  const text = use(promise);
  return (
    <div className="card vertical">
      <h3>✓ Promise Resolved</h3>
      <p style={{ fontSize: '1.1rem', color: '#a855f7' }}>{text}</p>
    </div>
  );
}

function UserDataDisplay({ userPromise }) {
  const userData = use(userPromise);
  
  return (
    <div className="card vertical">
      <h3>👤 User Profile</h3>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>ID:</strong> {userData.id}</p>
        <p><strong>Joined:</strong> {userData.joinedAt}</p>
      </div>
    </div>
  );
}

function GreetingFromContext() {
  const text = use(MessageContext);
  return (
    <div className="card vertical">
      <h3>✓ Context Value</h3>
      <p style={{ fontSize: '1.1rem', color: '#6366f1' }}>{text}</p>
    </div>
  );
}

export function UseApiExamples() {
  const [greetingPromise] = useState(() => fetchGreeting());
  const [userPromise] = useState(() => fetchUserData(42));

  return (
    <section>
      <h2>🔮 use() API</h2>
      <p>
        React 19 introduces the <code>use()</code> hook that can unwrap Promises
        and read Context values. This enables powerful patterns for async data
        fetching and Suspense integration.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem', marginTop: '1.5rem' }}>
        <div>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>
            📦 Using use() with Promises
          </h3>
          <Suspense fallback={
            <div className="card vertical">
              <div className="hint" style={{ textAlign: 'center', padding: '2rem' }}>
                ⏳ Loading greeting...
              </div>
            </div>
          }>
            <GreetingFromPromise promise={greetingPromise} />
          </Suspense>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>
            👥 Fetching User Data with use()
          </h3>
          <Suspense fallback={
            <div className="card vertical">
              <div className="hint" style={{ textAlign: 'center', padding: '2rem' }}>
                ⏳ Loading user data...
              </div>
            </div>
          }>
            <UserDataDisplay userPromise={userPromise} />
          </Suspense>
        </div>

        <div>
          <h3 style={{ marginBottom: '0.75rem', fontSize: '1.2rem' }}>
            🌐 Using use() with Context
          </h3>
          <Suspense fallback={
            <div className="card vertical">
              <div className="hint" style={{ textAlign: 'center', padding: '2rem' }}>
                ⏳ Loading context...
              </div>
            </div>
          }>
            <MessageContext.Provider value={Promise.resolve('Hi from MessageContext via use()!')}>
              <GreetingFromContext />
            </MessageContext.Provider>
          </Suspense>
        </div>
      </div>

      <div className="hint" style={{ marginTop: '1.5rem' }}>
        <strong>💡 Key Benefits:</strong> The use() API lets you read async values
        directly in components with automatic Suspense integration, eliminating
        the need for manual loading states.
      </div>
    </section>
  );
}

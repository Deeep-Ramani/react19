import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

function ThemeConsumer() {
  const value = useContext(ThemeContext);
  
  const themeStyles = {
    light: {
      background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
      color: '#78350f',
      border: '2px solid #fbbf24',
    },
    dark: {
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#e2e8f0',
      border: '2px solid #6366f1',
    },
    ocean: {
      background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
      color: '#1e3a8a',
      border: '2px solid #3b82f6',
    },
  };

  const style = themeStyles[value] || themeStyles.dark;

  return (
    <div
      style={{
        padding: '1.5rem',
        borderRadius: '0.75rem',
        ...style,
        transition: 'all 0.3s ease',
      }}
    >
      <strong style={{ fontSize: '1.1rem' }}>
        Current Theme: {value.charAt(0).toUpperCase() + value.slice(1)}
      </strong>
      <p style={{ marginTop: '0.5rem', marginBottom: 0, opacity: 0.9 }}>
        This component reads the theme from Context using{' '}
        <code style={{ 
          background: 'rgba(0,0,0,0.1)', 
          padding: '0.125rem 0.375rem', 
          borderRadius: '0.25rem' 
        }}>
          useContext
        </code>
      </p>
    </div>
  );
}

export function ContextProviderExample() {
  const [theme, setTheme] = useState('dark');

  return (
    <section>
      <h2>🌐 Context Provider Simplification</h2>
      <p>
        React 19 simplifies Context usage. While this demo uses the traditional{' '}
        <code>Context.Provider</code> syntax for compatibility, React 19 enables
        using <code>&lt;Context&gt;</code> directly as a provider in supporting
        environments.
      </p>

      <div className="card vertical">
        <h3>Theme Selector</h3>
        
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setTheme('light')}
            style={{
              background: theme === 'light' 
                ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)' 
                : undefined,
            }}
          >
            ☀️ Light
          </button>
          <button
            onClick={() => setTheme('dark')}
            style={{
              background: theme === 'dark' 
                ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                : undefined,
            }}
          >
            🌙 Dark
          </button>
          <button
            onClick={() => setTheme('ocean')}
            style={{
              background: theme === 'ocean' 
                ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' 
                : undefined,
            }}
          >
            🌊 Ocean
          </button>
        </div>

        <ThemeContext.Provider value={theme}>
          <ThemeConsumer />
        </ThemeContext.Provider>
      </div>

      <div className="hint" style={{ marginTop: '1.5rem' }}>
        <strong>💡 What's new:</strong> In React 19, you can use{' '}
        <code>&lt;MyContext value="..."&gt;</code> instead of{' '}
        <code>&lt;MyContext.Provider value="..."&gt;</code> for cleaner syntax.
      </div>
    </section>
  );
}
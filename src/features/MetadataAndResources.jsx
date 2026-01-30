import { useEffect, useState } from 'react';

export function MetadataAndResources() {
  const [metadataApplied, setMetadataApplied] = useState(false);

  useEffect(() => {
    // Document title
    const originalTitle = document.title;
    document.title = 'React 19 Demo - Metadata & Resources';

    // Meta description
    const meta = document.createElement('meta');
    meta.name = 'description';
    meta.content = 'React 19 demo: document metadata and resource loading features.';
    document.head.appendChild(meta);

    // External stylesheet (simulated)
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/extra-styles.css';
    link.id = 'demo-stylesheet';
    document.head.appendChild(link);

    // Async script
    const script = document.createElement('script');
    script.src = 'https://example.com/analytics.js';
    script.async = true;
    script.id = 'demo-script';
    document.head.appendChild(script);

    // Resource preload
    const preload = document.createElement('link');
    preload.rel = 'preload';
    preload.as = 'image';
    preload.href = '/hero-image.png';
    preload.id = 'demo-preload';
    document.head.appendChild(preload);

    setMetadataApplied(true);

    // Cleanup
    return () => {
      document.title = originalTitle;
      document.head.removeChild(meta);
      document.head.removeChild(link);
      document.head.removeChild(script);
      document.head.removeChild(preload);
      setMetadataApplied(false);
    };
  }, []);

  return (
    <section>
      <h2>📄 Document Metadata & Resource Loading</h2>
      <p>
        React 19 introduces native support for managing document metadata,
        stylesheets, scripts, and resource preloading directly from components.
        This demo simulates these capabilities using DOM APIs.
      </p>

      <div className="card vertical">
        <h3>Applied Resources</h3>
        
        {metadataApplied ? (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem' 
            }}>
              <strong style={{ color: '#4ade80' }}>✓ Document Title</strong>
              <p className="hint" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Title updated to: "React 19 Demo - Metadata & Resources"
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem' 
            }}>
              <strong style={{ color: '#4ade80' }}>✓ Meta Description</strong>
              <p className="hint" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Added meta description tag to document head
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem' 
            }}>
              <strong style={{ color: '#4ade80' }}>✓ External Stylesheet</strong>
              <p className="hint" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Link tag added: /extra-styles.css
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem' 
            }}>
              <strong style={{ color: '#4ade80' }}>✓ Async Script</strong>
              <p className="hint" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Script tag added: https://example.com/analytics.js (async)
              </p>
            </div>

            <div style={{ 
              padding: '1rem', 
              background: 'rgba(34, 197, 94, 0.1)', 
              border: '1px solid rgba(34, 197, 94, 0.3)',
              borderRadius: '0.5rem' 
            }}>
              <strong style={{ color: '#4ade80' }}>✓ Resource Preload</strong>
              <p className="hint" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                Preload link added: /hero-image.png
              </p>
            </div>
          </div>
        ) : (
          <p className="hint">⏳ Applying metadata...</p>
        )}
      </div>

      <div className="card vertical">
        <h3>React 19 API Example</h3>
        <p style={{ marginBottom: '1rem' }}>
          In a real React 19 app with proper framework support, you would write:
        </p>
        <pre style={{ 
          background: 'rgba(0, 0, 0, 0.3)', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          overflow: 'auto',
          fontSize: '0.85rem',
        }}>
{`function MyPage() {
  return (
    <>
      <title>My Page Title</title>
      <meta name="description" content="..." />
      <link rel="stylesheet" href="/styles.css" />
      <script src="/analytics.js" async />
      <link rel="preload" href="/hero.png" as="image" />
      
      {/* Your component content */}
    </>
  );
}`}
        </pre>
      </div>

      <div className="hint" style={{ marginTop: '1.5rem' }}>
        <strong>💡 Key Benefits:</strong> These elements can be defined anywhere
        in your component tree, and React automatically hoists them to the document
        head. They're properly cleaned up when components unmount.
      </div>
    </section>
  );
}

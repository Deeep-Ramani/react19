import './App.css'
import { ActionsExamples } from './features/ActionsExamples.jsx'
import { OptimisticExample } from './features/OptimisticExample.jsx'
import { UseApiExamples } from './features/UseApiExamples.jsx'
import { RefsExamples } from './features/RefsExamples.jsx'
import { ContextProviderExample } from './features/ContextProviderExample.jsx'
import { DeferredValueExample } from './features/DeferredValueExample.jsx'
import { MetadataAndResources } from './features/MetadataAndResources.jsx'

const sections = [
  { id: 'actions', title: '🎬 React Actions', component: <ActionsExamples /> },
  { id: 'optimistic', title: '❤️ useOptimistic', component: <OptimisticExample /> },
  { id: 'use-api', title: '🔮 use() API', component: <UseApiExamples /> },
  { id: 'refs', title: '🎯 Ref Improvements', component: <RefsExamples /> },
  { id: 'context', title: '🌐 Context Provider', component: <ContextProviderExample /> },
  { id: 'deferred', title: '⏱️ useDeferredValue', component: <DeferredValueExample /> },
  { id: 'metadata', title: '📄 Metadata & Resources', component: <MetadataAndResources /> },
]

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>⚛️ React 19 Feature Showcase</h1>
        <p className="tagline">
          Comprehensive examples of new APIs and improvements in React 19.
          Explore Actions, Optimistic UI, the use() hook, ref improvements, and more.
        </p>
        <nav className="nav" aria-label="Feature navigation">
          {sections.map((section) => (
            <a key={section.id} href={`#${section.id}`} className="nav-link">
              {section.title}
            </a>
          ))}
        </nav>
      </header>

      <main className="content">
        {sections.map((section) => (
          <article key={section.id} id={section.id} className="content-section">
            {section.component}
          </article>
        ))}
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '3rem 2rem',
        color: '#9ca3af',
        borderTop: '1px solid rgba(99, 102, 241, 0.2)',
      }}>
        <p style={{ marginBottom: '0.5rem' }}>
          Built with React 19 • Vite • Modern CSS
        </p>
        <p style={{ fontSize: '0.875rem' }}>
          <a
            href="https://react.dev/blog/2024/12/05/react-19"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#a855f7' }}
          >
            📚 Read the official React 19 release post
          </a>
        </p>
      </footer>
    </div>
  )
}

export default App

import './Grid.css';

export function Grid({ children, cols = 1, gap = '1.5rem', className = '' }) {
  return (
    <div 
      className={`grid ${className}`}
      style={{
        '--grid-cols': cols,
        '--grid-gap': gap,
      }}
    >
      {children}
    </div>
  );
}

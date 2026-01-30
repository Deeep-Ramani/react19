import './Card.css';

export function Card({ children, className = '', hover = true, gradient = false }) {
  return (
    <div className={`card ${hover ? 'card-hover' : ''} ${gradient ? 'card-gradient' : ''} ${className}`}>
      {children}
    </div>
  );
}

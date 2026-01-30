import './StatusBadge.css';

export function StatusBadge({ status, children }) {
  return (
    <span className={`status-badge ${status}`}>
      {children}
    </span>
  );
}

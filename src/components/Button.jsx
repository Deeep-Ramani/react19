import './Button.css';

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  loading = false,
  ...props 
}) {
  return (
    <button 
      className={`btn btn-${variant} btn-${size} ${loading ? 'btn-loading' : ''}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {children}
    </button>
  );
}

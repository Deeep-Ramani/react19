import './FeatureSection.css';

export function FeatureSection({ id, icon, title, description, children }) {
  return (
    <article id={id} className="feature-section">
      <div className="feature-header">
        <h2>
          {icon && <span className="feature-icon">{icon}</span>}
          {title}
        </h2>
        {description && <p className="feature-description">{description}</p>}
      </div>
      <div className="feature-content">
        {children}
      </div>
    </article>
  );
}

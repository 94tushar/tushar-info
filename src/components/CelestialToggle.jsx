/**
 * Sun / Moon theme toggle (Breedlove "celestial" style).
 * Shows a glowing sun in day, a crescent moon with stars in night.
 */
function CelestialToggle({ theme, onToggle }) {
  const night = theme === "night";
  return (
    <button
      className={`celestial ${night ? "is-night" : "is-day"}`}
      onClick={onToggle}
      aria-label={night ? "Switch to day theme" : "Switch to night theme"}
      title={night ? "Day" : "Night"}
    >
      <span className="celestial-orb">
        <svg viewBox="0 0 44 44" aria-hidden="true">
          <defs>
            <radialGradient id="sunG" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffe6b0" />
              <stop offset="60%" stopColor="#f7b955" />
              <stop offset="100%" stopColor="#e0894a" />
            </radialGradient>
            <radialGradient id="moonG" cx="38%" cy="36%" r="70%">
              <stop offset="0%" stopColor="#f3ead9" />
              <stop offset="100%" stopColor="#cdbfa6" />
            </radialGradient>
          </defs>

          {/* SUN */}
          <g className="sun">
            {[...Array(8)].map((_, i) => (
              <line
                key={i}
                className="ray"
                x1="22" y1="3" x2="22" y2="9"
                transform={`rotate(${i * 45} 22 22)`}
              />
            ))}
            <circle cx="22" cy="22" r="9.5" fill="url(#sunG)" />
          </g>

          {/* MOON */}
          <g className="moon">
            <circle cx="22" cy="22" r="10.5" fill="url(#moonG)" />
            <circle cx="26.5" cy="19" r="9" className="moon-mask" />
            <circle className="mstar" cx="9" cy="11" r="0.9" />
            <circle className="mstar" cx="34" cy="33" r="1.1" />
            <circle className="mstar" cx="12" cy="32" r="0.7" />
          </g>
        </svg>
      </span>
    </button>
  );
}

export default CelestialToggle;

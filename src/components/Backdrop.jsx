/**
 * Clean celestial backdrop for the hero — deep gradient, two slow drifting
 * aurora glows, and a faint parallaxed starfield. Light + on-theme; replaces
 * the heavy cloud layers.
 */
function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="bd-sky" />
      <div className="bd-aurora bd-aurora-1" />
      <div className="bd-aurora bd-aurora-2" />
      <div className="bd-stars" />
      <div className="bd-grid" />
      <div className="bd-veil" />
    </div>
  );
}

export default Backdrop;

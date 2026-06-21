/**
 * Cloud sky built from pre-rendered soft cloud textures used as CSS masks
 * (so the cloud colour is theme-driven via --cloud-fill). Layers are
 * parallaxed via the global --sy scroll variable so the side + bottom banks
 * drift inward and envelop the hero as you scroll (the Breedlove effect).
 * Cheap to render — no runtime SVG filters.
 */
function CloudScape() {
  return (
    <div className="cloudscape" aria-hidden="true">
      <div className="sky" />
      <div className="sky-glow" />
      <div className="cloud cloud-far" />
      <div className="cloud cloud-mid" />
      <div className="cloud cloud-left" />
      <div className="cloud cloud-right" />
      <div className="cloud cloud-bottom" />
      <div className="cloud-front" />
      <div className="cloud-veil" />
    </div>
  );
}

export default CloudScape;

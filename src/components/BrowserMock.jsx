/**
 * Faux browser window. Shows a screenshot if `image` is given, otherwise a
 * tasteful UI skeleton. Backing layers create the fanned "stack" depth from
 * the reference.
 */
function BrowserMock({ image, label, url, accent }) {
  return (
    <div className="bmock">
      <span className="bmock-layer l2" aria-hidden="true" />
      <span className="bmock-layer l1" aria-hidden="true" />
      <div className="bmock-window">
        <div className="bmock-bar">
          <span className="dot" /><span className="dot" /><span className="dot" />
          <span className="bmock-url">{url}</span>
        </div>
        <div className="bmock-screen">
          {image ? (
            <img src={image} alt={label} loading="lazy" />
          ) : (
            <div className="bmock-skeleton" style={accent ? { "--sk": accent } : undefined}>
              <div className="sk-top">
                <span className="sk-logo" />
                <span className="sk-pill" />
                <span className="sk-pill sm" />
              </div>
              <div className="sk-grid">
                <span className="sk-card tall" />
                <div className="sk-col">
                  <span className="sk-card" />
                  <span className="sk-card" />
                  <span className="sk-line" />
                  <span className="sk-line w70" />
                </div>
              </div>
              <div className="sk-row">
                <span className="sk-chip" /><span className="sk-chip" /><span className="sk-chip" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowserMock;

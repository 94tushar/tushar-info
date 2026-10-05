import { useEffect } from "react";

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Stacked "deck of slides" scroll: each panel sticks, and the one below tilts back and dims
   as the next panel slides over it.

   Performance notes:
   - All geometry is measured once (and on resize), then every frame is pure math from scrollY.
     No layout reads happen during scroll, so there is no layout thrashing.
   - Panels that are fully covered by later panels get `data-covered`, which hides them
     (visibility: hidden) so the browser stops painting them, and pauses their animations.
   - Only the panel currently being covered gets will-change, so the GPU holds one extra layer,
     not nine. */
export function useStackScroll() {
  useEffect(() => {
    if (reduced()) {
      document.documentElement.classList.add("no-stack");
      return;
    }
    const deck = document.querySelector(".deck");
    const panels = [...document.querySelectorAll("[data-panel]")];
    if (!deck || !panels.length) return;
    const inners = panels.map((p) => p.firstElementChild);

    let vh = window.innerHeight;
    let geo = []; // { h, stickyTop, staticTop }
    let deckEnd = 0;
    let footerTop = 0;
    const lastProg = panels.map(() => -1);
    const lastCovered = panels.map(() => false);

    const measure = () => {
      vh = window.innerHeight;
      const deckTop = deck.getBoundingClientRect().top + window.scrollY;
      let y = deckTop;
      geo = panels.map((p) => {
        const h = p.offsetHeight;
        const stickyTop = Math.min(0, vh - h);
        p.style.top = `${stickyTop}px`;
        p.firstElementChild.style.transformOrigin = `50% ${h > vh ? h - vh / 2 : h / 2}px`;
        const g = { h, stickyTop, staticTop: y };
        y += h;
        return g;
      });
      deckEnd = y;
      footerTop = y;
      lastProg.fill(-1);
      update();
    };

    // Where a panel's top edge is on screen right now, computed without touching the DOM.
    const topOf = (i, sy) => {
      const g = geo[i];
      const stuck = Math.max(g.stickyTop, g.staticTop - sy);
      return Math.min(stuck, deckEnd - sy - g.h);
    };

    let raf = 0;
    const update = () => {
      raf = 0;
      const sy = window.scrollY;
      const tops = geo.map((_, i) => topOf(i, sy));
      const fTop = footerTop - sy;

      for (let i = 0; i < panels.length; i++) {
        // Is this panel completely hidden behind the panels (and footer) that come after it?
        let coverEnd = -Infinity;
        for (let j = i + 1; j <= panels.length; j++) {
          const t = j < panels.length ? tops[j] : fTop;
          const h = j < panels.length ? geo[j].h : Infinity;
          if (coverEnd === -Infinity) {
            if (t > 0) break;
            coverEnd = t + h;
          } else if (t <= coverEnd) {
            coverEnd = Math.max(coverEnd, t + h);
          } else break;
          if (coverEnd >= vh) break;
        }
        const covered = coverEnd >= vh;
        if (covered !== lastCovered[i]) {
          lastCovered[i] = covered;
          if (covered) panels[i].dataset.covered = "1";
          else delete panels[i].dataset.covered;
        }
        if (covered) continue;

        const nt = i + 1 < panels.length ? tops[i + 1] : fTop;
        let prog = Math.max(0, Math.min(1, (vh - nt) / vh));
        prog = Math.round(prog * 200) / 200; // skip sub-pixel updates
        if (prog === lastProg[i]) continue;
        lastProg[i] = prog;
        const inner = inners[i];
        if (prog <= 0) {
          inner.style.transform = "";
          inner.style.setProperty("--dim", "0");
          delete inner.dataset.on;
        } else {
          inner.dataset.on = "1";
          inner.style.transform = `perspective(1600px) rotateX(${(prog * 5).toFixed(2)}deg) scale(${(1 - prog * 0.09).toFixed(4)})`;
          inner.style.setProperty("--dim", (prog * 0.55).toFixed(3));
        }
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(measure);
    };
    const ro = new ResizeObserver(onResize);
    panels.forEach((p) => ro.observe(p));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    measure();
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
    };
  }, []);
}

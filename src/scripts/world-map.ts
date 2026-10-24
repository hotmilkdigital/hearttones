/**
 * Map tooltips for WorldMap.astro (CLAUDE.md §8.5, WCAG 1.4.13):
 * shown on hover and keyboard focus, hidden on Esc, blur or pointer leave (with a short
 * delay so the pointer can move onto the tooltip). Markers stay plain links.
 */

const HIDE_DELAY = 200;
const GAP = 14;

export function initWorldMap(root: HTMLElement): void {
  const markers = Array.from(root.querySelectorAll<SVGAElement>('a.marker[data-tip]'));
  let current: HTMLElement | null = null;
  let hideTimer: number | undefined;

  const position = (marker: SVGAElement, tip: HTMLElement) => {
    const box = root.getBoundingClientRect();
    // Country markers are dots, team pins are diamonds.
    const shape = marker.querySelector('.marker__dot, .marker__diamond');
    if (!shape) return;
    const dot = shape.getBoundingClientRect();
    const cx = dot.left + dot.width / 2 - box.left;
    const top = dot.top - box.top;
    const bottom = dot.bottom - box.top;

    tip.style.left = '0px';
    tip.style.top = '0px';
    const { width, height } = tip.getBoundingClientRect();
    const left = Math.min(Math.max(cx - width / 2, 8), box.width - width - 8);
    const above = top - height - GAP;
    tip.style.left = `${left}px`;
    tip.style.top = `${above >= 0 ? above : bottom + GAP}px`;
  };

  const show = (marker: SVGAElement) => {
    window.clearTimeout(hideTimer);
    const tip = root.querySelector<HTMLElement>(`#${marker.dataset.tip}`);
    if (!tip) return;
    if (current && current !== tip) current.hidden = true;
    tip.hidden = false;
    position(marker, tip);
    current = tip;
  };

  const hide = () => {
    window.clearTimeout(hideTimer);
    if (current) current.hidden = true;
    current = null;
  };

  const hideSoon = () => {
    window.clearTimeout(hideTimer);
    hideTimer = window.setTimeout(hide, HIDE_DELAY);
  };

  for (const marker of markers) {
    marker.addEventListener('mouseenter', () => show(marker));
    marker.addEventListener('mouseleave', hideSoon);
    marker.addEventListener('focus', () => show(marker));
    marker.addEventListener('blur', hide);
  }

  root.querySelectorAll<HTMLElement>('.map__tip').forEach((tip) => {
    tip.addEventListener('mouseenter', () => window.clearTimeout(hideTimer));
    tip.addEventListener('mouseleave', hideSoon);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && current) hide();
  });
  window.addEventListener('resize', hide);
}

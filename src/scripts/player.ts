/**
 * Audio player behaviour for AudioPlayer.astro (CLAUDE.md §8.2).
 * - Tabs: WAI-ARIA tabs pattern with roving tabindex (Arrow keys, Home, End).
 * - One shared <audio> element; each album panel has its own now-playing bar.
 * - Auto-advance to the next playable track of the same album.
 * - Deep links (#vol-2-09-buuvein-duu) open the right tab and scroll to the track.
 */

interface Panel {
  id: string;
  el: HTMLElement;
  tracks: HTMLLIElement[];
  toggle: HTMLButtonElement;
  title: HTMLElement;
  seek: HTMLInputElement;
  current: HTMLElement;
  duration: HTMLElement;
  /** Track shown in this panel's bar (0 until the listener picks another). */
  selected: number;
}

const formatTime = (seconds: number): string => {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

export function initPlayer(root: HTMLElement): void {
  const tablist = root.querySelector<HTMLElement>('[data-tablist]');
  const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
  const panels: Panel[] = Array.from(root.querySelectorAll<HTMLElement>('[data-panel]')).map((el) => ({
    id: el.dataset.panel!,
    el,
    tracks: Array.from(el.querySelectorAll<HTMLLIElement>('[data-track]')),
    toggle: el.querySelector<HTMLButtonElement>('[data-bar-toggle]')!,
    title: el.querySelector<HTMLElement>('[data-bar-title]')!,
    seek: el.querySelector<HTMLInputElement>('[data-bar-seek]')!,
    current: el.querySelector<HTMLElement>('[data-bar-current]')!,
    duration: el.querySelector<HTMLElement>('[data-bar-duration]')!,
    selected: 0,
  }));

  // ---- Tabs -------------------------------------------------------------------------------

  const selectTab = (index: number, focus = false) => {
    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[i]!.el.hidden = !active;
    });
    if (focus) tabs[index]!.focus();
  };

  if (tablist && tabs.length === panels.length) {
    tablist.hidden = false;
    root.classList.add('is-enhanced');
    selectTab(0);

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => selectTab(i));
      tab.addEventListener('keydown', (event) => {
        const last = tabs.length - 1;
        const next: Record<string, number> = {
          ArrowRight: i === last ? 0 : i + 1,
          ArrowLeft: i === 0 ? last : i - 1,
          Home: 0,
          End: last,
        };
        if (event.key in next) {
          event.preventDefault();
          selectTab(next[event.key]!, true);
        }
      });
    });

    const openFromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id) return;
      const index = panels.findIndex((p) => p.el.querySelector(`[id="${CSS.escape(id)}"]`));
      if (index < 0) return;
      selectTab(index);
      document.getElementById(id)?.scrollIntoView({ block: 'center' });
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
  }

  // ---- Playback ---------------------------------------------------------------------------

  const audio = root.querySelector<HTMLAudioElement>('[data-audio]');
  if (!audio || root.dataset.playable !== 'true') return;

  const labelPlay = root.dataset.labelPlay ?? '{title}';
  const labelPause = root.dataset.labelPause ?? '{title}';
  const label = (template: string, title: string) => template.replace('{title}', title);

  let active: { panel: Panel; index: number } | null = null;

  const trackData = (panel: Panel, index: number) => {
    const li = panel.tracks[index]!;
    return {
      li,
      src: li.dataset.src,
      title: li.dataset.title ?? '',
      duration: Number(li.dataset.duration ?? 0),
      button: li.querySelector<HTMLButtonElement>('[data-track-toggle]')!,
    };
  };

  const setButton = (button: HTMLButtonElement, title: string, playing: boolean) => {
    button.classList.toggle('is-playing', playing);
    button.setAttribute('aria-label', label(playing ? labelPause : labelPlay, title));
  };

  /** Show a track in a panel's bar without playing it. */
  const showInBar = (panel: Panel, index: number, time = 0) => {
    const t = trackData(panel, index);
    panel.selected = index;
    panel.title.textContent = t.title;
    panel.title.lang = t.li.querySelector<HTMLElement>('[lang]')?.lang ?? '';
    panel.seek.max = String(t.duration);
    panel.seek.value = String(Math.floor(time));
    panel.seek.disabled = !(active && active.panel === panel && active.index === index);
    panel.current.textContent = formatTime(time);
    panel.duration.textContent = formatTime(t.duration);
    panel.toggle.disabled = !t.src;
  };

  /** Sync every button, bar and row with the audio element. */
  const render = () => {
    const playing = !audio.paused && !audio.ended;
    for (const panel of panels) {
      panel.tracks.forEach((_, i) => {
        const t = trackData(panel, i);
        const isActive = active?.panel === panel && active.index === i;
        setButton(t.button, t.title, isActive && playing);
        t.li.classList.toggle('is-current', isActive);
        if (isActive) t.li.setAttribute('aria-current', 'true');
        else t.li.removeAttribute('aria-current');
      });
      const barTrack = trackData(panel, panel.selected);
      const barActive = active?.panel === panel && active.index === panel.selected;
      setButton(panel.toggle, barTrack.title, barActive && playing);
    }
  };

  const play = (panel: Panel, index: number) => {
    const t = trackData(panel, index);
    if (!t.src) return;
    const previous = active;
    active = { panel, index };
    if (previous && previous.panel !== panel) showInBar(previous.panel, previous.panel.selected);
    showInBar(panel, index);
    if (audio.getAttribute('src') !== t.src) {
      audio.src = t.src;
    }
    void audio.play().catch(() => render());
  };

  const toggle = (panel: Panel, index: number) => {
    const isActive = active?.panel === panel && active.index === index;
    if (isActive && !audio.paused) audio.pause();
    else if (isActive) void audio.play().catch(() => render());
    else play(panel, index);
  };

  for (const panel of panels) {
    panel.tracks.forEach((li, i) => {
      li.querySelector<HTMLButtonElement>('[data-track-toggle]')?.addEventListener('click', () => toggle(panel, i));
    });
    panel.toggle.addEventListener('click', () => toggle(panel, panel.selected));
    panel.seek.addEventListener('input', () => {
      if (active?.panel === panel) audio.currentTime = Number(panel.seek.value);
    });
  }

  audio.addEventListener('play', render);
  audio.addEventListener('pause', render);
  audio.addEventListener('timeupdate', () => {
    if (!active) return;
    const { panel } = active;
    if (document.activeElement !== panel.seek) panel.seek.value = String(Math.floor(audio.currentTime));
    panel.current.textContent = formatTime(audio.currentTime);
  });
  audio.addEventListener('loadedmetadata', () => {
    if (!active || !Number.isFinite(audio.duration)) return;
    active.panel.seek.max = String(Math.floor(audio.duration));
    active.panel.duration.textContent = formatTime(audio.duration);
  });
  audio.addEventListener('ended', () => {
    if (!active) return;
    const { panel, index } = active;
    const next = panel.tracks.findIndex((li, i) => i > index && li.dataset.src);
    if (next >= 0) play(panel, next);
    else {
      showInBar(panel, index, 0);
      render();
    }
  });
  audio.addEventListener('error', () => {
    if (!active) return;
    const { panel, index } = active;
    trackData(panel, index).button.disabled = true;
    active = null;
    showInBar(panel, index);
    render();
  });

  panels.forEach((panel) => showInBar(panel, 0));
  render();
}

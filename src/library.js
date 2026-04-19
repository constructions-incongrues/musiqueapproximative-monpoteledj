import { fixBadEscapes, mapPost } from './lib.js';

export const API_BASE = 'https://www.musiqueapproximative.net';
export const LIBRARY_PAGE = 100;
export let LIBRARY = [];

// Mark state — persisted in sessionStorage
const MARKS_KEY = '__ma_marks__';
export let markFilter = 0; // 0 = all, 1-5 = specific color

export function saveMarks() {
  try {
    const data = {};
    LIBRARY.forEach((t, i) => { if (t.mark) data[i] = t.mark; });
    sessionStorage.setItem(MARKS_KEY, JSON.stringify(data));
  } catch (e) { /* sessionStorage unavailable */ }
}

export function loadMarks() {
  try {
    const raw = sessionStorage.getItem(MARKS_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    Object.entries(data).forEach(([idx, mark]) => {
      const i = parseInt(idx);
      if (LIBRARY[i]) LIBRARY[i].mark = mark;
    });
  } catch (e) { /* ignore */ }
}

export async function fetchLibrary() {
  try {
    const res = await fetch(API_BASE + '/posts?format=json');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const raw = await res.text();
    const fixed = fixBadEscapes(raw);
    const data = JSON.parse(fixed);
    const posts = Array.isArray(data) ? data : (data.posts || []);
    LIBRARY = posts.map(mapPost);
    loadMarks(); // restore marks from sessionStorage
  } catch (err) {
    console.error('Library fetch failed:', err);
    LIBRARY = [];
  }
}

export function renderLibrary(filter = "", contribFilter = "", markOnly = 0) {
  const tbody = document.getElementById('library-body');
  tbody.innerHTML = "";
  const f = filter.trim().toLowerCase();
  const matches = [];
  LIBRARY.forEach((t, i) => {
    const s = (t.artist + " " + t.title + " " + t.contrib + " " + t.mood).toLowerCase();
    if (f && !s.includes(f)) return;
    if (contribFilter && t.contrib !== contribFilter) return;
    if (markOnly && t.mark !== markOnly) return;
    matches.push({ t, i });
  });
  const visible = matches.slice(0, LIBRARY_PAGE);
  visible.forEach(({ t, i }) => {
    const tr = document.createElement('tr');
    tr.dataset.idx = i;
    if (t.mark) tr.classList.add('mark-' + t.mark);
    tr.innerHTML = `
      <td class="num">${String(i+1).padStart(2,'0')}</td>
      <td class="artist">${t.artist}</td>
      <td class="title">${t.title}${t.mood ? ` <span style="color:var(--ma-gray-dark);font-style:normal;">· ${t.mood}</span>` : ''}</td>
      <td class="num">${t.bpm ?? '—'}</td>
      <td>${t.key || '—'}</td>
      <td class="num">${t.dur ?? '—'}</td>
      <td class="contrib">${t.contrib}</td>
      <td class="loadcell">
        <button class="load-btn" data-load="a" data-idx="${i}"><span>→ A</span></button>
        <button class="load-btn" data-load="b" data-idx="${i}"><span>→ B</span></button>
      </td>
    `;
    tbody.appendChild(tr);
  });
  const hidden = matches.length - visible.length;
  const label = hidden > 0
    ? `${matches.length} morceaux — ${hidden} non affichés, utilisez la recherche`
    : `${matches.length} morceaux dans le carton`;
  document.getElementById('lib-count').textContent = label;
}

export function populateContribFilter() {
  const sel = document.getElementById('contrib-filter');
  if (!sel) return;
  while (sel.options.length > 1) sel.remove(1);
  const contribs = [...new Set(LIBRARY.map(t => t.contrib).filter(Boolean))].sort();
  contribs.forEach(c => {
    const o = document.createElement('option');
    o.value = c; o.textContent = c;
    sel.appendChild(o);
  });
  sel.addEventListener('change', () => {
    renderLibrary(document.getElementById('library-search').value, sel.value, markFilter);
  });
}

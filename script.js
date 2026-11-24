const scenes = {
  river: {
    src: 'assets/river-world.png', alt: 'River, city, and forest generated world from an oblique view', count: '1', label: 'RIVER / CITY / FOREST', title: 'A river finds<br>its way home.', description: 'A winding river links quiet green forest to a compact urban edge. Sparse text anchors set the character of each region; the path sketch gives the landscape a way through.', variant: 'RIVER PATH'
  },
  road: {
    src: 'assets/road-world.png', alt: 'Road path structure variant across a generated forest and city world', count: '2', label: 'FOREST / CITY / ROAD', title: 'A road through<br>the green.', description: 'Keep the same spatial brief, then change the structure prompt. Here, a road cuts across the landscape to connect forest and city.', variant: 'ROAD PATH'
  },
  wall: {
    src: 'assets/wall-world.png', alt: 'Raised wall structure variant across a generated forest and city world', count: '3', label: 'FOREST / CITY / WALL', title: 'An edge with<br>a little elevation.', description: 'An alternate structure, generated under the same anchor layout. The wall traces a boundary between neighboring regions while the world stays spatially grounded.', variant: 'RAISED WALL'
  }
};
const tabs = [...document.querySelectorAll('.scene-tab')];
const img = document.getElementById('scene-image');
function setScene(key) {
  const scene = scenes[key];
  tabs.forEach(tab => {
    const active = tab.dataset.scene === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  img.style.opacity = '0.25';
  window.setTimeout(() => {
    img.src = scene.src;
    img.alt = scene.alt;
    img.style.opacity = '1';
  }, 130);
  document.getElementById('scene-count').textContent = scene.count;
  document.getElementById('scene-label').textContent = scene.label;
  document.getElementById('scene-title').innerHTML = scene.title;
  document.getElementById('scene-description').textContent = scene.description;
  document.getElementById('scene-variant').textContent = scene.variant;
}
tabs.forEach(tab => tab.addEventListener('click', () => setScene(tab.dataset.scene)));
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));
const toast = document.getElementById('toast');
let toastTimer;
document.getElementById('copy-citation').addEventListener('click', async () => {
  const text = document.getElementById('bibtex').textContent;
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById('copy-label').textContent = 'Copied!';
    toast.textContent = 'BibTeX copied to clipboard';
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed'; area.style.opacity = '0';
    document.body.append(area); area.select(); document.execCommand('copy'); area.remove();
    document.getElementById('copy-label').textContent = 'Copied!';
    toast.textContent = 'BibTeX copied to clipboard';
  }
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('visible');
    document.getElementById('copy-label').textContent = 'Copy BibTeX';
  }, 2200);
});


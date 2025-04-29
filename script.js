// script.js

(() => {
  // Element refs
  const themeSwitcher = document.getElementById('themeSwitcher');
  const shareBtn      = document.getElementById('shareBtn');
  const userInput     = document.getElementById('userInput');
  const imageUpload   = document.getElementById('imageUpload');
  const imagePreview  = document.getElementById('imagePreview');
  const textGroup     = document.getElementById('textGroup');
  const imageGroup    = document.getElementById('imageGroup');
  const charCount     = document.getElementById('charCount');
  const filterBtns    = document.querySelectorAll('.filter-btn');
  const clearAll      = document.getElementById('clearAll');
  const storyboard    = document.getElementById('storyboard');

  let contributions = JSON.parse(localStorage.getItem('contributions')) || [];
  let currentType   = 'text'; // track form mode

  // — Theme persistence —
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-theme');
  updateThemeText();
  themeSwitcher.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeText();
  });
  function updateThemeText() {
    themeSwitcher.textContent = document.body.classList.contains('dark-theme')
      ? '☀️ Light Mode'
      : '🌙 Dark Mode';
  }

  // — Form Type Buttons —  
  // Text / Image mode toggles inside the form
  const textTypeBtn  = document.querySelector('.contribution-type [data-type="text"]');
  const imageTypeBtn = document.querySelector('.contribution-type [data-type="image"]');

  textTypeBtn.addEventListener('click', () => {
    currentType = 'text';
    textGroup.style.display  = 'block';
    imageGroup.style.display = 'none';
    shareBtn.disabled        = !userInput.value.trim();
  });

  // *** FIX: clicking the Image button now opens file picker ***
  imageTypeBtn.addEventListener('click', () => {
    currentType = 'image';
    // show preview area (will remain hidden until a file is chosen)
    textGroup.style.display  = 'none';
    imageGroup.style.display = 'block';
    imageUpload.click();
  });

  // — Input Validation & Preview —
  userInput.addEventListener('input', () => {
    if (currentType !== 'text') return;
    const remaining = 300 - userInput.value.length;
    charCount.textContent = `${remaining} characters remaining`;
    shareBtn.disabled    = !userInput.value.trim();
  });

  imageUpload.addEventListener('change', ({ target }) => {
    const file = target.files[0];
    if (!file) {
      // If user cancels file picker, fallback to text mode
      textTypeBtn.click();
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.src           = reader.result;
      imagePreview.style.display = 'block';
      shareBtn.disabled          = false;
    };
    reader.readAsDataURL(file);
  });

  // — Share & Clear —
  shareBtn.addEventListener('click', addContribution);
  clearAll.addEventListener('click', () => {
    if (confirm('Remove all contributions?')) {
      contributions = [];
      persist();
      render();
    }
  });

  // — Filtering —
  filterBtns.forEach(btn =>
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.toggle('active', b === btn));
      render();
    })
  );

  // — Contribution Logic —
  function addContribution() {
    let content = '';
    if (currentType === 'text')  content = userInput.value.trim();
    else if (currentType === 'image') content = imagePreview.src;
    if (!content) return;

    const author = document.getElementById('userName').value.trim() || 'Anonymous';
    contributions.push({
      id:        Date.now(),
      type:      currentType,
      content,
      author,
      likes:     0,
      timestamp: new Date().toISOString(),
    });
    persist();
    render();
    resetForm();
    launchConfetti();
  }

  function render() {
    storyboard.innerHTML = '';
    const filter = document.querySelector('.filter-btn.active').dataset.type;
    contributions
      .filter(c => filter === 'all' || c.type === filter)
      .sort((a, b) => b.id - a.id)
      .forEach(c => storyboard.append(createCard(c)));
  }

  function createCard(c) {
    const card = document.createElement('div');
    card.className = 'contribution-card';
    card.innerHTML = `
      <div class="user-meta">
        <div class="avatar">${c.author[0].toUpperCase()}</div>
        <div>
          <h4>${c.author}</h4>
          <small>${new Date(c.timestamp).toLocaleString()}</small>
        </div>
      </div>
      ${c.type === 'image'
        ? `<img src="${c.content}" class="contribution-image" />`
        : `<p>${c.content}</p>`}
      <div class="reactions">
        <button class="reaction-btn" data-action="like" data-id="${c.id}">❤️ ${c.likes}</button>
        <button class="reaction-btn" data-action="delete" data-id="${c.id}">🗑️</button>
      </div>
    `;
    card.querySelectorAll('[data-action]').forEach(btn =>
      btn.addEventListener('click', () => handleAction(btn.dataset.id, btn.dataset.action))
    );
    return card;
  }

  function handleAction(id, action) {
    const idx = contributions.findIndex(c => c.id == id);
    if (idx === -1) return;
    if (action === 'like') contributions[idx].likes++;
    else if (action === 'delete') contributions.splice(idx, 1);
    persist();
    render();
  }

  function persist() {
    localStorage.setItem('contributions', JSON.stringify(contributions));
  }

  function resetForm() {
    userInput.value            = '';
    imagePreview.src           = '';
    imagePreview.style.display = 'none';
    imageUpload.value          = '';
    charCount.textContent      = '300 characters remaining';
    shareBtn.disabled          = true;
    // back to text mode
    textTypeBtn.click();
  }

  // — Confetti —
  function launchConfetti() {
    for (let i = 0; i < 30; i++) {
      const d = document.createElement('div');
      d.className = 'confetti';
      d.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 50%)`;
      d.style.left = `${Math.random() * 100}vw`;
      d.style.animation = `confetti-fall ${Math.random() * 3 + 2}s linear`;
      document.body.append(d);
      setTimeout(() => d.remove(), 5000);
    }
  }

  // Initial render
  render();
})();

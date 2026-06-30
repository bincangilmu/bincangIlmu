// --- KITAB SMART SYSTEM ---
let currentKitabCategory = 'all';
let kitabRenderIndex = 0;
const KITABS_PER_PAGE = 6;
let currentFilteredKitabs = [];

function loadAllKitab() {
    const grid = document.getElementById('kitabGrid');
    if (!grid) return;
    filterKitabList();
    setupKitabObserver();
}

function filterKitabList() {
    const searchInput = document.getElementById('kitabSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked_kitabs')) || [];
    
    currentFilteredKitabs = [];
    
    for (const [id, kitab] of Object.entries(kitabData)) {
        let matchesCategory = false;
        if (currentKitabCategory === 'favorit') {
            matchesCategory = bookmarks.includes(id);
        } else {
            matchesCategory = currentKitabCategory === 'all' || kitab.category === currentKitabCategory;
        }

        const matchesQuery = query === '' || 
                             kitab.title.toLowerCase().includes(query) || 
                             kitab.author.toLowerCase().includes(query);

        if (matchesCategory && matchesQuery) {
            currentFilteredKitabs.push({ id, ...kitab });
        }
    }
    
    kitabRenderIndex = 0;
    const grid = document.getElementById('kitabGrid');
    if (grid) grid.innerHTML = '';
    
    if (currentFilteredKitabs.length === 0) {
        if (grid) grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">Kitab tidak ditemukan.</div>';
        const loading = document.getElementById('kitabLoading');
        if (loading) loading.style.display = 'none';
    } else {
        renderMoreKitabs();
    }
}

function renderMoreKitabs() {
    const grid = document.getElementById('kitabGrid');
    if (!grid) return;
    
    const loading = document.getElementById('kitabLoading');
    if (loading) loading.style.display = 'block';

    setTimeout(() => {
        const itemsToRender = currentFilteredKitabs.slice(kitabRenderIndex, kitabRenderIndex + KITABS_PER_PAGE);
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked_kitabs')) || [];
        
        itemsToRender.forEach(kitab => {
            let coverStyle = `background-color: ${kitab.bgColor};`;
            if (kitab.image) {
                coverStyle += ` background-image: url('${kitab.image}');`;
            }

            let fallbackTitle = '';
            if (!kitab.image) {
                fallbackTitle = `<div class="cover-fallback-title">${kitab.title}</div>`;
            }

            const isBookmarked = bookmarks.includes(kitab.id);
            const heartIcon = isBookmarked ? 'fas fa-heart' : 'far fa-heart';
            const heartColor = isBookmarked ? '#ef4444' : '';

            const card = document.createElement('div');
            card.className = 'book-card-horizontal';
            card.innerHTML = `
                <div class="horizontal-cover" style="${coverStyle}">
                    ${fallbackTitle}
                </div>
                <div class="horizontal-info">
                    <span class="category-pill" style="margin-bottom:0.5rem; display:inline-block; align-self:flex-start; padding: 4px 10px; font-size:0.7rem;">${kitab.category}</span>
                    <h3 class="horizontal-title">${kitab.title}</h3>
                    <p class="horizontal-author">${kitab.author}</p>
                    <p class="horizontal-desc">${kitab.desc}</p>
                    <div class="horizontal-actions">
                        <a href="#" class="btn-read-more" onclick="alert('Mulai membaca ${kitab.title}'); return false;">Baca Kitab</a>
                        <i class="${heartIcon} action-icon" style="cursor:pointer; color: ${heartColor}" onclick="toggleKitabBookmark('${kitab.id}', this)"></i>
                        <i class="fas fa-share-alt action-icon"></i>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        kitabRenderIndex += itemsToRender.length;
        if (loading) loading.style.display = 'none';
        
    }, 500);
}

function toggleKitabBookmark(id, element) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarked_kitabs')) || [];
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(b => b !== id);
        element.className = 'far fa-heart action-icon';
        element.style.color = '';
    } else {
        bookmarks.push(id);
        element.className = 'fas fa-heart action-icon';
        element.style.color = '#ef4444';
    }
    localStorage.setItem('bookmarked_kitabs', JSON.stringify(bookmarks));
    
    if (currentKitabCategory === 'favorit') {
        filterKitabList();
    }
}

function setupKitabObserver() {
    const sentinel = document.getElementById('kitabScrollSentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && kitabRenderIndex < currentFilteredKitabs.length) {
            renderMoreKitabs();
        }
    }, { rootMargin: '100px' });
    observer.observe(sentinel);
}

window.filterKitab = function(category, event) {
    if (event) {
        event.preventDefault();
        const links = document.querySelectorAll('.kitab-sidebar .sidebar-link');
        links.forEach(link => {
            link.classList.remove('active');
            link.style.color = 'var(--text-dark)';
            link.style.fontWeight = '500';
            const icon = link.querySelector('i');
            if(icon) icon.style.color = 'var(--text-light)';
        });
        
        const clicked = event.currentTarget;
        clicked.classList.add('active');
        clicked.style.color = 'var(--primary-color)';
        clicked.style.fontWeight = '700';
        const clickedIcon = clicked.querySelector('i');
        if(clickedIcon) clickedIcon.style.color = 'var(--primary-color)';
    }
    
    currentKitabCategory = category;
    filterKitabList();
};

window.searchKitab = function(event) {
    filterKitabList();
};
// --- END KITAB SMART SYSTEM ---

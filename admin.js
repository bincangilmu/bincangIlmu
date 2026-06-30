
/* Admin Dashboard Logic */

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
    loadAdminKitabs();
    loadAdminCourses();
    loadAdminBlogs();
    loadAdminFatwas();
    loadAdminAds();
    renderUsers();
});

// Auto-refresh when another tab updates data
window.addEventListener('storage', (e) => {
    if (e.key === 'admin_users') {
        if (typeof renderUsers === 'function') {
            renderUsers();
        }
    }
});

// Tab Switching
function switchTab(tabId, element = null) {
    if (event) event.preventDefault();
    document.querySelectorAll('.admin-nav-link').forEach(link => link.classList.remove('active'));
    
    if (element) {
        element.classList.add('active');
    } else if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }

    document.querySelectorAll('.admin-section').forEach(section => section.style.display = 'none');
    document.getElementById(`tab-${tabId}`).style.display = 'block';
}

// Modal Management
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// Update Dashboard Stats
function updateStats() {
    document.getElementById('statKitabCount').innerText = Object.keys(kitabData).length;
    document.getElementById('statCourseCount').innerText = Object.keys(coursesData).length;
    document.getElementById('statBlogCount').innerText = Object.keys(blogsData).length;
    document.getElementById('statFatwaCount').innerText = Object.keys(fatwasData).length;
    
    // User & Ad stats
    const usersCount = (JSON.parse(localStorage.getItem('admin_users')) || []).length;
    const statUserEl = document.getElementById('statUserCount');
    if (statUserEl) statUserEl.innerText = usersCount;
    
    const adsCount = Object.keys(adsData || {}).length;
    const statAdEl = document.getElementById('statAdCount');
    if (statAdEl) statAdEl.innerText = adsCount;
}

/* ================== KITAB CRUD ================== */
function loadAdminKitabs() {
    const tbody = document.getElementById('kitabTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, kitab] of Object.entries(kitabData)) {
        tbody.innerHTML += `
            <tr>
                <td><div style="width:30px;height:40px;background:${kitab.bgColor};border-radius:4px;"></div></td>
                <td><strong>${kitab.title}</strong><br><small>${key}</small></td>
                <td><span class="category-pill">${kitab.category}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editKitab('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteKitab('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openKitabModal() {
    document.getElementById('kitabForm').reset();
    document.getElementById('kitabKey').readOnly = false;
    document.getElementById('kitabModalTitle').innerText = 'Tambah Kitab Baru';
    openModal('kitabModal');
}

function editKitab(key) {
    const kitab = kitabData[key];
    if (!kitab) return;
    document.getElementById('kitabKey').value = key;
    document.getElementById('kitabKey').readOnly = true;
    document.getElementById('kitabTitle').value = kitab.title;
    document.getElementById('kitabAuthor').value = kitab.author;
    document.getElementById('kitabCategory').value = kitab.category;
    document.getElementById('kitabDesc').value = kitab.desc;
    document.getElementById('kitabImage').value = kitab.image || "";
    document.getElementById('kitabBg').value = kitab.bgColor;
    document.getElementById('kitabModalTitle').innerText = 'Edit Kitab';
    openModal('kitabModal');
}

function saveKitab(event) {
    event.preventDefault();
    const key = document.getElementById('kitabKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    kitabData[key] = {
        title: document.getElementById('kitabTitle').value,
        author: document.getElementById('kitabAuthor').value,
        category: document.getElementById('kitabCategory').value,
        desc: document.getElementById('kitabDesc').value,
        bgColor: document.getElementById('kitabBg').value,
        image: document.getElementById('kitabImage').value
    };
    
    localStorage.setItem('admin_kitabs', JSON.stringify(kitabData));
    closeModal('kitabModal');
    loadAdminKitabs();
    updateStats();
}

function deleteKitab(key) {
    if (confirm(`Hapus kitab "${key}"?`)) {
        delete kitabData[key];
        localStorage.setItem('admin_kitabs', JSON.stringify(kitabData));
        loadAdminKitabs();
        updateStats();
    }
}

/* ================== COURSES CRUD ================== */
function loadAdminCourses() {
    const tbody = document.getElementById('courseTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, course] of Object.entries(coursesData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${course.title}</strong></td>
                <td>${course.instructor}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editCourse('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteCourse('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openCourseModal() {
    document.getElementById('courseForm').reset();
    document.getElementById('courseKey').readOnly = false;
    document.getElementById('courseModalTitle').innerText = 'Tambah Kursus Baru';
    
    // Reset Curriculum Builder with 1 empty module
    const builder = document.getElementById('curriculumBuilder');
    builder.innerHTML = '';
    addModuleUI();

    openModal('courseModal');
}

function editCourse(key) {
    const course = coursesData[key];
    if (!course) return;
    document.getElementById('courseKey').value = key;
    document.getElementById('courseKey').readOnly = true;
    document.getElementById('courseTitle').value = course.title;
    document.getElementById('courseInstructor').value = course.instructor;
    document.getElementById('courseCategory').value = course.category;
    document.getElementById('courseImage').value = course.image || "";
    document.getElementById('courseDesc').value = course.desc;
    document.getElementById('courseModalTitle').innerText = 'Edit Kursus';

    // Render Curriculum
    const builder = document.getElementById('curriculumBuilder');
    builder.innerHTML = '';
    
    if (course.curriculum && course.curriculum.length > 0) {
        course.curriculum.forEach(mod => {
            const modEl = addModuleUI(mod.title);
            if (mod.lessons && mod.lessons.length > 0) {
                mod.lessons.forEach(lesson => {
                    addVideoUI(modEl, lesson.title, lesson.video);
                });
            }
        });
    } else {
        addModuleUI();
    }

    openModal('courseModal');
}

/* --- CURRICULUM BUILDER LOGIC --- */
function addModuleUI(title = '') {
    const builder = document.getElementById('curriculumBuilder');
    const modBox = document.createElement('div');
    modBox.className = 'module-box';
    
    modBox.innerHTML = `
        <button type="button" class="builder-remove-btn" onclick="this.parentElement.remove()" title="Hapus Modul"><i class="fas fa-trash"></i></button>
        <div class="module-header">
            <input type="text" class="mod-title-input" placeholder="Judul Modul (Contoh: Modul 1: Pengantar)" value="${title}" style="width: 85%; font-weight:bold; font-size:1.05rem;" required>
        </div>
        <div class="video-list"></div>
        <button type="button" class="btn btn-sm btn-outline-primary" onclick="addVideoUI(this.parentElement)"><i class="fas fa-plus"></i> Tambah Video</button>
    `;
    
    builder.appendChild(modBox);
    return modBox; // return element for chaining
}

function addVideoUI(modBox, title = '', videoUrl = '') {
    const videoList = modBox.querySelector('.video-list');
    const vidBox = document.createElement('div');
    vidBox.className = 'video-box';
    
    vidBox.innerHTML = `
        <button type="button" class="builder-remove-btn" style="top:5px; right:5px;" onclick="this.parentElement.remove()" title="Hapus Video"><i class="fas fa-times"></i></button>
        <input type="text" class="vid-title-input" placeholder="Judul Video (Contoh: Episode 1)" value="${title}" required>
        <input type="text" class="vid-url-input" placeholder="Link Video (Gunakan URL Embed YouTube)" value="${videoUrl}" required>
    `;
    
    videoList.appendChild(vidBox);
}

function getCurriculumData() {
    const curriculum = [];
    const modBoxes = document.querySelectorAll('#curriculumBuilder .module-box');
    
    modBoxes.forEach(modBox => {
        const modTitle = modBox.querySelector('.mod-title-input').value;
        const lessons = [];
        
        const vidBoxes = modBox.querySelectorAll('.video-box');
        vidBoxes.forEach(vidBox => {
            lessons.push({
                title: vidBox.querySelector('.vid-title-input').value,
                video: vidBox.querySelector('.vid-url-input').value
            });
        });
        
        curriculum.push({
            title: modTitle,
            lessons: lessons
        });
    });
    
    return curriculum;
}
/* -------------------------------- */

function saveCourse(event) {
    event.preventDefault();
    const key = document.getElementById('courseKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    // Parse the DOM to get the curriculum JSON
    const newCurriculum = getCurriculumData();

    coursesData[key] = {
        title: document.getElementById('courseTitle').value,
        instructor: document.getElementById('courseInstructor').value,
        instructorImg: coursesData[key] && coursesData[key].instructorImg ? coursesData[key].instructorImg : "https://randomuser.me/api/portraits/men/11.jpg",
        category: document.getElementById('courseCategory').value,
        desc: document.getElementById('courseDesc').value,
        image: document.getElementById('courseImage').value || "https://images.unsplash.com/photo-1585036156171-384164a8c675?w=800&q=80",
        students: coursesData[key] ? coursesData[key].students : 0,
        rating: coursesData[key] ? coursesData[key].rating : 5.0,
        curriculum: newCurriculum
    };
    
    localStorage.setItem('admin_courses', JSON.stringify(coursesData));
    closeModal('courseModal');
    loadAdminCourses();
    updateStats();
}

function deleteCourse(key) {
    if (confirm(`Hapus kursus "${key}"?`)) {
        delete coursesData[key];
        localStorage.setItem('admin_courses', JSON.stringify(coursesData));
        loadAdminCourses();
        updateStats();
    }
}

/* ================== BLOGS CRUD ================== */
function loadAdminBlogs() {
    const tbody = document.getElementById('blogTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, blog] of Object.entries(blogsData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${blog.title}</strong><br><small>${blog.date}</small></td>
                <td>${blog.author || "Admin"}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editBlog('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBlog('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openBlogModal() {
    document.getElementById('blogForm').reset();
    document.getElementById('blogKey').readOnly = false;
    document.getElementById('blogModalTitle').innerText = 'Tambah Artikel Baru';
    openModal('blogModal');
}

function editBlog(key) {
    const blog = blogsData[key];
    if (!blog) return;
    document.getElementById('blogKey').value = key;
    document.getElementById('blogKey').readOnly = true;
    document.getElementById('blogTitle').value = blog.title;
    document.getElementById('blogAuthor').value = blog.author || "Admin";
    document.getElementById('blogCategory').value = blog.category;
    document.getElementById('blogImage').value = blog.image || "";
    document.getElementById('blogExcerpt').value = blog.excerpt;
    document.getElementById('blogContent').value = blog.content;
    document.getElementById('blogModalTitle').innerText = 'Edit Artikel';
    openModal('blogModal');
}

function saveBlog(event) {
    event.preventDefault();
    const key = document.getElementById('blogKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    blogsData[key] = {
        title: document.getElementById('blogTitle').value,
        author: { name: document.getElementById('blogAuthor').value, img: blogsData[key] && blogsData[key].author && blogsData[key].author.img ? blogsData[key].author.img : "https://randomuser.me/api/portraits/men/1.jpg" },
        category: document.getElementById('blogCategory').value,
        excerpt: document.getElementById('blogExcerpt').value,
        content: document.getElementById('blogContent').value,
        date: blogsData[key] ? blogsData[key].date : new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}),
        image: document.getElementById('blogImage').value || "https://images.unsplash.com/photo-1455390582262-044cdead2708?w=800&q=80"
    };
    
    localStorage.setItem('admin_blogs', JSON.stringify(blogsData));
    closeModal('blogModal');
    loadAdminBlogs();
    updateStats();
}

function deleteBlog(key) {
    if (confirm(`Hapus artikel "${key}"?`)) {
        delete blogsData[key];
        localStorage.setItem('admin_blogs', JSON.stringify(blogsData));
        loadAdminBlogs();
        updateStats();
    }
}

/* ================== FATWAS CRUD ================== */
function loadAdminFatwas() {
    const tbody = document.getElementById('fatwaTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, fatwa] of Object.entries(fatwasData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><strong>${fatwa.title}</strong></td>
                <td>${fatwa.mufti || "Ustadz"}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editFatwa('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteFatwa('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openFatwaModal() {
    document.getElementById('fatwaForm').reset();
    document.getElementById('fatwaKey').readOnly = false;
    document.getElementById('fatwaModalTitle').innerText = 'Tambah Fatwa Baru';
    openModal('fatwaModal');
}

function editFatwa(key) {
    const fatwa = fatwasData[key];
    if (!fatwa) return;
    document.getElementById('fatwaKey').value = key;
    document.getElementById('fatwaKey').readOnly = true;
    document.getElementById('fatwaTitle').value = fatwa.title;
    document.getElementById('fatwaMufti').value = fatwa.mufti || "Ustadz";
    document.getElementById('fatwaCategory').value = fatwa.category;
    document.getElementById('fatwaImage').value = fatwa.image || "";
    document.getElementById('fatwaQuestion').value = fatwa.question || "";
    document.getElementById('fatwaAnswer').value = fatwa.answer || "";
    document.getElementById('fatwaModalTitle').innerText = 'Edit Fatwa';
    openModal('fatwaModal');
}

function saveFatwa(event) {
    event.preventDefault();
    const key = document.getElementById('fatwaKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    fatwasData[key] = {
        title: document.getElementById('fatwaTitle').value,
        mufti: document.getElementById('fatwaMufti').value,
        category: document.getElementById('fatwaCategory').value,
        image: document.getElementById('fatwaImage').value,
        question: document.getElementById('fatwaQuestion').value,
        answer: document.getElementById('fatwaAnswer').value,
        date: new Date().toLocaleDateString('id-ID', {day: 'numeric', month: 'short', year: 'numeric'}),
        status: "Selesai"
    };
    
    localStorage.setItem('admin_fatwas', JSON.stringify(fatwasData));
    closeModal('fatwaModal');
    loadAdminFatwas();
    updateStats();
}

function deleteFatwa(key) {
    if (confirm(`Hapus fatwa "${key}"?`)) {
        delete fatwasData[key];
        localStorage.setItem('admin_fatwas', JSON.stringify(fatwasData));
        loadAdminFatwas();
        updateStats();
    }
}

/* ================== RESET ================== */
function resetAllData() {
    if (confirm("PERINGATAN: Ini akan menghapus semua data yang Anda tambahkan dan mengembalikan website ke kondisi awal. Lanjutkan?")) {
        localStorage.removeItem('admin_kitabs');
        localStorage.removeItem('admin_courses');
        localStorage.removeItem('admin_blogs');
        localStorage.removeItem('admin_fatwas');
        localStorage.removeItem('admin_ads');
        localStorage.removeItem('admin_users');
        localStorage.removeItem('admin_top_ad');
        alert("Data berhasil di-reset! Memuat ulang halaman...");
        location.reload();
    }
}


/* ================== ADS CRUD ================== */
const adminDefaultAds = {
    "ad_1": {
        title: "Siap Memulai Perjalanan Menuntut Ilmu?",
        subtitle: "",
        desc: "Gabung bersama ribuan penuntut ilmu lainnya dan istiqomah belajar agama hari ini.",
        badgeText: "",
        badgeIcon: "",
        buttonText: "Daftar Gratis Sekarang",
        buttonLink: "#",
        icon: "fas fa-mosque",
        type: "cta"
    },
    "ad_2": {
        title: "Penerimaan Santri Baru",
        subtitle: "Program Online Intensif",
        desc: "Pelajari Bahasa Arab, Fiqih, dan Aqidah dari dasar bersama asatidzah berkompeten.<br><strong>Pendaftaran Gelombang 1 Dibuka!</strong>",
        badgeText: "Informasi Penting",
        badgeIcon: "fas fa-bullhorn",
        buttonText: "Daftar Sekarang",
        buttonLink: "courses.html",
        icon: "fas fa-graduation-cap",
        type: "promo"
    }
};

adsData = JSON.parse(localStorage.getItem('admin_ads'));
if (!adsData || Object.keys(adsData).length === 0) {
    adsData = adminDefaultAds;
    localStorage.setItem('admin_ads', JSON.stringify(adsData));
}

function loadAdminAds() {
    const tbody = document.getElementById('adTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    for (const [key, ad] of Object.entries(adsData)) {
        tbody.innerHTML += `
            <tr>
                <td><strong>${key}</strong></td>
                <td><span class="category-pill">${ad.type.toUpperCase()}</span></td>
                <td>${ad.title}</td>
                <td>
                    <button class="btn btn-sm btn-outline-primary" onclick="editAd('${key}')"><i class="fas fa-edit"></i></button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAd('${key}')"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    }
}

function openAdModal() {
    document.getElementById('adForm').reset();
    document.getElementById('adKey').readOnly = false;
    document.getElementById('adModalTitle').innerText = 'Tambah Iklan Baru';
    openModal('adModal');
}

function editAd(key) {
    const ad = adsData[key];
    if (!ad) return;
    document.getElementById('adKey').value = key;
    document.getElementById('adKey').readOnly = true;
    document.getElementById('adType').value = ad.type;
    document.getElementById('adBadgeText').value = ad.badgeText || "";
    document.getElementById('adBadgeIcon').value = ad.badgeIcon || "";
    document.getElementById('adTitle').value = ad.title;
    document.getElementById('adSubtitle').value = ad.subtitle || "";
    document.getElementById('adDesc').value = ad.desc;
    document.getElementById('adButtonText').value = ad.buttonText;
    document.getElementById('adButtonLink').value = ad.buttonLink;
    document.getElementById('adIcon').value = ad.icon;
    document.getElementById('adImageUrl').value = ad.imageUrl || "";
    document.getElementById('adSize').value = ad.size || "medium";
    
    document.getElementById('adModalTitle').innerText = 'Edit Iklan';
    openModal('adModal');
}

function saveAd(event) {
    event.preventDefault();
    const key = document.getElementById('adKey').value.trim().toLowerCase().replace(/[^a-z0-9_]/g, '_');
    if (!key) return alert("ID Tidak Valid!");
    
    adsData[key] = {
        type: document.getElementById('adType').value,
        badgeText: document.getElementById('adBadgeText').value,
        badgeIcon: document.getElementById('adBadgeIcon').value,
        title: document.getElementById('adTitle').value,
        subtitle: document.getElementById('adSubtitle').value,
        desc: document.getElementById('adDesc').value,
        buttonText: document.getElementById('adButtonText').value,
        buttonLink: document.getElementById('adButtonLink').value,
        icon: document.getElementById('adIcon').value,
        imageUrl: document.getElementById('adImageUrl').value,
        size: document.getElementById('adSize').value
    };
    
    localStorage.setItem('admin_ads', JSON.stringify(adsData));
    closeModal('adModal');
    loadAdminAds();
    updateStats();
}

function deleteAd(key) {
    if(confirm('Yakin ingin menghapus iklan ini?')) {
        delete adsData[key];
        localStorage.setItem('admin_ads', JSON.stringify(adsData));
        loadAdminAds();
        updateStats();
    }
}


// --- TOP AD LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    loadTopAdSettings();
});

function loadTopAdSettings() {
    const topAdData = JSON.parse(localStorage.getItem('admin_top_ad')) || { active: false, text: '', btnText: '', link: '' };
    const statusCheckbox = document.getElementById('topAdStatus');
    if (statusCheckbox) {
        statusCheckbox.checked = topAdData.active;
        document.getElementById('topAdStatusText').innerText = topAdData.active ? 'Aktif' : 'Nonaktif';
        statusCheckbox.addEventListener('change', function() {
            document.getElementById('topAdStatusText').innerText = this.checked ? 'Aktif' : 'Nonaktif';
        });
        
        document.getElementById('topAdText').value = topAdData.text || '';
        document.getElementById('topAdBtnText').value = topAdData.btnText || '';
        document.getElementById('topAdLink').value = topAdData.link || '';
    }
}

function saveTopAd(event) {
    event.preventDefault();
    const topAdData = {
        active: document.getElementById('topAdStatus').checked,
        text: document.getElementById('topAdText').value,
        btnText: document.getElementById('topAdBtnText').value,
        link: document.getElementById('topAdLink').value
    };
    localStorage.setItem('admin_top_ad', JSON.stringify(topAdData));
    if(typeof showToast === 'function') {
        showToast("Disimpan!", "Pengaturan Iklan Banner Atas berhasil disimpan.", "success");
    } else {
        alert("Pengaturan Iklan Banner Atas berhasil disimpan.");
    }
}

// --- USER LOGIC ---
function renderUsers() {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
    tbody.innerHTML = '';
    
    usersData.forEach((user, index) => {
        const tr = document.createElement('tr');
        
        let roleBadgeClass = 'badge-success';
        if(user.role === 'Admin') roleBadgeClass = 'badge-danger';
        if(user.role === 'Pengajar') roleBadgeClass = 'badge-primary';
        
        // Use a generic placeholder password if none exists (for old data)
        const displayPassword = user.password || '******';
        
        // Format registration date
        let registeredDate = '-';
        if (user.registeredAt) {
            const dateObj = new Date(user.registeredAt);
            registeredDate = dateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
        }
        
        tr.innerHTML = `
            <td>
                <div style="display:flex; align-items:center; gap:10px;">
                    <div style="width:35px; height:35px; border-radius:50%; background:var(--primary-light); color:var(--primary-color); display:flex; align-items:center; justify-content:center; font-weight:bold;">
                        ${user.name.charAt(0).toUpperCase()}
                    </div>
                    <strong>${user.name}</strong>
                </div>
            </td>
            <td>${user.email}</td>
            <td style="font-family: monospace; letter-spacing: 1px;">${displayPassword}</td>
            <td><span class="badge ${roleBadgeClass}">${user.role}</span></td>
            <td><span style="color: var(--text-light); font-size: 0.9em;">${registeredDate}</span></td>
            <td><span style="color: green;"><i class="fas fa-check-circle"></i> Aktif</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editUser('${user.email}')" title="Edit"><i class="fas fa-edit"></i></button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.email}')" title="Hapus"><i class="fas fa-trash"></i></button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function editUser(email) {
    usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
    const user = usersData.find(u => u.email === email);
    if (!user) return;
    
    document.getElementById('userModalTitle').innerText = 'Edit Pengguna';
    document.getElementById('userOriginalEmail').value = user.email;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userPassword').value = ''; // Don't show password
    document.getElementById('userRole').value = user.role || 'Siswa';
    
    openModal('userModal');
}

function saveUser(event) {
    event.preventDefault();
    usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
    
    const originalEmail = document.getElementById('userOriginalEmail').value;
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    const role = document.getElementById('userRole').value;
    
    if (originalEmail) {
        // Edit mode
        const index = usersData.findIndex(u => u.email === originalEmail);
        if (index !== -1) {
            usersData[index].name = name;
            usersData[index].email = email;
            usersData[index].role = role;
            if (password) usersData[index].password = password; // Only update password if provided
        }
    } else {
        // Add mode
        if (!password) {
            alert("Password wajib diisi untuk pengguna baru!");
            return;
        }
        // Check if email exists
        if (usersData.some(u => u.email === email)) {
            alert("Email sudah terdaftar!");
            return;
        }
        usersData.push({ name, email, password, role, registeredAt: new Date().toISOString() });
    }
    
    localStorage.setItem('admin_users', JSON.stringify(usersData));
    closeModal('userModal');
    renderUsers();
    updateStats();
    
    if(typeof showToast === 'function') {
        showToast("Sukses", "Data pengguna berhasil disimpan.", "success");
    }
}

function deleteUser(email) {
    if (email === 'admin@bincangilmu.com') {
        alert("Tidak dapat menghapus Administrator utama!");
        return;
    }
    if (confirm(`Apakah Anda yakin ingin menghapus pengguna dengan email: ${email}?`)) {
        usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
        usersData = usersData.filter(u => u.email !== email);
        localStorage.setItem('admin_users', JSON.stringify(usersData));
        renderUsers();
        updateStats();
    }
}

// Add renderUsers to DOMContentLoaded

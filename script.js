/* Main JavaScript for Bincang Ilmu */

// --- DEFAULT USERS & INITIALIZATION ---
const defaultUsers = [
    { name: 'Administrator', email: 'admin@bincangilmu.com', password: 'admin', role: 'Admin' },
    { name: 'Ustadz Ahmad', email: 'ahmad@mail.com', password: 'password', role: 'Pengajar' },
    { name: 'Budi Santoso', email: 'budi@mail.com', password: 'password', role: 'Siswa' }
];

// Initialize users database with merge logic
(function initUsersDB() {
    let usersData = JSON.parse(localStorage.getItem('admin_users'));
    if (!usersData || usersData.length === 0) {
        usersData = JSON.parse(JSON.stringify(defaultUsers));
        localStorage.setItem('admin_users', JSON.stringify(usersData));
    } else {
        // Ensure admin account always exists
        const hasAdmin = usersData.some(u => u.email === 'admin@bincangilmu.com');
        if (!hasAdmin) {
            usersData.unshift({ name: 'Administrator', email: 'admin@bincangilmu.com', password: 'admin', role: 'Admin' });
            localStorage.setItem('admin_users', JSON.stringify(usersData));
        }
    }
})();

// Course Data Database
let coursesData = {
    'c1': {
        title: "Bahasa Arab Dasar: Kitab Al-Arabiyyah Baina Yadaik",
        category: "Bahasa Arab",
        instructor: "Ustadz Abu Hanifah, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/32.jpg",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (120 Review)",
        description: "Pelajari Bahasa Arab dari nol dengan metode yang mudah dipahami.",
        learnings: ["Kaidah Dasar Nahwu & Shorof", "Percakapan Sehari-hari"],
        curriculum: [
            { title: "Modul 1: Pengenalan", duration: "45m", lessons: [{title:"Keutamaan", video:"https://www.youtube.com/embed/LXb3EKWsInQ?rel=0", free:true}] }
        ]
    },
    'c2': {
        title: "Fiqih Ibadah: Panduan Sholat Lengkap",
        category: "Fiqih",
        instructor: "Ustadz Ahmad Zainuddin, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/44.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (85 Review)",
        description: "Panduan lengkap tata cara sholat sesuai tuntunan Nabi.",
        learnings: ["Thaharah", "Sifat Sholat Nabi"],
        curriculum: [
            { title: "Modul 1: Thaharah", duration: "1j 15m", lessons: [{title:"Wudhu", video:"https://www.youtube.com/embed/jNQXAC9IVRw?rel=0", free:true}] }
        ]
    },
    'c3': {
        title: "Syarh Riyadhus Shalihin: Adab Penuntut Ilmu",
        category: "Adab & Akhlak",
        instructor: "Ustadz Dr. Firanda Andirja, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/85.jpg",
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (200 Review)",
        description: "Kajian mendalam kitab Riyadhus Shalihin karya Imam An-Nawawi.",
        learnings: ["Bab Ikhlas", "Bab Taubat"],
        curriculum: [
            { title: "Modul 1: Mukadimah", duration: "1j", lessons: [{title:"Niat", video:"https://www.youtube.com/embed/M7lc1UVf-VE?rel=0", free:true}] }
        ]
    },
    'c4': {
        title: "Tafsir Juz 'Amma: Memahami Makna Surat Pendek",
        category: "Tafsir Al-Qur'an",
        instructor: "Ustadz Abdullah Roy, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/11.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.8 (150 Review)",
        description: "Tafsir surat-surat pendek dalam Juz 30 berdasarkan Tafsir Ibnu Katsir.",
        learnings: ["Tafsir Al-Ikhlas", "Tafsir Al-Falaq"],
        curriculum: [
            { title: "Modul 1", duration: "2j", lessons: [{title:"Al-Fatihah", video:"", free:true}] }
        ]
    },
    'c5': {
        title: "Aqidah Ahlus Sunnah Wal Jama'ah",
        category: "Aqidah Islamiyah",
        instructor: "Ustadz Yazid bin Abdul Qadir Jawas",
        instructorImg: "https://randomuser.me/api/portraits/men/22.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (300 Review)",
        description: "Mempelajari pondasi aqidah yang benar agar selamat dari penyimpangan.",
        learnings: ["Rukun Iman", "Tauhid Rububiyah", "Tauhid Uluhiyah"],
        curriculum: [
            { title: "Modul 1", duration: "1j", lessons: [{title:"Makna Syahadat", video:"", free:true}] }
        ]
    },
    'c6': {
        title: "Panduan Pengurusan Jenazah",
        category: "Fiqih",
        instructor: "Ustadz Khalid Basalamah, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/55.jpg",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (95 Review)",
        description: "Tata cara memandikan, mengkafani, menyalatkan, hingga menguburkan jenazah.",
        learnings: ["Memandikan", "Mengkafani"],
        curriculum: [
            { title: "Modul 1", duration: "2j", lessons: [{title:"Saat Sakaratul Maut", video:"", free:true}] }
        ]
    },
    'c7': {
        title: "Tazkiyatun Nufus: Membersihkan Hati dari Penyakit",
        category: "Tazkiyatun Nufus",
        instructor: "Ustadz Syafiq Riza Basalamah, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/77.jpg",
        image: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (180 Review)",
        description: "Mengenali dan mengobati penyakit hati seperti hasad, riya, dan ujub.",
        learnings: ["Bahaya Riya", "Obat Hasad"],
        curriculum: [
            { title: "Modul 1", duration: "1.5j", lessons: [{title:"Pentingnya Hati yang Selamat", video:"", free:true}] }
        ]
    },
    'c8': {
        title: "Nahwu Wadih: Tata Bahasa Arab Lanjutan",
        category: "Bahasa Arab",
        instructor: "Ustadz Abu Hanifah, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/32.jpg",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.8 (60 Review)",
        description: "Lanjutan belajar bahasa Arab fokus pada tata bahasa (Nahwu).",
        learnings: ["I'rab", "Mubtada Khobar"],
        curriculum: [
            { title: "Modul 1", duration: "3j", lessons: [{title:"Pembagian Kata", video:"", free:true}] }
        ]
    },
    'c9': {
        title: "Fiqih Muamalah: Jual Beli Sesuai Syariat",
        category: "Fiqih",
        instructor: "Ustadz Dr. Erwandi Tarmizi, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/15.jpg",
        image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (400 Review)",
        description: "Memahami hukum jual beli kontemporer, riba, dan gharar.",
        learnings: ["Syarat Jual Beli", "Jenis Riba"],
        curriculum: [
            { title: "Modul 1", duration: "2j", lessons: [{title:"Rukun Jual Beli", video:"", free:true}] }
        ]
    },
    'c10': {
        title: "Kisah Sahabat Nabi: Manusia Terbaik Setelah Para Nabi",
        category: "Sirah Nabawiyah",
        instructor: "Ustadz Nuzul Dzikri, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/25.jpg",
        image: "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (250 Review)",
        description: "Menyelami biografi Khulafaur Rasyidin dan sahabat lainnya.",
        learnings: ["Kisah Abu Bakar", "Kisah Umar"],
        curriculum: [
            { title: "Modul 1", duration: "4j", lessons: [{title:"Abu Bakar As-Shiddiq", video:"", free:true}] }
        ]
    },
    'c11': {
        title: "Fiqih Zakat dan Sedekah",
        category: "Fiqih",
        instructor: "Ustadz Ahmad Zainuddin, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/44.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.8 (75 Review)",
        description: "Panduan menunaikan zakat mal, fitrah, dan sedekah.",
        learnings: ["Nishab Zakat", "Mustahik Zakat"],
        curriculum: [
            { title: "Modul 1", duration: "1j", lessons: [{title:"Syarat Wajib Zakat", video:"", free:true}] }
        ]
    },
    'c12': {
        title: "Ilmu Hadits Dasar (Musthalah Hadits)",
        category: "Hadits & Atsar",
        instructor: "Ustadz Abdul Hakim bin Amir Abdat",
        instructorImg: "https://randomuser.me/api/portraits/men/50.jpg",
        image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (110 Review)",
        description: "Mempelajari dasar-dasar ilmu hadits untuk mengetahui derajat sebuah hadits.",
        learnings: ["Hadits Shahih", "Hadits Dhaif"],
        curriculum: [
            { title: "Modul 1", duration: "3j", lessons: [{title:"Pengenalan Sanad & Matan", video:"", free:true}] }
        ]
    },
    'c13': {
        title: "Panduan Mendidik Anak Cara Islami",
        category: "Adab & Akhlak",
        instructor: "Ustadz Zainal Abidin, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/33.jpg",
        image: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (220 Review)",
        description: "Membekali orang tua dengan ilmu mendidik anak sesuai sunnah.",
        learnings: ["Pendidikan Tauhid pada Anak", "Menanamkan Adab"],
        curriculum: [
            { title: "Modul 1", duration: "2.5j", lessons: [{title:"Tanggung Jawab Orang Tua", video:"", free:true}] }
        ]
    },
    'c14': {
        title: "Tafsir Surat Al-Baqarah",
        category: "Tafsir Al-Qur'an",
        instructor: "Ustadz Abdullah Roy, M.A.",
        instructorImg: "https://randomuser.me/api/portraits/men/11.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.9 (140 Review)",
        description: "Kajian tafsir mendalam untuk surat terpanjang dalam Al-Qur'an.",
        learnings: ["Kisah Bani Israil", "Hukum-hukum dalam Al-Baqarah"],
        curriculum: [
            { title: "Modul 1", duration: "5j", lessons: [{title:"Keutamaan Al-Baqarah", video:"", free:true}] }
        ]
    },
    'c15': {
        title: "Shorof Dasar: Mengenal Perubahan Kata",
        category: "Bahasa Arab",
        instructor: "Ustadz Abu Hanifah, Lc.",
        instructorImg: "https://randomuser.me/api/portraits/men/32.jpg",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "4.7 (50 Review)",
        description: "Mempelajari pola perubahan kata dalam bahasa Arab (Wazan).",
        learnings: ["Wazan Fi'il", "Tashrif Lughowi"],
        curriculum: [
            { title: "Modul 1", duration: "2j", lessons: [{title:"Pengenalan Tashrif", video:"", free:true}] }
        ]
    },
    'c16': {
        title: "Kitab Tauhid: Pemurnian Ibadah Hanya Kepada Allah",
        category: "Aqidah Islamiyah",
        instructor: "Ustadz Yazid bin Abdul Qadir Jawas",
        instructorImg: "https://randomuser.me/api/portraits/men/22.jpg",
        image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        rating: "5.0 (400 Review)",
        description: "Kajian Kitab Tauhid karya Syaikh Muhammad bin Abdul Wahhab.",
        learnings: ["Hakikat Tauhid", "Jenis-jenis Syirik"],
        curriculum: [
            { title: "Modul 1", duration: "4j", lessons: [{title:"Keutamaan Tauhid", video:"", free:true}] }
        ]
    }
};

// Blogs Data Database
let blogsData = {
    'b1': {
        title: "Pentingnya Menuntut Ilmu Syar'i di Zaman Fitnah",
        date: "18 Des 2025",
        category: "Aqidah",
        tags: ["Ilmu", "Fitnah", "Kewajiban"],
        readTime: "5 min baca",
        author: { name: "Ustadz Abu Hanifah", img: "https://randomuser.me/api/portraits/men/32.jpg" },
        image: "https://images.unsplash.com/photo-1576085898323-218337e3e43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Menuntut ilmu bukan sekadar hobi, melainkan kewajiban setiap muslim untuk membentengi diri dari syubhat dan syahwat.",
        content: "<p>Konten artikel...</p>"
    },
    'b2': {
        title: "Adab-Adab Penuntut Ilmu Terhadap Guru",
        date: "15 Des 2025",
        category: "Adab & Akhlak",
        tags: ["Adab", "Guru", "Akhlak"],
        readTime: "4 min baca",
        author: { name: "Ustadz Abdullah Roy", img: "https://randomuser.me/api/portraits/men/11.jpg" },
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Keberkahan ilmu seringkali hilang karena kurangnya adab seorang murid terhadap gurunya dalam majelis ilmu.",
        content: "<p>Konten artikel...</p>"
    },
    'b3': {
        title: "Obat Hati: Mengobati Kerasnya Hati dengan Al-Qur'an",
        date: "10 Des 2025",
        category: "Tazkiyatun Nufus",
        tags: ["Hati", "Al-Quran", "Penyakit Hati"],
        readTime: "6 min baca",
        author: { name: "Ustadz Firanda Andirja", img: "https://randomuser.me/api/portraits/men/85.jpg" },
        image: "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Hati yang sakit perlu diobati. Salah satu obat yang paling mujarab adalah membaca Al-Qur'an dengan tadabbur.",
        content: "<p>Konten artikel...</p>"
    },
    'b4': {
        title: "Hukum Shalat Berjamaah di Masjid bagi Laki-laki",
        date: "05 Des 2025",
        category: "Fiqih",
        tags: ["Shalat", "Masjid", "Wajib"],
        readTime: "7 min baca",
        author: { name: "Ustadz Ahmad Zainuddin", img: "https://randomuser.me/api/portraits/men/44.jpg" },
        image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Apakah shalat berjamaah di masjid bagi laki-laki itu fardhu ain atau sunnah muakkadah? Berikut penjelasannya.",
        content: "<p>Konten artikel...</p>"
    },
    'b5': {
        title: "Mengenal Sejarah Penulisan Al-Qur'an (Sirah)",
        date: "01 Des 2025",
        category: "Sirah Nabawiyah",
        tags: ["Sejarah", "Mushaf", "Al-Quran"],
        readTime: "8 min baca",
        author: { name: "Ustadz Nuzul Dzikri", img: "https://randomuser.me/api/portraits/men/25.jpg" },
        image: "https://images.unsplash.com/photo-1583321500900-82807e458f3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Bagaimana proses Al-Qur'an dibukukan dari masa Nabi Muhammad hingga menjadi Mushaf Utsmani yang kita baca sekarang.",
        content: "<p>Konten artikel...</p>"
    },
    'b6': {
        title: "Tafsir Surat Al-Fatihah: Ummul Kitab",
        date: "28 Nov 2025",
        category: "Tafsir Al-Qur'an",
        tags: ["Tafsir", "Al-Fatihah", "Makna"],
        readTime: "5 min baca",
        author: { name: "Ustadz Abdullah Roy", img: "https://randomuser.me/api/portraits/men/11.jpg" },
        image: "https://images.unsplash.com/photo-1596443686812-2f45229eebc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Menggali kedalaman makna dari surat yang wajib dibaca setiap muslim minimal 17 kali dalam sehari.",
        content: "<p>Konten artikel...</p>"
    },
    'b7': {
        title: "Bahaya Lisan dan Cara Menjaganya",
        date: "20 Nov 2025",
        category: "Tazkiyatun Nufus",
        tags: ["Lisan", "Ghibah", "Dosa"],
        readTime: "6 min baca",
        author: { name: "Ustadz Syafiq Riza", img: "https://randomuser.me/api/portraits/men/77.jpg" },
        image: "https://images.unsplash.com/photo-1597586124394-fbd6ef244026?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Banyak orang terjerumus ke dalam neraka karena lisannya. Kenali bahaya ghibah, namimah, dan dusta.",
        content: "<p>Konten artikel...</p>"
    },
    'b8': {
        title: "Fiqih Zakat Fitrah: Syarat dan Ketentuannya",
        date: "15 Nov 2025",
        category: "Fiqih",
        tags: ["Zakat", "Ramadhan", "Fitrah"],
        readTime: "4 min baca",
        author: { name: "Ustadz Khalid Basalamah", img: "https://randomuser.me/api/portraits/men/55.jpg" },
        image: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Siapa saja yang wajib membayar zakat fitrah, kapan waktu pembayarannya, dan apa saja yang boleh dizakatkan?",
        content: "<p>Konten artikel...</p>"
    }
};

// Sync with Local Storage for Admin modifications
if (localStorage.getItem('admin_courses')) {
    coursesData = JSON.parse(localStorage.getItem('admin_courses'));
    for (let k in coursesData) {
        if (!coursesData[k].instructorImg) coursesData[k].instructorImg = "https://randomuser.me/api/portraits/men/11.jpg";
    }
}

// Kitab Data Database
let kitabData = {
    "tauhid": {
        "title": "Kitab Tauhid",
        "author": "Syaikh Muhammad At-Tamimi",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Pemurnian ibadah kepada Allah semata dan peringatan dari segala bentuk kesyirikan."
    },
    "umdatul": {
        "title": "Umdatul Ahkam",
        "author": "Al-Hafizh Abdul Ghani",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Kumpulan hadits-hadits hukum pilihan yang disepakati oleh Bukhari dan Muslim."
    },
    "arabiyyah": {
        "title": "Al-Arabiyyah Baina Yadaik",
        "author": "Abdurrahman bin Ibrahim",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Panduan lengkap belajar bahasa Arab untuk non-native speaker dengan metode sistematis."
    },
    "tafsir-katsir": {
        "title": "Tafsir Ibnu Katsir",
        "author": "Imam Ibnu Katsir",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Tafsir Al-Qur'an bil Ma'tsur yang paling shahih dan menjadi rujukan utama umat Islam."
    },
    "bulughul": {
        "title": "Bulughul Maram",
        "author": "Ibnu Hajar Al-Asqalani",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Kitab hadits hukum yang ringkas namun padat, mencakup dalil-dalil pokok."
    },
    "riyadhu": {
        "title": "Riyadhu As-Salihin",
        "author": "Imam An-Nawawi",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Taman orang-orang shalih, berisi hadits-hadits tentang adab, akhlak, dan penyucian jiwa."
    },
    "kitab_dummy_1": {
        "title": "Kitab Referensi Fiqih Ibadah Jilid 1",
        "author": "Syaikh Fulan Al-Fulan 1",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Penjelasan komprehensif mengenai Fiqih Ibadah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_2": {
        "title": "Kitab Referensi Bahasa Arab Jilid 2",
        "author": "Syaikh Fulan Al-Fulan 2",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Penjelasan komprehensif mengenai Bahasa Arab berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_3": {
        "title": "Kitab Referensi Tafsir Al-Qur'an Jilid 3",
        "author": "Syaikh Fulan Al-Fulan 3",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Penjelasan komprehensif mengenai Tafsir Al-Qur'an berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_4": {
        "title": "Kitab Referensi Hadits & Atsar Jilid 4",
        "author": "Syaikh Fulan Al-Fulan 4",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Penjelasan komprehensif mengenai Hadits & Atsar berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_5": {
        "title": "Kitab Referensi Tazkiyatun Nufus Jilid 5",
        "author": "Syaikh Fulan Al-Fulan 5",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Penjelasan komprehensif mengenai Tazkiyatun Nufus berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_6": {
        "title": "Kitab Referensi Aqidah Islamiyah Jilid 6",
        "author": "Syaikh Fulan Al-Fulan 6",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Penjelasan komprehensif mengenai Aqidah Islamiyah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_7": {
        "title": "Kitab Referensi Fiqih Ibadah Jilid 7",
        "author": "Syaikh Fulan Al-Fulan 7",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Penjelasan komprehensif mengenai Fiqih Ibadah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_8": {
        "title": "Kitab Referensi Bahasa Arab Jilid 8",
        "author": "Syaikh Fulan Al-Fulan 8",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Penjelasan komprehensif mengenai Bahasa Arab berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_9": {
        "title": "Kitab Referensi Tafsir Al-Qur'an Jilid 9",
        "author": "Syaikh Fulan Al-Fulan 9",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Penjelasan komprehensif mengenai Tafsir Al-Qur'an berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_10": {
        "title": "Kitab Referensi Hadits & Atsar Jilid 10",
        "author": "Syaikh Fulan Al-Fulan 10",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Penjelasan komprehensif mengenai Hadits & Atsar berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_11": {
        "title": "Kitab Referensi Tazkiyatun Nufus Jilid 11",
        "author": "Syaikh Fulan Al-Fulan 11",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Penjelasan komprehensif mengenai Tazkiyatun Nufus berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_12": {
        "title": "Kitab Referensi Aqidah Islamiyah Jilid 12",
        "author": "Syaikh Fulan Al-Fulan 12",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Penjelasan komprehensif mengenai Aqidah Islamiyah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_13": {
        "title": "Kitab Referensi Fiqih Ibadah Jilid 13",
        "author": "Syaikh Fulan Al-Fulan 13",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Penjelasan komprehensif mengenai Fiqih Ibadah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_14": {
        "title": "Kitab Referensi Bahasa Arab Jilid 14",
        "author": "Syaikh Fulan Al-Fulan 14",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Penjelasan komprehensif mengenai Bahasa Arab berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_15": {
        "title": "Kitab Referensi Tafsir Al-Qur'an Jilid 15",
        "author": "Syaikh Fulan Al-Fulan 15",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Penjelasan komprehensif mengenai Tafsir Al-Qur'an berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_16": {
        "title": "Kitab Referensi Hadits & Atsar Jilid 16",
        "author": "Syaikh Fulan Al-Fulan 16",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Penjelasan komprehensif mengenai Hadits & Atsar berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_17": {
        "title": "Kitab Referensi Tazkiyatun Nufus Jilid 17",
        "author": "Syaikh Fulan Al-Fulan 17",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Penjelasan komprehensif mengenai Tazkiyatun Nufus berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_18": {
        "title": "Kitab Referensi Aqidah Islamiyah Jilid 18",
        "author": "Syaikh Fulan Al-Fulan 18",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Penjelasan komprehensif mengenai Aqidah Islamiyah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_19": {
        "title": "Kitab Referensi Fiqih Ibadah Jilid 19",
        "author": "Syaikh Fulan Al-Fulan 19",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Penjelasan komprehensif mengenai Fiqih Ibadah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_20": {
        "title": "Kitab Referensi Bahasa Arab Jilid 20",
        "author": "Syaikh Fulan Al-Fulan 20",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Penjelasan komprehensif mengenai Bahasa Arab berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_21": {
        "title": "Kitab Referensi Tafsir Al-Qur'an Jilid 21",
        "author": "Syaikh Fulan Al-Fulan 21",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Penjelasan komprehensif mengenai Tafsir Al-Qur'an berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_22": {
        "title": "Kitab Referensi Hadits & Atsar Jilid 22",
        "author": "Syaikh Fulan Al-Fulan 22",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Penjelasan komprehensif mengenai Hadits & Atsar berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_23": {
        "title": "Kitab Referensi Tazkiyatun Nufus Jilid 23",
        "author": "Syaikh Fulan Al-Fulan 23",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Penjelasan komprehensif mengenai Tazkiyatun Nufus berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_24": {
        "title": "Kitab Referensi Aqidah Islamiyah Jilid 24",
        "author": "Syaikh Fulan Al-Fulan 24",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Penjelasan komprehensif mengenai Aqidah Islamiyah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_25": {
        "title": "Kitab Referensi Fiqih Ibadah Jilid 25",
        "author": "Syaikh Fulan Al-Fulan 25",
        "category": "Fiqih Ibadah",
        "bgColor": "#e0e7ff",
        "desc": "Penjelasan komprehensif mengenai Fiqih Ibadah berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_26": {
        "title": "Kitab Referensi Bahasa Arab Jilid 26",
        "author": "Syaikh Fulan Al-Fulan 26",
        "category": "Bahasa Arab",
        "bgColor": "#dcfce7",
        "desc": "Penjelasan komprehensif mengenai Bahasa Arab berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_27": {
        "title": "Kitab Referensi Tafsir Al-Qur'an Jilid 27",
        "author": "Syaikh Fulan Al-Fulan 27",
        "category": "Tafsir Al-Qur'an",
        "bgColor": "#e0f2fe",
        "desc": "Penjelasan komprehensif mengenai Tafsir Al-Qur'an berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_28": {
        "title": "Kitab Referensi Hadits & Atsar Jilid 28",
        "author": "Syaikh Fulan Al-Fulan 28",
        "category": "Hadits & Atsar",
        "bgColor": "#ffedd5",
        "desc": "Penjelasan komprehensif mengenai Hadits & Atsar berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_29": {
        "title": "Kitab Referensi Tazkiyatun Nufus Jilid 29",
        "author": "Syaikh Fulan Al-Fulan 29",
        "category": "Tazkiyatun Nufus",
        "bgColor": "#f3e8ff",
        "desc": "Penjelasan komprehensif mengenai Tazkiyatun Nufus berdasarkan pemahaman salafus shalih."
    },
    "kitab_dummy_30": {
        "title": "Kitab Referensi Aqidah Islamiyah Jilid 30",
        "author": "Syaikh Fulan Al-Fulan 30",
        "category": "Aqidah Islamiyah",
        "bgColor": "#fce7f3",
        "desc": "Penjelasan komprehensif mengenai Aqidah Islamiyah berdasarkan pemahaman salafus shalih."
    }
};

if (localStorage.getItem('admin_kitabs')) {
    kitabData = JSON.parse(localStorage.getItem('admin_kitabs'));
}

// Fatwas Data Database
let fatwasData = {
    'sholat-jamak': {
        title: "Hukum Menjamak Sholat Tanpa Udzur Syar'i",
        date: "20 Des 2025",
        category: "Ibadah",
        image: "https://images.unsplash.com/photo-1564121211835-e88c852648ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Apakah diperbolehkan menjamak sholat fardhu tanpa adanya alasan yang dibenarkan syariat seperti safar atau hujan?",
        content: `
            <p><strong>Pertanyaan:</strong><br>Bolehkah seseorang menjamak sholat Zhuhur dengan Ashar atau Maghrib dengan Isya tanpa sebab safar, sakit, atau hujan, hanya karena sibuk bekerja?</p>
            <p><strong>Jawaban:</strong><br>Alhamdulillah. Para ulama sepakat bahwa sholat harus dikerjakan pada waktunya masing-masing. Allah Ta'ala berfirman: "Sesungguhnya sholat itu adalah fardhu yang ditentukan waktunya atas orang-orang yang beriman." (QS. An-Nisa: 103).</p>
            <h3>Hukum Asal Sholat</h3>
            <p>Hukum asalnya tidak boleh menjamak sholat kecuali ada udzur yang syar'i. Jika seseorang menjamak sholat tanpa udzur, maka ia berdosa dan sholatnya yang kedua tidak sah menurut sebagian ulama. Ibnu Abbas radhiyallahu 'anhu meriwayatkan bahwa Rasulullah menjamak sholat di Madinah tanpa takut dan tanpa hujan, namun ini dimaknai ulama untuk "mengangkat kesulitan" (haraj) sesekali, bukan dijadikan kebiasaan.</p>
            <p><strong>Kesimpulan:</strong><br>Tidak diperbolehkan menjamak sholat hanya karena sibuk bekerja. Hendaknya seorang muslim mengatur waktunya agar bisa sholat tepat waktu.</p>
        `
    },
    'riba-bank': {
        title: "Bunga Bank Konvensional: Apakah Termasuk Riba?",
        date: "19 Des 2025",
        category: "Muamalah",
        image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Penjelasan mendalam mengenai status bunga bank dalam pandangan syariat Islam dan ijma' ulama.",
        content: `
            <p><strong>Pertanyaan:</strong><br>Apa hukum bunga yang diberikan oleh bank konvensional kepada nasabahnya?</p>
            <p><strong>Jawaban:</strong><br>Mayoritas lembaga fiqih internasional dan nasional sepakat bahwa bunga bank (interest) adalah riba yang diharamkan dalam Al-Qur'an dan As-Sunnah. Allah berfirman: "Allah telah menghalalkan jual beli dan mengharamkan riba." (QS. Al-Baqarah: 275).</p>
            <h3>Definisi Riba</h3>
            <p>Setiap penambahan yang disyaratkan dalam transaksi utang piutang (qardh) adalah riba. Ketika nasabah menabung di bank konvensional, pada hakikatnya ia meminjamkan uang kepada bank, dan bank memberikan tambahan (bunga) yang disyaratkan. Ini adalah Riba Qardh.</p>
            <p><strong>Solusi:</strong><br>Beralihlah ke bank syariah yang menggunakan akad mudharabah atau wadiah, atau gunakan tabungan tanpa bunga.</p>
        `
    },
    'puasa-safar': {
        title: "Musafir: Lebih Utama Puasa atau Berbuka?",
        date: "17 Des 2025",
        category: "Puasa",
        image: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        excerpt: "Bagi seorang musafir di bulan Ramadan, manakah yang lebih afdhal? Tetap berpuasa atau mengambil keringanan (rukhsah)?",
        content: `
            <p><strong>Pertanyaan:</strong><br>Saya sering bepergian jauh saat Ramadan. Mana yang lebih utama bagi saya, tetap puasa atau berbuka?</p>
            <p><strong>Jawaban:</strong><br>Para ulama berbeda pendapat mengenai mana yang lebih utama. Namun pendapat yang rojih (kuat) adalah melihat kondisi si musafir.</p>
            <h3>Tiga Kondisi Musafir</h3>
            <ol>
                <li>Jika puasa memberatkannya, maka <strong>lebih utama berbuka</strong>. Bahkan makruh jika memaksakan diri.</li>
                <li>Jika puasa membahayakan nyawanya, maka <strong>wajib berbuka</strong> dan haram berpuasa.</li>
                <li>Jika puasa tidak memberatkannya, maka <strong>lebih utama berpuasa</strong> agar lebih cepat menggugurkan kewajiban.</li>
            </ol>
            <p>Rasulullah shallallahu 'alaihi wa sallam bersabda: "Bukanlah termasuk kebaikan (al-birr) berpuasa dalam safar (bagi yang keberatan)." (HR. Bukhari & Muslim).</p>`
    }
};

// --- START MOCK DATA DUPLICATION FOR INFINITE SCROLL DEMO ---
const originalFatwasKeys = Object.keys(fatwasData);
for (let i = 1; i <= 3; i++) {
    originalFatwasKeys.forEach(key => {
        const newKey = `${key}-copy-${i}`;
        fatwasData[newKey] = { ...fatwasData[key] };
        fatwasData[newKey].title = fatwasData[key].title + ` (Bagian ${i + 1})`;
    });
}
// --- END MOCK DATA DUPLICATION ---

if (localStorage.getItem('admin_blogs')) {
    blogsData = JSON.parse(localStorage.getItem('admin_blogs'));
    for (let k in blogsData) {
        if (typeof blogsData[k].author === 'string') {
            blogsData[k].author = { name: blogsData[k].author, img: "https://randomuser.me/api/portraits/men/1.jpg" };
        }
    }
}

if (localStorage.getItem('admin_fatwas')) {
    fatwasData = JSON.parse(localStorage.getItem('admin_fatwas'));
}

// Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const toggles = document.querySelectorAll('.theme-toggle i');
    toggles.forEach(icon => {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Check Auth State on Load
    checkAuthState();

    // Set Active Navigation Link based on URL
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list .nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => link.classList.remove('active'));
        
        if (path.includes('course')) { // matches courses.html, course-detail.html, course-player.html
            document.querySelector('.nav-list a[href="courses.html"]')?.classList.add('active');
        } else if (path.includes('kitab')) {
            document.querySelector('.nav-list a[href="kitab.html"]')?.classList.add('active');
        } else if (path.includes('fatwa')) {
            document.querySelector('.nav-list a[href="fatwa.html"]')?.classList.add('active');
        } else if (path.includes('blog')) {
            document.querySelector('.nav-list a[href="blog.html"]')?.classList.add('active');
        } else if (path.includes('about')) {
            document.querySelector('.nav-list a[href="about.html"]')?.classList.add('active');
        } else {
            // Default to Beranda for index or empty
            document.querySelector('.nav-list a[href="index.html"]')?.classList.add('active');
        }
    }


    // Check Auth State on Load
    checkAuthState();

    // Load Dynamic Course Content if on detail page
    if (window.location.pathname.includes('course-detail.html')) {
        loadCourseDetail();
    }

    // Load All Courses if on courses page
    if (window.location.pathname.includes('courses.html')) {
        loadAllCourses();
    }

    // Load All Blogs if on blog page
    if (window.location.pathname.includes('blog.html')) {
        initBlogSystem();
    }

    // Load Blog Detail if on blog detail page
    if (window.location.pathname.includes('blog-detail.html')) {
        loadBlogDetail();
    }

    // === Bismillah Popup Logic ===
    // Dihapus permanen sesuai instruksi.

    // Load All Fatwas if on fatwa page
    if (window.location.pathname.includes('fatwa')) {
        // Also ensure we are not on fatwa-detail.html
        if (!window.location.pathname.includes('fatwa-detail')) {
            loadAllFatwas();
        }
    }

    // Load Fatwa Detail if on fatwa detail page
    if (window.location.pathname.includes('fatwa-detail')) {
        loadFatwaDetail();
    }

    // Load All Courses
    if (window.location.pathname.includes('courses.html') || window.location.pathname.includes('index.html')) {
        loadAllCourses();
    }
    
    // Load All Kitab
    if (window.location.pathname.includes('kitab.html')) {
        loadAllKitab();
    }

    // Load Blog Detail if on blog detail page
    if (window.location.pathname.includes('blog-detail.html')) {
        loadBlogDetail();
    }

    // Modal Event Listeners
    const authModal = document.getElementById('authModal');
    const vidModal = document.getElementById('videoModal');

    if (authModal) {
        authModal.addEventListener('click', (e) => {
            if (e.target === authModal) closeModal();
        });
    }

    if (vidModal) {
        vidModal.addEventListener('click', (e) => {
            if (e.target === vidModal) closeVideoModal();
        });
    }

    // Handle Login Form Submit
    const loginForm = document.querySelector('#loginForm form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            performLogin();
        });
    }

    // Handle Register Form Submit
    const registerForm = document.querySelector('#registerForm form');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const inputs = registerForm.querySelectorAll('input');
            let name = inputs[0].value.trim();
            let email = inputs[1].value.trim();
            let password = inputs[2].value;
            let confirmPassword = inputs[3].value;
            
            // Validations
            if (!name || !email || !password) {
                showToast("Gagal!", "Semua field harus diisi.", "error");
                return;
            }
            
            if (password.length < 6) {
                showToast("Gagal!", "Password minimal 6 karakter.", "error");
                return;
            }
            
            if (password !== confirmPassword) {
                showToast("Gagal!", "Konfirmasi password tidak cocok.", "error");
                return;
            }
            
            let usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
            
            if (usersData.some(u => u.email === email)) {
                showToast("Gagal!", "Email sudah terdaftar! Silakan login.", "error");
                switchAuthTab('login');
                return;
            }
            
            // Save new user to database
            usersData.push({ name, email, password, role: 'Siswa', registeredAt: new Date().toISOString() });
            localStorage.setItem('admin_users', JSON.stringify(usersData));
            
            // Auto login after register
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify({ name, email, role: 'Siswa' }));
            closeModal();
            checkAuthState();
            showToast("Pendaftaran Berhasil!", `Selamat datang di Bincang Ilmu, ${name}.`, "success");
        });
    }

    // Handle Google Buttons
    const googleBtns = document.querySelectorAll('.btn-google');
    googleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            performLogin();
        });
    });
});

// Authentication Functions
function performLogin() {
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    const passwordInput = document.querySelector('#loginForm input[type="password"]');
    
    if (!emailInput || !passwordInput) return;
    
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    if (!email || !password) {
        showToast("Gagal!", "Email dan password harus diisi.", "error");
        return;
    }
    
    const usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
    const user = usersData.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Set session for ALL roles (including Admin)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify({ name: user.name, email: user.email, role: user.role }));
        
        if (user.role === 'Admin') {
            localStorage.setItem('isAdmin', 'true');
            window.location.href = 'admin.html';
            return;
        } else {
            localStorage.removeItem('isAdmin');
            closeModal();
            checkAuthState();
            showToast("Login Berhasil!", `Selamat datang kembali, ${user.name}.`, "success");
        }
    } else {
        showToast("Login Gagal!", "Email atau password salah.", "error");
    }
}

function performLogout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    checkAuthState();
    window.location.reload();
}

function checkAuthState() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const body = document.body;
    
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userProfile = document.getElementById('userProfile');

    if (isLoggedIn && currentUser) {
        body.classList.add('logged-in');
        
        // Hide login/register buttons
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        
        // Show & update user profile widget
        if (userProfile) {
            userProfile.style.display = 'block';
            
            // Update avatar initial
            const avatar = userProfile.querySelector('.profile-avatar-initial');
            if (avatar) avatar.innerText = currentUser.name.charAt(0).toUpperCase();
            
            // Update profile name in toggle button
            const profileName = userProfile.querySelector('.profile-name');
            if (profileName) profileName.innerText = currentUser.name;
            
            // Update dropdown header info
            const dropdownName = userProfile.querySelector('.user-info strong');
            if (dropdownName) dropdownName.innerText = currentUser.name;
            
            const dropdownEmail = userProfile.querySelector('.user-info span');
            if (dropdownEmail) dropdownEmail.innerText = currentUser.email;
            
            // Inject Admin Dashboard link for Admin/Pengajar
            let adminLink = userProfile.querySelector('.admin-dashboard-link');
            if (currentUser.role === 'Admin' || currentUser.role === 'Pengajar') {
                if (!adminLink) {
                    const dropdownMenu = userProfile.querySelector('.dropdown-menu');
                    if (dropdownMenu) {
                        const divider = document.createElement('li');
                        divider.className = 'divider admin-dashboard-link-divider';
                        dropdownMenu.insertBefore(divider, dropdownMenu.firstChild);
                        
                        const li = document.createElement('li');
                        li.className = 'admin-dashboard-link';
                        li.innerHTML = '<a href="admin.html" class="text-primary"><i class="fas fa-tachometer-alt"></i> Akses Dasbor</a>';
                        dropdownMenu.insertBefore(li, divider);
                    }
                }
            } else {
                if (adminLink) adminLink.remove();
                const divider = userProfile.querySelector('.admin-dashboard-link-divider');
                if (divider) divider.remove();
            }
        }
        
        // Unlock course content if available
        if (typeof unlockCourseContent === 'function') {
            unlockCourseContent();
        }
    } else {
        body.classList.remove('logged-in');
        
        // Show login/register buttons
        if (loginBtn) loginBtn.style.display = 'inline-flex';
        if (registerBtn) registerBtn.style.display = 'inline-flex';
        
        // Hide user profile widget
        if (userProfile) userProfile.style.display = 'none';
    }
}



function unlockCourseContent() {
    // Unlock Sidebar Button
    const sidebarBtn = document.querySelector('.course-sidebar .btn-primary');
    if (sidebarBtn) {
        sidebarBtn.innerText = 'Lanjut Belajar';
        sidebarBtn.onclick = function () {
            const urlParams = new URLSearchParams(window.location.search);
            const courseId = urlParams.get('id') || 'c1';
            window.location.href = 'course-player.html?id=' + courseId;
        };
    }

    // Unlock Lessons (Change icons)
    const lockedIcons = document.querySelectorAll('.fa-lock');
    lockedIcons.forEach(icon => {
        icon.classList.remove('fa-lock', 'fas');
        icon.classList.add('fa-play-circle', 'far');
    });

    // Make free badges cleaner if logged in? (Optional)
}

// Modal Functions
function openModal(tab) {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('active');
        switchAuthTab(tab);
    }
}

function closeModal() {
    const modal = document.getElementById('authModal');
    if (modal) modal.classList.remove('active');
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginBtn = document.getElementById('loginTabBtn');
    const registerBtn = document.getElementById('registerTabBtn');

    if (tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
        loginBtn.classList.add('active');
        registerBtn.classList.remove('active');
    } else {
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        loginBtn.classList.remove('active');
        registerBtn.classList.add('active');
    }
}

// Video Modal Functions
function openVideoModal() {
    const vModal = document.getElementById('videoModal');
    const vFrame = document.getElementById('introVideoFrame');
    const vSrc = "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0";

    if (vModal && vFrame) {
        vModal.classList.add('active');
        vFrame.src = vSrc;
    }
}

function closeVideoModal() {
    const vModal = document.getElementById('videoModal');
    const vFrame = document.getElementById('introVideoFrame');

    if (vModal) vModal.classList.remove('active');

    if (vFrame) {
        setTimeout(() => {
            vFrame.src = "";
        }, 300);
    }
}

// Course Tabs (for detail page)
function openTab(tabName) {
    var i;
    var x = document.getElementsByClassName("tab-content");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        x[i].classList.remove("active");
    }
    var tabs = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    const targetTab = document.getElementById(tabName);
    if (targetTab) {
        targetTab.style.display = "block";
        targetTab.classList.add("active");
    }

    // Find the button that triggered this (if clicked)
    // NOTE: This relies on event.currentTarget which might not be present if called programmatically
    // We can manually highlight the button
    const activeBtn = document.querySelector(`.tab-btn[onclick="openTab('${tabName}')"]`);
    if (activeBtn) activeBtn.classList.add("active");
}

// Lesson Player (for detail page)
function playLesson(element, videoSrc) {
    // Check if user is logged in for locked content (Optional, but user said "All open AFTER login")
    // But visualized as open. For now, let's allow playing but maybe warn if not logged in?
    // User request: "When registered and logged in, all courses open".
    // Implies: If NOT logged in, maybe they shouldn't open? 
    // Let's check login state.

    // const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    // if (!isLoggedIn && element.querySelector('.fa-lock')) {
    //    openModal('login');
    //    return;
    // } 
    // Actually, user just said "make them open", didn't explicitly say "lock them otherwise", 
    // but the presence of locks implies it. I'll implement a soft check.

    const hasLock = element.querySelector('.fa-lock');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (hasLock && !isLoggedIn) {
        openModal('login');
        return;
    }

    const mainVideo = document.getElementById('mainCourseVideo');
    if (mainVideo) {
        mainVideo.src = videoSrc;
    }

    const allLessons = document.querySelectorAll('.lesson-item');
    allLessons.forEach(lesson => lesson.classList.remove('active'));

    if (element) {
        element.classList.add('active');
    }

    const videoWrapper = document.querySelector('.video-player-wrapper');
    if (videoWrapper) {
        videoWrapper.scrollIntoView({ behavior: 'smooth' });
    }
}

// Toggle Password Function
// Toggle Password Logic (Event Delegation)
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('toggle-password')) {
        const icon = e.target;
        const group = icon.closest('.form-group');
        const input = group.querySelector('input');

        if (input) {
            if (input.type === "password") {
                input.type = "text";
                icon.classList.remove("fa-eye");
                icon.classList.add("fa-eye-slash");
            } else {
                input.type = "password";
                icon.classList.remove("fa-eye-slash");
                icon.classList.add("fa-eye");
            }
        }
    }
});

// Load Course Detail Function
function loadCourseDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'c1'; // Default to arab if no ID

    const course = coursesData[courseId];
    if (!course) return; // Handle invalid ID

    // Update Text Content
    document.title = course.title + " - Bincang Ilmu";
    const titleEl = document.querySelector('.course-main-title');
    if (titleEl) titleEl.innerText = course.title;

    const instructorNameEl = document.querySelector('.meta-item .value'); // Assumes first one
    if (instructorNameEl) instructorNameEl.innerText = course.instructor;

    // Update Instructor Image (First image in meta-item)
    const instructorImgEl = document.querySelector('.meta-item img');
    if (instructorImgEl) instructorImgEl.src = course.instructorImg;

    const categoryEl = document.querySelectorAll('.meta-item .value')[1];
    if (categoryEl) categoryEl.innerText = course.category;

    const ratingEl = document.querySelectorAll('.meta-item .value')[2];
    if (ratingEl) ratingEl.innerText = course.rating;

    // Update Description
    const descEl = document.querySelector('#overview p');
    if (descEl) descEl.innerText = course.description;

    // Update Learnings List
    const learningsList = document.querySelector('.check-list');
    if (learningsList) {
        learningsList.innerHTML = course.learnings.map(item => `<li><i class="fas fa-check"></i> ${item}</li>`).join('');
    }

    // Update Thumbnail in Sidebar
    const thumbEl = document.querySelector('.sidebar-thumb');
    if (thumbEl) thumbEl.src = course.image;

    // Update Curriculum
    const curriculumList = document.querySelector('.curriculum-list');
    if (curriculumList) {
        let curriculumHTML = '';
        course.curriculum.forEach((module, index) => {
            let lessonsHTML = module.lessons.map(lesson => {
                let iconClass = lesson.lock ? 'fas fa-lock' : 'far fa-play-circle';
                let badgeHTML = lesson.free ? '<span class="free-badge">Gratis</span>' : '';
                return `
                    <li class="lesson-item" onclick="playLesson(this, '${lesson.video}')">
                        <i class="${iconClass}"></i> ${lesson.title} ${badgeHTML}
                    </li>
                `;
            }).join('');

            curriculumHTML += `
                <div class="module-item">
                    <div class="module-header">
                        <span class="module-title">${module.title}</span>
                        <span class="module-duration">${module.duration}</span>
                    </div>
                    <ul class="lesson-list">
                        ${lessonsHTML}
                    </ul>
                </div>
            `;
        });
        curriculumList.innerHTML = curriculumHTML;
    }

    // Load Dynamic Reviews
    const reviewsTab = document.getElementById('reviews');
    if (reviewsTab) {
        let courseReviews = JSON.parse(localStorage.getItem('course_reviews_data_' + courseId));
        if (courseReviews && courseReviews.length > 0) {
            let newReviewsHTML = '';
            courseReviews.forEach(rev => {
                // Generate stars
                let starsHTML = '';
                for (let i = 1; i <= 5; i++) {
                    if (i <= rev.rating) {
                        starsHTML += '<i class="fas fa-star" style="color:#FBBF24;"></i>';
                    } else {
                        starsHTML += '<i class="far fa-star" style="color:#D1D5DB;"></i>';
                    }
                }
                
                let textHTML = rev.text ? `<p class="review-text">${rev.text}</p>` : '';
                
                newReviewsHTML += `
                    <div class="review-item" style="padding: 1.5rem; background: var(--bg-card); border-radius: var(--radius-md); border: 1px solid #4B5563; margin-bottom: 1.5rem; position: relative;">
                        <div style="position: absolute; top: -10px; right: 20px; background: #4B5563; color: white; padding: 2px 10px; border-radius: 10px; font-size: 0.7rem; font-weight: bold;">Baru</div>
                        <div class="review-header" style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                            <div style="display: flex; align-items: center; gap: 15px;">
                                <i class="fas fa-user-circle" style="font-size: 2.5rem; color: #D1D5DB;"></i>
                                <div>
                                    <h5 style="margin: 0; font-size: 1.1rem; color: var(--text-dark);">${rev.name}</h5>
                                    <span style="font-size: 0.85rem; color: var(--text-light);">${rev.date || 'Baru Saja'}</span>
                                </div>
                            </div>
                            <div class="rating-mini" style="color: #FBBF24; font-size: 0.9rem;">
                                ${starsHTML}
                            </div>
                        </div>
                        <p class="review-text" style="color: var(--text-light); line-height: 1.6; margin: 0;">${rev.text}</p>
                    </div>
                `;
            });
            
            // Prepend new reviews to the existing reviews
            reviewsTab.innerHTML = newReviewsHTML + reviewsTab.innerHTML;
        }
    }


    // Check auth state again to unlock content if needed
    checkAuthState();

    // Trigger Ad Popup if on courses page
    if (window.location.pathname.includes('courses.html')) {
        setTimeout(openAdModal, 2000); // Show after 2 seconds
    }
}

// Ad Modal Functions
function openAdModal() {
    // Check if valid to open (e.g. not already seen this session - optional, but user asked for it to appear)
    const adModal = document.getElementById('adModal');
    if (adModal) {
        adModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeAdModal() {
    const adModal = document.getElementById('adModal');
    if (adModal) {
        adModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Load All Courses Function
// --- COURSE SMART SYSTEM ---
let currentCourseCategory = 'all';
let courseRenderIndex = 0;
const COURSES_PER_PAGE = 6;
let currentFilteredCourses = [];

function loadAllCourses() {
    const grid = document.getElementById('allCoursesGrid');
    if (!grid) return;
    
    // Check for search parameter on initial load
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    if (searchQuery) {
        const searchInput = document.getElementById('courseSearchInput');
        if (searchInput && !searchInput.value) {
            searchInput.value = searchQuery;
            // Clean URL without refreshing page
            const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            window.history.replaceState({path:newurl}, '', newurl);
        }
    }
    
    filterCourseList();
    setupCourseObserver();
}

function filterCourseList() {
    const searchInput = document.getElementById('courseSearchInput');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const bookmarks = JSON.parse(localStorage.getItem('bookmarked_courses')) || [];
    
    currentFilteredCourses = [];
    
    for (const [id, course] of Object.entries(coursesData)) {
        let matchesCategory = false;
        if (currentCourseCategory === 'favorit') {
            matchesCategory = bookmarks.includes(id);
        } else {
            matchesCategory = currentCourseCategory === 'all' || course.category.includes(currentCourseCategory) || currentCourseCategory.includes(course.category);
        }

        const matchesQuery = query === '' || 
                             course.title.toLowerCase().includes(query) || 
                             course.instructor.toLowerCase().includes(query);

        if (matchesCategory && matchesQuery) {
            currentFilteredCourses.push({ id, ...course });
        }
    }
    
    courseRenderIndex = 0;
    const grid = document.getElementById('allCoursesGrid');
    if (grid) grid.innerHTML = '';
    
    if (currentFilteredCourses.length === 0) {
        if (grid) grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-light);">Kursus tidak ditemukan.</div>';
        const loading = document.getElementById('courseLoading');
        if (loading) loading.style.display = 'none';
    } else {
        renderMoreCourses(true);
    }
}

function renderMoreCourses(immediate = false) {
    const grid = document.getElementById('allCoursesGrid');
    if (!grid) return;
    
    const loading = document.getElementById('courseLoading');
    if (loading) loading.style.display = 'block';

    const renderAction = () => {
        const itemsToRender = currentFilteredCourses.slice(courseRenderIndex, courseRenderIndex + COURSES_PER_PAGE);
        const bookmarks = JSON.parse(localStorage.getItem('bookmarked_courses')) || [];
        
        itemsToRender.forEach(course => {
            const modCount = course.curriculum ? course.curriculum.length : 1;
            const studentCount = Math.floor(Math.random() * 500) + 50; 
            const ratingVal = parseFloat(course.rating.split(' ')[0]) || 5.0;
            let starHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= ratingVal) starHtml += '<i class="fas fa-star"></i>';
                else if (i - 0.5 <= ratingVal) starHtml += '<i class="fas fa-star-half-alt"></i>';
                else starHtml += '<i class="far fa-star"></i>';
            }

            const isBookmarked = bookmarks.includes(course.id);
            const heartIcon = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
            const heartColor = isBookmarked ? '#4B5563' : '#9CA3AF';

            const card = document.createElement('div');
            card.className = 'course-card';
            
            // Map category to a generic color tag class based on keywords
            let tagClass = 'tag-adab'; // default
            const catLower = course.category.toLowerCase();
            if (catLower.includes('arab')) tagClass = 'tag-arab';
            else if (catLower.includes('fiqih')) tagClass = 'tag-fiqih';
            else if (catLower.includes('aqidah')) tagClass = 'tag-arab'; // Reuse for color
            
            card.innerHTML = `
                <div class="course-thumb">
                    <img src="${course.image}" alt="${course.title}">
                    <div class="course-bookmark" style="position:absolute; top:15px; right:15px; background: white; padding:6px 10px; border-radius:8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); cursor:pointer; color:${heartColor}; transition:all 0.2s;" onclick="toggleCourseBookmark('${course.id}', this, event)">
                        <i class="${heartIcon}"></i>
                    </div>
                </div>
                <div class="course-content">
                    <span class="category-pill ${tagClass}">${course.category}</span>
                    <h3 class="course-title" style="margin-top: 10px;"><a href="course-detail.html?id=${course.id}">${course.title}</a></h3>
                    
                    <div class="course-rating-row">
                        <span class="stars" style="color: #FBBF24;">${starHtml}</span>
                        <span class="rating-num" style="color:var(--text-light); font-size:0.8rem; margin-left:5px;">${course.rating}</span>
                    </div>

                    <div class="course-instructor">
                        <img src="${course.instructorImg}" alt="Instructor">
                        <div class="instructor-info">
                            <span class="name">${course.instructor.split(',')[0]}</span>
                            <span class="role">Pemateri</span>
                        </div>
                    </div>

                    <div class="course-footer-meta" style="margin-top:auto; padding-top:15px; border-top: 1px solid var(--border-color); display:flex; justify-content:space-between; color:var(--text-light); font-size:0.85rem;">
                        <span><i class="far fa-file-alt"></i> ${modCount} Modul</span>
                        <span><i class="far fa-user"></i> ${studentCount} Siswa</span>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        courseRenderIndex += itemsToRender.length;
        if (loading) loading.style.display = 'none';
    };

    if (immediate) {
        renderAction();
    } else {
        setTimeout(renderAction, 500);
    }
}

function toggleCourseBookmark(id, element, event) {
    if (event) event.preventDefault();
    let bookmarks = JSON.parse(localStorage.getItem('bookmarked_courses')) || [];
    const icon = element.querySelector('i');
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(b => b !== id);
        icon.className = 'far fa-bookmark';
        element.style.color = '#9CA3AF';
    } else {
        bookmarks.push(id);
        icon.className = 'fas fa-bookmark';
        element.style.color = '#4B5563';
    }
    localStorage.setItem('bookmarked_courses', JSON.stringify(bookmarks));
    
    if (currentCourseCategory === 'favorit') {
        filterCourseList();
    }
}

function setupCourseObserver() {
    const sentinel = document.getElementById('courseScrollSentinel');
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && courseRenderIndex < currentFilteredCourses.length) {
            renderMoreCourses();
        }
    }, { rootMargin: '100px' });
    observer.observe(sentinel);
}

window.filterCourse = function(category, event) {
    if (event) {
        event.preventDefault();
        const links = document.querySelectorAll('.course-sidebar .sidebar-link'); // Wait, we changed to kitab-sidebar in HTML! Let's handle both.
        const allLinks = document.querySelectorAll('.kitab-sidebar .sidebar-link, .course-sidebar .sidebar-link');
        allLinks.forEach(link => {
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
    
    currentCourseCategory = category;
    
    // We can scroll to top to align with user behavior expectation, but only if they scrolled down far
    if (window.scrollY > 300) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    filterCourseList();
};

window.searchCourse = function(event) {
    filterCourseList();
};
// --- END COURSE SMART SYSTEM ---

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
        renderMoreKitabs(true); // Load immediately on filter
    }
}

function renderMoreKitabs(immediate = false) {
    const grid = document.getElementById('kitabGrid');
    if (!grid) return;
    
    const loading = document.getElementById('kitabLoading');
    if (loading) loading.style.display = 'block';

    const renderAction = () => {
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
                        <i class="fas fa-download action-icon" title="Unduh Kitab" onclick="alert('Mengunduh ${kitab.title}...'); return false;"></i>
                        <i class="${heartIcon} action-icon" style="cursor:pointer; color: ${heartColor}" title="Simpan ke Favorit" onclick="toggleKitabBookmark('${kitab.id}', this)"></i>
                        <i class="fas fa-share-alt action-icon" title="Bagikan"></i>
                    </div>
                </div>
            `;
            grid.appendChild(card);
        });

        kitabRenderIndex += itemsToRender.length;
        if (loading) loading.style.display = 'none';
    };

    if (immediate) {
        renderAction();
    } else {
        setTimeout(renderAction, 500);
    }
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

// Smart Blog System Variables
let currentBlogCategory = 'all';
let currentBlogSearchQuery = '';
let currentBlogsRendered = 0;
let filteredBlogKeys = [];
const BLOGS_PER_PAGE = 4;

function initBlogSystem() {
    filteredBlogKeys = Object.keys(blogsData);
    currentBlogsRendered = 0;
    if (document.getElementById('allBlogsGrid')) {
        document.getElementById('allBlogsGrid').innerHTML = '';
        loadMoreBlogs();
    }
    updateBlogTrendingWidget();
}

function filterBlog(category, element) {
    currentBlogCategory = category;
    
    // Update active pill
    document.querySelectorAll('.filter-pill').forEach(btn => btn.classList.remove('active'));
    if(element) element.classList.add('active');
    
    applyBlogFilters();
}

window.searchBlogLive = function(event) {
    currentBlogSearchQuery = event.target.value.toLowerCase();
    applyBlogFilters();
};

function applyBlogFilters() {
    filteredBlogKeys = Object.keys(blogsData).filter(id => {
        const blog = blogsData[id];
        const matchCategory = currentBlogCategory === 'all' || blog.category === currentBlogCategory;
        const matchSearch = (blog.title && blog.title.toLowerCase().includes(currentBlogSearchQuery)) || 
                            (blog.excerpt && blog.excerpt.toLowerCase().includes(currentBlogSearchQuery)) ||
                            (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(currentBlogSearchQuery))) ||
                            (blog.author && blog.author.name && blog.author.name.toLowerCase().includes(currentBlogSearchQuery));
        return matchCategory && matchSearch;
    });

    currentBlogsRendered = 0;
    const grid = document.getElementById('allBlogsGrid');
    if(grid) grid.innerHTML = '';
    
    // Update meta count
    const meta = document.getElementById('blogCountMeta');
    if(meta) meta.textContent = `Menampilkan ${filteredBlogKeys.length} artikel`;

    loadMoreBlogs();
}

window.loadMoreBlogs = function() {
    const grid = document.getElementById('allBlogsGrid');
    if (!grid) return;

    const keysToRender = filteredBlogKeys.slice(currentBlogsRendered, currentBlogsRendered + BLOGS_PER_PAGE);
    
    keysToRender.forEach(id => {
        const blog = blogsData[id];
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        let tagHtml = '';
        if(blog.tags && blog.tags.length > 0) {
            tagHtml = `<span style="font-size:0.75rem; color:var(--primary-color); margin-right:8px;">#${blog.tags[0]}</span>`;
        }

        card.innerHTML = `
            <div class="blog-thumb">
                <img src="${blog.image}" alt="${blog.title}">
                <div class="blog-badge-category">${blog.category}</div>
            </div>
            <div class="blog-content">
                <div class="blog-card-meta">
                    <span style="color:var(--text-light);"><i class="far fa-clock"></i> ${blog.readTime || '5 min'}</span>
                    ${tagHtml}
                </div>
                
                <h3 class="blog-title" style="font-size: 1.25rem; margin-bottom: 1rem;"><a href="blog-detail.html?id=${id}">${blog.title}</a></h3>
                <p style="color:var(--text-light); font-size:0.9rem; margin-bottom: 1.5rem; line-height:1.5;">${blog.excerpt}</p>
                
                <div class="blog-author" style="margin-top: auto; border-top: 1px solid var(--border-color); padding-top: 1rem;">
                    <img src="${blog.author ? blog.author.img : 'https://randomuser.me/api/portraits/men/11.jpg'}" alt="Author">
                    <div class="blog-author-info">
                        <span class="author-name" style="font-weight:600; color:var(--text-dark);">${blog.author ? blog.author.name : 'Admin'}</span>
                        <span class="blog-date-text">${blog.date}</span>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    currentBlogsRendered += keysToRender.length;

    // Toggle Load More button visibility
    const loadMoreBtnContainer = document.getElementById('blogLoadMoreContainer');
    if (loadMoreBtnContainer) {
        if (currentBlogsRendered >= filteredBlogKeys.length) {
            loadMoreBtnContainer.style.display = 'none';
        } else {
            loadMoreBtnContainer.style.display = 'block';
        }
    }
}

function updateBlogTrendingWidget() {
    const list = document.querySelector('.trending-list');
    if(!list) return;
    
    // Pick 4 random blogs for trending
    const shuffled = Object.keys(blogsData).sort(() => 0.5 - Math.random());
    const trending = shuffled.slice(0, 4);
    
    list.innerHTML = '';
    trending.forEach(id => {
        const blog = blogsData[id];
        list.innerHTML += `
            <div class="trending-item">
                <a href="blog-detail.html?id=${id}" class="trending-title">${blog.title}</a>
                <div class="trending-meta">
                    <i class="fas fa-user" style="margin-right: 5px; color:var(--primary-color);"></i> 
                    <span style="color: var(--text-dark); font-weight: 500; font-size:0.85rem;">${blog.author ? blog.author.name : 'Admin'}</span>
                </div>
            </div>
        `;
    });
}

function loadBlogDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');
    const blog = blogsData[blogId];

    if (!blog) {
        const container = document.getElementById('blogTitle');
        if (container && container.parentElement) {
            container.parentElement.innerHTML = "<div class='text-center mt-5' style='padding: 50px 0;'><h2>Artikel tidak ditemukan atau URL tidak valid.</h2><br><a href='blog.html' class='btn btn-primary'>Kembali ke Blog</a></div>";
        }
        return;
    }

    // Update Meta
    document.title = `${blog.title} - Bincang Ilmu`;

    // Populate Content (Checking by ID instead of container class)
    if (document.getElementById('blogTitle')) {
        document.getElementById('blogTitle').textContent = blog.title;
        if(document.getElementById('blogDate')) document.getElementById('blogDate').innerHTML = `<i class="fas fa-calendar-alt"></i> ${blog.date}`;
        if(document.getElementById('blogCategory')) document.getElementById('blogCategory').textContent = blog.category || 'Umum';
        
        const imgEl = document.getElementById('blogImage');
        if(imgEl) {
            if(blog.image) {
                imgEl.src = blog.image;
                imgEl.style.display = 'block';
            } else {
                imgEl.style.display = 'none';
            }
        }
        
        if(document.getElementById('blogContent')) document.getElementById('blogContent').innerHTML = blog.content || '<p>Tidak ada konten.</p>';
    }
}

// === Fatwa Functions ===
// === Fatwa Functions ===

let currentFilteredFatwas = [];
let renderIndex = 0;
const PAGE_SIZE = 4;

window.toggleBookmark = function(id, el) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarked_fatwas')) || [];
    if (bookmarks.includes(id)) {
        bookmarks = bookmarks.filter(b => b !== id);
        el.innerHTML = '<i class="far fa-bookmark"></i>';
    } else {
        bookmarks.push(id);
        el.innerHTML = '<i class="fas fa-bookmark"></i>';
    }
    localStorage.setItem('bookmarked_fatwas', JSON.stringify(bookmarks));
};

function renderFatwaList(fatwaList) {
    // This function is still called by legacy code if any, but we will mostly use renderMoreFatwas now
    // Convert object to array for currentFilteredFatwas
    currentFilteredFatwas = Object.keys(fatwaList).map(id => ({ id, ...fatwaList[id] }));
    renderIndex = 0;
    const grid = document.getElementById('allFatwasGrid');
    if (grid) grid.innerHTML = '';
    renderMoreFatwas('');
}



function renderMoreFatwas(query = '') {
    const grid = document.getElementById('allFatwasGrid');
    if (!grid) return;

    if (currentFilteredFatwas.length === 0 && renderIndex === 0) {
        grid.innerHTML = '<p class="text-center" style="color: var(--text-light);">Tidak ada fatwa yang ditemukan.</p>';
        return;
    }

    const itemsToRender = currentFilteredFatwas.slice(renderIndex, renderIndex + PAGE_SIZE);
    let bookmarks = JSON.parse(localStorage.getItem('bookmarked_fatwas')) || [];
    let fatwaViews = JSON.parse(localStorage.getItem('fatwa_views')) || {};

    itemsToRender.forEach(fatwa => {
        const id = fatwa.id;
        const isBookmarked = bookmarks.includes(id);
        const bookmarkIcon = isBookmarked ? 'fas fa-bookmark' : 'far fa-bookmark';
        const views = fatwaViews[id] || (fatwa.data && fatwa.data.popular ? 50 : 10);
        
        let title = fatwa.title;
        let excerpt = fatwa.excerpt;
        
        // Auto Highlight
        if (query && query.trim() !== '') {
            const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escapedQuery})`, 'gi');
            title = title.replace(regex, '<mark style="background-color: #fef08a; padding: 0 2px;">$1</mark>');
            excerpt = excerpt.replace(regex, '<mark style="background-color: #fef08a; padding: 0 2px;">$1</mark>');
        }

        const card = document.createElement('a');
        card.href = `fatwa-detail.html?id=${id}`;
        card.className = 'fatwa-premium-row';
        card.innerHTML = `
            <div class="pr-content">
                <div class="pr-meta">
                    <span class="pr-category">${fatwa.category}</span>
                    <span class="pr-dot">•</span>
                    <span class="pr-date">${fatwa.date}</span>
                </div>
                <h3 class="pr-title">${title}</h3>
                <p class="pr-excerpt">${excerpt}</p>
            </div>
            <div class="pr-right">
                <div class="pr-views"><i class="fas fa-eye"></i> ${views}</div>
                <div class="pr-action">
                    <div class="bookmark-btn" onclick="event.preventDefault(); toggleBookmark('${id}', this)">
                        <i class="${bookmarkIcon}"></i>
                    </div>
                    <div class="pr-arrow"><i class="fas fa-arrow-right"></i></div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    renderIndex += itemsToRender.length;
}

function renderPopularFatwas() {
    const container = document.getElementById('popularFatwasList');
    if (!container) return;

    container.innerHTML = '';

    // Get or initialize views from localStorage
    let fatwaViews = JSON.parse(localStorage.getItem('fatwa_views')) || {};

    // Map fatwas into an array with their view counts
    const fatwasWithViews = Object.entries(fatwasData).map(([id, data]) => {
        // Use localStorage views, fallback to a mock default based on string length to simulate real data if new
        const views = fatwaViews[id] || (data.popular ? 50 : 10); 
        return { id, data, views };
    });

    // Sort by views descending and take top 5
    const popularItems = fatwasWithViews.sort((a, b) => b.views - a.views).slice(0, 5);

    popularItems.forEach((item, index) => {
        const id = item.id;
        const fatwa = item.data;
        const views = item.views;
        const popularElement = document.createElement('div');
        popularElement.className = 'popular-item';
        popularElement.innerHTML = `
            <div class="popular-number">${index + 1}</div>
            <div class="popular-content">
                <h4><a href="fatwa-detail.html?id=${id}">${fatwa.title}</a></h4>
                <div style="font-size: 0.8rem; color: var(--text-light); margin-top: 4px;">
                    <span style="background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 12px; font-weight: 600;">${fatwa.category}</span>
                    <span style="margin-left: 8px;"><i class="fas fa-eye"></i> ${views}x dibaca</span>
                </div>
            </div>
        `;
        container.appendChild(popularElement);
    });
}

function loadAllFatwas() {
    // Initial Render
    renderFatwaList(fatwasData);
    renderPopularFatwas();

    // Search Logic
    const searchInput = document.getElementById('fatwaSearchInput');
    const categoryChips = document.querySelectorAll('.fatwa-chip');
    let currentCategory = 'Semua';

    if (searchInput) {
        // Event Listener for Category Chips
        categoryChips.forEach(chip => {
            chip.addEventListener('click', (e) => {
                // Remove active class from all
                categoryChips.forEach(c => c.classList.remove('active'));
                // Add to clicked
                e.target.classList.add('active');
                currentCategory = e.target.getAttribute('data-category');
                
                // Trigger filter
                filterFatwas();
            });
        });

        // Event Listener for Search Input
        
        searchInput.addEventListener('input', (e) => {
            filterFatwas();
        });

        function filterFatwas() {
            const query = searchInput.value.toLowerCase();
            currentFilteredFatwas = [];

            const bookmarks = JSON.parse(localStorage.getItem('bookmarked_fatwas')) || [];
            Object.keys(fatwasData).forEach(id => {
                const fatwa = fatwasData[id];
                
                let matchesCategory = false;
                if (currentCategory === 'Tersimpan') {
                    matchesCategory = bookmarks.includes(id);
                } else {
                    matchesCategory = currentCategory === 'Semua' || fatwa.category === currentCategory;
                }

                const matchesQuery = fatwa.title.toLowerCase().includes(query) || (fatwa.excerpt && fatwa.excerpt.toLowerCase().includes(query));

                if (matchesCategory && matchesQuery) {
                    currentFilteredFatwas.push({ id, ...fatwa });
                }
            });
            
            renderIndex = 0;
            const grid = document.getElementById('allFatwasGrid');
            if (grid) grid.innerHTML = '';
            
            renderMoreFatwas(query);
        }

        // Infinite Scroll Listener for Window
        window.addEventListener('scroll', () => {
            if (!document.getElementById('allFatwasGrid')) return;
            
            const scrollPosition = window.innerHeight + window.scrollY;
            const threshold = document.body.offsetHeight - 300; // Load 300px before bottom

            if (scrollPosition >= threshold && renderIndex < currentFilteredFatwas.length) {
                if (!window.isFetchingMore) {
                    window.isFetchingMore = true;
                    setTimeout(() => {
                        renderMoreFatwas(searchInput.value.toLowerCase());
                        window.isFetchingMore = false;
                    }, 300); 
                }
            }
        });
    }
}

// =========================================
// User Profile Logic (Global Helpers)
// =========================================

// Make these global so onclick attributes work reliably
// Make these global so onclick attributes work reliably
window.toggleProfileMenu = function (event) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const dropdown = document.getElementById('profileDropdown');
    const isActive = dropdown.classList.contains('active');

    // Explicitly toggle
    if (isActive) {
        dropdown.classList.remove('active');
    } else {
        dropdown.classList.add('active');
    }

    console.log('Profile toggled manually. New state active:', !isActive);
}

window.openProfileModal = function (type) {
    const dropdown = document.getElementById('profileDropdown');
    if (dropdown) dropdown.classList.remove('active');

    let modalId = '';
    if (type === 'settings') modalId = 'settingsModal';
    if (type === 'courses') modalId = 'coursesModal';
    if (type === 'certificates') modalId = 'certificatesModal';
    if (type === 'app-settings') modalId = 'appSettingsModal';

    const modal = document.getElementById(modalId);
    if (modal) {
        // Populate settings modal with actual user data
        if (type === 'settings') {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const inputs = modal.querySelectorAll('.form-input');
                if (inputs[0]) inputs[0].value = currentUser.name || '';
                if (inputs[1]) inputs[1].value = currentUser.email || '';
                
                // Update avatar initial in the modal
                const avatar = modal.querySelector('.profile-avatar-initial');
                if (avatar) avatar.innerText = currentUser.name.charAt(0).toUpperCase();
            }
        }
        
        // Populate "Kursus Saya" with enrolled course data
        if (type === 'courses') {
            const container = document.getElementById('myCoursesContainer');
            if (container && typeof coursesData !== 'undefined') {
                container.innerHTML = '';
                const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
                // New users have no enrolled courses
                const enrolledCourses = currentUser.enrolledCourses || [];
                
                if (enrolledCourses.length === 0) {
                    container.innerHTML = `
                        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-light);">
                            <i class="fas fa-book-open" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem; display:block;"></i>
                            <p style="margin-bottom: 5px; font-size: 1rem;">Anda belum mengikuti kursus apa pun.</p>
                            <p style="font-size: 0.85rem; margin-bottom: 20px;">Mulai perjalanan menuntut ilmu Anda sekarang!</p>
                            <a href="courses.html" class="btn btn-primary" style="border-radius: 10px; padding: 0.6rem 1.5rem;" onclick="closeProfileModal('courses')">
                                <i class="fas fa-search"></i> Jelajahi Kursus
                            </a>
                        </div>`;
                } else {
                    enrolledCourses.forEach((enrolled) => {
                        const id = typeof enrolled === 'string' ? enrolled : enrolled.id;
                        const course = coursesData[id];
                        if (!course) return;
                        
                        const img = course.image || 'https://images.unsplash.com/photo-1585036156171-384164a8c675?w=200&q=80';
                        const totalModules = course.curriculum ? course.curriculum.length : 0;
                        const progressPct = enrolled.progress || 0;
                        const isComplete = progressPct >= 100;
                        const progressColor = isComplete ? '#10B981' : 'var(--primary-color)';
                        const progressText = isComplete ? 'Selesai' : 'Sedang Dipelajari';
                        const btnClass = isComplete ? 'btn-outline' : 'btn-primary';
                        const btnText = isComplete ? 'Lihat Kembali' : 'Lanjutkan';
                        
                        container.innerHTML += `
                        <div style="background: var(--bg-card); border-radius: 16px; padding: 1.25rem; display: flex; gap: 1rem; align-items: center; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border: 1px solid var(--border-color);">
                            <img src="${img}" style="width: 80px; height: 80px; border-radius: 12px; object-fit: cover;" onerror="this.src='https://images.unsplash.com/photo-1585036156171-384164a8c675?w=200&q=80'">
                            <div style="flex: 1;">
                                <h4 style="font-size: 1rem; margin-bottom: 5px;">${course.title}</h4>
                                <p style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 5px;">Progress: ${progressPct}% (${progressText})</p>
                                <div style="width: 100%; height: 6px; background: #E5E7EB; border-radius: 10px; overflow: hidden; margin-bottom: 5px;">
                                    <div style="width: ${progressPct}%; height: 100%; background: ${progressColor}; border-radius: 10px; transition: width 0.3s;"></div>
                                </div>
                                <p style="font-size: 0.8rem; color: var(--text-light);">${course.instructor || 'Instruktur'} · ${totalModules} Modul</p>
                            </div>
                            <a href="course-detail.html?id=${id}" class="btn ${btnClass}" style="padding: 0.5rem 1rem; font-size: 0.85rem; border-radius: 10px; text-decoration:none;" onclick="closeProfileModal('courses')">${btnText}</a>
                        </div>`;
                    });
                }
            }
        }
        
        // Populate certificates dynamically — only completed courses
        if (type === 'certificates') {
            const container = document.getElementById('myCertificatesContainer');
            const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
            const userName = currentUser.name || 'Pengguna';
            const enrolledCourses = currentUser.enrolledCourses || [];
            
            // Filter only completed courses (progress >= 100)
            const completedCourses = enrolledCourses.filter(e => {
                const pct = typeof e === 'object' ? (e.progress || 0) : 0;
                return pct >= 100;
            });
            
            if (container && typeof coursesData !== 'undefined') {
                container.innerHTML = '';
                
                if (completedCourses.length === 0) {
                    container.innerHTML = `
                        <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-light);">
                            <i class="fas fa-certificate" style="font-size: 3rem; opacity: 0.3; margin-bottom: 1rem; display:block;"></i>
                            <p style="margin-bottom: 5px; font-size: 1rem;">Belum ada sertifikat.</p>
                            <p style="font-size: 0.85rem;">Selesaikan kursus untuk mendapatkan sertifikat kelulusan.</p>
                        </div>`;
                } else {
                    completedCourses.forEach((enrolled, index) => {
                        const id = enrolled.id;
                        const course = coursesData[id];
                        if (!course) return;
                        
                        const gradients = [
                            'linear-gradient(135deg, #111827, #000000)',
                            'linear-gradient(135deg, #1e3a5f, #0c1929)',
                            'linear-gradient(135deg, #2d1b4e, #0f0a1e)'
                        ];
                        const borderColors = ['#4B5563', '#2563eb', '#7c3aed'];
                        
                        container.innerHTML += `
                        <div style="background: var(--bg-card); border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border: 1px solid var(--border-color);">
                            <div style="background: ${gradients[index % 3]}; padding: 2rem; text-align: center; color: white; position: relative; border-bottom: 4px solid ${borderColors[index % 3]};">
                                <div style="position: absolute; top: 15px; right: 20px; opacity: 0.15; font-size: 5rem; color: #9CA3AF;"><i class="fas fa-award"></i></div>
                                <p style="font-size: 0.85rem; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 8px; color: #9CA3AF; font-weight: 600;">Sertifikat Pencapaian</p>
                                <h3 style="font-size: 1.5rem; font-family: var(--font-logo); color: white; margin: 0; line-height: 1.3;">${course.title}</h3>
                            </div>
                            <div style="padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <p style="font-size: 0.8rem; color: var(--text-light); text-transform: uppercase;">Diberikan Kepada</p>
                                    <p style="font-weight: 700; font-size: 1.1rem; color: var(--text-dark);">${userName}</p>
                                    <p style="font-size: 0.85rem; color: var(--text-light); margin-top: 5px;">${course.instructor || ''}</p>
                                </div>
                                <button class="btn" style="background: ${borderColors[index % 3]}; color: white; border-radius: 12px; padding: 0.5rem 1rem; font-size: 0.9rem; font-weight: 600; display:flex; align-items:center; gap:8px;">
                                    <i class="fas fa-download"></i> Unduh PDF
                                </button>
                            </div>
                        </div>`;
                    });
                }
                
                // Encouragement note
                container.innerHTML += `
                <div style="text-align: center; padding: 1.5rem; border: 2px dashed #E5E7EB; border-radius: 20px;">
                    <i class="fas fa-medal" style="font-size: 2rem; color: #D1D5DB; margin-bottom: 10px;"></i>
                    <p style="color: var(--text-light); font-size: 0.9rem;">Selesaikan kursus lainnya untuk mendapatkan lebih banyak sertifikat.</p>
                </div>`;
            }
        }
        
        modal.classList.add('active');
    }
}

window.closeProfileModal = function (type) {
    let modalId = '';
    if (type === 'settings') modalId = 'settingsModal';
    if (type === 'courses') modalId = 'coursesModal';
    if (type === 'certificates') modalId = 'certificatesModal';
    if (type === 'app-settings') modalId = 'appSettingsModal';

    const modal = document.getElementById(modalId);
    if (modal) {
        // Save profile changes when closing settings modal
        if (type === 'settings') {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                const inputs = modal.querySelectorAll('.form-input');
                const newName = inputs[0] ? inputs[0].value.trim() : currentUser.name;
                const newEmail = inputs[1] ? inputs[1].value.trim() : currentUser.email;
                
                // Update currentUser in localStorage
                currentUser.name = newName;
                currentUser.email = newEmail;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                
                // Also update in admin_users database
                let usersData = JSON.parse(localStorage.getItem('admin_users')) || [];
                const userIndex = usersData.findIndex(u => u.email === currentUser.email || u.name === newName);
                if (userIndex !== -1) {
                    usersData[userIndex].name = newName;
                    usersData[userIndex].email = newEmail;
                    localStorage.setItem('admin_users', JSON.stringify(usersData));
                }
                
                // Refresh navbar profile
                checkAuthState();
                
                if (typeof showToast === 'function') {
                    showToast("Profil Diperbarui!", "Data profil Anda berhasil disimpan.", "success");
                }
            }
        }
        
        modal.classList.remove('active');
    }
}

window.handleLogout = function () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAdmin');
    window.location.reload();
}

// checkLoginState removed — consolidated into checkAuthState()

// Enroll in a course
window.enrollCourse = function (courseId) {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
        openModal('login');
        return;
    }
    
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const enrolledCourses = currentUser.enrolledCourses || [];
    
    // Check if already enrolled
    const alreadyEnrolled = enrolledCourses.some(e => {
        const id = typeof e === 'string' ? e : e.id;
        return id === courseId;
    });
    
    if (!alreadyEnrolled) {
        enrolledCourses.push({ id: courseId, progress: 0, enrolledAt: new Date().toISOString() });
        currentUser.enrolledCourses = enrolledCourses;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        if (typeof showToast === 'function') {
            showToast("Berhasil Mendaftar!", "Kursus telah ditambahkan ke daftar kursus Anda.", "success");
        }
    }
    
    // Redirect to course player
    window.location.href = 'course-player.html?id=' + courseId;
}

document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();

    // Close Dropdown when clicking outside
    document.addEventListener('click', (e) => {
        const wrapper = document.getElementById('userProfile');
        const dropdown = document.getElementById('profileDropdown');
        if (wrapper && !wrapper.contains(e.target)) {
            if (dropdown && dropdown.classList.contains('active')) {
                dropdown.classList.remove('active');
            }
        }
    });
});

function loadFatwaDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const fatwaId = urlParams.get('id');

    if (!fatwaId || !fatwasData[fatwaId]) {
        document.getElementById('fatwaContent').innerHTML = '<p class="text-center">Fatwa tidak ditemukan.</p>';
        return;
    }

    const fatwa = fatwasData[fatwaId];

    // Increment Views
    let fatwaViews = JSON.parse(localStorage.getItem('fatwa_views')) || {};
    // Base view on mock logic if undefined
    if (!fatwaViews[fatwaId]) {
        fatwaViews[fatwaId] = fatwa.popular ? 50 : 10;
    }
    fatwaViews[fatwaId] += 1;
    localStorage.setItem('fatwa_views', JSON.stringify(fatwaViews));

    document.title = `${fatwa.title} - Fatwa Bincang Ilmu`;

    // Using same IDs as blog for simplicity if we copied the file, or updated IDs
    // Let's assume we update IDs in fatwa-detail.html to match these or reuse blog IDs
    const titleEl = document.getElementById('fatwaTitle') || document.getElementById('blogTitle');
    const dateEl = document.getElementById('fatwaDate') || document.getElementById('blogDate');
    const catEl = document.getElementById('fatwaCategory') || document.getElementById('blogCategory');
    const contentEl = document.getElementById('fatwaContent') || document.getElementById('blogContent');

    if (titleEl) titleEl.textContent = fatwa.title;
    if (dateEl) dateEl.textContent = fatwa.date;
    if (catEl) catEl.textContent = fatwa.category;
    if (contentEl) {
        let contentHtml = fatwa.content;
        
        // Wrap question
        contentHtml = contentHtml.replace(/<p><strong>Pertanyaan:<\/strong><br>(.*?)<\/p>/gs, 
            '<div class="qa-detail-box q-box"><div class="qa-badge">Pertanyaan</div><p>$1</p></div>');
            
        // Wrap answer (optional, we just replace the bold tag)
        contentHtml = contentHtml.replace(/<p><strong>Jawaban:<\/strong><br>/g, 
            '<div class="qa-detail-box a-box"><div class="qa-badge">Jawaban</div><p>');
            
        // Close the a-box div properly (assuming Jawaban is the rest of the text, but it has multiple paragraphs). 
        // A simpler way is to just inject the styling directly into the HTML string, but let's just use CSS.
        contentEl.innerHTML = contentHtml;

        // Append Source Link if available
        if (fatwa.source) {
            const sourceDiv = document.createElement('div');
            sourceDiv.style.marginTop = "2rem";
            sourceDiv.style.padding = "1rem";
            sourceDiv.style.background = "rgba(0,0,0,0.03)";
            sourceDiv.style.borderRadius = "0.5rem";
            sourceDiv.style.fontSize = "0.9rem";
            sourceDiv.innerHTML = `
                <strong>Sumber:</strong> <a href="${fatwa.source}" target="_blank" style="color: var(--primary-color); text-decoration: underline;">IslamWeb (Lihat Asli)</a>
            `;
            contentEl.appendChild(sourceDiv);
        }
        
        // Setup Smart Share WhatsApp
        window.shareFatwaWhatsApp = function() {
            const text = encodeURIComponent(`*${fatwa.title}*\n\nBaca fatwa selengkapnya di Bincang Ilmu:\n${window.location.href}`);
            window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
        };
        
        // Setup Related Fatwas
        const relatedGrid = document.getElementById('relatedFatwasGrid');
        if (relatedGrid) {
            relatedGrid.innerHTML = '';
            // Find fatwas with the same category, exclude current
            let relatedIds = Object.keys(fatwasData).filter(id => fatwasData[id].category === fatwa.category && id !== fatwaId);
            
            if (relatedIds.length === 0) {
                // fallback to some recent ones if no match
                relatedIds = Object.keys(fatwasData).filter(id => id !== fatwaId).slice(0, 3);
            } else {
                relatedIds = relatedIds.slice(0, 3);
            }
            
            relatedIds.forEach(id => {
                const rFatwa = fatwasData[id];
                const rCard = document.createElement('a');
                rCard.href = `fatwa-detail.html?id=${id}`;
                rCard.style.display = "block";
                rCard.style.padding = "1rem";
                rCard.style.background = "var(--bg-card)";
                rCard.style.border = "1px solid var(--glass-border)";
                rCard.style.borderRadius = "var(--radius-md)";
                rCard.style.color = "var(--text-dark)";
                rCard.style.textDecoration = "none";
                rCard.innerHTML = `
                    <div style="font-size: 0.8rem; color: var(--primary-color); font-weight: 600; margin-bottom: 0.5rem;">${rFatwa.category}</div>
                    <h4 style="margin: 0; font-size: 1.1rem; line-height: 1.4;">${rFatwa.title}</h4>
                `;
                // Add hover effect via JS since it's an inline element style but better not to bloat CSS
                rCard.onmouseover = function() { this.style.borderColor = "var(--primary-color)"; };
                rCard.onmouseout = function() { this.style.borderColor = "var(--glass-border)"; };
                
                relatedGrid.appendChild(rCard);
            });
        }
    }
}


// =========================================
// Smart Search System Logic
// =========================================
const searchData = [];
// Dynamically populate searchData from databases
if (typeof coursesData !== 'undefined') {
    for (const [id, course] of Object.entries(coursesData)) {
        searchData.push({ title: course.title, type: "Kursus", icon: "fas fa-book-open", link: "course-detail.html?id=" + id });
    }
}
if (typeof fatwasData !== 'undefined') {
    for (const [id, fatwa] of Object.entries(fatwasData)) {
        searchData.push({ title: fatwa.question || fatwa.title, type: "Fatwa", icon: "fas fa-gavel", link: "fatwa-detail.html?id=" + id });
    }
}
if (typeof blogsData !== 'undefined') {
    for (const [id, blog] of Object.entries(blogsData)) {
        searchData.push({ title: blog.title, type: "Blog", icon: "fas fa-newspaper", link: "blog-detail.html?id=" + id });
    }
}


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('globalSearchInput');
    const initialState = document.getElementById('searchInitialState');
    const resultsList = document.getElementById('searchResultsList');

    if (searchInput) {
        
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = e.target.value.toLowerCase().trim();
                if (query.length > 0) {
                    const filtered = searchData.filter(item => item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));
                    if (filtered.length > 0) {
                        window.location.href = filtered[0].link;
                    } else {
                        // Optional: maybe show an alert or just do nothing
                    }
                }
            }
        });
        
        searchInput.addEventListener('input', (e) => {

            const query = e.target.value.toLowerCase().trim();
            
            if (query.length === 0) {
                initialState.style.display = 'block';
                resultsList.style.display = 'none';
                return;
            }

            initialState.style.display = 'none';
            resultsList.style.display = 'flex';
            
            const filtered = searchData.filter(item => item.title.toLowerCase().includes(query) || item.type.toLowerCase().includes(query));
            
            if (filtered.length === 0) {
                resultsList.innerHTML = `
                    <div style="text-align: center; padding: 2rem; color: var(--text-light);">
                        <i class="fas fa-search" style="font-size: 2rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                        <p>Tidak ada hasil untuk "<strong>${e.target.value}</strong>"</p>
                    </div>
                `;
                return;
            }

            resultsList.innerHTML = filtered.map(item => {
                // Highlight logic
                const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                const regex = new RegExp(`(${escapedQuery})`, 'gi');
                const highlightedTitle = item.title.replace(regex, '<span class="search-highlight">$1</span>');
                
                return `
                    <a href="${item.link}" class="search-result-item" onclick="closeSearch()">
                        <div class="search-result-icon">
                            <i class="${item.icon}"></i>
                        </div>
                        <div class="search-result-content">
                            <span class="search-result-title">${highlightedTitle}</span>
                            <span class="search-result-type">${item.type}</span>
                        </div>
                    </a>
                `;
            }).join('');
        });
    }
});

window.openSearch = function () {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.add('active');
        const input = document.getElementById('globalSearchInput');
        if (input) {
            input.value = '';
            input.dispatchEvent(new Event('input'));
            setTimeout(() => input.focus(), 100);
        }
    }
}

window.closeSearch = function () {
    const overlay = document.getElementById('searchOverlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}


// Global Slider Logic
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length === 0) return;

    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); // Change image every 4 seconds
}

document.addEventListener('DOMContentLoaded', () => {
    initHeroSlider();
    loadAllKitab();
});

// Close search on Esc key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const overlay = document.getElementById('searchOverlay');
        if (overlay && overlay.classList.contains('active')) {
            closeSearch();
        }
    }
});


// Radio Player Logic Removed

// Mobile Menu Toggle Logic
document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');

            // Toggle Icon
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                if (navMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});

// =========================================
// Course Player Logic (Udemy Style)
// =========================================

function initCoursePlayer() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'c1';
    const course = coursesData[courseId];

    if (!course) {
        document.querySelector('.player-layout').innerHTML = "<div style='padding: 2rem;'>Kursus tidak ditemukan.</div>";
        return;
    }

    // Update Title
    const titleEl = document.getElementById('playerCourseTitle');
    if (titleEl) titleEl.innerText = course.title;
    document.title = course.title + " - Bincang Ilmu Player";

    // Build Curriculum Sidebar
    const curriculumContainer = document.getElementById('playerCurriculumList');
    if (curriculumContainer) {
        let html = '';
        let totalLessons = 0;
        let completedLessons = 0;

        // Get progress from localStorage
        let progressData = JSON.parse(localStorage.getItem('courseProgress_' + courseId)) || {};

        course.curriculum.forEach((module, mIndex) => {
            let lessonsHTML = '';
            module.lessons.forEach((lesson, lIndex) => {
                totalLessons++;
                const lessonId = `m${mIndex}_l${lIndex}`;
                const isCompleted = progressData[lessonId] ? true : false;
                if (isCompleted) completedLessons++;

                const checkClass = isCompleted ? 'fas fa-check-circle completed' : 'far fa-circle';

                lessonsHTML += `
                    <li class="player-lesson-item" onclick="playPlayerVideo(this, '${lesson.video}', '${lesson.title}', '${courseId}', '${lessonId}')" data-id="${lessonId}">
                        <i class="${checkClass} lesson-checkbox" id="check_${lessonId}" onclick="toggleLessonComplete(event, '${courseId}', '${lessonId}')"></i>
                        <div class="lesson-info">
                            <span>${lesson.title}</span>
                            <span class="lesson-duration"><i class="fas fa-play-circle" style="margin-right: 4px;"></i> Video</span>
                        </div>
                    </li>
                `;
            });

            html += `
                <div class="player-module-item ${mIndex === 0 ? 'open' : ''}">
                    <div class="player-module-header" onclick="this.parentElement.classList.toggle('open')">
                        <div style="flex:1;">
                            <div class="player-module-title">${module.title}</div>
                        </div>
                        <i class="fas fa-chevron-down" style="font-size: 0.8rem;"></i>
                    </div>
                    <ul class="player-lesson-list">
                        ${lessonsHTML}
                    </ul>
                </div>
            `;
        });
        
        curriculumContainer.innerHTML = html;

        // Update Progress Bar
        updatePlayerProgress(completedLessons, totalLessons);

        // Auto play first lesson
        const firstLesson = document.querySelector('.player-lesson-item');
        if (firstLesson) {
            firstLesson.click();
        }
    }
}

window.playPlayerVideo = function(element, videoUrl, title, courseId, lessonId) {
    // Update Video
    const videoFrame = document.getElementById('playerVideo');
    if (videoFrame) {
        videoFrame.src = videoUrl;
    }

    // Update Text
    const titleDisplay = document.getElementById('lessonTitleDisplay');
    if (titleDisplay) titleDisplay.innerText = title;

    // Highlight active
    const allLessons = document.querySelectorAll('.player-lesson-item');
    allLessons.forEach(el => el.classList.remove('active'));
    element.classList.add('active');

    // Auto mark as complete when clicked (simple mock progress)
    // We delay it slightly to simulate watching
    setTimeout(() => {
        markLessonComplete(courseId, lessonId);
    }, 2000);
}

window.toggleLessonComplete = function(event, courseId, lessonId) {
    event.stopPropagation(); // prevent clicking the lesson
    
    let progressData = JSON.parse(localStorage.getItem('courseProgress_' + courseId)) || {};
    
    if (progressData[lessonId]) {
        delete progressData[lessonId];
    } else {
        progressData[lessonId] = true;
    }
    
    localStorage.setItem('courseProgress_' + courseId, JSON.stringify(progressData));
    
    // Re-render curriculum to update checks and progress
    initCoursePlayer();
}

window.markLessonComplete = function(courseId, lessonId) {
    let progressData = JSON.parse(localStorage.getItem('courseProgress_' + courseId)) || {};
    if (!progressData[lessonId]) {
        progressData[lessonId] = true;
        localStorage.setItem('courseProgress_' + courseId, JSON.stringify(progressData));
        initCoursePlayer(); // Re-render to update bar
    }
}

function updatePlayerProgress(completed, total) {
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    const textEl = document.getElementById('progressPercent');
    const barEl = document.getElementById('playerProgressBar');
    const certBtnContainer = document.getElementById('certificateBtnContainer');
    
    if (textEl) textEl.innerText = percent;
    if (barEl) barEl.style.width = percent + '%';

    // Certificate & Review Logic
    if (percent === 100 && total > 0) {
        if (certBtnContainer) certBtnContainer.style.display = 'block';

        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id') || 'c1';
        const isReviewed = localStorage.getItem('course_reviewed_' + courseId);
        const isPopupShown = localStorage.getItem('course_review_popup_shown_' + courseId);
        
        const sidebarActionBtn = document.getElementById('sidebarActionBtn');
        const sidebarActionIcon = document.getElementById('sidebarActionIcon');
        const sidebarActionText = document.getElementById('sidebarActionText');

        if (isReviewed) {
            // Already reviewed, show download button in sidebar
            if (sidebarActionBtn) {
                sidebarActionBtn.style.background = '#4B5563'; // Gold
                sidebarActionBtn.onclick = downloadCertificate;
            }
            if (sidebarActionIcon) sidebarActionIcon.className = 'fas fa-award';
            if (sidebarActionText) sidebarActionText.innerText = 'Unduh Sertifikat';
        } else {
            // Not reviewed yet, show write review button in sidebar
            if (sidebarActionBtn) {
                sidebarActionBtn.style.background = '#4B5563'; // Green
                sidebarActionBtn.onclick = openCertificateModal;
            }
            if (sidebarActionIcon) sidebarActionIcon.className = 'fas fa-star';
            if (sidebarActionText) sidebarActionText.innerText = 'Tulis Ulasan';
            
            // Auto pop-up once
            if (!isPopupShown) {
                const certModal = document.getElementById('certificateModal');
                if (certModal) {
                    setTimeout(() => {
                        openCertificateModal();
                    }, 1000);
                }
                localStorage.setItem('course_review_popup_shown_' + courseId, 'true');
            }
        }
    } else {
        if (certBtnContainer) certBtnContainer.style.display = 'none';
    }
}

function openCertificateModal() {
    const modal = document.getElementById('certificateModal');
    if (!modal) return;
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'c1';
    const isReviewed = localStorage.getItem('course_reviewed_' + courseId);
    
    if (isReviewed) {
        // Show step 2 directly
        document.getElementById('certStep1').style.display = 'none';
        document.getElementById('certStep2').style.display = 'block';
    } else {
        // Show step 1 (Review)
        document.getElementById('certStep1').style.display = 'block';
        document.getElementById('certStep2').style.display = 'none';
        initStarRating();
    }
    
    modal.classList.add('active');
}

let selectedRating = 0;
function initStarRating() {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const val = parseInt(this.getAttribute('data-value'));
            highlightStars(val);
        });
        star.addEventListener('mouseout', function() {
            highlightStars(selectedRating);
        });
        star.addEventListener('click', function() {
            selectedRating = parseInt(this.getAttribute('data-value'));
            highlightStars(selectedRating);
        });
    });
}

function highlightStars(val) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        const starVal = parseInt(star.getAttribute('data-value'));
        if (starVal <= val) {
            star.style.color = '#FBBF24'; // Yellow
            star.classList.replace('far', 'fas');
        } else {
            star.style.color = '#D1D5DB'; // Gray
            star.classList.replace('fas', 'far'); // Wait, default is fas, let's just change color
            // Or better, just keep fas and change color
        }
    });
}

function submitReview() {
    if (selectedRating === 0) {
        showToast('Peringatan', 'Mohon berikan rating bintang terlebih dahulu.', 'error');
        return;
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'c1';
    
    // Grab review text
    const textEl = document.getElementById('reviewText');
    const reviewTextValue = textEl ? textEl.value.trim() : '';

    // Get current user name
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userName = currentUser && currentUser.name ? currentUser.name : 'Pelajar Bincang Ilmu';

    // Create review object
    const newReview = {
        name: userName,
        rating: selectedRating,
        text: reviewTextValue,
        date: new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    // Save to localStorage array
    let courseReviews = JSON.parse(localStorage.getItem('course_reviews_data_' + courseId)) || [];
    courseReviews.unshift(newReview); // Add to top
    localStorage.setItem('course_reviews_data_' + courseId, JSON.stringify(courseReviews));

    // Save review status for this user
    localStorage.setItem('course_reviewed_' + courseId, 'true');
    
    // Transition to step 2
    document.getElementById('certStep1').style.display = 'none';
    document.getElementById('certStep2').style.display = 'block';
    
    // Update sidebar button
    const sidebarActionBtn = document.getElementById('sidebarActionBtn');
    const sidebarActionIcon = document.getElementById('sidebarActionIcon');
    const sidebarActionText = document.getElementById('sidebarActionText');
    if (sidebarActionBtn) {
        sidebarActionBtn.style.background = '#4B5563'; // Gold
        sidebarActionBtn.onclick = downloadCertificate;
    }
    if (sidebarActionIcon) sidebarActionIcon.className = 'fas fa-award';
    if (sidebarActionText) sidebarActionText.innerText = 'Unduh Sertifikat';
    
    showToast('Berhasil', 'Ulasan Anda telah dikirim. Terima kasih!', 'success');
}

function downloadCertificate() {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'c1';
    
    // Create a dummy certificate display in a new tab
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>Sertifikat Kelulusan - Bincang Ilmu</title>
            <style>
                body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f3f4f6; }
                .cert { background: white; padding: 40px; border: 10px solid #4B5563; border-radius: 10px; text-align: center; max-width: 800px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
                h1 { color: #111827; font-size: 3rem; margin-bottom: 10px; }
                h2 { color: var(--primary-color); margin-bottom: 30px; }
                p { font-size: 1.2rem; color: #4B5563; }
                .name { font-size: 2.5rem; font-weight: bold; color: #000000; margin: 20px 0; border-bottom: 2px solid #E5E7EB; display: inline-block; padding-bottom: 10px; }
            </style>
        </head>
        <body>
            <div class="cert">
                <h1>SERTIFIKAT KELULUSAN</h1>
                <h2>BINCANG ILMU ACADEMY</h2>
                <p>Diberikan kepada:</p>
                <div class="name">Pelajar Bincang Ilmu</div>
                <p>Atas keberhasilannya menyelesaikan 100% materi pada kursus:</p>
                <h3 style="margin-top:20px; font-size: 1.5rem;">${coursesData[courseId] ? coursesData[courseId].title : 'Kursus'}</h3>
                <p style="margin-top: 40px; font-size: 0.9rem;">Diterbitkan pada: ${new Date().toLocaleDateString('id-ID')}</p>
                <button onclick="window.print()" style="margin-top: 30px; padding: 10px 20px; background: #4B5563; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 1rem;">Cetak / Simpan PDF</button>
            </div>
        </body>
        </html>
    `);
    printWindow.document.close();
}

// =========================================
// Toast Notification Logic
// =========================================
function showToast(title, message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toastContainer';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';

    toast.innerHTML = `
        <i class="${iconClass} toast-icon"></i>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    // Trigger animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// =========================================
// Private Notes Logic (Course Player)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const notesArea = document.getElementById('privateNotesArea');
    const notesStatus = document.getElementById('notesStatus');
    
    if (notesArea && notesStatus) {
        // Build a unique key based on the course ID
        const urlParams = new URLSearchParams(window.location.search);
        const courseId = urlParams.get('id') || 'default';
        const storageKey = `bincang_notes_${courseId}`;

        // Load existing notes
        const savedNotes = localStorage.getItem(storageKey);
        if (savedNotes) {
            notesArea.value = savedNotes;
        }

        let timeoutId;
        notesArea.addEventListener('input', () => {
            // Update status to saving
            notesStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Menyimpan...</span>';
            notesStatus.style.color = 'var(--text-light)';

            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                localStorage.setItem(storageKey, notesArea.value);
                notesStatus.innerHTML = '<i class="fas fa-check-circle"></i> <span>Tersimpan otomatis</span>';
                notesStatus.style.color = '#4B5563';
            }, 1000);
        });
    }
});

function downloadNotes() {
    const notesArea = document.getElementById('privateNotesArea');
    if (!notesArea) return;
    
    const text = notesArea.value;
    if (!text.trim()) {
        alert("Catatan masih kosong.");
        return;
    }
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id') || 'course';
    a.download = `Catatan_Pribadi_${courseId}.txt`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// =========================================
// App Settings System
// =========================================
const defaultSettings = {
    autoplay: true,
    quality: 'auto',
    emailNotif: true,
    studyReminder: false
};

window.saveAppSetting = function(key, value) {
    let settings = JSON.parse(localStorage.getItem('appSettings')) || defaultSettings;
    settings[key] = value;
    localStorage.setItem('appSettings', JSON.stringify(settings));
    
    // Simulate some logic being applied
    if (key === 'autoplay') {
        console.log(`Video Autoplay is now ${value ? 'ON' : 'OFF'}`);
    }
}

window.initSettingsSystem = function() {
    let settings = JSON.parse(localStorage.getItem('appSettings')) || defaultSettings;
    
    // Initialize UI from localStorage
    const darkmodeToggle = document.getElementById('setting-darkmode');
    const autoplayToggle = document.getElementById('setting-autoplay');
    const qualitySelect = document.getElementById('setting-quality');
    const emailNotifToggle = document.getElementById('setting-email-notif');
    const studyReminderToggle = document.getElementById('setting-study-reminder');
    
    // Theme sync (theme logic uses data-theme in local storage separately, so we just sync the toggle)
    if (darkmodeToggle) {
        darkmodeToggle.checked = localStorage.getItem('theme') === 'dark';
    }
    
    if (autoplayToggle) autoplayToggle.checked = settings.autoplay;
    if (qualitySelect) qualitySelect.value = settings.quality;
    if (emailNotifToggle) emailNotifToggle.checked = settings.emailNotif;
    if (studyReminderToggle) studyReminderToggle.checked = settings.studyReminder;
}

document.addEventListener('DOMContentLoaded', () => {
    initSettingsSystem();
    initAboutSmartSystems();
});

// =========================================
// About Page Smart Systems
// =========================================

window.activateSmartTab = function(tabId, btnElement) {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.smart-tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.smart-tab-pane').forEach(pane => pane.classList.remove('active'));
    
    // Add active class to clicked button and target pane
    btnElement.classList.add('active');
    document.getElementById('tab-' + tabId).classList.add('active');
}

function initAboutSmartSystems() {
    // 1. Smart Stats Counter
    const stats = document.querySelectorAll('.stat-number');
    let animated = false;
    
    if (stats.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !animated) {
                    animated = true;
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-target'));
                        const suffix = stat.getAttribute('data-suffix') || '';
                        const duration = 2000; // 2 seconds
                        const increment = target / (duration / 16); // 60fps
                        let current = 0;
                        
                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                stat.innerText = Math.ceil(current) + suffix;
                                requestAnimationFrame(updateCounter);
                            } else {
                                stat.innerText = target + suffix;
                            }
                        };
                        updateCounter();
                    });
                }
            });
        }, { threshold: 0.5 });
        
        const statsGrid = document.getElementById('smartStats');
        if (statsGrid) statsObserver.observe(statsGrid);
    }
    
    // 2. Smart Timeline Scroll Reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineProgress = document.querySelector('.timeline-progress');
    const timelineLine = document.querySelector('.timeline-line');
    
    if (timelineItems.length > 0 && timelineLine) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    
                    // Calculate progress based on active items
                    const activeCount = document.querySelectorAll('.timeline-item.active').length;
                    const totalCount = timelineItems.length;
                    const percentage = (activeCount / totalCount) * 100;
                    if(timelineProgress) timelineProgress.style.height = `${percentage}%`;
                }
            });
        }, { threshold: 0.8, rootMargin: "-10% 0px -10% 0px" });
        
        timelineItems.forEach(item => {
            timelineObserver.observe(item);
        });
    }
}

// ----------------------------------------------------
// Storytelling Page Scroll Animations
// ----------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    }

    // 2. Parallax effect for Hero Background (rAF-throttled)
    const heroSection = document.querySelector('.story-hero');
    if (heroSection) {
        let parallaxTicking = false;
        window.addEventListener('scroll', () => {
            if (!parallaxTicking) {
                requestAnimationFrame(() => {
                    const scrollPos = window.scrollY;
                    if (scrollPos < window.innerHeight) {
                        heroSection.style.backgroundPositionY = `${scrollPos * 0.3}px`;
                    }
                    parallaxTicking = false;
                });
                parallaxTicking = true;
            }
        }, { passive: true });
    }
});

// AI Smart Search Logic
function populateSearch(query) {
    const input = document.getElementById('aiSearchInput');
    if(input) {
        input.value = query;
        input.focus();
    }
}

function handleAISearch() {
    const input = document.getElementById('aiSearchInput');
    const query = input ? input.value.trim() : '';
    if(!query) return;
    
    // Simulate AI Search loading state
    const btn = document.querySelector('.btn-ai-search');
    const originalText = btn ? btn.innerHTML : '';
    if (btn) {
        btn.innerHTML = '<i class="fas fa-robot fa-spin"></i> Menganalisis...';
        btn.disabled = true;
    }
    
    setTimeout(() => {
        // Smart AI Search: try to find exact or partial match across all data
        if (typeof searchData !== 'undefined' && searchData.length > 0) {
            const qLower = query.toLowerCase();
            const match = searchData.find(item => item.title.toLowerCase().includes(qLower));
            if (match) {
                window.location.href = match.link;
                return;
            }
        }
        // Fallback: Redirect to courses page with query
        window.location.href = `courses.html?q=${encodeURIComponent(query)}`;
        
        // Reset button state just in case
        if (btn) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }, 1000); // reduced loading time slightly for better UX
}

// AI Chat Assistant Logic
function toggleAIChat() {
    const chatWindow = document.getElementById('aiChatWindow');
    const overlay = document.getElementById('aiChatOverlay');
    
    if (chatWindow.classList.contains('active')) {
        chatWindow.classList.remove('active');
        overlay.classList.remove('active');
    } else {
        chatWindow.classList.add('active');
        overlay.classList.add('active');
        document.getElementById('aiChatInput').focus();
    }
}

function handleAIChatKeyPress(e) {
    if (e.key === 'Enter') {
        sendAIChat();
    }
}

function sendQuickPrompt(prompt) {
    document.getElementById('aiChatInput').value = prompt;
    sendAIChat();
}

function sendAIChat() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    if (!message) return;
    
    const messagesContainer = document.getElementById('aiChatMessages');
    
    // Add user message
    messagesContainer.innerHTML += `
        <div class="ai-message user-message">
            <div class="message-content">${message}</div>
        </div>
    `;
    input.value = '';
    scrollToBottom(messagesContainer);
    
    // Add typing indicator
    const typingId = 'typing-' + Date.now();
    messagesContainer.innerHTML += `
        <div class="ai-message system-message" id="${typingId}">
            <div class="message-content">
                <i class="fas fa-ellipsis-h fa-fade"></i> Mengetik...
            </div>
        </div>
    `;
    scrollToBottom(messagesContainer);
    
    // Simulate AI response
    setTimeout(() => {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();
        
        let response = '';
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('aqidah') || lowerMsg.includes('akidah')) {
            response = 'Untuk pelajaran Aqidah, kami merekomendasikan kitab <strong>Kitab Tauhid</strong> atau <strong>Al-Ushul Ats-Tsalatsah</strong> yang diajarkan oleh Dr. Firanda Andirja. <br><br><a href="courses.html" class="btn btn-outline" style="margin-top: 10px; display: inline-block; padding: 5px 10px; font-size: 0.8rem;">Lihat Kelas Aqidah</a>';
        } else if (lowerMsg.includes('daftar') || lowerMsg.includes('cara')) {
            response = 'Untuk mendaftar, Anda cukup mengklik tombol "Mulai Belajar" di halaman ini, lalu buat akun menggunakan email Anda secara gratis. Seluruh materi bebas diakses!';
        } else if (lowerMsg.includes('ustadz') || lowerMsg.includes('siapa')) {
            response = 'Platform ini dibimbing oleh asatidzah berkompeten, antara lain Dr. Syafiq Riza Basalamah, Dr. Firanda Andirja, Ust. M. Nuzul Dzikri, dan Ust. Ami Nur Baits.';
        } else {
            response = 'Pertanyaan yang menarik! Saya adalah asisten virtual berbasis simulasi. Untuk saat ini, saya sarankan Anda mengeksplorasi halaman <a href="courses.html" style="color: var(--primary-color);">Daftar Kelas</a> untuk menemukan kajian yang Anda butuhkan.';
        }
        
        messagesContainer.innerHTML += `
            <div class="ai-message system-message">
                <div class="message-content">${response}</div>
            </div>
        `;
        scrollToBottom(messagesContainer);
    }, 1500);
}

function scrollToBottom(el) {
    el.scrollTop = el.scrollHeight;
}








/* =========================================
   Dynamic Ads System with Carousel & Dots
   ========================================= */
const defaultAds = {
    "ad_1": {
        title: "Siap Memulai Perjalanan Menuntut Ilmu?",
        subtitle: "",
        desc: "Gabung bersama ribuan penuntut ilmu lainnya dan istiqomah belajar agama hari ini.",
        badgeText: "",
        badgeIcon: "",
        buttonText: "Daftar Gratis Sekarang",
        buttonLink: "#",
        icon: "fas fa-mosque",
        type: "cta",
        imageUrl: "",
        size: "medium"
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
        type: "promo",
        imageUrl: "",
        size: "medium"
    }
};

let adsData = JSON.parse(localStorage.getItem('admin_ads'));
if (!adsData || Object.keys(adsData).length === 0) {
    adsData = defaultAds;
    localStorage.setItem('admin_ads', JSON.stringify(adsData));
}

function renderAds() {
    const track = document.querySelector('.ad-carousel-track');
    if (!track) return;
    
    // Remove old dots if any
    const oldDots = track.parentElement.querySelector('.ad-carousel-dots');
    if (oldDots) oldDots.remove();
    
    track.innerHTML = '';
    const adEntries = Object.entries(adsData);
    
    adEntries.forEach(([key, ad], index) => {
        const slide = document.createElement('div');
        slide.className = 'ad-slide' + (index === 0 ? ' active' : '');
        slide.dataset.index = index;
        
        // If the ad has an image URL, show image-based ad
        if (ad.imageUrl) {
            slide.innerHTML = `
                <a href="${ad.buttonLink || '#'}" ${ad.buttonLink === '#' ? 'onclick="openModal(\'register\'); return false;"' : ''} style="display:block; height:100%;">
                    <img src="${ad.imageUrl}" alt="${ad.title}" class="ad-slide-image" onerror="this.parentElement.parentElement.style.display='none'">
                </a>`;
        } else if (ad.type === 'cta') {
            let titleHtml = ad.subtitle ? `<span>${ad.title}</span><br>${ad.subtitle}` : ad.title;
            slide.innerHTML = `
                <div class="cta-box">
                    <div class="cta-content">
                        <h2>${titleHtml}</h2>
                        <p>${ad.desc}</p>
                        <a href="${ad.buttonLink}" class="btn btn-white" ${ad.buttonLink === '#' ? 'onclick="openModal(\'register\'); return false;"' : ''}>${ad.buttonText}</a>
                    </div>
                    <div class="cta-decoration">
                        <i class="${ad.icon}"></i>
                    </div>
                </div>`;
        } else {
            let titleHtml = ad.subtitle ? `<span>${ad.title}</span><br>${ad.subtitle}` : ad.title;
            let badgeHtml = ad.badgeText ? `
                <div class="ad-badge">
                    <i class="${ad.badgeIcon || 'fas fa-info-circle'}" style="margin-right: 5px;"></i> ${ad.badgeText}
                </div>` : '';
            slide.innerHTML = `
                <div class="ad-banner-custom">
                    ${badgeHtml}
                    <div class="ad-content-wrapper">
                        <div class="ad-text">
                            <h3>${titleHtml}</h3>
                            <p>${ad.desc}</p>
                        </div>
                        <a href="${ad.buttonLink}" class="btn-ad-action">${ad.buttonText}</a>
                    </div>
                    <div class="ad-decoration-icon">
                        <i class="${ad.icon}"></i>
                    </div>
                </div>`;
        }
        
        track.appendChild(slide);
    });
    
    // Create dots if more than 1 slide
    if (adEntries.length > 1) {
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'ad-carousel-dots';
        adEntries.forEach(([key, ad], i) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (i === 0 ? ' active' : '');
            dot.dataset.index = i;
            dot.setAttribute('aria-label', `Iklan ${i + 1}`);
            dot.addEventListener('click', () => goToAdSlide(i));
            dotsContainer.appendChild(dot);
        });
        track.parentElement.appendChild(dotsContainer);
    }
    
    // Start auto-play
    initAdCarousel();
}

let adSlideTimer = null;
let adCurrentIndex = 0;

function goToAdSlide(index) {
    const track = document.querySelector('.ad-carousel-track');
    if (!track) return;
    const slides = track.querySelectorAll('.ad-slide');
    const dots = track.parentElement.querySelectorAll('.ad-carousel-dots .dot');
    if (slides.length === 0) return;
    
    // Deactivate current
    slides[adCurrentIndex]?.classList.remove('active');
    dots[adCurrentIndex]?.classList.remove('active');
    
    // Activate new
    adCurrentIndex = index % slides.length;
    slides[adCurrentIndex]?.classList.add('active');
    dots[adCurrentIndex]?.classList.add('active');
}

function initAdCarousel() {
    const track = document.querySelector('.ad-carousel-track');
    if (!track) return;
    const slides = track.querySelectorAll('.ad-slide');
    if (slides.length <= 1) return;
    
    adCurrentIndex = 0;
    
    function startAutoPlay() {
        clearInterval(adSlideTimer);
        adSlideTimer = setInterval(() => {
            goToAdSlide(adCurrentIndex + 1);
        }, 5000);
    }
    
    startAutoPlay();
    
    // Pause on hover
    const container = track.closest('.ad-carousel-container');
    if (container) {
        container.addEventListener('mouseenter', () => clearInterval(adSlideTimer));
        container.addEventListener('mouseleave', startAutoPlay);
        container.addEventListener('touchstart', () => clearInterval(adSlideTimer), {passive: true});
        container.addEventListener('touchend', startAutoPlay, {passive: true});
    }
}

// Render on load + inject decoration icon styles
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
    .ad-decoration-icon {
        position: absolute;
        right: 3rem;
        top: auto;
        font-size: 10rem;
        color: rgba(255, 255, 255, 0.2);
        z-index: -1;
        pointer-events: none;
    }
    @media (max-width: 768px) {
        .ad-decoration-icon { display: none; }
    }
    `;
    document.head.appendChild(style);
    
    renderAds();
});



// --- TOP AD BAR RENDER ---
document.addEventListener('DOMContentLoaded', () => {
    // Jangan tampilkan Top Ad di halaman Admin
    if (document.querySelector('.admin-layout')) return;

    const topAdData = JSON.parse(localStorage.getItem('admin_top_ad'));
    if (topAdData && topAdData.active && topAdData.text) {
        const adBar = document.createElement('div');
        adBar.className = 'global-top-ad-bar';
        
        let contentHtml = `<span class="ad-text">${topAdData.text}</span>`;
        if (topAdData.btnText) {
            if (topAdData.link) {
                contentHtml += `<a href="${topAdData.link}" class="ad-btn">${topAdData.btnText} <i class="fas fa-arrow-right"></i></a>`;
            } else {
                contentHtml += `<span class="ad-btn">${topAdData.btnText}</span>`;
            }
        }
        
        adBar.innerHTML = `
            <div class="container ad-bar-container">
                <div class="ad-content">
                    ${contentHtml}
                </div>
                <button class="ad-close-btn" id="topAdCloseBtn" aria-label="Tutup"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Force it to be fixed at the absolute top, covering nothing important
        adBar.style.position = 'fixed';
        adBar.style.top = '0';
        adBar.style.left = '0';
        adBar.style.width = '100%';
        adBar.style.zIndex = '100000'; // Higher than header
        
        document.body.appendChild(adBar);
        
        // Push the fixed header down so it isn't hidden
        const header = document.querySelector('.header');
        
        const adjustLayout = () => {
            if (adBar.style.display === 'none') return;
            const adHeight = adBar.offsetHeight;
            if (header) {
                header.style.top = adHeight + 'px';
                header.style.transition = 'top 0.3s ease';
            }
            // Push body content down so nothing is hidden behind the fixed ad bar + header
            document.body.style.paddingTop = adHeight + 'px';
            document.body.style.transition = 'padding-top 0.3s ease';
        };
        
        // Adjust immediately and on resize
        setTimeout(adjustLayout, 50);
        window.addEventListener('resize', adjustLayout);
        
        // Handle close
        document.getElementById('topAdCloseBtn').addEventListener('click', () => {
            adBar.style.display = 'none';
            if (header) header.style.top = '0';
            document.body.style.paddingTop = '0';
        });
    }
});

// script.js
document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================
    // DATA EVENT (Fokus Oktober & November 2025)
    // ==========================================================
    const eventData = [
        // --- OKTOBER 2025 ---
        {
            title: 'Seminar Nasional Riset Pendidikan',
            start: '2025-10-05T08:30:00',
            extendedProps: { 
                category: 'akademik', 
                location: 'Fakultas Ilmu Sosial dan Hukum', 
                detailUrl: 'event-detail.html?id=3' 
            },
            color: '#004488'
        },
        {
            title: 'Unesa Festival',
            start: '2025-10-15', 
            end: '2025-10-18', // Event multi-hari
            extendedProps: { 
                category: 'lainnya', 
                location: 'GrandCity UNESA', 
                detailUrl: 'event-detail.html?id=11' 
            },
            color: '#004488'
        },
        {
            title: 'Lomba Debat Bahasa Inggris',
            start: '2025-10-28',
            extendedProps: { 
                category: 'akademik', 
                location: 'Gedung Bahasa', 
                detailUrl: 'event-detail.html?id=12' 
            },
            color: '#004488'
        },

        // --- NOVEMBER 2025 ---
        {
            title: 'Lomba Tari Tradisional Nusantara',
            start: '2025-11-12',
            extendedProps: { 
                category: 'seni', 
                location: 'Gedung Kesenian', 
                detailUrl: 'event-detail.html?id=5' 
            },
            color: '#dc3545'
        },
        {
            title: 'Turnamen E-Sports Rektor Cup (Final)',
            start: '2025-11-20',
            extendedProps: { 
                category: 'olahraga', 
                location: 'Student Center', 
                detailUrl: 'event-detail.html?id=13' 
            },
            color: '#28a745'
        },
        {
            title: 'Webinar Pengembangan Karir',
            start: '2025-11-25T14:00:00',
            extendedProps: { 
                category: 'komunitas', 
                location: 'Online via Zoom', 
                detailUrl: 'event-detail.html?id=14' 
            },
            color: '#ffc107'
        },

        // --- EVENT BULAN LAIN (Untuk Navigasi dan Filter) ---
        {
            title: 'Dies Natalis UNESA Ke-61',
            start: '2025-03-17',
            extendedProps: { 
                category: 'akademik', 
                location: 'Graha UNESA', 
                detailUrl: 'event-detail.html?id=1'
            },
            color: '#004488'
        },
        {
            title: 'Wisuda Sarjana dan Pascasarjana Periode I',
            start: '2025-04-20',
            end: '2025-04-22',
            extendedProps: { 
                category: 'akademik', 
                location: 'Graha UNESA', 
                detailUrl: 'event-detail.html?id=2' 
            },
            color: '#004488'
        },
        {
            title: 'Penerimaan Mahasiswa Baru (PKKMB)',
            start: '2025-08-18',
            end: '2025-08-23',
            extendedProps: { 
                category: 'lainnya', 
                location: 'Kampus Lidah Wetan', 
                detailUrl: 'event-detail.html?id=10' 
            },
            color: '#6f42c1'
        }
    ];


    // ==========================================================
    // 1. FUNGSI MUAT HEADER & FOOTER (MENGGUNAKAN FETCH)
    // ==========================================================
    const loadHtmlContent = async (url, targetId) => {
        try {
            const response = await fetch(url);
            const html = await response.text();
            document.getElementById(targetId).innerHTML = html;
            
            // Panggil inisialisasi setelah header dimuat
            if (targetId === 'header-placeholder') {
                initializeThemeToggle();
                initializeNavToggle();
            }
        } catch (error) {
            console.error(`Gagal memuat konten dari ${url}:`, error);
        }
    };

    // ==========================================================
    // 2. FUNGSI DARK MODE & NAVIGASI
    // ==========================================================
    const initializeThemeToggle = () => {
        const toggleBtn = document.getElementById("toggleTheme");
        const body = document.body;

        if (localStorage.getItem("theme") === "dark") {
            body.classList.add("dark-mode");
            if (toggleBtn) toggleBtn.textContent = "Mode Malam";
        } else if (toggleBtn) {
            toggleBtn.textContent = "Mode Malam";
        }

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                body.classList.toggle("dark-mode");
                const isDark = body.classList.contains("dark-mode");
                toggleBtn.textContent = isDark ? "Mode Siang" : "Mode Malam";
                localStorage.setItem("theme", isDark ? "dark" : "light");
            });
        }
    };

    const initializeNavToggle = () => {
        const navToggle = document.getElementById("navToggle");
        const navMenu = document.getElementById("navMenu");

        if (navToggle && navMenu) {
            navToggle.addEventListener("click", () => {
                navMenu.classList.toggle("active");
                navToggle.classList.toggle("active");
            });
            
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    if (link.id !== 'toggleTheme') { 
                        navMenu.classList.remove("active");
                        navToggle.classList.remove("active");
                    }
                });
            });
        }
    };


    // ==========================================================
    // 3. FUNGSI INISIALISASI KALENDER & FILTER
    // ==========================================================
    const initializeCalendar = () => {
        const calendarEl = document.getElementById('full-calendar-container');

        if (!calendarEl || typeof FullCalendar === 'undefined') return; 

        // Inisialisasi FullCalendar
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            initialDate: '2025-10-01', // SET DEFAULT VIEW KE OKTOBER 2025
            locale: 'id',
            firstDay: 1, 
            height: 'auto',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,listWeek'
            },
            events: eventData, 
            
            eventClick: function(info) {
                // Navigasi ke detail saat event diklik
                const detailUrl = info.event.extendedProps.detailUrl;
                if (detailUrl) {
                    window.location.href = detailUrl; 
                }
            }
        });

        calendar.render();
        
        // --- LOGIKA FILTER KALENDER ---
        const categoryFilter = document.getElementById('category-filter');
        const yearFilter = document.getElementById('year-filter');
        const searchInput = document.getElementById('event-search');

        const applyFilters = () => {
            const selectedCategory = categoryFilter ? categoryFilter.value : '';
            const selectedYear = yearFilter ? yearFilter.value : '';
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            
            const filteredEvents = eventData.filter(event => {
                const eventYear = new Date(event.start).getFullYear().toString();
                const matchesCategory = !selectedCategory || (event.extendedProps.category && event.extendedProps.category === selectedCategory);
                const matchesYear = !selectedYear || eventYear === selectedYear;
                const matchesSearch = !searchTerm || 
                                      event.title.toLowerCase().includes(searchTerm) || 
                                      (event.extendedProps.location && event.extendedProps.location.toLowerCase().includes(searchTerm));
                
                return matchesCategory && matchesYear && matchesSearch;
            });
            
            calendar.removeAllEvents();
            calendar.addEventSource(filteredEvents);
        };

        if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
        if (yearFilter) yearFilter.addEventListener('change', applyFilters);
        if (searchInput) searchInput.addEventListener('input', applyFilters);
    };


    // ==========================================================
    // 4. FUNGSI DETAIL EVENT DINAMIS (DI event-detail.html)
    // ==========================================================
    const loadEventDetail = () => {
        if (window.location.pathname.includes('event-detail.html')) {
            const params = new URLSearchParams(window.location.search);
            const eventId = params.get('id');

            if (!eventId) return;

            // Cari data event berdasarkan ID
            const event = eventData.find(e => e.extendedProps.detailUrl.includes(`id=${eventId}`));

            if (event) {
                document.title = `Detail Event: ${event.title} | UNESA Event`;
                
                // Mengisi data ke elemen-elemen di event-detail.html
                const h1 = document.querySelector('.event-detail-content h1');
                const pDate = document.querySelector('.event-date strong');
                const pLocation = document.querySelector('.event-location strong');
                const pCategory = document.querySelector('.event-category strong');
                
                if (h1) h1.textContent = event.title;
                if (pLocation) pLocation.textContent = event.extendedProps.location;
                if (pCategory) pCategory.textContent = event.extendedProps.category.toUpperCase();

                // Format Tanggal
                const formatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
                const startDate = new Date(event.start).toLocaleDateString('id-ID', formatOptions);
                let dateText = startDate;

                if (event.end) {
                    const endDate = new Date(event.end).toLocaleDateString('id-ID', formatOptions);
                    dateText = `${startDate} - ${endDate}`;
                }

                if (pDate) pDate.textContent = dateText;
                
            } else {
                // Tampilkan pesan jika event tidak ditemukan
                const container = document.querySelector('.event-detail-content .container');
                if(container) {
                    container.innerHTML = '<h1>Event tidak ditemukan.</h1><p class="deskripsi">Event yang Anda cari mungkin sudah dihapus atau tautannya salah.</p><a href="calendar.html" class="tombol-utama">Kembali ke Kalender</a>';
                }
            }
        }
    };


    // ==========================================================
    // EKSEKUSI
    // ==========================================================
    // 1. Muat Header & Footer
    loadHtmlContent('header.html', 'header-placeholder');
    loadHtmlContent('footer.html', 'footer-placeholder');

    // 2. Inisialisasi Fungsionalitas
    // Catatan: Calendar dan Detail Event dipanggil di sini setelah DOM Ready
    initializeCalendar();
    loadEventDetail();
});
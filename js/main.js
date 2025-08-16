document.addEventListener('DOMContentLoaded', () => {

    // --- BAGIAN 1: LOGIKA ASLI ANDA (LOCAL WISDOM & MEMORY MAPPING) ---

    const wisdomDetails = {
        situ: {
            title: "Situ System - Natural Water Storage",
            content: `<p>The Situ system represents traditional Indonesian water management wisdom. These natural retention ponds served multiple functions: flood control, groundwater recharge, and providing ecosystem services.</p>`
        },
        kanal: {
            title: "Traditional Canal Networks",
            content: `<p>Traditional canal systems were designed with deep understanding of water flow dynamics, following natural gradients and preventing bottlenecks through interconnected design.</p>`
        },
        rumah: {
            title: "Elevated Architecture Wisdom",
            content: `<p>Traditional elevated architecture, like stilt houses, demonstrates sophisticated adaptation to flood-prone environments by raising living spaces above flood levels.</p>`
        }
    };

    // Fungsi untuk menampilkan modal Local Wisdom
    window.showWisdomDetail = function(wisdomType) {
        const wisdom = wisdomDetails[wisdomType];
        const modal = document.getElementById('wisdom-modal');
        if (wisdom && modal) {
            modal.querySelector('#wisdom-title').textContent = wisdom.title;
            modal.querySelector('#wisdom-detail-content').innerHTML = wisdom.content;
            modal.classList.remove('hidden');
        }
    };

    // Fungsi untuk menutup modal Local Wisdom
    window.closeWisdomDetail = function() {
        const modal = document.getElementById('wisdom-modal');
        if (modal) modal.classList.add('hidden');
    };

    // Event listener untuk form Memory Mapping (dengan pengecekan)
    const memoryForm = document.getElementById('memory-form');
    if (memoryForm) {
        memoryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('contributor-name').value;
            const location = document.getElementById('flood-location').value;
            const year = document.getElementById('flood-year').value;
            const story = document.getElementById('flood-story').value;

            if (name && location && year && story) {
                const storiesContainer = document.getElementById('memory-stories');
                const newStory = document.createElement('div');
                newStory.className = 'memory-card bg-slate-800 rounded-lg p-4';
                newStory.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-blue-300">${name} - ${location}</h4>
                        <span class="text-sm text-slate-400">${year}</span>
                    </div>
                    <p class="text-sm text-slate-300">"${story}"</p>`;
                storiesContainer.insertBefore(newStory, storiesContainer.firstChild);
                memoryForm.reset();
                alert('Thank you for sharing your story!');
            }
        });
    }


  // --- BAGIAN 2: LOGIKA BARU (LEAFLET DENGAN FITUR LENGKAP) ---

    let map;
    let layers = {}; // Objek untuk menyimpan semua layer GeoJSON
    let legend; // Variabel untuk kontrol legenda

    const timelineData = {
        0: { era: "Pre-Colonial (1500s)", impacts: [{ status: "green", text: "Natural water absorption systems intact" }] },
        1: { era: "Dutch Colonial (1600s)", impacts: [{ status: "yellow", text: "First artificial drainage systems" }] },
        2: { era: "Colonial Expansion (1800s)", impacts: [{ status: "red", text: "Natural wetlands filled" }] },
        3: { era: "Independence Era (1950s)", impacts: [{ status: "red", text: "Increased flood frequency" }] },
        4: { era: "Modern Jakarta (2024)", impacts: [{ status: "red", text: "Severe land subsidence" }] }
    };

    /**
     * Fungsi untuk membuat popup saat fitur di klik.
     * @param {object} feature - Fitur GeoJSON.
     * @param {object} layer - Layer Leaflet.
     */
    function onEachFeature(feature, layer) {
        if (feature.properties) {
            // Buat konten popup dari properties GeoJSON
            let popupContent = "<h4>Informasi Fitur</h4>";
            // Ganti 'NAMA_PROPERTI' dengan nama kolom atribut Anda
            if (feature.properties.NAMOBJ) {
                popupContent += `<b>Nama:</b> ${feature.properties.NAMOBJ}<br/>`;
            }
            if (feature.properties.REMARK) {
                popupContent += `<b>Keterangan:</b> ${feature.properties.REMARK}`;
            }
            layer.bindPopup(popupContent);
        }
    }

    /**
     * Menginisialisasi peta Leaflet dan memuat semua data GeoJSON.
     */
    function initializeLeafletMap() {
        map = L.map('leafletMapDiv').setView([-6.2088, 106.8456], 11);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 20
        }).addTo(map);

        // === PERUBAHAN 1: Tambahkan file GeoJSON sungai ke daftar ===
        const layerFiles = {
            administrasi: 'assets/data/adm_dki-jakart_FeaturesToJSO.geojson',
            sungai: 'assets/data/Sungai_Primer_FeaturesToJSON.geojson'
        };

        // Muat semua file GeoJSON secara bersamaan
        const promises = Object.entries(layerFiles).map(([key, url]) =>
            fetch(url).then(response => {
                if (!response.ok) throw new Error(`Gagal memuat ${url}`);
                return response.json().then(data => ({ key, data }));
            })
        );

        Promise.all(promises)
            .then(results => {
                results.forEach(({ key, data }) => {
                    // === PERUBAHAN 2: Tambahkan styling dan popup untuk layer sungai ===
                    if (key === 'administrasi') {
                        layers[key] = L.geoJSON(data, {
                            style: { color: "#4ade80", weight: 1, opacity: 0.7 }, // Hijau
                            onEachFeature: onEachFeature
                        });
                    }
                    if (key === 'sungai') {
                        layers[key] = L.geoJSON(data, {
                            style: { color: "#60a5fa", weight: 2, opacity: 0.9 }, // Biru
                            onEachFeature: onEachFeature
                        });
                    }
                });
                // Panggil update pertama setelah semua data berhasil dimuat
                updateTimelineDisplay(document.getElementById('timeline-slider').value);
            })
            .catch(error => console.error('Error memuat satu atau lebih file GeoJSON:', error));

        // Inisialisasi legenda
        initializeLegend();
    }

    /**
     * Membuat dan menambahkan kontrol legenda ke peta.
     */
    function initializeLegend() {
        legend = L.control({ position: 'bottomright' });
        legend.onAdd = function (map) {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = '<h4>Legenda</h4>'; // Judul awal
            return div;
        };
        legend.addTo(map);
    }

    /**
     * Memperbarui konten legenda berdasarkan layer yang aktif.
     */
    function updateLegend(activeLayers) {
        let content = '<h4>Legenda</h4>';
        if (activeLayers.includes('administrasi')) {
            content += '<i style="background: #4ade80"></i> Batas Administrasi<br>';
        }
        // === PERUBAHAN 3: Tambahkan item legenda untuk sungai ===
        if (activeLayers.includes('sungai')) {
            content += '<i style="background: #60a5fa"></i> Sungai Primer<br>';
        }
        legend.getContainer().innerHTML = content;
    }

    /**
     * Memperbarui lapisan peta yang terlihat berdasarkan slider.
     */
    function updateMapLayers(timelineValue) {
        if (!map) return;
        let activeLayersForLegend = [];

        // Hapus semua layer terlebih dahulu
        Object.values(layers).forEach(layer => {
            if (map.hasLayer(layer)) {
                map.removeLayer(layer);
            }
        });

        // Tampilkan layer berdasarkan era
        if (timelineValue >= 0) { // Tampilkan administrasi di semua era
            if (layers.administrasi) {
                layers.administrasi.addTo(map);
                activeLayersForLegend.push('administrasi');
            }
        }

        // === PERUBAHAN 4: Tambahkan logika untuk menampilkan layer sungai ===
        // Contoh: Tampilkan sungai mulai dari era kolonial
        if (timelineValue >= 1) {
            if (layers.sungai) {
                layers.sungai.addTo(map);
                activeLayersForLegend.push('sungai');
            }
        }

        updateLegend(activeLayersForLegend);
    }


    // --- BAGIAN 3: LOGIKA UI BERSAMA ---

    function updateTimelineDisplay(value) {
        const data = timelineData[value];
        if (!data) return;

        const eraLabel = document.getElementById('era-label');
        if (eraLabel) {
            eraLabel.textContent = data.era;
        }

        const impactContent = document.getElementById('impact-content');
        if (impactContent) {
            impactContent.innerHTML = (data.impacts || []).map(impact => {
                const colorClass = `bg-${impact.status}-500`;
                return `<div class="flex items-center space-x-3"><div class="w-3 h-3 ${colorClass} rounded-full"></div><span>${impact.text}</span></div>`;
            }).join('');
        }

        updateMapLayers(parseInt(value));
    }

    const timelineSlider = document.getElementById('timeline-slider');
    if (timelineSlider) {
        timelineSlider.addEventListener('input', (e) => {
            updateTimelineDisplay(e.target.value);
        });
    }

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.dataset.section;
            document.querySelectorAll('.section-content').forEach(section => section.classList.add('hidden'));
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');

            document.querySelectorAll('.nav-btn').forEach(b => b.classList.replace('bg-blue-600', 'bg-slate-600'));
            e.target.classList.replace('bg-slate-600', 'bg-blue-600');
        });
    });

    // --- INISIALISASI ---
    initializeLeafletMap();
    updateTimelineDisplay(0);
});

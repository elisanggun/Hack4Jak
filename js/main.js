// Menunggu seluruh konten halaman dimuat sebelum menjalankan skrip
document.addEventListener('DOMContentLoaded', () => {

    // --- BAGIAN 1: LOGIKA ASLI ANDA (LOCAL WISDOM & MEMORY MAPPING) ---

    const wisdomDetails = {
        situ: {
            title: "Situ System - Natural Water Storage",
            content: `<p>The Situ system represents traditional Indonesian water management wisdom...</p>` // Isi dengan konten asli Anda
        },
        kanal: {
            title: "Traditional Canal Networks",
            content: `<p>Traditional canal systems were designed with deep understanding...</p>` // Isi dengan konten asli Anda
        },
        rumah: {
            title: "Elevated Architecture Wisdom",
            content: `<p>Traditional elevated architecture demonstrates sophisticated adaptation...</p>` // Isi dengan konten asli Anda
        }
    };

    // Fungsi untuk menampilkan modal Local Wisdom (dari kode asli Anda)
    window.showWisdomDetail = function(wisdomType) {
        const wisdom = wisdomDetails[wisdomType];
        const modal = document.getElementById('wisdom-modal');
        if (wisdom && modal) {
            modal.querySelector('#wisdom-title').textContent = wisdom.title;
            modal.querySelector('#wisdom-detail-content').innerHTML = wisdom.content;
            modal.classList.remove('hidden');
        }
    }

    // Fungsi untuk menutup modal Local Wisdom (dari kode asli Anda)
    window.closeWisdomDetail = function() {
        const modal = document.getElementById('wisdom-modal');
        if (modal) modal.classList.add('hidden');
    }
    
    // Event listener untuk form Memory Mapping (dari kode asli Anda)
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
                // CATATAN: alert() tidak ideal, pertimbangkan untuk menggunakan modal custom.
                alert('Thank you for sharing your story!');
            }
        });
    }


    // --- BAGIAN 2: LOGIKA BARU (ARCGIS OAUTH 2.0 & PETA INTERAKTIF) ---

    // Variabel global untuk peta
    let map, view;
    let layers = {};

    // Data untuk linimasa (diperpendek untuk contoh)
    const timelineData = {
        0: { era: "Pre-Colonial (1500s)", impacts: [{ status: "green", text: "Natural water absorption systems intact" }] },
        1: { era: "Dutch Colonial (1600s)", impacts: [{ status: "yellow", text: "First artificial drainage systems" }] },
        2: { era: "Colonial Expansion (1800s)", impacts: [{ status: "red", text: "Natural wetlands filled" }] },
        3: { era: "Independence Era (1950s)", impacts: [{ status: "red", text: "Increased flood frequency" }] },
        4: { era: "Modern Jakarta (2024)", impacts: [{ status: "red", text: "Severe land subsidence" }] }
    };

    // Memuat modul ArcGIS yang diperlukan
    require([
        "esri/identity/OAuthInfo",
        "esri/identity/IdentityManager",
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer"
    ], function(OAuthInfo, esriId, Map, MapView, FeatureLayer) {

        // Konfigurasi informasi OAuth 2.0
        // --- MENJADI ---
        const info = new OAuthInfo({
            appId: "9Fexni0JVY1MIw82",
            popup: true,
            popupCallbackUrl: "index.html" // Tambahkan baris ini
        });
        esriId.registerOAuthInfos([info]);

        const authContainer = document.getElementById('auth-container');
        const authButton = document.getElementById('auth-button');
        const mapDiv = document.getElementById('arcgisMapDiv');

        // Cek status login
        esriId.checkSignInStatus(info.portalUrl + "/sharing").then(handleSignedIn).catch(handleSignedOut);

        authButton.addEventListener("click", () => esriId.getCredential(info.portalUrl + "/sharing"));

        function handleSignedIn() {
            authContainer.classList.add('hidden');
            mapDiv.classList.remove('hidden');
            initializeArcGISMap(Map, MapView, FeatureLayer);
        }

        function handleSignedOut() {
            authContainer.classList.remove('hidden');
            mapDiv.classList.add('hidden');
        }
    });

    /**
     * Menginisialisasi peta ArcGIS setelah login berhasil.
     */
    function initializeArcGISMap(Map, MapView, FeatureLayer) {
        // Definisikan lapisan data Anda
        layers.rivers = new FeatureLayer({ url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Hydro_Reference_Overlay/FeatureServer/0", visible: false });
        layers.urban = new FeatureLayer({ url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Urban_Areas/FeatureServer/0", visible: false });
        layers.floodRisk = new FeatureLayer({ url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/World_Flood_Hazard/FeatureServer/0", visible: false, opacity: 0.6 });

        map = new Map({
            basemap: "arcgis-dark-gray",
            layers: Object.values(layers)
        });

        view = new MapView({
            container: "arcgisMapDiv",
            map: map,
            center: [106.8456, -6.2088],
            zoom: 11
        });

        // Sinkronkan slider dengan peta saat pertama kali dimuat
        updateTimelineDisplay(document.getElementById('timeline-slider').value);
    }

    /**
     * Memperbarui lapisan peta yang terlihat berdasarkan slider.
     */
    function updateMapLayers(timelineValue) {
        if (!layers.rivers) return; // Pastikan lapisan sudah ada
        Object.values(layers).forEach(layer => layer.visible = false);

        switch (timelineValue) {
            case 0: layers.rivers.visible = true; break;
            case 1:
            case 2: layers.rivers.visible = true; layers.urban.visible = true; break;
            case 3:
            case 4: layers.rivers.visible = true; layers.urban.visible = true; layers.floodRisk.visible = true; break;
        }
    }

    // --- BAGIAN 3: LOGIKA UI BERSAMA ---

    /**
     * Memperbarui semua elemen UI di bagian linimasa.
     */
    function updateTimelineDisplay(value) {
        const data = timelineData[value];
        if (!data) return;

        document.getElementById('era-label').textContent = data.era;
        const impactContent = document.getElementById('impact-content');
        impactContent.innerHTML = (data.impacts || []).map(impact => {
            const colorClass = `bg-${impact.status}-500`;
            return `<div class="flex items-center space-x-3"><div class="w-3 h-3 ${colorClass} rounded-full"></div><span>${impact.text}</span></div>`;
        }).join('');

        updateMapLayers(parseInt(value));
    }

    // Event listener untuk slider linimasa
    document.getElementById('timeline-slider').addEventListener('input', (e) => {
        updateTimelineDisplay(e.target.value);
    });

    // Event listener untuk navigasi utama (diperbaiki agar lebih bersih)
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const sectionId = e.target.dataset.section;
            document.querySelectorAll('.section-content').forEach(section => section.classList.add('hidden'));
            document.getElementById(`${sectionId}-section`).classList.remove('hidden');

            document.querySelectorAll('.nav-btn').forEach(b => b.classList.replace('bg-blue-600', 'bg-slate-600'));
            e.target.classList.replace('bg-slate-600', 'bg-blue-600');
        });
    });

    // Inisialisasi tampilan awal
    updateTimelineDisplay(0);
});

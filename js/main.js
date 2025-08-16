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


    // --- BAGIAN 2: LOGIKA BARU (LEAFLET & PETA INTERAKTIF) ---

    let map;
    let layers = {};

    const timelineData = {
        0: { era: "Pre-Colonial (1500s)", impacts: [{ status: "green", text: "Natural water absorption systems intact" }] },
        1: { era: "Dutch Colonial (1600s)", impacts: [{ status: "yellow", text: "First artificial drainage systems" }] },
        2: { era: "Colonial Expansion (1800s)", impacts: [{ status: "red", text: "Natural wetlands filled" }] },
        3: { era: "Independence Era (1950s)", impacts: [{ status: "red", text: "Increased flood frequency" }] },
        4: { era: "Modern Jakarta (2024)", impacts: [{ status: "red", text: "Severe land subsidence" }] }
    };

    function initializeLeafletMap() {
        if (document.getElementById('leafletMapDiv') && !map) { // Cek jika div ada dan peta belum dibuat
            map = L.map('leafletMapDiv').setView([-6.2088, 106.8456], 11);

            L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                subdomains: 'abcd',
                maxZoom: 20
            }).addTo(map);

            fetch('assets/data/analisis_banjir.geojson')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    layers.floodRisk = L.geoJSON(data, {
                        style: { color: "#ff7800", weight: 2, opacity: 0.8 }
                    });
                })
                .catch(error => console.error('Error loading GeoJSON:', error));

            updateTimelineDisplay(document.getElementById('timeline-slider').value);
        }
    }

    function updateMapLayers(timelineValue) {
        if (!map) return;

        if (layers.floodRisk && map.hasLayer(layers.floodRisk)) {
            map.removeLayer(layers.floodRisk);
        }

        if (timelineValue >= 3 && layers.floodRisk) {
            layers.floodRisk.addTo(map);
        }
    }

    // --- BAGIAN 3: LOGIKA UI BERSAMA ---

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

    document.getElementById('timeline-slider').addEventListener('input', (e) => {
        updateTimelineDisplay(e.target.value);
    });

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

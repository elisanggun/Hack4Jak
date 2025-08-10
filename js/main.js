        // Timeline data with interactive maps
        const timelineData = {
            0: {
                era: "Pre-Colonial (1500s)",
                title: "Natural River Systems",
                description: "Click on elements to explore • Meandering rivers with natural flood plains",
                mapElements: {
                    rivers: { opacity: 1, display: true },
                    forests: { opacity: 0.8, display: true },
                    wetlands: { opacity: 0.6, display: true },
                    settlements: { opacity: 1, display: true, count: 2 },
                    urban: { opacity: 0, display: false },
                    floods: { opacity: 0, display: false }
                },
                impacts: [
                    { status: "green", text: "Natural water absorption systems intact" },
                    { status: "green", text: "Minimal urban development" },
                    { status: "green", text: "Traditional water management practices" },
                    { status: "blue", text: "Seasonal flooding as natural cycle" }
                ]
            },
            1: {
                era: "Dutch Colonial (1600s)",
                title: "Canal Construction Era",
                description: "Click to explore colonial infrastructure • Straight canals and early urban planning",
                mapElements: {
                    rivers: { opacity: 0.8, display: true, straightened: true },
                    forests: { opacity: 0.5, display: true },
                    wetlands: { opacity: 0.3, display: true },
                    settlements: { opacity: 1, display: true, count: 5 },
                    urban: { opacity: 0.3, display: true },
                    floods: { opacity: 0, display: false }
                },
                impacts: [
                    { status: "yellow", text: "First artificial drainage systems" },
                    { status: "green", text: "Improved water flow control" },
                    { status: "yellow", text: "Beginning of natural system modification" },
                    { status: "blue", text: "Batavia city establishment" }
                ]
            },
            2: {
                era: "Colonial Expansion (1800s)",
                title: "Urban Expansion Period",
                description: "Explore development impacts • Increased development and land reclamation",
                mapElements: {
                    rivers: { opacity: 0.6, display: true, straightened: true },
                    forests: { opacity: 0.3, display: true },
                    wetlands: { opacity: 0.1, display: true },
                    settlements: { opacity: 1, display: true, count: 10 },
                    urban: { opacity: 0.6, display: true },
                    floods: { opacity: 0.2, display: true }
                },
                impacts: [
                    { status: "yellow", text: "Significant land use changes" },
                    { status: "red", text: "Natural wetlands filled" },
                    { status: "yellow", text: "Population growth pressure" },
                    { status: "red", text: "First major flood problems" }
                ]
            },
            3: {
                era: "Independence Era (1950s)",
                title: "Rapid Urbanization",
                description: "See urban growth effects • Post-independence development boom",
                mapElements: {
                    rivers: { opacity: 0.4, display: true, straightened: true },
                    forests: { opacity: 0.1, display: true },
                    wetlands: { opacity: 0.05, display: true },
                    settlements: { opacity: 1, display: true, count: 20 },
                    urban: { opacity: 0.8, display: true },
                    floods: { opacity: 0.4, display: true }
                },
                impacts: [
                    { status: "red", text: "Massive rural-urban migration" },
                    { status: "red", text: "Informal settlements in flood zones" },
                    { status: "yellow", text: "Infrastructure development" },
                    { status: "red", text: "Increased flood frequency" }
                ]
            },
            4: {
                era: "Modern Jakarta (2024)",
                title: "Megacity Crisis",
                description: "Explore current challenges • Dense urban landscape with critical flood risks",
                mapElements: {
                    rivers: { opacity: 0.3, display: true, straightened: true, polluted: true },
                    forests: { opacity: 0.05, display: true },
                    wetlands: { opacity: 0.02, display: true },
                    settlements: { opacity: 1, display: true, count: 50 },
                    urban: { opacity: 1, display: true },
                    floods: { opacity: 0.7, display: true }
                },
                impacts: [
                    { status: "red", text: "Severe land subsidence" },
                    { status: "red", text: "Overwhelmed drainage systems" },
                    { status: "red", text: "Climate change amplification" },
                    { status: "yellow", text: "New adaptation strategies needed" }
                ]
            }
        };

        // Wisdom details
        const wisdomDetails = {
            situ: {
                title: "Situ System - Natural Water Storage",
                content: `
                    <div class="space-y-4">
                        <div class="text-center mb-6">
                            <svg width="200" height="150" viewBox="0 0 200 150" class="mx-auto">
                                <circle cx="100" cy="75" r="60" fill="#3b82f6" opacity="0.3"/>
                                <circle cx="100" cy="75" r="40" fill="#1d4ed8" opacity="0.5"/>
                                <circle cx="100" cy="75" r="20" fill="#1e40af"/>
                                <path d="M40 75 Q100 50 160 75" stroke="#60a5fa" stroke-width="4" fill="none"/>
                                <circle cx="80" cy="45" r="8" fill="#22c55e"/>
                                <circle cx="120" cy="45" r="8" fill="#22c55e"/>
                                <circle cx="100" cy="35" r="6" fill="#22c55e"/>
                            </svg>
                        </div>
                        <p class="text-slate-300">The Situ system represents traditional Indonesian water management wisdom. These natural retention ponds served multiple functions:</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-300">
                            <li><strong>Flood Control:</strong> Stored excess rainwater during monsoons</li>
                            <li><strong>Groundwater Recharge:</strong> Allowed water to slowly infiltrate soil</li>
                            <li><strong>Ecosystem Services:</strong> Supported biodiversity and local climate</li>
                            <li><strong>Community Resource:</strong> Provided water for daily needs and agriculture</li>
                        </ul>
                        <div class="bg-blue-900 p-4 rounded-lg">
                            <h4 class="font-semibold text-blue-200 mb-2">Modern Application</h4>
                            <p class="text-sm text-blue-100">Contemporary urban planning can integrate situ principles through retention parks, bioswales, and constructed wetlands that manage stormwater while providing community spaces.</p>
                        </div>
                    </div>
                `
            },
            kanal: {
                title: "Traditional Canal Networks",
                content: `
                    <div class="space-y-4">
                        <div class="text-center mb-6">
                            <svg width="200" height="150" viewBox="0 0 200 150" class="mx-auto">
                                <path d="M20 75 L180 75" stroke="#3b82f6" stroke-width="12"/>
                                <path d="M20 65 L180 65" stroke="#60a5fa" stroke-width="6"/>
                                <path d="M20 85 L180 85" stroke="#60a5fa" stroke-width="6"/>
                                <path d="M100 20 L100 130" stroke="#3b82f6" stroke-width="8"/>
                                <path d="M50 40 L50 110" stroke="#60a5fa" stroke-width="6"/>
                                <path d="M150 40 L150 110" stroke="#60a5fa" stroke-width="6"/>
                            </svg>
                        </div>
                        <p class="text-slate-300">Traditional canal systems were designed with deep understanding of water flow dynamics and seasonal patterns:</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-300">
                            <li><strong>Interconnected Design:</strong> Multiple pathways prevented bottlenecks</li>
                            <li><strong>Natural Gradients:</strong> Followed topography for efficient drainage</li>
                            <li><strong>Maintenance Culture:</strong> Community responsibility for upkeep</li>
                            <li><strong>Multi-purpose Use:</strong> Transportation, irrigation, and waste management</li>
                        </ul>
                        <div class="bg-green-900 p-4 rounded-lg">
                            <h4 class="font-semibold text-green-200 mb-2">Lessons for Today</h4>
                            <p class="text-sm text-green-100">Modern drainage systems can learn from traditional redundancy and community stewardship models, creating resilient networks that adapt to changing conditions.</p>
                        </div>
                    </div>
                `
            },
            rumah: {
                title: "Elevated Architecture Wisdom",
                content: `
                    <div class="space-y-4">
                        <div class="text-center mb-6">
                            <svg width="200" height="150" viewBox="0 0 200 150" class="mx-auto">
                                <polygon points="100,40 130,55 130,85 70,85 70,55" fill="#fbbf24"/>
                                <rect x="80" y="75" width="40" height="20" fill="#92400e"/>
                                <polygon points="100,35 140,52 60,52" fill="#dc2626"/>
                                <line x1="75" y1="85" x2="75" y2="110" stroke="#8b5cf6" stroke-width="4"/>
                                <line x1="125" y1="85" x2="125" y2="110" stroke="#8b5cf6" stroke-width="4"/>
                                <line x1="90" y1="85" x2="90" y2="110" stroke="#8b5cf6" stroke-width="4"/>
                                <line x1="110" y1="85" x2="110" y2="110" stroke="#8b5cf6" stroke-width="4"/>
                                <path d="M50 110 Q100 105 150 110" stroke="#3b82f6" stroke-width="6" fill="none"/>
                            </svg>
                        </div>
                        <p class="text-slate-300">Traditional elevated architecture demonstrates sophisticated adaptation to flood-prone environments:</p>
                        <ul class="list-disc list-inside space-y-2 text-slate-300">
                            <li><strong>Stilt Construction:</strong> Raised living spaces above flood levels</li>
                            <li><strong>Flexible Materials:</strong> Bamboo and wood that could flex with water pressure</li>
                            <li><strong>Ventilation Design:</strong> Promoted air circulation and quick drying</li>
                            <li><strong>Community Planning:</strong> Elevated walkways connected neighborhoods</li>
                        </ul>
                        <div class="bg-yellow-900 p-4 rounded-lg">
                            <h4 class="font-semibold text-yellow-200 mb-2">Contemporary Relevance</h4>
                            <p class="text-sm text-yellow-100">Modern flood-resilient architecture can incorporate elevation principles, amphibious foundations, and flexible building systems that adapt to water level changes.</p>
                        </div>
                    </div>
                `
            }
        };

        // Navigation functionality
        function showSection(sectionName) {
            // Hide all sections
            document.querySelectorAll('.section-content').forEach(section => {
                section.classList.add('hidden');
            });

            // Show selected section
            document.getElementById(sectionName + '-section').classList.remove('hidden');

            // Update navigation buttons
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('bg-blue-600');
                btn.classList.add('bg-slate-600');
            });
            event.target.classList.remove('bg-slate-600');
            event.target.classList.add('bg-blue-600');
        }

        // Map detail information
        const mapDetails = {
            river: {
                title: "River System",
                content: "Jakarta's rivers were originally meandering waterways that naturally managed flood cycles. Over time, they've been straightened and channeled, reducing their natural flood management capacity."
            },
            tributary: {
                title: "Tributary Networks",
                content: "Smaller waterways that fed into main rivers, creating a complex drainage system. Many have been filled or diverted for urban development."
            },
            forest: {
                title: "Natural Forest Cover",
                content: "Original forests provided crucial water absorption and flood protection. Their removal has significantly increased surface runoff and flood risk."
            },
            wetland: {
                title: "Wetland Systems",
                content: "Natural sponges that absorbed excess water during floods. Most have been drained and filled for development, eliminating critical flood protection."
            },
            settlement: {
                title: "Human Settlements",
                content: "Traditional settlements were built with flood awareness - elevated structures and locations that worked with natural water cycles."
            },
            urban: {
                title: "Urban Development",
                content: "Modern development has created impermeable surfaces that increase runoff and reduce natural water absorption, amplifying flood risks."
            },
            flood: {
                title: "Flood Risk Areas",
                content: "Areas most vulnerable to flooding due to low elevation, poor drainage, or proximity to water bodies. Risk has increased with urban development."
            }
        };

        // Map interaction functions
        function showMapDetail(elementType) {
            const detail = mapDetails[elementType];
            if (detail) {
                document.getElementById('detail-title').textContent = detail.title;
                document.getElementById('detail-content').textContent = detail.content;
                document.getElementById('map-detail-modal').classList.remove('hidden');
            }
        }

        function closeMapDetail() {
            document.getElementById('map-detail-modal').classList.add('hidden');
        }

        // Update map based on timeline
        function updateMap(timelineValue) {
            const data = timelineData[timelineValue];
            const elements = data.mapElements;

            // Update map title and description
            document.getElementById('map-title').textContent = data.title;
            document.getElementById('map-description').textContent = data.description;

            // Update SVG elements based on timeline data
            updateMapElements(elements);

            // Update legend
            updateLegend(elements);
        }

        function updateMapElements(elements) {
            // Update rivers
            const rivers = document.querySelectorAll('#main-river, #tributary-1, #tributary-2');
            rivers.forEach(river => {
                river.style.opacity = elements.rivers.opacity;
                river.style.display = elements.rivers.display ? 'block' : 'none';
                if (elements.rivers.straightened) {
                    river.setAttribute('d', river.getAttribute('d').replace(/Q\d+\s\d+/g, 'L'));
                }
                if (elements.rivers.polluted) {
                    river.setAttribute('stroke', '#7f1d1d');
                }
            });

            // Update forests
            const forests = document.querySelectorAll('#forest-1, #forest-2, #forest-3');
            forests.forEach(forest => {
                forest.style.opacity = elements.forests.opacity;
                forest.style.display = elements.forests.display ? 'block' : 'none';
            });

            // Update wetlands
            const wetlands = document.querySelectorAll('#wetland-1, #wetland-2');
            wetlands.forEach(wetland => {
                wetland.style.opacity = elements.wetlands.opacity;
                wetland.style.display = elements.wetlands.display ? 'block' : 'none';
            });

            // Update settlements
            const settlements = document.querySelectorAll('#settlement-1, #settlement-2');
            settlements.forEach((settlement, index) => {
                settlement.style.opacity = elements.settlements.opacity;
                settlement.style.display = (index < elements.settlements.count) ? 'block' : 'none';
            });

            // Update urban areas
            const urbanAreas = document.querySelectorAll('.urban-development');
            urbanAreas.forEach(area => {
                area.style.opacity = elements.urban.opacity;
                area.style.display = elements.urban.display ? 'block' : 'none';
            });

            // Update flood zones
            const floodZones = document.querySelectorAll('.flood-zone');
            floodZones.forEach(zone => {
                zone.style.opacity = elements.floods.opacity;
                zone.style.display = elements.floods.display ? 'block' : 'none';
            });
        }

        function updateLegend(elements) {
            const floodLegend = document.getElementById('flood-legend');
            if (elements.floods.display && elements.floods.opacity > 0) {
                floodLegend.style.opacity = '1';
            } else {
                floodLegend.style.opacity = '0';
            }
        }

        // Timeline slider functionality
        document.getElementById('timeline-slider').addEventListener('input', function(e) {
            const value = parseInt(e.target.value);
            const data = timelineData[value];

            // Update era label
            document.getElementById('era-label').textContent = data.era;

            // Update interactive map
            updateMap(value);

            // Update impact content
            const impactContent = document.getElementById('impact-content');
            const impactHTML = data.impacts.map(impact => {
                const colorClass = impact.status === 'green' ? 'bg-green-500' :
                                 impact.status === 'yellow' ? 'bg-yellow-500' :
                                 impact.status === 'red' ? 'bg-red-500' : 'bg-blue-500';
                return `
                    <div class="flex items-center space-x-3">
                        <div class="w-3 h-3 ${colorClass} rounded-full"></div>
                        <span>${impact.text}</span>
                    </div>
                `;
            }).join('');

            impactContent.innerHTML = `<div class="space-y-4">${impactHTML}</div>`;
        });

        // Wisdom modal functionality
        function showWisdomDetail(wisdomType) {
            const wisdom = wisdomDetails[wisdomType];
            document.getElementById('wisdom-title').textContent = wisdom.title;
            document.getElementById('wisdom-detail-content').innerHTML = wisdom.content;
            document.getElementById('wisdom-modal').classList.remove('hidden');
        }

        function closeWisdomDetail() {
            document.getElementById('wisdom-modal').classList.add('hidden');
        }

        // Memory form functionality
        document.getElementById('memory-form').addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('contributor-name').value;
            const location = document.getElementById('flood-location').value;
            const year = document.getElementById('flood-year').value;
            const story = document.getElementById('flood-story').value;

            if (name && location && year && story) {
                // Create new memory card
                const memoryCard = document.createElement('div');
                memoryCard.className = 'memory-card bg-slate-800 rounded-lg p-4';
                memoryCard.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-semibold text-blue-300">${name} - ${location}</h4>
                        <span class="text-sm text-slate-400">${year}</span>
                    </div>
                    <p class="text-sm text-slate-300">"${story}"</p>
                `;

                // Add to stories container
                const storiesContainer = document.getElementById('memory-stories');
                storiesContainer.insertBefore(memoryCard, storiesContainer.firstChild);

                // Clear form
                document.getElementById('memory-form').reset();

                // Show success message
                alert('Thank you for sharing your story! Your experience has been added to Jakarta\'s collective memory.');
            }
        });

        // Close modal when clicking outside
        document.getElementById('wisdom-modal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeWisdomDetail();
            }
        });
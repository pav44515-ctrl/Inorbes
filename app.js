// ===== APP.JS — World Richest Men Website =====
(function () {
    "use strict";

    // ── Utility ──
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];

    // Seed-based daily random so values change each day but stay consistent within a day
    function dailySeed() {
        const d = new Date();
        return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    }
    function seededRandom(seed) {
        let s = seed;
        return function () {
            s = (s * 16807 + 0) % 2147483647;
            return (s - 1) / 2147483646;
        };
    }
    const rand = seededRandom(dailySeed());

    function dailyChange(netWorth) {
        const pct = (rand() - 0.45) * 4; // bias slightly positive
        return { amount: +(netWorth * pct / 100).toFixed(1), pct: +pct.toFixed(2) };
    }

    // Enrich data with daily change + stock data
    const enriched = BILLIONAIRES.map(b => {
        const ch = dailyChange(b.netWorth);
        const stock = STOCK_DATA[b.name] || { ticker:"N/A", price:null, chg:"N/A" };
        return { ...b, change: ch, currentWorth: +(b.netWorth + ch.amount).toFixed(1), stock };
    });

    // ── Avatar Helper ──
    function avatarHTML(b, size) {
        const cls = size === 'xl' ? 'avatar-xl' : size === 'lg' ? 'avatar-lg' : size === 'sm' ? 'avatar-sm' : 'avatar-md';
        if (b.photo) {
            return `<div class="avatar-photo ${cls}"><img src="${b.photo}" alt="${b.name}" referrerpolicy="no-referrer" loading="lazy" onerror="this.parentElement.innerHTML='${b.initials}';this.parentElement.style.background='linear-gradient(135deg,${b.color},${b.color}dd)';this.parentElement.classList.add('avatar-fallback');this.parentElement.classList.remove('avatar-photo');this.remove();"></div>`;
        }
        return `<div class="avatar-fallback ${cls}" style="background:linear-gradient(135deg,${b.color},${b.color}dd)">${b.initials}</div>`;
    }

    // ── Particles Background ──
    function initParticles() {
        const canvas = $("#particles-canvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        let w, h, particles = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * w, y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
                r: Math.random() * 1.5 + 0.5, alpha: Math.random() * 0.5 + 0.1
            });
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(240,178,50,${p.alpha})`;
                ctx.fill();
            });
            // draw lines between close particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(240,178,50,${0.06 * (1 - dist / 150)})`;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // ── Counter Animation ──
    function animateCounters() {
        $$("[data-target]").forEach(el => {
            const target = parseInt(el.dataset.target);
            let current = 0;
            const step = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) { current = target; clearInterval(timer); }
                el.textContent = current.toLocaleString();
            }, 30);
        });
    }

    // ── Ticker ──
    function buildTicker() {
        const container = $("#ticker-content");
        if (!container) return;
        let html = "";
        const items = enriched.slice(0, 10);
        // duplicate for seamless scroll
        for (let d = 0; d < 2; d++) {
            items.forEach(b => {
                const cls = b.change.amount >= 0 ? "up" : "down";
                const arrow = b.change.amount >= 0 ? "▲" : "▼";
                html += `<span class="ticker-item">
                    <span class="ticker-name">${b.name}</span>
                    <span class="ticker-change ${cls}">${arrow} $${Math.abs(b.change.amount)}B (${b.change.pct > 0 ? "+" : ""}${b.change.pct}%)</span>
                </span>`;
            });
        }
        container.innerHTML = html;
    }

    // ── Market Pulse ──
    function buildPulse() {
        const grid = $("#pulse-grid");
        if (!grid) return;
        grid.innerHTML = MARKET_PULSE.map(m => `
            <div class="pulse-card">
                <div class="pulse-card-label">${m.label}</div>
                <div class="pulse-card-value">${m.value}</div>
                <div class="pulse-card-change ${m.up ? "up" : "down"}">${m.up ? "▲" : "▼"} ${m.change}</div>
            </div>
        `).join("");
    }

    // ── Podium (Top 3) ──
    function buildPodium(list) {
        const podium = $("#podium");
        if (!podium) return;
        const top3 = list.slice(0, 3);
        podium.innerHTML = top3.map((b, i) => {
            const cls = b.change.amount >= 0 ? "up" : "down";
            const arrow = b.change.amount >= 0 ? "▲" : "▼";
            return `<div class="podium-card rank-${i + 1}" data-id="${b.rank}">
                <div class="podium-rank">${i + 1}</div>
                ${avatarHTML(b, 'lg')}
                <div class="podium-name">${b.name}</div>
                <div class="podium-company">${b.company}</div>
                <div class="podium-worth">$${b.currentWorth}B</div>
                <div class="podium-change ${cls}">${arrow} $${Math.abs(b.change.amount)}B (${b.change.pct > 0 ? "+" : ""}${b.change.pct}%)</div>
            </div>`;
        }).join("");
    }

    // ── Rankings Table ──
    function buildTable(list) {
        const tbody = $("#rankings-tbody");
        if (!tbody) return;
        tbody.innerHTML = list.map(b => {
            const cls = b.change.amount >= 0 ? "up" : "down";
            const arrow = b.change.amount >= 0 ? "▲" : "▼";
            return `<tr data-industry="${b.industry}" data-id="${b.rank}">
                <td class="rank-cell">#${b.rank}</td>
                <td><div class="name-cell">
                    ${avatarHTML(b, 'sm')}
                    <div><div class="name-info-name">${b.name}</div><div class="name-info-age">Age: ${b.age}</div></div>
                </div></td>
                <td class="worth-cell">$${b.currentWorth}B</td>
                <td class="change-cell ${cls}">${arrow} $${Math.abs(b.change.amount)}B</td>
                <td class="stock-cell">${b.stock.price !== null ? `<span class="stock-ticker">${b.stock.ticker}</span> <span class="stock-price">${b.stock.currency || '$'}${b.stock.price.toLocaleString()}</span> <span class="stock-chg ${b.stock.chg.startsWith('+') ? 'up' : b.stock.chg.startsWith('-') ? 'down' : ''}">${b.stock.chg}</span>` : `<span class="stock-private">Private</span>`}</td>
                <td><span class="industry-badge">${b.industry.charAt(0).toUpperCase() + b.industry.slice(1)}</span></td>
                <td class="country-cell">${b.country}</td>
                <td style="color:var(--text-muted);font-size:0.85rem">${b.source}</td>
            </tr>`;
        }).join("");
    }

    // ── Filters ──
    function initFilters() {
        $$(".filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                $$(".filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const f = btn.dataset.filter;
                const filtered = f === "all" ? enriched : enriched.filter(b => b.industry === f);
                buildPodium(filtered);
                buildTable(filtered);
            });
        });
    }

    // ── Stat Bars ──
    function buildStatBars() {
        const industryBars = $("#industry-bars");
        const regionBars = $("#region-bars");
        if (industryBars) {
            industryBars.innerHTML = INDUSTRY_DATA.map(d => `
                <div class="stat-bar-row">
                    <span class="stat-bar-label">${d.label}</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill" style="width:0%" data-width="${d.pct}%"></div></div>
                    <span class="stat-bar-value">${d.pct}%</span>
                </div>`).join("");
        }
        if (regionBars) {
            regionBars.innerHTML = REGION_DATA.map(d => `
                <div class="stat-bar-row">
                    <span class="stat-bar-label">${d.label}</span>
                    <div class="stat-bar-track"><div class="stat-bar-fill" style="width:0%" data-width="${d.pct}%"></div></div>
                    <span class="stat-bar-value">${d.pct}%</span>
                </div>`).join("");
        }
        // Animate bars on scroll
        const observer = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting) {
                    $$(".stat-bar-fill", e.target).forEach(bar => {
                        bar.style.width = bar.dataset.width;
                    });
                }
            });
        }, { threshold: 0.3 });
        if (industryBars) observer.observe(industryBars);
        if (regionBars) observer.observe(regionBars);
    }

    function buildMetrics() {
        const grid = $("#metrics-grid");
        if (!grid) return;
        grid.innerHTML = KEY_METRICS.map(m => `
            <div class="metric-item">
                <div class="metric-value">${m.value}</div>
                <div class="metric-label">${m.label}</div>
            </div>`).join("");
    }

    // ── Wealth Chart (canvas) ──
    function drawChart() {
        const canvas = $("#wealth-chart");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width - 48;
        canvas.height = 350;
        const W = canvas.width, H = canvas.height;
        const pad = { top: 20, right: 20, bottom: 40, left: 60 };
        const chartW = W - pad.left - pad.right;
        const chartH = H - pad.top - pad.bottom;

        const allVals = CHART_DATA.datasets.flatMap(d => d.data);
        const maxVal = Math.ceil(Math.max(...allVals) / 100) * 100;

        // Grid lines
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 5; i++) {
            const y = pad.top + (chartH / 5) * i;
            ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W - pad.right, y); ctx.stroke();
            ctx.fillStyle = "rgba(255,255,255,0.3)";
            ctx.font = "11px Inter";
            ctx.textAlign = "right";
            ctx.fillText("$" + Math.round(maxVal - (maxVal / 5) * i) + "B", pad.left - 8, y + 4);
        }

        // X labels
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.textAlign = "center";
        CHART_DATA.labels.forEach((label, i) => {
            const x = pad.left + (chartW / (CHART_DATA.labels.length - 1)) * i;
            ctx.fillText(label, x, H - 10);
        });

        // Lines
        CHART_DATA.datasets.forEach(ds => {
            ctx.beginPath();
            ctx.strokeStyle = ds.color;
            ctx.lineWidth = 2.5;
            ctx.lineJoin = "round";
            ds.data.forEach((v, i) => {
                const x = pad.left + (chartW / (ds.data.length - 1)) * i;
                const y = pad.top + chartH - (v / maxVal) * chartH;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.stroke();

            // Dots
            ds.data.forEach((v, i) => {
                const x = pad.left + (chartW / (ds.data.length - 1)) * i;
                const y = pad.top + chartH - (v / maxVal) * chartH;
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, Math.PI * 2);
                ctx.fillStyle = ds.color;
                ctx.fill();
            });
        });

        // Legend
        const legend = $("#chart-legend");
        if (legend) {
            legend.innerHTML = CHART_DATA.datasets.map(ds =>
                `<span class="legend-item"><span class="legend-dot" style="background:${ds.color}"></span>${ds.name}</span>`
            ).join("");
        }
    }

    // ── Trend Highlights ──
    function buildTrends() {
        const container = $("#trends-highlights");
        if (!container) return;
        container.innerHTML = TREND_HIGHLIGHTS.map(t => `
            <div class="trend-card">
                <div class="trend-card-title">${t.title}</div>
                <div class="trend-card-desc">${t.desc}</div>
                <div class="trend-card-value">${t.value}</div>
            </div>`).join("");
    }

    // ── Footer Date ──
    function setFooterDate() {
        const el = $("#footer-date");
        if (el) el.textContent = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" });
    }

    // ── Nav scroll behavior ──
    function initNav() {
        const nav = $("#main-nav");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) nav.style.background = "rgba(10,10,15,0.95)";
            else nav.style.background = "rgba(10,10,15,0.8)";
        });
        // Active link tracking
        const sections = ["rankings", "stats", "trends", "about"];
        window.addEventListener("scroll", () => {
            let current = "";
            sections.forEach(id => {
                const sec = document.getElementById(id);
                if (sec && sec.getBoundingClientRect().top < 200) current = id;
            });
            $$(".nav-link").forEach(l => {
                l.classList.toggle("active", l.getAttribute("href") === "#" + current);
            });
        });
    }

    // ── Hamburger Menu ──
    function initHamburger() {
        const btn = document.getElementById('hamburger');
        const links = document.getElementById('nav-links');
        if (!btn || !links) return;
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            links.classList.toggle('open');
        });
        // Close menu when a link is clicked
        links.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                btn.classList.remove('active');
                links.classList.remove('open');
            });
        });
    }

    // ── Scroll to Top ──
    function initScrollTop() {
        const btn = document.getElementById('scroll-top');
        if (!btn) return;
        window.addEventListener('scroll', () => {
            btn.classList.toggle('visible', window.scrollY > 500);
        });
        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Last Updated Timer ──
    function updateTimer() {
        const el = $("#last-updated");
        if (!el) return;
        const start = Date.now();
        setInterval(() => {
            const diff = Math.floor((Date.now() - start) / 60000);
            el.textContent = diff < 1 ? "Updated just now" : `Updated ${diff}m ago`;
        }, 30000);
    }

    // ── Billionaire Modal ──
    function generateBio(b) {
        const bios = {
            "Elon Musk": "CEO of Tesla and SpaceX, Elon Musk is the world's richest person. Born in South Africa, he co-founded PayPal before building Tesla into the most valuable automaker and SpaceX into a leading aerospace company. He also leads xAI, Neuralink, and The Boring Company.",
            "Larry Page": "Co-founder of Google alongside Sergey Brin in 1998, Larry Page served as CEO of Alphabet until 2019. His vision for organizing the world's information transformed the internet. He remains a board member and major shareholder of Alphabet.",
            "Sergey Brin": "Co-founder of Google, Sergey Brin was born in Moscow and emigrated to the US at age six. He co-created the PageRank algorithm at Stanford. He now focuses on Alphabet's moonshot projects including Waymo autonomous vehicles.",
            "Jeff Bezos": "Founder of Amazon in 1994, Jeff Bezos built it from an online bookstore into the world's largest e-commerce and cloud computing company. He also owns Blue Origin (space) and The Washington Post.",
            "Larry Ellison": "Co-founder and chairman of Oracle Corporation, Larry Ellison built one of the world's largest enterprise software companies. He owns 98% of the Hawaiian island of Lanai and is a major investor in Tesla.",
            "Mark Zuckerberg": "Co-founder and CEO of Meta Platforms (formerly Facebook), Mark Zuckerberg launched the social network from his Harvard dorm room in 2004. Meta now operates Facebook, Instagram, WhatsApp, and is investing heavily in AI and metaverse technologies.",
            "Michael Dell": "Founder and CEO of Dell Technologies, Michael Dell started building and selling computers from his University of Texas dorm room in 1984. He took Dell private in 2013 and returned it to public markets in 2018.",
            "Jensen Huang": "Co-founder and CEO of NVIDIA since 1993, Jensen Huang transformed the company from a graphics chip maker into the world's most valuable semiconductor company, powering the AI revolution with its GPU technology.",
            "Bernard Arnault": "Chairman and CEO of LVMH, Bernard Arnault built the world's largest luxury goods empire with 75+ brands including Louis Vuitton, Christian Dior, Tiffany & Co., and Moët Hennessy. He is Europe's richest person.",
            "Warren Buffett": "Chairman and CEO of Berkshire Hathaway, Warren Buffett is known as the 'Oracle of Omaha.' He is widely regarded as the most successful investor of all time and has pledged to give away 99% of his wealth to charity.",
            "Bill Gates": "Co-founder of Microsoft, Bill Gates transformed personal computing. Through the Bill & Melinda Gates Foundation, he has donated over $50 billion to global health, education, and climate initiatives.",
            "Mukesh Ambani": "Chairman of Reliance Industries, Mukesh Ambani is India's richest person. He transformed Reliance from an oil refining company into a tech and telecom giant with Jio Platforms, revolutionizing India's digital landscape.",
            "Changpeng Zhao": "Founder and former CEO of Binance, the world's largest cryptocurrency exchange. Known as 'CZ,' he built Binance into a global crypto powerhouse handling trillions in annual trading volume.",
            "Gautam Adani": "Chairman of the Adani Group, Gautam Adani is a first-generation entrepreneur who built India's largest port operator and a vast infrastructure empire spanning energy, airports, cement, and media.",
        };
        return bios[b.name] || `${b.name} is ranked #${b.rank} among the world's wealthiest individuals with a net worth of $${b.netWorth}B. As the key figure behind ${b.company}, they have built significant wealth in the ${b.industry} sector. Based in ${b.country.replace(/^.{2}\s/, '')}, ${b.name} continues to shape their industry globally.`;
    }

    function openModal(b) {
        const overlay = $("#modal-overlay");
        const header = $("#modal-header");
        const body = $("#modal-body");
        const cls = b.change.amount >= 0 ? "up" : "down";
        const arrow = b.change.amount >= 0 ? "▲" : "▼";
        const clr = b.change.amount >= 0 ? "#22c55e" : "#ef4444";

        header.innerHTML = `
            ${avatarHTML(b, 'xl')}
            <div class="modal-name">${b.name}</div>
            <div class="modal-company">${b.company} · ${b.country}</div>
            <div class="modal-worth-row">
                <span class="modal-worth">$${b.currentWorth}B</span>
                <span class="modal-change" style="color:${clr}">${arrow} $${Math.abs(b.change.amount)}B (${b.change.pct > 0 ? "+" : ""}${b.change.pct}%)</span>
            </div>`;

        body.innerHTML = `
            <div class="modal-facts">
                <div class="modal-fact"><div class="modal-fact-label">Global Rank</div><div class="modal-fact-value">#${b.rank}</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Age</div><div class="modal-fact-value">${b.age || 'N/A'}</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Industry</div><div class="modal-fact-value">${b.industry.charAt(0).toUpperCase() + b.industry.slice(1)}</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Source</div><div class="modal-fact-value">${b.source}</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Base Worth</div><div class="modal-fact-value">$${b.netWorth}B</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Today's Change</div><div class="modal-fact-value" style="color:${clr}">${arrow} ${Math.abs(b.change.pct)}%</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Stock Ticker</div><div class="modal-fact-value">${b.stock.ticker}</div></div>
                <div class="modal-fact"><div class="modal-fact-label">Share Price</div><div class="modal-fact-value">${b.stock.price !== null ? (b.stock.currency || '$') + b.stock.price.toLocaleString() : 'Private'}</div></div>
            </div>
            <div class="modal-bio-title">About</div>
            <p class="modal-bio">${generateBio(b)}</p>`;

        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeModal() {
        $("#modal-overlay").classList.remove("active");
        document.body.style.overflow = "";
    }

    function initModal() {
        $("#modal-close").addEventListener("click", closeModal);
        $("#modal-overlay").addEventListener("click", e => { if (e.target === e.currentTarget) closeModal(); });
        document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
    }

    function attachCardClicks() {
        // Podium cards
        document.addEventListener("click", e => {
            const card = e.target.closest(".podium-card");
            if (card) {
                const name = card.querySelector(".podium-name")?.textContent;
                const b = enriched.find(x => x.name === name);
                if (b) openModal(b);
            }
        });
        // Table rows
        document.addEventListener("click", e => {
            const row = e.target.closest(".rankings-table tbody tr");
            if (row) {
                const name = row.querySelector(".name-info-name")?.textContent;
                const b = enriched.find(x => x.name === name);
                if (b) openModal(b);
            }
        });
    }

    // ── News ──
    function buildNews() {
        const grid = $("#news-grid");
        if (!grid || typeof NEWS_DATA === 'undefined') return;
        
        grid.innerHTML = NEWS_DATA.map(news => `
            <a href="${news.url}" class="news-card" target="_blank" rel="noopener">
                <div class="news-meta">
                    <span class="news-source">${news.source}</span>
                    <span class="news-time">${news.time}</span>
                </div>
                <h3 class="news-title">${news.title}</h3>
                <p class="news-summary">${news.summary}</p>
                <div class="news-related">Related: ${news.related}</div>
            </a>
        `).join("");
    }

    // ── Live Market Ticker ──
    function startLiveTicker() {
        setInterval(() => {
            // Pick 1-3 random billionaires to update
            const numUpdates = Math.floor(Math.random() * 3) + 1;
            for(let i=0; i<numUpdates; i++) {
                const idx = Math.floor(Math.random() * enriched.length);
                const b = enriched[idx];
                
                // Random change between -0.3 and +0.3 billion
                const tickAmount = (Math.random() - 0.5) * 0.6; 
                b.currentWorth = +(b.currentWorth + tickAmount).toFixed(1);
                b.change.amount = +(b.change.amount + tickAmount).toFixed(1);
                b.change.pct = +(b.change.amount / b.netWorth * 100).toFixed(2);
                
                const cls = b.change.amount >= 0 ? "up" : "down";
                const arrow = b.change.amount >= 0 ? "▲" : "▼";
                const animCls = tickAmount >= 0 ? "flash-up" : "flash-down";
                
                // Update Table Row
                const row = document.querySelector(`tr[data-id="${b.rank}"]`);
                if (row) {
                    const worthCell = row.querySelector('.worth-cell');
                    const changeCell = row.querySelector('.change-cell');
                    
                    if (worthCell && changeCell) {
                        worthCell.textContent = `$${b.currentWorth}B`;
                        changeCell.className = `change-cell ${cls}`;
                        changeCell.innerHTML = `${arrow} $${Math.abs(b.change.amount).toFixed(1)}B`;
                        
                        worthCell.classList.remove('flash-up', 'flash-down');
                        changeCell.classList.remove('flash-up', 'flash-down');
                        void worthCell.offsetWidth; // trigger reflow
                        worthCell.classList.add(animCls);
                        changeCell.classList.add(animCls);
                    }
                }
                
                // Update Podium
                const podiumCard = document.querySelector(`.podium-card[data-id="${b.rank}"]`);
                if (podiumCard) {
                    const worthDiv = podiumCard.querySelector('.podium-worth');
                    const changeDiv = podiumCard.querySelector('.podium-change');
                    
                    if (worthDiv && changeDiv) {
                        worthDiv.textContent = `$${b.currentWorth}B`;
                        changeDiv.className = `podium-change ${cls}`;
                        changeDiv.innerHTML = `${arrow} $${Math.abs(b.change.amount).toFixed(1)}B (${b.change.pct > 0 ? "+" : ""}${b.change.pct}%)`;
                        
                        worthDiv.classList.remove('flash-up', 'flash-down');
                        changeDiv.classList.remove('flash-up', 'flash-down');
                        void worthDiv.offsetWidth;
                        worthDiv.classList.add(animCls);
                        changeDiv.classList.add(animCls);
                    }
                }
            }
            
            // Flash the live indicator dot
            const dot = document.querySelector('.live-dot');
            if (dot) {
                dot.style.opacity = '1';
                setTimeout(() => dot.style.opacity = '', 500);
            }
            
        }, 2500); // Update every 2.5 seconds
    }

    // ── Init Everything ──
    function init() {
        initParticles();
        animateCounters();
        buildTicker();
        buildPulse();
        buildPodium(enriched);
        buildTable(enriched);
        initFilters();
        buildNews();
        buildStatBars();
        buildMetrics();
        drawChart();
        buildTrends();
        setFooterDate();
        initNav();
        initHamburger();
        initScrollTop();
        updateTimer();
        initModal();
        attachCardClicks();
        startLiveTicker();
        // Dismiss loader
        const loader = document.getElementById('loader');
        if (loader) {
            setTimeout(() => loader.classList.add('hidden'), 400);
            setTimeout(() => loader.remove(), 900);
        }
        window.addEventListener("resize", drawChart);
    }

    document.addEventListener("DOMContentLoaded", init);
})();


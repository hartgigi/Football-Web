document.addEventListener("DOMContentLoaded", function () {
    const matchSection = document.getElementById('match-links');
    const leagueList = document.getElementById('league-list');
    const searchInput = document.getElementById('search');

    let allMatches = [];  // เก็บข้อมูลการแข่งขันทั้งหมด

    // ฟังก์ชันในการแสดงการแข่งขัน
    function displayMatches(matches) {
        matchSection.innerHTML = ''; // ลบการแข่งขันที่มีอยู่เดิม

        if (matches.length === 0) {
            matchSection.innerHTML = '<p>ไม่มีการแข่งขันในวันนี้</p>';
            return;
        }

        matches.forEach(match => {
            const matchCard = document.createElement('div');
            matchCard.classList.add('match-card');

            // แปลงเวลา UTC เป็นเวลาในเขตเวลาท้องถิ่น
            const matchTime = new Date(match.utcDate).toLocaleTimeString("th-TH", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            matchCard.innerHTML = `
                <div class="match-header">
                    <img src="${match.homeTeam.crestUrl}" alt="${match.homeTeam.name} logo" class="team-logo">
                    <h3>${match.homeTeam.name} vs ${match.awayTeam.name}</h3>
                    <img src="${match.awayTeam.crestUrl}" alt="${match.awayTeam.name} logo" class="team-logo">
                </div>
                <p>เวลา: ${matchTime}</p>
                <p>ลีก: ${match.competition.name}</p>
                <p>ทีมที่จะแข่ง: ${match.homeTeam.name} พบ ${match.awayTeam.name}</p>
                <a href="${match.url}" target="_blank" class="watch-link">ดูบอลสด</a>
            `;

            matchSection.appendChild(matchCard);
        });
    }

    // ฟังก์ชันในการกรองการแข่งขันตามลีกที่เลือก
    function filterByLeague(league) {
        const filteredMatches = allMatches.filter(match => match.competition.name === league);
        displayMatches(filteredMatches);
    }

    // ฟังก์ชันการค้นหาทีมฟุตบอล
    function filterBySearch(query) {
        const filteredMatches = allMatches.filter(match =>
            match.homeTeam.name.toLowerCase().includes(query.toLowerCase()) ||
            match.awayTeam.name.toLowerCase().includes(query.toLowerCase())
        );
        displayMatches(filteredMatches);
    }

    // กำหนดเหตุการณ์ให้กับแต่ละรายการลีก
    leagueList.addEventListener('click', function(event) {
        if (event.target && event.target.matches("li[data-league]")) {
            const selectedLeague = event.target.getAttribute("data-league");
            filterByLeague(selectedLeague);  // กรองการแข่งขันตามลีกที่เลือก
        }
    });

    // กำหนดเหตุการณ์ให้กับช่องค้นหา
    searchInput.addEventListener('input', function(event) {
        const query = event.target.value;
        filterBySearch(query);  // กรองการแข่งขันตามคำที่พิมพ์ในช่องค้นหา
    });

    // ฟังก์ชันโหลดข้อมูลการแข่งขัน (เช่นจาก API) - เพิ่มเติม
    function loadMatches() {
        // ตัวอย่าง: หากข้อมูลการแข่งขันมาจาก API จริงๆ
        // fetch('https://api.example.com/matches') // ใช้ API จริงที่มี
        //     .then(response => response.json())
        //     .then(data => {
        //         allMatches = data.matches;
        //         displayMatches(allMatches);
        //     })
        //     .catch(error => {
        //         console.error('Error loading data:', error);
        //         matchSection.innerHTML = '<p>ไม่สามารถโหลดข้อมูลได้</p>';
        //     });

        // ข้อมูลการแข่งขันที่เก็บแบบแมนนวลสำหรับวันนี้ (11 พฤศจิกายน 2024)
        allMatches = [
            {
                homeTeam: { name: 'แมนเชสเตอร์ ซิตี้', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Manchester_City_FC_badge.svg' },
                awayTeam: { name: 'เชฟฟิลด์ ยูไนเต็ด', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Sheffield_United_FC_logo.svg' },
                utcDate: '2024-11-11T00:30:00Z',
                competition: { name: 'พรีเมียร์ลีก' },
                url: 'https://www.premierleague.com/'
            },
            {
                homeTeam: { name: 'บียาร์เรอัล', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Villarreal_CF_logo.svg' },
                awayTeam: { name: 'บาร์เซโลนา', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/FC_Barcelona.svg' },
                utcDate: '2024-11-11T00:30:00Z',
                competition: { name: 'ลาลีกา' },
                url: 'https://www.laliga.com/'
            },
            {
                homeTeam: { name: 'เอ็มโปลี', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Empoli_FC_logo.svg' },
                awayTeam: { name: 'โรม่า', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/AS_Roma_Logo_2013.svg' },
                utcDate: '2024-11-11T00:30:00Z',
                competition: { name: 'กัลโช่ เซเรีย อา' },
                url: 'https://www.legaseriea.it/en'
            },
            {
                homeTeam: { name: 'ล็องส์', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/RC_Lens_logo.svg' },
                awayTeam: { name: 'มาร์กเซย', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/31/Olympique_Marseille_logo.svg' },
                utcDate: '2024-11-11T03:00:00Z',
                competition: { name: 'ลีกเอิง' },
                url: 'https://www.ligue1.com/'
            },
            {
                homeTeam: { name: 'บราซิล', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Sele%C3%A7%C3%A3o_Brasileira_logo.svg' },
                awayTeam: { name: 'ปารากวัย', crestUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Paraguay_Football_Federation_logo.svg' },
                utcDate: '2024-11-11T06:00:00Z',
                competition: { name: 'ฟุตบอลโลก 2026 รอบคัดเลือก' },
                url: 'https://www.fifa.com/worldcup/'
            }
        ];

        displayMatches(allMatches);  // แสดงการแข่งขันทั้งหมด
    }

    // โหลดข้อมูลการแข่งขัน
    loadMatches();

    // ตั้งค่าให้ข้อมูลการแข่งขันแสดงทุก 30 วินาที (ถ้าต้องการให้รีเฟรชข้อมูล)
    setInterval(() => {
        displayMatches(allMatches);
    }, 30000);
});

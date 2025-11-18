// 현재 날짜
let currentDate = new Date(2025, 10, 1); // 2025년 11월

// 달력 렌더링
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // 월 표시
    document.getElementById('currentMonth').textContent = `${year}. ${String(month + 1).padStart(2, '0')}`;
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const lastDate = lastDay.getDate();
    
    const calendarDays = document.getElementById('calendarDays');
    calendarDays.innerHTML = '';
    
    // 이벤트 날짜와 배지 (이미지 기준)
    const specialDates = {
        1: { type: 'today', badge: { num: 1, color: 'red' } },
        2: { type: 'normal', badge: { num: 2, color: 'red' } },
        4: { type: 'normal', badge: { num: 1, color: 'red' } },
        11: { type: 'normal', badge: { num: 1, color: 'blue' } },
        17: { type: 'green', badge: null }
    };
    
    // 빈 칸
    for (let i = 0; i < firstDayOfWeek; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-date empty';
        calendarDays.appendChild(empty);
    }
    
    // 날짜
    for (let date = 1; date <= lastDate; date++) {
        const dateEl = document.createElement('div');
        dateEl.className = 'cal-date';
        dateEl.textContent = date;
        
        const dayOfWeek = new Date(year, month, date).getDay();
        if (dayOfWeek === 0) dateEl.classList.add('sun');
        if (dayOfWeek === 6) dateEl.classList.add('sat');
        
        // 특별 날짜 처리
        if (specialDates[date]) {
            const special = specialDates[date];
            
            if (special.type === 'today') {
                dateEl.classList.add('today');
            } else if (special.type === 'green') {
                dateEl.classList.add('green');
            }
            
            // 배지 추가
            if (special.badge) {
                const badge = document.createElement('span');
                badge.className = 'date-badge';
                if (special.badge.color === 'blue') {
                    badge.classList.add('blue');
                }
                badge.textContent = special.badge.num;
                dateEl.appendChild(badge);
            }
        }
        
        calendarDays.appendChild(dateEl);
    }
}

// 이전/다음 달
document.getElementById('prevMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
});

// 탭 전환
document.querySelectorAll('.ctab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.ctab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// TOP 버튼
const topBtn = document.getElementById('topBtn');

topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        topBtn.style.display = 'flex';
    } else {
        topBtn.style.display = 'none';
    }
});

// 탭 전환 (모든 tab-btn)
document.querySelectorAll('.tab-btn').forEach(tab => {
    tab.addEventListener('click', function() {
        // 같은 부모 내의 탭들만 비활성화
        const parent = this.closest('.section-toolbar, .toolbar-left');
        if (parent) {
            parent.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        }
        this.classList.add('active');
    });
});

// 초기화
document.addEventListener('DOMContentLoaded', () => {
    renderCalendar();
    topBtn.style.display = 'none';
    
    console.log('청주대학교 EDELWEIS 시스템 로드 완료');
});

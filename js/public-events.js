//calendar rendering
function initializeCalendar(){
    const monthYearEvents = document.getElementById("month-year-events");
    const daysContainerEvents = document.getElementById("days-events");
    const leftBtnEvents = document.getElementById("angle-left-events");
    const rightBtnEvents = document.getElementById("angle-right-events");
    const prevYearEvents = document.getElementById("prev-events");
    const nextYearEvents = document.getElementById("next-events");

    const monthsEvents = [
        'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
        'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
    ];
    let currentDateEvents = new Date();
    let todayEvents = new Date();

    function renderCalendarEvents(date){
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDay = new Date(year, month + 1, 0).getDate();

        monthYearEvents.textContent = `${monthsEvents[month]} ${year}`;

        daysContainerEvents.innerHTML = '';
        //previous month's dates

        const prevMonthsLastDay = new Date(year, month, 0).getDate();
        for(let i = firstDay; i > 0; i--){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = prevMonthsLastDay - i + 1;
            dayDiv.classList.add('fade-events');
            daysContainerEvents.appendChild(dayDiv);
        }
        //current months date
        for(let i = 1; i <= lastDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            if(i === todayEvents.getDate() && month === todayEvents.getMonth() && year === todayEvents.getFullYear()){
                dayDiv.classList.add('today-events');
            }
            daysContainerEvents.appendChild(dayDiv);
        }
        //next months date
        const nextMonthStartDay = 7 - new Date(year, month + 1, 0).getDay() - 1;
        for(let i = 1; i <= nextMonthStartDay; i++){
            const dayDiv = document.createElement('div');
            dayDiv.textContent = i;
            dayDiv.classList.add('fade-events');
            daysContainerEvents.appendChild(dayDiv);
        }
    }
    /**previous & next btn for month */
    leftBtnEvents.addEventListener('click', function (){
        currentDateEvents.setMonth(currentDateEvents.getMonth() - 1);
        renderCalendarEvents(currentDateEvents);
    });
    rightBtnEvents.addEventListener('click', function (){
        currentDateEvents.setMonth(currentDateEvents.getMonth() + 1);
        renderCalendarEvents(currentDateEvents);
    });
    /**previous & next btn for years */
    prevYearEvents.addEventListener('click', function(){
        currentDateEvents.setFullYear(currentDateEvents.getFullYear() - 1);
        renderCalendarEvents(currentDateEvents);
    });
    nextYearEvents.addEventListener('click', function(){
        currentDateEvents.setFullYear(currentDateEvents.getFullYear() + 1);
        renderCalendarEvents(currentDateEvents);
    });
    
    renderCalendarEvents(currentDateEvents);
};

function initAgendaToggles(){
    const agendaContainers = document.querySelectorAll(".agenda-container");
    agendaContainers.forEach(container =>{
        const toggleBtn = container.querySelector(".toggle-btn");
        const header = container.querySelector(".agenda-header");

        header.addEventListener("click", () =>{
            container.classList.toggle("active");

            // Toggle icon between right and down
            if (toggleBtn.classList.contains("fa-solid fa-angle-right")) {
                toggleBtn.classList.replace("fa-solid fa-angle-right", "fa-solid fa-angle-down");
            } else {
                toggleBtn.classList.replace("fa-solid fa-angle-down", "fa-solid fa-angle-right");
            }
        });
    });
};

// Helper: format time nicely
function formatTime(time) {
    if (!time) return "N/A";
    try {
        return new Date(`1970-01-01T${time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
        return time;
    }
}

console.log("Public events script loaded");

document.addEventListener("DOMContentLoaded", function(){
    loadEvents();
    initializeCalendar();
});

async function loadEvents(){
    try{
        const res = await fetch("http://localhost:3000/api/public/events");
        const events = await res.json();

        const container = document.getElementById("scheduleContainer");
        container.innerHTML = "";

        events.forEach(event => {
            container.innerHTML += `
                
                <h3>${event.title}</h3>
                <div class="schedule-info">
                    <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> ${formatTime(event.time)}</p>
                    <p><strong>Venue:</strong> ${event.place}</p>
                </div>
                <div class="agenda-container">
                    <div class="agenda-header">
                        <h4>Agenda</h4>
                        <i class="fa-solid fa-angle-right toggle-btn"></i>
                    </div>
                    <div class="agenda-content">
                        <p>${event.agenda}</p>
                    </div>
                </div>
                
            `;
        });
        // Enable toggle functionality after inserting new content
        initAgendaToggles();
    }catch(error){
        console.error("Error loading events:", error);
    }
}
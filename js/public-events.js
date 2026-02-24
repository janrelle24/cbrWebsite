const eventDates = new Set();

console.log("Public events script loaded");

let allEvents = [];
let filtered = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 5;

function formatDate(year, month, day){
    const m = String(month).padStart(2, "0");
    const d = String(day).padStart(2, "0");
    return `${year}-${m}-${d}`;
}
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
            //add dot if there is an event on that day
            const thisDate = formatDate(year, month + 1, i); 
            if(eventDates.has(thisDate)){
                const eventDot = document.createElement('span');
                eventDot.classList.add('event-dot');
                dayDiv.appendChild(eventDot);
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

document.addEventListener("DOMContentLoaded", async function(){
    await loadEvents();
    initializeCalendar();
});

async function loadEvents(){
    try{
        const res = await fetch(`${API_BASE}/api/public/events`);
        if(!res.ok) throw new Error("Failed to fetch events");
        const events = await res.json();

        allEvents = events;
        filtered = events
        renderEvents();
        updatePaginationButtons();

        // Search functionality
        const searchEvents = document.getElementById("searchEvents");
        searchEvents.addEventListener("input", function(){
            const query = this.value.toLowerCase();
            filtered = allEvents.filter(item =>
                item.title.toLowerCase().includes(query) 
            );
            currentPage = 1;
            renderEvents();
            updatePaginationButtons();
        });
        // PREV / NEXT
        document.getElementById("prevBtn").addEventListener("click", prevPage);
        document.getElementById("nextBtn").addEventListener("click", nextPage);
        
        console.log("Loaded event dates:", [...eventDates]);
        // Enable toggle functionality after inserting new content
        
    }catch(error){
        console.error("Error loading events:", error);
    }
}

function renderEvents(){
    const container = document.getElementById("scheduleContainer");
    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = "<p>No events found.</p>";
        return;
    }
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filtered.slice(start, end);


    pageItems.forEach(event => {
        const eventDate = new Date(event.date);
        // Store as "YYYY-M-D" to match renderCalendar() check
        const formattedDate = formatDate(
            eventDate.getFullYear(),
            eventDate.getMonth() + 1,
            eventDate.getDate()
        );
        eventDates.add(formattedDate);
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
    initAgendaToggles();
}

// Pagination controls 
function prevPage(){
    if(currentPage > 1){
        currentPage--;
        renderEvents();
        updatePaginationButtons();
    }
}

function nextPage(){
    const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    if(currentPage < maxPage){
        currentPage++;
        renderEvents();
        updatePaginationButtons();
    }
}

// Enable / Disable buttons 
function updatePaginationButtons(){
    const maxPage = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    document.getElementById("prevBtn").disabled = currentPage === 1;
    document.getElementById("nextBtn").disabled = currentPage === maxPage;

    //page number indicator
    document.getElementById("pageIndicator").textContent = `Page ${currentPage} of ${maxPage || 1}`;
}
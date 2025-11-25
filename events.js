document.addEventListener('DOMContentLoaded', function(){
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
});

document.addEventListener('DOMContentLoaded', function(){
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
        })
    })
});
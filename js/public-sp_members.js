document.addEventListener("DOMContentLoaded", loadMembers);

async function loadMembers(){
    try{
        const res = await fetch("http://localhost:3000/api/public/members");
        const members = await res.json();

        renderMembers(members, 'all');

        //dropdown filter
        document.getElementById('sp_members').addEventListener('change', function() {
            const selected = this.value;
            renderMembers(members, selected);
        });

    }catch(error){
        console.error("Failed to load public members", error);
    }
}

function renderMembers(members, filter){
    const container = document.getElementById('sp_member-cards');
    container.innerHTML = '';

    const filtered = members.filter(member => filter === 'all' ? true : member.position === filter);

    filtered.forEach(member => {
        const card = document.createElement('div');
        card.classList.add("sp_member-cards");
        card.innerHTML = ` 
            <div class="member-image">
                <img src="http://localhost:3000${member.image}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="bdate">Birthdate: ${formatBirthDate(member.birthDate)}</p>
                <p class="education">Education: ${member.education}</p>
                <p class="achievements">Achievements: ${member.achievements}</p>
            </div>
        `;
        //make image clickable
        
        const imageDiv = card.querySelector(".member-image");
        imageDiv.style.cursor = "pointer";
        imageDiv.addEventListener("click", () => {
            viewMember(member._id);
        });
        container.appendChild(card);
    });
}
// Redirect to detailed view

function viewMember(id) {
    window.location.href = `sp_member-view.html?id=${id}`;
}

//helper: format birth date nicely (e.g. "January 23, 1998")
function formatBirthDate(dateString){
    if(!dateString) return "N/A";
    try{
        const date = new Date(dateString);
        //check if the date is valid
        if(isNaN(date)) return "Invalid Date";
        //format the birth date
        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
        //calculate age
        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();

        //adjust age if birthday hasn't occurred yet this year
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }
        return `${formattedDate} (Age ${age})`;
    }catch{
        return dateString;
    }
}
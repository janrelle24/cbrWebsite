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
                <p class="bdate">Birthdate: ${member.birthDate}</p>
                <p class="education">Education: ${member.education}</p>
                <p class="achievements">Achievements: ${member.achievements}</p>
            </div>
        `;
        container.appendChild(card);
    });
}
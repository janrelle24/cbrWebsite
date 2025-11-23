let counselors = {
    members: [
        //mayor
        {image: "images/empty.png",name: "Hon. Regina P. Gonzales", position: "City Mayor", bdate: "December 4, 1969", education: "Bachelor of Science in Accountancy, University of Cebu",achievements: "Senior Council Member, Budget Oversight Specialist"},
        //vice-mayor
        {image: "images/empty.png",name: "Hon. John Patrick Mendoza", position: "Vice Mayor", bdate: "March 12, 1980", education: "Bachelor of Laws, University of San Carlos",achievements: "Former City Legal Officer, Advocate for Youth and Transparency"},
        //counselors
        {image: "images/empty.png",name:"Hon. Ruby Mae Christine Cong-Ayo" , position:"City Counsilor" , bdate: "December 31, 1977", education: "Bachelor of Science in Medical Technology, Doctor of Medicine",achievements: "Former President - PMA Agusan del Norte Medical Society, Member Philippine College of Lifestyle Medicine"},
        {image: "images/empty.png",name: "Hon. Maria Therese Delos Santos", position: "City Counsilor", bdate: "June 8, 1985", education: "Bachelor of Science in Public Administration, MSU-IIT",achievements: "Chairperson - Committee on Education, Community Development Advocate"},
        {image: "images/empty.png",name: "Hon. Ramon D. Bustillo", position: "City Counsilor", bdate: "October 2, 1972", education: "Bachelor of Science in Civil Engineering, Cebu Institute of Technology",achievements: "Former City Engineer, Infrastructure & Development Committee Chair"},
        {image: "images/empty.png",name: "Hon. Angela P. Lumacad", position: "City Counsilor", bdate: "April 25, 1990", education: "Bachelor of Arts in Political Science, University of the Philippines",achievements: "Youth Empowerment Advocate, Author of the Women’s Welfare Ordinance"},
        {image: "images/empty.png",name: "Hon. Christopher Uy", position: "City Counsilor", bdate: "January 14, 1982", education: "Bachelor of Science in Information Technology, Ateneo de Davao University",achievements: "ICT Modernization Project Lead, Promoter of Smart City Initiatives"},
        {image: "images/empty.png",name: "Hon. Lydia P. Cortez", position: "City Counsilor", bdate: "August 10, 1975", education: "Bachelor of Science in Business Administration, University of San Jose-Recoletos",achievements: "Former City Treasurer, Chairperson - Committee on Finance and Budget"},
        {image: "images/empty.png",name: "Hon. Michael D. Reyes", position: "City Counsilor", bdate: "February 22, 1988", education: "Bachelor of Arts in Sociology, Mindanao State University",achievements: "Community Organizer, Author of the Public Safety and Peace Ordinance"},
        {image: "images/empty.png",name: "Hon. Josephine M. Arcilla", position: "City Counsilor", bdate: "September 19, 1981", education: "Bachelor of Science in Education, Caraga State University",achievements: "Education Reforms Advocate, Founder - Cabadbaran Literacy Program"},
        {image: "images/empty.png",name: "Hon. Roberto L. Quinones", position: "City Counsilor", bdate: "November 30, 1973", education: "Bachelor of Science in Criminology, Philippine College of Criminology",achievements: "Chairperson - Committee on Public Order and Safety"},
        {image: "images/empty.png",name: "Hon. Teresa A. Villanueva", position: "City Counsilor", bdate: "July 11, 1984", education: "Bachelor of Arts in Communication, University of Santo Tomas",achievements: "Public Information and Transparency Advocate, Local Media Liaison"},
        //liga ng barangay president
        {image: "images/empty.png",name: "Hon. Edwin P. Lariosa", position: "Liga ng Barangay President", bdate: "May 17, 1978", education: "Bachelor of Science in Agriculture, Central Mindanao University",achievements: "Chairperson - Committee on Agriculture and Food Security"},
        //sk chairperson president
        {image: "images/empty.png",name: "Hon. Clarissa M. Dulay", position: "SK Chairperson President", bdate: "January 9, 1991", education: "Bachelor of Science in Nursing, Saint Paul University",achievements: "Health and Sanitation Committee Vice-Chairperson, Community Volunteer"},
        //indigenous group representative
        {image: "images/empty.png",name: "Hon. Benjamin R. Flores", position: "IP Group Representative", bdate: "December 4, 1969", education: "Bachelor of Science in Environmental Science, Silliman University",achievements: "Environmental Protection Advocate, Green Cabadbaran Project Lead"}
    ]
};

const memberCardsContainer = document.getElementById('sp_member-cards');

function renderMembers(position = 'all'){
    memberCardsContainer.innerHTML = '';

    const filteredMembers = counselors.members.filter(member => {
        return position === "all" ? true : member.position === position;
    });

    filteredMembers.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add("sp_member-cards");

        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image}" alt="${member.name}">`
            + `</div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="bdate">Birthdate: ${member.bdate}</p>
                <p class="education">Education: ${member.education}</p>
                <p class="achievements">Achievements: ${member.achievements}</p>
            </div>
        `;
        memberCardsContainer.appendChild(memberCard);
        
    });
}
renderMembers();

document.getElementById('sp_members').addEventListener('change', function() {
    const selectedPosition = this.value;
    renderMembers(selectedPosition);
});
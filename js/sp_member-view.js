console.log("SP Member view script loaded");

document.addEventListener("DOMContentLoaded", async function() {
    const params = new URLSearchParams(window.location.search);
    const memberId = params.get("id");

    if (!memberId) {
        document.getElementById("memberContainer").innerHTML = "<p>No member ID provided.</p>";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/api/public/members/${memberId}`);
        if(!res.ok) throw new Error("Failed to fetch member details");
        const member = await res.json();

        if (!member) {
            document.getElementById("memberContainer").innerHTML = "<p>Member not found.</p>";
            return;
        }

        // Render full member details
        document.getElementById("memberContainer").innerHTML = `
            <div class="view-item">
                <img class="view-image" src="${member.image}" alt="${member.name}" />
                <h2 class="view-title">${member.name}</h2>
                <p class="view-date"><strong>Position:</strong> ${member.position}</p>
                <p><strong>Birthdate:</strong> ${formatBirthDate(member.birthDate)}</p>
                <p><strong>Education:</strong> ${member.education}</p>
                <p><strong>Achievements:</strong> ${member.achievements}</p>
            </div>
        `;
    } catch (error) {
        console.error("Failed to load member details:", error);
        document.getElementById("memberContainer").innerHTML = "<p>Failed to load member details.</p>";
    }
});

function formatBirthDate(dateString) {
    if (!dateString) return "N/A";
    try {
        const date = new Date(dateString);
        if (isNaN(date)) return "Invalid Date";

        const formattedDate = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        const today = new Date();
        let age = today.getFullYear() - date.getFullYear();
        const m = today.getMonth() - date.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
            age--;
        }

        return `${formattedDate} (Age ${age})`;
    } catch {
        return dateString;
    }
}

document.addEventListener('DOMContentLoaded', function () {
  fetch('agents.json')
    .then(response => response.json())
    .then(data => {
      const gallery = document.querySelector('.gallery');
      gallery.innerHTML = ''; // Clear existing content

      data.forEach(agent => {
        const card = document.createElement('div');
        card.className = 'agent-card';
        card.onclick = () => window.location.href = `agent.html?id=${agent.id}`;
        card.innerHTML = `
          <img src="${agent.thumbnail}" alt="${agent.name}">
          <h2 class="agent-title">${agent.name}</h2>
          <p class="agent-description">${agent.description}</p>
        `;
        gallery.appendChild(card);
      });
    });

  const searchInput = document.getElementById('agentSearch');
  searchInput.addEventListener('input', function () {
    const filter = this.value.toLowerCase();
    const agentCards = document.querySelectorAll('.agent-card');
    
    agentCards.forEach(card => {
      const agentName = card.querySelector('h2').textContent.toLowerCase();
      if (agentName.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

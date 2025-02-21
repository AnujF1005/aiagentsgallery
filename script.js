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
        const thumbnail = agent.thumbnail ? agent.thumbnail : 'assets/placeholder.png';
        const description = agent.description.length > 100 ? agent.description.substring(0, 100) + '...' : agent.description;
        const tags = agent.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
        card.innerHTML = `
          <img src="${thumbnail}" alt="${agent.name}">
          <h2 class="agent-title">${agent.name}</h2>
          <p class="agent-description">${description}</p>
          <div class="agent-tags">${tags}</div>
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
      const agentTags = Array.from(card.querySelectorAll('.agent-tags')).map(tag => tag.textContent.toLowerCase());
      if (agentName.includes(filter) || agentTags.some(tag => tag.includes(filter))) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

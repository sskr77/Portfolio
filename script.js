/* ==========================================================
   EDIT YOUR PORTFOLIO HERE
   Replace the example projects with your own work.
   Featured videos are embedded from Google Drive using driveId.
   ========================================================== */

const projects = [
  {
    title: "يظهرلي ماعادش راجع لتونس│Ubud 🇮🇩",
    category: "Vlogs",
    year: "2026",
    image: "assets/project-01.svg",
    driveId: "1RvnZpotZyxXW9VPLlvCWa4AJOyOf6w5U",
    description: "Fennira Hamza journeys to Ubud, Indonesia, exploring local culture."
  },
  {
    title: "Ktyb - 6 Edit",
    category: "Mograph Edit",
    year: "2025",
    image: "assets/project-02.svg",
    driveId: "1mdYKI-aEJOrg167yXcD9PZNIEhaCAOiF",
    description: "Mograph Edit for the song 6 by ktyb"
  },
  {
    title: "🚗😳🔥 عرض سيارات معدله في تونس slepperz gang 🚗😳🔥",
    category: "Vlogs",
    year: "2025",
    image: "assets/project-03.svg",
    driveId: "16P9nn9ovUGJOchrCGuuBC7Ey2ML57Nmp",
    description: "Vlog about car meeting for Sleeperz."
  }
];

const categories = [
   { name: "Vlogs", description: "Stories, journeys, events & everything in between.", count: 8 },
  { name: "Stream Highlights", description: "The best moments, cut down to keep the energy alive.", count: 2 },
  { name: "Gameplays", description: "Gameplay edits built around pacing, reactions & entertainment.", count: 2 },
  { name: "Lyric Videos", description: "Music, visuals & typography brought together.", count: 1 },
  { name: "Reels", description: "Short-form edits made to catch attention quickly.", count: 7 },
  { name: "Others", description: "Other creative projects and experiments.", count: 5 }
];

const featuredGrid = document.querySelector("#featured-grid");
const categoryList = document.querySelector("#category-list");

function imageMarkup(project) {
  return project.image
    ? `<img src="${project.image}" alt="${project.title}" onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
       <div class="thumb-placeholder" style="display:none">ADD THUMBNAIL → ${project.image}</div>`
    : `<div class="thumb-placeholder">ADD THUMBNAIL</div>`;
}

function renderProjects() {
  featuredGrid.innerHTML = projects.map((p, i) => `
    <article class="work-card reveal" data-index="${i}">
      <div class="thumb">
        ${imageMarkup(p)}
        <div class="play">▶</div>
      </div>
      <div class="card-info">
        <div class="card-title">${p.title}</div>
        <div class="card-meta">${p.category.toUpperCase()}<br>${p.year}</div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".work-card").forEach(card => {
    card.addEventListener("click", () => openModal(projects[Number(card.dataset.index)]));
  });
}

function renderCategories() {
  categoryList.innerHTML = categories.map((c, i) => {
    const count = c.count;
    return `
      <div class="category reveal" data-category="${c.name}">
        <span class="category-number">0${i + 1}</span>
        <span class="category-name">${c.name}</span>
        <span class="category-count">${String(count).padStart(2,"0")} PROJECT${count === 1 ? "" : "S"}</span>
      </div>
    `;
  }).join("");

  document.querySelectorAll(".category").forEach(row => {
    row.addEventListener("click", () => {
      const category = row.dataset.category;
      window.location.href = `category.html?category=${encodeURIComponent(category)}`;
    });
  });
}

const modal = document.querySelector("#video-modal");
const modalPlayer = document.querySelector("#modal-player");
const modalTitle = document.querySelector("#modal-title");
const modalCategory = document.querySelector("#modal-category");
const modalDescription = document.querySelector("#modal-description");

function openModal(project) {
  modalTitle.textContent = project.title;
  modalCategory.textContent = `${project.category} · ${project.year}`;
  modalDescription.textContent = project.description || "";
  modalPlayer.innerHTML = project.driveId
    ? `<iframe src="https://drive.google.com/file/d/${project.driveId}/preview" title="${project.title}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>`
    : `<div class="video-unavailable">Video unavailable</div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
}

function closeModal() {
  modalPlayer.innerHTML = "";
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
}

document.querySelector(".modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", e => { if (e.target === modal) closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

renderProjects();
renderCategories();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* Small mouse interaction for desktop */
if (window.matchMedia("(pointer:fine)").matches) {
  const dot = document.querySelector(".cursor-dot");
  window.addEventListener("mousemove", e => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
  });
}

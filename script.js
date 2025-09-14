// Fetch and display news
fetch("news.json")
  .then((res) => res.json())
  .then((data) => {
    // =======================
    // Main Headline (first news)
    // =======================
    const main = document.getElementById("main-news");
    if (main && data.length > 0) {
      const mainNews = data[0];
      main.innerHTML = `
        <div class="main-news">
          <img src="${mainNews.image}" alt="${mainNews.title}" />
          <h1>${mainNews.title}</h1>
          <p>${mainNews.summary}</p>
          <small>${mainNews.date}</small>
          <a href="news.html?slug=${mainNews.slug}" class="read-more">Read More</a>
        </div>
      `;
    }

    // =======================
    // Other News (small cards)
    // =======================
    const grid = document.getElementById("news-grid");
    if (grid) {
      for (let i = 1; i < data.length; i++) {
        const news = data[i];
        grid.innerHTML += `
          <div class="news-card small">
            <img src="${news.image}" alt="news image" />
            <div class="news-content">
              <h2>${news.title}</h2>
              <p>${news.summary}</p>
              <small>${news.date}</small>
              <a href="news.html?slug=${news.slug}" class="read-more">Read more</a>
            </div>
          </div>
        `;
      }
    }

    // =======================
    // Single News Page (news.html)
    // =======================
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("slug");
    if (slug) {
      const news = data.find((item) => item.slug === slug);
      const detail = document.getElementById("news-detail");
      if (detail && news) {
        detail.innerHTML = `
          <h1>${news.title}</h1>
          <img src="${news.image}" alt="${news.title}" />
          <small>${news.date}</small>
          <p>${news.content}</p>
        `;
      }
    }
  })
  .catch((err) => console.error("Error loading news:", err));


function loadNewsByCategory(category) {
  fetch("news.json")
    .then(response => response.json())
    .then(data => {
      const newsContainer = document.getElementById("news-container");
      newsContainer.innerHTML = "";

      const filteredNews = data.filter(item => item.category === category);

      filteredNews.forEach(item => {
        const newsCard = document.createElement("div");
newsCard.classList.add("news-card", "small");

        newsCard.innerHTML = `
          <img src="${item.image}" alt="${item.title}">
          <div class="news-content">
            <h2>${item.title}</h2>
            <p>${item.summary}</p>
            <a href="news.html?slug=${item.slug}" class="read-more">مزید پڑھیں</a>
          </div>
        `;

        newsContainer.appendChild(newsCard);
      });
    })
    .catch(error => console.error("Error loading news:", error));
}

// =======================
// Mobile Sidebar Toggle
// =======================
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".geo-sidebar");
const overlay = document.querySelector(".sidebar-overlay");

if (menuBtn && sidebar && overlay) {
  menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("visible");
  });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("open");
    overlay.classList.remove("visible");
  });
}

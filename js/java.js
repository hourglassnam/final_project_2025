// DOM loaded
window.addEventListener("DOMContentLoaded", () => {
  const cropType = document.getElementById("cropType");
  const soilType = document.getElementById("soilType");
  const areaSize = document.getElementById("areaSize");
  //const recommendation = document.getElementById("recommendation");
  //const filterBtn = document.getElementById("filterBtn");

  // Product Cards
  const productGrid = document.querySelector(".product-grid");
  for (let i = 1; i <= 8; i++) {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="images/product${i}.jpg" alt="Product ${i}" />
      <h3>Product ${i}</h3>
      <p>Effective for crops grown in various soil conditions.</p>
    `;
    productGrid.appendChild(card);
  }

  // Slider logic
  let currentIndex = 0;
  let isPlaying = true;
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const pauseBtn = document.getElementById("pause");

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
      dots[i].classList.toggle("active", i === index);
    });
    currentIndex = index;
  }

  function nextSlide() {
    let next = (currentIndex + 1) % slides.length;
    showSlide(next);
  }

  let interval = setInterval(nextSlide, 5000);

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      showSlide(parseInt(dot.dataset.index));
    });
  });

  pauseBtn.addEventListener("click", () => {
    if (isPlaying) {
      clearInterval(interval);
      pauseBtn.innerHTML = "&#9658;"; // ▶
    } else {
      interval = setInterval(nextSlide, 5000);
      pauseBtn.innerHTML = "&#10074;&#10074;"; // ⏸
    }
    isPlaying = !isPlaying;
  });
});


// js/java.js (추가된 productData, pagination, 필터 적용 포함)

const productData = [
  {
    name: "Dazitol",
    desc: "Eco-friendly insecticide with quick-acting natural ingredients.",
    category: "Eco",
    soil: "Sandy",
    size: "Small",
    img: "images/Dazitol.png"
  },
  {
    name: "Gragas",
    desc: "Biological fungicide effective for fruit and vegetable diseases.",
    category: "Eco",
    soil: "Clay",
    size: "Large",
    img: "images/Gragas.png"
  },
  {
    name: "Algaeamino",
    desc: "Amino-acid based organic fertilizer for rapid absorption.",
    category: "Soil",
    soil: "Sandy",
    size: "Small",
    img: "images/Algaeamino.png"
  },
  {
    name: "SFB Irr. Fer",
    desc: "SFB formula ideal for irrigation and foliar application.",
    category: "SFB",
    soil: "Clay",
    size: "Large",
    img: "images/SFBIrr.png"
  },
  {
    name: "Sunroot",
    desc: "Plant-based booster improving soil microbiota.",
    category: "SFB",
    soil: "Sandy",
    size: "Small",
    img: "images/Sunroot.png"
  },
  {
    name: "SFB Liquid",
    desc: "Liquid version of SFB for precise foliar nutrition.",
    category: "SFB",
    soil: "Sandy",
    size: "Large",
    img: "images/SFBLiquid.png"
  },
  {
    name: "Jalkeune A",
    desc: "Irrigation fertilizer for improved root zone uptake.",
    category: "Irrigation",
    soil: "Clay",
    size: "Small",
    img: "images/Jalkeune.png"
  },
  {
    name: "Jalkeune B",
    desc: "Balanced irrigation solution for general crops.",
    category: "Irrigation",
    soil: "Clay",
    size: "Large",
    img: "images/Jalkeune.png"
  },
  {
    name: "Bluewing",
    desc: "Functional nutrition for resistance against stress.",
    category: "Func",
    soil: "Sandy",
    size: "Large",
    img: "images/Bluewing.png"
  },
  {
    name: "Bluewing PKA",
    desc: "Enhanced PKA variant supporting fruit set and development.",
    category: "Func",
    soil: "Clay",
    size: "Small",
    img: "images/BluewingPKA.png"
  },
  {
    name: "HappyM",
    desc: "Boosts photosynthesis and chlorophyll formation.",
    category: "Func",
    soil: "Clay",
    size: "Large",
    img: "images/HappyM.png"
  },
  {
    name: "Cheonnyeonbi",
    desc: "Trace mineral supplement for soil revitalization.",
    category: "Func",
    soil: "Sandy",
    size: "Small",
    img: "images/Cheonnyeonbi.png"
  },
  {
    name: "Black Silica",
    desc: "Natural silica for strengthening plant cell walls.",
    category: "Func",
    soil: "Clay",
    size: "Large",
    img: "images/BlackSilica.png"
  },
  {
    name: "PowerCal +",
    desc: "Calcium + micronutrients for fruit quality enhancement.",
    category: "Func",
    soil: "Sandy",
    size: "Small",
    img: "images/PowerCal.png"
  }
];


const productsPerPage = 8;
let currentPage = 1;

function renderProducts(products, page = 1) {
  const productGrid = document.querySelector(".product-grid");
  productGrid.innerHTML = "";

  const start = (page - 1) * productsPerPage;
  const end = start + productsPerPage;
  const pageItems = products.slice(start, end);

  pageItems.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.desc}</p>
    `;
    productGrid.appendChild(card);
  });

  renderPagination(products.length);
}

function renderPagination(totalItems) {
  const pagination = document.querySelector(".pagination");
  const totalPages = Math.ceil(totalItems / productsPerPage);
  pagination.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = `page-btn ${i === currentPage ? "active" : ""}`;
    btn.textContent = i;
    btn.addEventListener("click", () => {
      currentPage = i;
      renderProducts(filteredProducts, currentPage);
    });
    pagination.appendChild(btn);
  }
}

//const filterBtn = document.getElementById("filterBtn");
let filteredProducts = [...productData];


window.addEventListener("DOMContentLoaded", () => {
  renderProducts(productData);
});


// Category filter
const categoryBtns = document.querySelectorAll(".category-filters button");
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selected = btn.dataset.category;

    filteredProducts = productData.filter((p) => {
      return selected === "All" || p.category === selected;
    });

    currentPage = 1;
    renderProducts(filteredProducts);

    // Optional: style active button
    categoryBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  });
});

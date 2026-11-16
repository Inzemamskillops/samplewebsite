
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");

menu.addEventListener("click", () => {
    nav.classList.toggle("open");
    menu.textContent = nav.classList.contains("open") ? "✕" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.classList.remove("open"));
});

// PRODUCT FILTERS

const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".product-card")];
const resultCount = document.getElementById("resultCount");
const noResults = document.getElementById("noResults");

function applyFilters() {
    const activeFilter = document.querySelector(".filter.active").dataset.filter;
    const search = document.getElementById("searchInput").value.toLowerCase();

    let count = 0;

    cards.forEach(card => {
        const matchesCategory =
            activeFilter === "all" ||
            card.dataset.category === activeFilter;

        const matchesSearch =
            card.dataset.name.toLowerCase().includes(search) ||
            card.dataset.category.toLowerCase().includes(search);

        const visible = matchesCategory && matchesSearch;

        card.style.display = visible ? "" : "none";

        if (visible) count++;
    });

    resultCount.textContent = `${count} PRODUCTS`;
    noResults.hidden = count !== 0;
}

filters.forEach(button => {
    button.addEventListener("click", () => {
        filters.forEach(item => item.classList.remove("active"));
        button.classList.add("active");
        applyFilters();
    });
});

// CATEGORY SHORTCUTS

document.querySelectorAll(".category-card").forEach(button => {
    button.addEventListener("click", () => {
        const category = button.dataset.category;
        const filter = document.querySelector(
            `.filter[data-filter="${category}"]`
        );

        filter.click();
        document.getElementById("products").scrollIntoView({
            behavior: "smooth"
        });
    });
});

// NAV CATEGORY LINKS

document.querySelectorAll("[data-nav-filter]").forEach(link => {
    link.addEventListener("click", () => {
        const filter = document.querySelector(
            `.filter[data-filter="${link.dataset.navFilter}"]`
        );
        filter.click();
    });
});

// SEARCH

const searchPanel = document.getElementById("searchPanel");

document.getElementById("searchToggle").addEventListener("click", () => {
    searchPanel.classList.toggle("open");
    if (searchPanel.classList.contains("open")) {
        document.getElementById("searchInput").focus();
    }
});

document.getElementById("closeSearch").addEventListener("click", () => {
    searchPanel.classList.remove("open");
});

document.getElementById("searchInput").addEventListener("input", applyFilters);

// WISHLIST

let wishlist = 0;

document.querySelectorAll(".heart").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("liked");
        button.textContent = button.classList.contains("liked") ? "♥" : "♡";

        wishlist += button.classList.contains("liked") ? 1 : -1;
        document.getElementById("wishCount").textContent = wishlist;
    });
});

document.getElementById("wishlistTop").addEventListener("click", () => {
    filters.find(button => button.dataset.filter === "all").click();

    cards.forEach(card => {
        card.style.display = card.querySelector(".heart").classList.contains("liked") ? "" : "none";
    });

    document.getElementById("resultCount").textContent =
        `${wishlist} WISHLIST ITEMS`;

    noResults.hidden = wishlist !== 0;

    document.getElementById("products").scrollIntoView({
        behavior: "smooth"
    });
});

// SHOPPING CART

let cart = [];

function updateCart() {
    document.getElementById("cartCount").textContent = cart.length;

    const items = document.getElementById("cartItems");
    items.innerHTML = "";

    let total = 0;

    cart.forEach((product, index) => {
        total += product.price;

        const item = document.createElement("div");
        item.className = "cart-item";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;

        const info = document.createElement("div");
        const name = document.createElement("h4");
        name.textContent = product.name;

        const price = document.createElement("p");
        price.textContent = "₹" + product.price.toLocaleString("en-IN");

        const remove = document.createElement("button");
        remove.textContent = "REMOVE";
        remove.addEventListener("click", () => {
            cart.splice(index, 1);
            updateCart();
        });

        info.append(name, price, remove);
        item.append(image, info);
        items.append(item);
    });

    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");
}

function addToCart(card) {
    cart.push({
        name: card.dataset.name,
        price: Number(card.dataset.price),
        image: card.querySelector("img").src
    });

    updateCart();
}

document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("dblclick", () => addToCart(card));
});

document.getElementById("cartToggle").addEventListener("click", () => {
    document.getElementById("cartDrawer").classList.add("open");
    document.getElementById("drawerOverlay").classList.add("open");
});

function closeCart() {
    document.getElementById("cartDrawer").classList.remove("open");
    document.getElementById("drawerOverlay").classList.remove("open");
}

document.getElementById("drawerClose").addEventListener("click", closeCart);
document.getElementById("drawerOverlay").addEventListener("click", closeCart);

document.getElementById("checkoutButton").addEventListener("click", closeCart);

// QUICK VIEW

let selectedProduct = null;

const modal = document.getElementById("productModal");

document.querySelectorAll(".quick-view").forEach(button => {
    button.addEventListener("click", () => {
        selectedProduct = button.closest(".product-card");

        document.getElementById("modalImage").src =
            selectedProduct.querySelector("img").src;

        document.getElementById("modalName").textContent =
            selectedProduct.dataset.name;

        document.getElementById("modalPrice").textContent =
            "₹" + Number(selectedProduct.dataset.price).toLocaleString("en-IN");

        modal.classList.add("open");
    });
});

document.getElementById("modalClose").addEventListener("click", () => {
    modal.classList.remove("open");
});

modal.addEventListener("click", event => {
    if (event.target === modal) modal.classList.remove("open");
});

document.getElementById("modalAdd").addEventListener("click", () => {
    if (selectedProduct) {
        addToCart(selectedProduct);
        modal.classList.remove("open");
        document.getElementById("cartDrawer").classList.add("open");
        document.getElementById("drawerOverlay").classList.add("open");
    }
});

// NEWSLETTER DEMO

document.getElementById("newsletterForm").addEventListener("submit", event => {
    event.preventDefault();

    document.getElementById("newsletterMessage").textContent =
        "Thank you for joining VÉRA! Newsletter demo submitted.";

    event.target.reset();
});

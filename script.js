
// Mobile navigation

const menu = document.getElementById("menu");
const navigation = document.getElementById("navigation");

menu.addEventListener("click", () => {
    navigation.classList.toggle("open");

    menu.textContent =
        navigation.classList.contains("open") ? "✕" : "☰";
});

// Close mobile navigation after clicking a link

document.querySelectorAll("#navigation a").forEach(link => {
    link.addEventListener("click", () => {
        navigation.classList.remove("open");
        menu.textContent = "☰";
    });
});

// Fashion category filters

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".fashion-card");

filters.forEach(button => {

    button.addEventListener("click", () => {

        filters.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const category = button.dataset.filter;

        cards.forEach(card => {

            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.classList.remove("hide");
            } else {
                card.classList.add("hide");
            }

        });

    });

});

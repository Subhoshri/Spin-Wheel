document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeDropdown = document.getElementById("theme");
    const spinButton = document.querySelector(".spin");
    const wheelContainer = document.querySelector(".wheel-container");

    const wheelItems = {
        books: ["Fantasy", "Mystery", "Sci-Fi", "Romance", "Horror", "Historical", "Non-Fiction", "Self-Help", "Poetry", "Classic", "Thriller", "Adventure"],
        movies: ["Action", "Comedy", "Drama", "Thriller", "Anime", "Horror", "Sci-Fi", "Romance", "Mystery", "Fantasy", "Hollywood", "Bollywood"],
        foods: ["Pizza", "Burgers", "Sushi", "Pasta", "Ice Cream", "Tacos", "Donuts", "Salad", "Steak", "Soup", "Sandwiches", "Fried Chicken"],
        games: ["Devil May Cry", "RDR2", "Palia", "Call of Duty", "Minecraft", "Genshin Impact", "Cyberpunk", "Among Us", "BGMI", "Valorant", "Fortnite", "Apex Legends"]
    };

    const themeColors = {
        books: ["#C19A6B", "#8B5E3C", "#D8C3A5", "#A98467", "#765827", "#4E3B2A"],  // Cozy, earthy tones
        movies: ["#FFD700", "#8B0000", "#1C1C1C", "#2F4F4F", "#4169E1", "#D2691E"],  // Cinematic contrast
        foods: ["#FF5733", "#FFA500", "#FFD700", "#6B8E23", "#DC143C", "#8FBC8F"],  // Vibrant, tasty colors
        games: ["#8A2BE2", "#00FFFF", "#FF1493", "#32CD32", "#FF4500", "#9400D3"]   // Neon, cyberpunk vibes
    };

    const themeBackgrounds = {
        books: "url('images/book31.jpg')",
        movies: "url('images/movie2.jpg')",
        foods: "url('images/food.jpg')",
        games: "url('images/game3.jpg')"
    };

    function createWheel(theme) {
        wheelContainer.innerHTML = "";
        const items = wheelItems[theme];
        const colors = themeColors[theme];
        const count = items.length;
        wheelContainer.style.setProperty('--count', count);

        items.forEach((item, i) => {
            const wheelItem = document.createElement("div");
            wheelItem.classList.add("wheel-item");
            wheelItem.style.setProperty('--i', i);
            wheelItem.style.setProperty('--clr', colors[i % colors.length]);
            wheelItem.innerHTML = `<span>${item}</span>`;
            wheelContainer.appendChild(wheelItem);
        });

        body.style.background = `${themeBackgrounds[theme]} repeat`;

    }

    let isSpinning = false;
    spinButton.addEventListener("click", () => {
        if (isSpinning) return;
        isSpinning = true;

        const randomDegree = 3600 + Math.floor(Math.random() * 360);
        wheelContainer.style.transition = "transform 5s ease-in-out";
        wheelContainer.style.transform = `rotate(${randomDegree}deg)`;

        setTimeout(() => {
            wheelContainer.style.transition = "none";
            const finalRotation = randomDegree % 360;
            wheelContainer.style.transform = `rotate(${finalRotation}deg)`;
            isSpinning = false;
        }, 5000);
    });

    createWheel("books");
    themeDropdown.addEventListener("change", (event) => {
        const selectedTheme = event.target.value;
        body.setAttribute("data-theme", selectedTheme);
        createWheel(selectedTheme);
    });
});

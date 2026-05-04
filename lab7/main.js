document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.getElementById("main-content");
    const catalogLink = document.getElementById("catalog-link");

    window.loadCategories = async function() {
        try {
            const response = await fetch('data/categories.json');
            const categories = await response.json();
            renderCategories(categories);
        } catch (error) {
            console.error("Помилка завантаження категорій:", error);
        }
    }

    window.renderCategories = function(categories) {
        let html = `<h2 class="mb-4 text-center">Каталог товарів</h2><div class="row">`;
        
        categories.forEach(cat => {
            html += `
                <div class="col-md-4 mb-3">
                    <div class="card h-100 clickable p-3 text-center" onclick="loadCategoryItems('${cat.shortname}')">
                        <h3>${cat.name}</h3>
                        <p class="text-muted">${cat.notes || "Опис відсутній"}</p>
                    </div>
                </div>`;
        });


        html += `
            <div class="col-md-12 mt-4">
                <div class="card bg-warning text-center p-4 clickable" onclick="loadRandomCategory()">
                    <h2>Specials</h2>
                    <p>Натисніть, щоб побачити випадкову категорію!</p>
                </div>
            </div>
        </div>`;

        mainContent.innerHTML = html;
    }

    window.loadCategoryItems = async function(shortname) {
        try {
            const response = await fetch(`data/${shortname}.json`);
            const data = await response.json();
            renderItems(data);
        } catch (error) {
            mainContent.innerHTML = `<div class="alert alert-danger">Помилка завантаження товарів цієї категорії.</div>`;
        }
    };

    function renderItems(data) {
        let html = `<button class="btn btn-secondary mb-3" onclick="loadCategories()">← Назад до категорій</button>`;
        html += `<h2 class="mb-4">${data.category_name}</h2><div class="row">`;

        data.items.forEach(item => {
            html += `
                <div class="col-md-6 col-lg-4 mb-4">
                    <div class="card h-100 shadow-sm p-3">
                        <img src="https://placehold.co/200x200?text=${item.shortname}" class="product-img mx-auto mb-3" alt="${item.name}">
                        <h4>${item.name}</h4>
                        <p class="flex-grow-1">${item.description}</p>
                        <div class="fw-bold text-primary fs-5">${item.price} грн.</div>
                    </div>
                </div>`;
        });

        html += `</div>`;
        mainContent.innerHTML = html;
    }

    window.loadRandomCategory = async function() {
        const response = await fetch('data/categories.json');
        const categories = await response.json();
        const randomIndex = Math.floor(Math.random() * categories.length);
        loadCategoryItems(categories[randomIndex].shortname);
    };

    catalogLink.addEventListener("click", (e) => {
        e.preventDefault();
        loadCategories();
    });
});
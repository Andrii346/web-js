const contentArea = document.getElementById('content-area');

async function loadCategories() {
    try {
        const response = await fetch('./data/categories.json');
        const categories = await response.json();
        
        let html = '<h2 class="mb-4">Наші категорії</h2><div class="list-group mb-3">';
        
        categories.forEach(cat => {
            html += `
                <button class="list-group-item list-group-item-action" onclick="loadItems('${cat.shortname}')">
                    <strong>${cat.name}</strong> <br>
                    <small class="text-muted">${cat.notes}</small>
                </button>`;
        });    
        html += `
            <button class="list-group-item list-group-item-action list-group-item-warning" onclick="loadSpecials()">
                <strong>✨ Specials (Випадкова категорія)</strong>
            </button>`;
        
        html += '</div>';
        contentArea.innerHTML = html;
    } catch (error) {
        contentArea.innerHTML = '<div class="alert alert-danger">Помилка завантаження каталогу.</div>';
    }
}

async function loadItems(shortname) {
    try {
        const response = await fetch(`data/${shortname}.json`);
        const data = await response.json();
        
        let html = `<button class="btn btn-outline-secondary mb-3" onclick="loadCategories()">← Назад до категорій</button>`;
        html += `<h2 class="mb-4">${data.category_name}</h2><div class="row">`;
        
        data.items.forEach(item => {
            html += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm">
                        <img src="https://placehold.co/200x200?text=${item.name}" class="card-img-top product-img" alt="${item.name}">
                        <div class="card-body">
                            <h5 class="card-title">${item.name}</h5>
                            <p class="card-text text-muted">${item.description}</p>
                            <h6 class="text-primary">${item.price}</h6>
                        </div>
                    </div>
                </div>`;
        });
        
        html += '</div>';
        contentArea.innerHTML = html;
    } catch (error) {
        contentArea.innerHTML = '<div class="alert alert-danger">Ця категорія поки порожня.</div>';
    }
}



async function loadSpecials() {
    const response = await fetch('data/categories.json');
    const categories = await response.json();
    const randomIndex = Math.floor(Math.random() * categories.length);
    loadItems(categories[randomIndex].shortname);
}
// js/script.js
// Sample products
const products = [
    {
        id: 1,
        name: "Nike Air Max",
        price: 129,
        category: "running",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },
    {
        id: 2,
        name: "Benpao",
        price: 89,
        category: "casual",
        image: "https://imgs.search.brave.com/FDGSHooB7krn-M8o27Cr9aSur9jnlDf2e_yz9pJwDyE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/ODF0RGp2NXJ5LUwu/anBn "
    },
    {
        id: 3,
        name: "Air Jordan 1 Low",
        price: 159,
        category: "sneakers",
        image: "https://imgs.search.brave.com/e5cihAjalZRG16qw74hC5JnhaFXXabgWy1lc5NbckZM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzI3LzA1/LzcyLzI3MDU3Mjc3/NmFlOGNmMGY0NGRl/YjI1NDI0YTIzZWY0/LmpwZw"
    },
    {
        id: 4,
        name: "Classic Leathe",
        price: 139,
        category: "running",
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa"
    },
    {
        id: 5,
        name: "Oxford Streetwear",
        price: 119,
        category: "casual",
        image: "https://imgs.search.brave.com/plAxW9S71WZTm0WdSolOltxib9lwVHNC-DaEau3YPAI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzE2WkdXNWpQa0wu/anBn"
    },
    {
        id: 6,
        name: "Air Jordan IV",
        price: 95,
        category: "sneakers",
        image: "https://imgs.search.brave.com/rkpsfo52x0eoMeqGlpmiX-HZcG5oO4Um2iJYzXkAOrk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMubmlrZS5jb20v/YS9pbWFnZXMvd18x/MjgwLHFfYXV0byxm/X2F1dG8vYWJ3ZjAw/c2plOHZwYWJsMXZi/eGIvYWlyLWpvcmRh/bi00LXJldHJvLXNu/YWtlc2tpbi1yZWxl/YXNlLWRhdGUuanBn"
    }
];

// Render products
function renderProducts(filteredProducts) {
    const container = document.getElementById('productGrid');
    if (!container) return;
    
    container.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">$${product.price}</div>
                <button onclick="addToCart(${product.id})" class="add-to-cart">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// Simple routing
function navigateTo(page) {
    // Hide all sections
    const sections = ['home', 'shop', 'about', 'contact'];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.display = id === 'home' ? 'none' : 'none';
        }
    });
    
    // Show target
    const target = document.getElementById(page);
    if (target) {
        target.style.display = page === 'home' ? 'flex' : 'block';
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Filter by category
function filterCategory(category) {
    const buttons = document.querySelectorAll('.filter-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (category === 'all') {
        const firstBtn = document.querySelector('.filter-btn');
        if (firstBtn) firstBtn.classList.add('active');
        renderProducts(products);
    } else {
        const activeBtn = Array.from(buttons).find(btn => 
            btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${category}'`)
        );
        if (activeBtn) activeBtn.classList.add('active');
        
        const filtered = products.filter(p => p.category === category);
        renderProducts(filtered);
    }
}

// Search function
function performSearch() {
    const input = document.getElementById('searchInput');
    if (!input) return;
    
    const query = input.value.toLowerCase().trim();
    
    if (!query) {
        renderProducts(products);
        navigateTo('shop');
        return;
    }
    
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query)
    );
    
    navigateTo('shop');
    renderProducts(filtered);
}

// Add to cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    const modalProductName = document.getElementById('modalProductName');
    const cartModal = document.getElementById('cartModal');
    
    if (modalProductName && cartModal) {
        modalProductName.textContent = `${product.name} — $${product.price}`;
        cartModal.style.display = 'flex';
    }
    
    console.log(`Added ${product.name} to cart`);
}

function closeModal() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Handle contact form
function handleContact(e) {
    e.preventDefault();
    alert("Thank you! Your message has been received. We'll reply soon.");
    e.target.reset();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    const searchInput = document.getElementById('searchInput');
    if (e.key === '/' && searchInput && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    renderProducts(products);
    
    // Show home by default
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.style.display = 'flex';
    }
    
    console.log('%c✅ Stride Store website ready! Press / to focus search.', 'color:#e63939; font-weight:600');
});
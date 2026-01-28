let products = []; 

function currency(v){return v.toLocaleString('en-US')+" ₸"}
function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}

function addToCart(id, qty){
    qty = Number(qty || 1);
    var cart = getCart();
    var i = cart.find(x => x.id === id); 
    if(i){
        i.qty += qty;
    } else {
        var p = products.find(x => x._id === id); 
        if(p) {
            cart.push({id: id, title: p.name, price: p.price, img: p.img, qty: qty});
        }
    }
    if (typeof setCart === "function") setCart(cart); 
    if (typeof showToast === "function") showToast("Item added to cart");
}


$(async function(){ 
    
    async function loadCategories() {
        if ($('#category').length === 0) return;

        try {
            const response = await fetch('/api/v2/categories');
            const categories = await response.json();
            
            const categorySelect = $('#category');
            
            categorySelect.html('<option value="">All Categories</option>');

            categories.forEach(cat => {
                categorySelect.append(`<option value="${cat.name}">${cat.name}</option>`);
            });

        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    }

    async function fetchProductsFromServer() {
        try {
            const response = await fetch('/api/v2/items');
            products = await response.json();
            
            if($('#popular-products').length) renderPopular();
            if($('#product-grid').length) renderCatalog();
        } catch (err) {
            console.error("Failed to fetch products:", err);
        }
    }

    function renderPopular() {
        var popular = products.slice(0, 4); 
        $('#popular-products').html(popular.map(p=>`
            <div class="col-6 col-md-3">
                <div class="card h-100 product-card">
                    <div class="product-image-wrapper"><img src="${p.img || 'https://via.placeholder.com/300'}" class="card-img-top"></div>
                    <div class="card-body">
                        <h6>${p.name}</h6>
                        <div class="price text-primary">${currency(p.price)}</div>
                        <a href="product.html?id=${p._id}" class="btn btn-outline-primary btn-sm mt-2">Details</a> 
                        <button class="btn btn-primary btn-sm mt-2" onclick="addToCart('${p._id}')">Add to cart</button>
                    </div>
                </div>
            </div>`).join(''));
    }

    function renderCatalog() {
        function render(list){
            $('#product-grid').html(list.map(p=>`
                <div class="col-6 col-md-4 col-lg-3">
                    <div class="card h-100 product-card">
                        <div class="product-image-wrapper"><img src="${p.img || 'https://via.placeholder.com/300'}" class="card-img-top"></div>
                        <div class="card-body d-flex flex-column">
                            <div class="d-flex justify-content-between align-items-start">
                                <!-- Проверка, есть ли категория, чтобы не было ошибки -->
                                <span class="badge badge-cat">${(p.category || 'General').toUpperCase()}</span>
                                <span class="price text-primary">${currency(p.price)}</span>
                            </div>
                            <h6 class="mt-2">${p.name}</h6>
                            <div class="mt-auto d-flex gap-2">
                                <a href="product.html?id=${p._id}" class="btn btn-outline-primary btn-sm">Details</a>
                                <button class="btn btn-primary btn-sm" onclick="addToCart('${p._id}')">Add to Cart</button>
                                <button class="btn btn-light btn-sm" data-qv="${p._id}">Quick view</button>
                            </div>
                        </div>
                    </div>
                </div>`).join(''));
        }
        
        render(products);

        $('#search, #category').on('input change', function(){
            var q = $('#search').val().toLowerCase();
            var c = $('#category').val(); 

            render(products.filter(p => {
                const matchesName = p.name.toLowerCase().includes(q);
                const matchesCategory = c ? p.category === c : true; 
                return matchesName && matchesCategory;
            }));
        });
    }

    await loadCategories(); 
    await fetchProductsFromServer();

});
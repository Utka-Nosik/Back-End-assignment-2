var products=[
    {id:1,title:"Dog Dry Food 3kg",price:6990,category:"dog",img:"https://thumbs.dreamstime.com/b/dry-food-dog-cat-38314793.jpg",desc:"Balanced nutrition for adult dogs."},
    {id:2,title:"Dog Rope Toy",price:2490,category:"dog",img:"https://m.media-amazon.com/images/I/81V3yf82dcL._AC_SL1500_.jpg",desc:"Durable rope for active play."},
    {id:3,title:"Cat Dry Food 2kg",price:5990,category:"cat",img:"https://mininos.es/wp-content/uploads/2021/03/A-brown-tabby-cat-eating-a-bowl-of-dry-food.jpg",desc:"Supports coat and dental health."},
    {id:4,title:"Cat Litter 10L",price:4290,category:"cat",img:"https://blog.blains.com/blog/wp-content/uploads/2015/08/Cat-Litter-Buying-Guide.jpg",desc:"Strong absorption and odor control."},
    {id:5,title:"Fish Flakes 250g",price:1990,category:"fish",img:"https://i5.walmartimages.com/asr/2170796f-ef1b-4d2b-a9ba-8854331c4b80_2.7dbd02d6f6f3ee09045debcd79dd9657.jpeg",desc:"Suitable for all aquarium fish."},
    {id:6,title:"Bird Cage Large",price:15990,category:"bird",img:"https://explorejunglebirds.com/wp-content/uploads/2024/03/Bird-Cages.webp",desc:"Comfortable spacious cage."},
    {id:7,title:"Dog Treats 500g",price:2990,category:"dog",img:"https://i.pinimg.com/originals/c9/1b/b9/c91bb9bcfe29a8e8e1c34af60c3a71d4.jpg",desc:"Natural meat bites."},
    {id:8,title:"Cat House Soft",price:12990,category:"cat",img:"https://i.pinimg.com/750x/9f/ac/0d/9fac0df0908a0efc500e3da1099234b9.jpg",desc:"Warm cozy cat house."},
    {id:9,title:"Cat Feather Toy",price:1990,category:"cat",img:"https://m.media-amazon.com/images/I/61wW1fjfwvL._AC_SL1500_.jpg",desc:"Interactive feather toy."},
    {id:10,title:"Dog Bone Toy",price:2290,category:"dog",img:"https://ae01.alicdn.com/kf/Sb94af39c5e7a4516b2811c2efa2c41cdK.jpg",desc:"Chew toy for dogs."},
    {id:11,title:"Bird Food Mix 1kg",price:2990,category:"bird",img:"https://www.beakybites.co.uk/user/products/large/All%20Season%20Mix%20-%20Front.jpg",desc:"Healthy nutritious bird mix."},
    {id:12,title:"Fish Pellets 500g",price:2490,category:"fish",img:"https://m.media-amazon.com/images/I/71FJtk6zOdL.jpg",desc:"High protein floating pellets."}
];

function currency(v){return v.toLocaleString('en-US')+" ₸"}
function getCart(){return JSON.parse(localStorage.getItem('cart')||'[]')}
function setCart(c){localStorage.setItem('cart',JSON.stringify(c));updateCartCount();updateCheckoutSummary()}
function updateCartCount(){var c=getCart().reduce((s,i)=>s+i.qty,0);$('.cart-count').text(c)}
function addToCart(id,qty){qty=Number(qty||1);var cart=getCart();var i=cart.find(x=>x.id===id);if(i){i.qty+=qty}else{var p=products.find(x=>x.id===id);cart.push({id:id,title:p.title,price:p.price,img:p.img,qty:qty})}setCart(cart);showToast("Item added to cart")}
function showToast(msg){$('#toast .toast-body').text(msg);var t=new bootstrap.Toast('#toast');t.show()}

let activePromoCode=null;
const PROMO_CODES={"freedel":{type:"shipping"},"30bako":{type:"percent",value:0.3}};
const SHIPPING_THRESHOLD=5000;
const SHIPPING_COST=1500;
const VAT_RATE=0.12;

function updateCheckoutSummary(){
    if(!$('#checkout').length)return;
    const cart=getCart();
    const subtotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
    let discountAmount=0;
    let shippingCost=0;
    let isShippingFreeByPromo=false;
    if(activePromoCode){
        const promo=PROMO_CODES[activePromoCode];
        if(promo.type==="shipping"){isShippingFreeByPromo=true}
        else if(promo.type==="percent"){discountAmount=subtotal*promo.value}
    }
    if($('#shipping-delivery').is(':checked')){
        shippingCost=isShippingFreeByPromo||subtotal>=SHIPPING_THRESHOLD?0:SHIPPING_COST;
    }
    const subtotalAfterDiscount=subtotal-discountAmount;
    const vatAmount=subtotalAfterDiscount*VAT_RATE;
    const donationAmount=$('#donation-checkbox').is(':checked')?Number($('#donation-amount').val()||0):0;
    const total=subtotalAfterDiscount+shippingCost+vatAmount+donationAmount;
    $('#summary-subtotal').text(currency(subtotal));
    $('#summary-discount').text(`-${currency(discountAmount)}`);
    $('#summary-shipping').text(shippingCost>0?currency(shippingCost):"Free");
    $('#summary-vat').text(currency(vatAmount));
    $('#summary-donation').text(currency(donationAmount));
    $('#summary-total, #footer-total').text(currency(total));
    $('#subtotal').text(currency(subtotal));
    $('#shipping-cost').text(shippingCost>0?currency(shippingCost):"Free");
    $('#total').text(currency(subtotal+shippingCost));
}

$(function(){
    const themeToggle=$('#theme-toggle');
    const moonIcon='bi-moon';
    const sunIcon='bi-sun';

    const setTheme=(theme)=>{
        document.documentElement.setAttribute('data-bs-theme',theme);
        localStorage.setItem('theme',theme);
        themeToggle.find('i').removeClass(theme==='dark'?sunIcon:moonIcon).addClass(theme==='dark'?moonIcon:sunIcon);
    };

    const currentTheme=localStorage.getItem('theme')||'light';
    setTheme(currentTheme);

    themeToggle.on('click',function(){
        const newTheme=document.documentElement.getAttribute('data-bs-theme')==='dark'?'light':'dark';
        setTheme(newTheme);
    });

    updateCartCount();

    if($('#popular-products').length){
        var popular=[1,3,7,8].map(i=>products.find(p=>p.id===i));
        $('#popular-products').html(popular.map(p=>`<div class="col-6 col-md-3"><div class="card h-100 product-card"><div class="product-image-wrapper"><img src="${p.img}" class="card-img-top"></div><div class="card-body"><h6>${p.title}</h6><div class="price text-primary">${currency(p.price)}</div><a href="product.html?id=${p.id}" class="btn btn-outline-primary btn-sm mt-2">Details</a> <button class="btn btn-primary btn-sm mt-2" data-id="${p.id}">Add to cart</button></div></div></div>`).join(''));
        $('#popular-products').on('click','button',function(){
            addToCart(Number($(this).data('id')),1);
        });
    }

    if($('#product-grid').length){
        function render(list){
            $('#product-grid').html(list.map(p=>`<div class="col-6 col-md-4 col-lg-3"><div class="card h-100 product-card"><div class="product-image-wrapper"><img src="${p.img}" class="card-img-top"></div><div class="card-body d-flex flex-column"><div class="d-flex justify-content-between align-items-start"><span class="badge badge-cat">${p.category.toUpperCase()}</span><span class="price text-primary">${currency(p.price)}</span></div><h6 class="mt-2">${p.title}</h6><div class="mt-auto d-flex gap-2"><a href="product.html?id=${p.id}" class="btn btn-outline-primary btn-sm">Details</a><button class="btn btn-primary btn-sm" data-id="${p.id}">Add to Cart</button><button class="btn btn-light btn-sm" data-qv="${p.id}">Quick view</button></div></div></div></div>`).join(''));
        }
        render(products);
        $('#search,#category').on('input change',function(){
            var q=$('#search').val().toLowerCase(),c=$('#category').val();
            render(products.filter(p=>p.title.toLowerCase().includes(q)&&(c?p.category===c:true)));
        });
        $('#product-grid').on('click','button',function(){
            var id=$(this).data('id');
            if(id){addToCart(Number(id),1)}
            var qv=$(this).data('qv');
            if(qv){
                var p=products.find(x=>x.id===qv);
                $('#qv-img').attr('src',p.img);
                $('#qv-title').text(p.title);
                $('#qv-price').text(currency(p.price));
                $('#qv-desc').text(p.desc);
                $('#qv-qty').val(1);
                $('#qv-add').data('id',p.id);
                new bootstrap.Modal('#quickView').show();
            }
        });
        $('#qv-add').on('click',function(){
            addToCart(Number($(this).data('id')),$('#qv-qty').val());
            $('.modal').modal('hide');
        });
    }

    if($('#product-detail').length){
        var id=Number(new URLSearchParams(location.search).get('id')||0);
        var p=products.find(x=>x.id===id)||products[0];
        $('#product-detail').html(`<div class="row g-4"><div class="col-md-6"><img class="img-fluid rounded-4 shadow-sm" src="${p.img}"></div><div class="col-md-6"><h2>${p.title}</h2><div class="fs-4 text-primary mb-2">${currency(p.price)}</div><p>${p.desc}</p><div class="d-flex gap-2 align-items-center"><input id="qty" type="number" min="1" value="1" class="form-control" style="width:110px"><button class="btn btn-primary" id="buy" data-id="${p.id}">Add to Cart</button></div></div></div>`);
        $('#buy').on('click',function(){
            addToCart(Number($(this).data('id')),$('#qty').val());
        });
    }

    if($('#cart-items').length){
        function renderCartItems(){
            var cart=getCart();
            if(!cart.length){
                $('#cart-items').html('<div class="alert alert-light border">Your cart is empty.</div>');
                $('button[data-bs-target="#checkout"]').prop('disabled',true);
                return;
            }
            $('button[data-bs-target="#checkout"]').prop('disabled',false);
            $('#cart-items').html(cart.map((i,idx)=>`<div class="card"><div class="card-body d-flex gap-3 align-items-center"><img src="${i.img}" class="rounded" style="width:80px;height:80px;object-fit:cover"><div class="flex-grow-1"><div class="fw-semibold">${i.title}</div><div class="text-primary">${currency(i.price)}</div></div><input type="number" min="1" value="${i.qty}" class="form-control cart-qty" data-idx="${idx}" style="width:90px"><button class="btn btn-outline-danger btn-sm remove" data-idx="${idx}"><i class="bi bi-x-lg"></i></button></div></div>`).join(''));
        }
        renderCartItems();
        updateCheckoutSummary();

        $('#cart-items').on('input','.cart-qty',function(){
            var cart=getCart();
            cart[$(this).data('idx')].qty=Number($(this).val());
            setCart(cart);
            renderCartItems();
        });
        $('#cart-items').on('click','.remove',function(){
            var cart=getCart();
            cart.splice($(this).data('idx'),1);
            setCart(cart);
            renderCartItems();
        });
        $('input[name="shippingOption"]').on('change',function(){
            const isDelivery=$(this).val()==='delivery';
            $('#delivery-address-form').toggle(isDelivery);
            $('#pickup-info').toggle(!isDelivery);
            $('#delivery-policy').toggle(isDelivery);
            $('#delivery-address-form input').prop('required',isDelivery);
            updateCheckoutSummary();
        });
        $('#apply-promo-btn').on('click',function(){
            const code=$('#promo-code-input').val().trim().toLowerCase();
            const feedbackEl=$('#promo-feedback');
            if(activePromoCode===code&&code!==''){
                activePromoCode=null;
                feedbackEl.text('');
                $(this).text('Apply').removeClass('btn-outline-danger').addClass('btn-outline-secondary');
                $('#promo-code-input').val('');
            }else if(PROMO_CODES[code]){
                activePromoCode=code;
                feedbackEl.text(`Promocode "${code}" applied.`).removeClass('text-danger').addClass('text-success');
                $(this).text('Remove').removeClass('btn-outline-secondary').addClass('btn-outline-danger');
            }else{
                feedbackEl.text('Invalid promocode.').removeClass('text-success').addClass('text-danger');
            }
            updateCheckoutSummary();
        });
        $('#donation-checkbox').on('change',function(){
            const isChecked=$(this).is(':checked');
            $('#donation-input-group').toggle(isChecked);
            $('#donation-summary-row').toggle(isChecked);
            if(!isChecked)$('#donation-amount').val('');
            updateCheckoutSummary();
        });
        $('#donation-amount').on('input',updateCheckoutSummary);
        $('#cardNumber').on('input',function(){
            var v=$(this).val().replace(/[^\d]/g,'').substring(0,16);
            $(this).val(v.match(/.{1,4}/g)?.join('-')||'');
        });
        $('#cardExpiry').on('input',function(){
            var v=$(this).val().replace(/[^\d]/g,'').substring(0,4);
            $(this).val(v.length>2?v.substring(0,2)+'/'+v.substring(2):v);
        });
        $('#submit-order').on('click',function(){
            var form=$('#checkout-form')[0];
            var expiryInput=form.querySelector('#cardExpiry');
            expiryInput.setCustomValidity('');
            if(expiryInput.value){
                const[m,y]=expiryInput.value.split('/');
                if(m&&y&&y.length===2){
                    const d=new Date(`20${y}`,m-1);
                    const c=new Date();
                    const M=new Date();
                    M.setFullYear(M.getFullYear()+5);
                    c.setHours(0,0,0,0);
                    d.setDate(1);
                    if(d<c){expiryInput.setCustomValidity('Card has expired.')}
                    else if(d>M){expiryInput.setCustomValidity('Expiry year cannot be more than 5 years in the future.')}
                }
            }
            if(!form.checkValidity()){
                form.classList.add('was-validated');
                return;
            }

            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const cart = getCart();
            const total = $('#footer-total').text();
            
            const newOrder = {
                id: Date.now(),
                date: new Date().toISOString().split('T')[0],
                items: cart,
                total: total
            };

            orders.push(newOrder);
            localStorage.setItem('orders', JSON.stringify(orders));

            localStorage.removeItem('cart');
            updateCartCount();
            bootstrap.Modal.getInstance($('#checkout')).hide();
            showToast("Order placed successfully!");
            renderCartItems();
            form.classList.remove('was-validated');
            form.reset();
            $('input[name="shippingOption"][value="pickup"]').prop('checked',true).trigger('change');
            activePromoCode=null;
            $('#promo-feedback').text('');
            $('#promo-code-input').val('');
            $('#apply-promo-btn').text('Apply').removeClass('btn-outline-danger').addClass('btn-outline-secondary');
            $('#donation-checkbox').prop('checked',false).trigger('change');
        });
        
        function autofillCheckoutForm() {
            const savedData = localStorage.getItem('userProfile');
            if (savedData) {
                const profile = JSON.parse(savedData);
                if (profile.name) $('#fullName').val(profile.name);
                if (profile.email) $('#email').val(profile.email);
                if (profile.card) $('#cardNumber').val(profile.card);
            }
        }

        const countries=["Kazakhstan","USA","Germany","Japan","United Kingdom"];
        const cities=["Almaty","Astana","Shymkent","Karaganda","Aktobe"];
        $('#countries-list').html(countries.map(c=>`<option value="${c}"></option>`).join(''));
        $('#cities-list').html(cities.map(c=>`<option value="${c}"></option>`).join(''));
        
        $('#checkout').on('shown.bs.modal', function() {
            updateCheckoutSummary();
            autofillCheckoutForm(); 
        });
    }
    
    if($('#contact-form').length){
        $('#send-msg').on('click',function(e){
            e.preventDefault();
            var form=$('#contact-form')[0];
            var emailInput=form.querySelector('#contact-email');
            var messageInput=form.querySelector('#contact-message');
            emailInput.setCustomValidity('');
            messageInput.setCustomValidity('');
            if(emailInput.value&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)){
                emailInput.setCustomValidity('Please enter a valid email address.');
            }
            if(messageInput.value&&messageInput.value.trim().split(/\s+/).filter(Boolean).length<5){
                messageInput.setCustomValidity('Message must contain at least 5 words.');
            }
            if(!form.checkValidity()){
                form.classList.add('was-validated');
                return;
            }
            showToast('Message sent successfully!');
            form.reset();
            form.classList.remove('was-validated');
        });
    }
});

$(function(){
    if ($('#profile-form').length) {
        
        function saveProfile() {
            const profileData = {
                name: $('#profile-name').val(),
                email: $('#profile-email').val(),
                phone: $('#profile-phone').val(),
                card: $('#profile-card').val(),
                petName: $('#pet-name').val(),
                petBreed: $('#pet-breed').val()
            };
            const fileInput = $('#pet-docs')[0];
            if (fileInput.files.length > 0) {
                profileData.petDocName = fileInput.files[0].name;
            } else {
                 const existingData = JSON.parse(localStorage.getItem('userProfile') || '{}');
                 if(existingData.petDocName) profileData.petDocName = existingData.petDocName;
            }
            localStorage.setItem('userProfile', JSON.stringify(profileData));
        }

        function loadProfile() {
            const savedData = localStorage.getItem('userProfile');
            if (savedData) {
                const profile = JSON.parse(savedData);
                $('#profile-name').val(profile.name);
                $('#profile-email').val(profile.email);
                $('#profile-phone').val(profile.phone);
                $('#profile-card').val(profile.card);
                $('#pet-name').val(profile.petName);
                $('#pet-breed').val(profile.petBreed);

                if (profile.petDocName) {
                    $('#pet-docs-info').html(`<div class="document-info"><i class="bi bi-file-earmark-check"></i> <span>Attached file: ${profile.petDocName}</span></div>`);
                }
            }
        }
        
        loadProfile(); 
        $('#profile-card').on('input', function() {
            let value = $(this).val();
            let cleanedValue = value.replace(/\D/g, '');
            cleanedValue = cleanedValue.substring(0, 16);
            let formattedValue = cleanedValue.match(/.{1,4}/g)?.join('-') || '';
            $(this).val(formattedValue);
        });

        $('#profile-phone').on('input', function() {
            let value = $(this).val();
            let cleaned = value.replace(/\D/g, '');
            cleaned = cleaned.substring(0, 11);
            let formatted = '';
            if (cleaned.length > 0) {
                formatted = '+' + cleaned.substring(0, 1);
            }
            if (cleaned.length > 1) {
                formatted += ' (' + cleaned.substring(1, 4);
            }
            if (cleaned.length > 4) {
                formatted += ') ' + cleaned.substring(4, 7);
            }
            if (cleaned.length > 7) {
                formatted += '-' + cleaned.substring(7, 9);
            }
            if (cleaned.length > 9) {
                formatted += '-' + cleaned.substring(9, 11);
            }
            $(this).val(formatted);
        });
        
        $('#profile-form').on('submit', function(e) {
            e.preventDefault();
            saveProfile();
            showToast("Profile saved successfully!");
            loadProfile();
        });
        
        function getOrderStatus(orderDateString) {
            const orderDate = new Date(orderDateString);
            const currentDate = new Date();
            
            orderDate.setHours(0, 0, 0, 0);
            currentDate.setHours(0, 0, 0, 0);
            
            const diffTime = Math.abs(currentDate - orderDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays < 1) {
                return { text: "In Warehouse", class: "bg-secondary" };
            } else if (diffDays >= 1 && diffDays < 2) {
                return { text: "In Transit", class: "bg-info" };
            } else {
                return { text: "Delivered", class: "bg-success" };
            }
        }

        function displayOrderHistory() {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const historyContainer = $('#order-history');
            historyContainer.empty();

            if (orders.length === 0) {
                historyContainer.html('<div class="alert alert-light border">You have no past orders.</div>');
                return;
            }

            orders.reverse().forEach(order => {
                const status = getOrderStatus(order.date);
                const formattedDate = new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
                
                const itemsHtml = order.items.map(item => `
                    <tr>
                        <td>${item.title}</td>
                        <td class="text-end">${item.qty}</td>
                        <td class="text-end">${currency(item.price * item.qty)}</td>
                    </tr>
                `).join('');

                const orderHtml = `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#order-${order.id}">
                                <div class="w-100 d-flex justify-content-between align-items-center pe-2">
                                    <span>Order #${String(order.id).slice(-5)} - ${formattedDate}</span>
                                    <span class="badge ${status.class}">${status.text}</span>
                                </div>
                            </button>
                        </h2>
                        <div id="order-${order.id}" class="accordion-collapse collapse" data-bs-parent="#order-history">
                            <div class="accordion-body">
                                <h6>Receipt</h6>
                                <table class="table table-sm receipt-table">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th class="text-end">Qty</th>
                                            <th class="text-end">Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${itemsHtml}
                                    </tbody>
                                    <tfoot>
                                        <tr class="fw-bold">
                                            <td colspan="2">Total</td>
                                            <td class="text-end">${order.total}</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                `;
                historyContainer.append(orderHtml);
            });
        }
        
        displayOrderHistory();
    }
});
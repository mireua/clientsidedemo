let carts = document.querySelectorAll('.col-4');

let products = [
    {
        name: 'RTX 3080',
        tag: '3080',
        price: 1230,
        inCart: 0
    },

    {
        name: 'Odyssey G7',
        tag: 'monitor',
        price: 720,
        inCart: 0
    },

    {
        name: 'RAZER BlackWidow V3',
        tag: 'blackwidow',
        price: 120,
        inCart: 0
    },

    {
        name: 'HYPERX Cloud II',
        tag: 'headset',
        price: 90,
        inCart: 0
    },

    {
        name: 'HYPERX Quadcast',
        tag: 'mic',
        price: 110,
        inCart: 0
    },

    {
        name: 'STEELSERIES QcK Gaming Surface',
        tag: 'mousepad',
        price: 13,
        inCart: 0
    },

    {
        name: 'AMD Ryzen 5 5600X',
        tag: 'cpu',
        price: 380,
        inCart: 0
    },

    {
        name: 'CORSAIR Vengeance Pro RGB DDR4',
        tag: 'ram',
        price: 280,
        inCart: 0
    }
];

for (let i = 0; i < carts.length; i++){
    
    carts[i].addEventListener('click', () =>{
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function loadCartNumbers() {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelector('.basket span').textContent = productNumbers;
    }
}

function cartNumbers(product){
    
    let productNumbers = localStorage.getItem('cartNumbers');
    

    productNumbers = parseInt(productNumbers)

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.basket span').textContent = productNumbers +1;
    }

    else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.basket span').textContent = 1;
    }

    setItems(product);
}

function setItems(product){
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    
    if (cartItems != null){
        
        if (cartItems[product.tag] == undefined){
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }

        cartItems[product.tag].inCart += 1;
    }

    else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){

    let cartCost = localStorage.getItem('totalCost');
    

    if (cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    } else {
        localStorage.setItem("totalCost", product.price);
    }
    
}

function displayCart () {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');
    let totalContainer = document.querySelector('.totals')

    if (cartItems && productContainer){
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <span>${item.name}</span>
            </div>

            <div class="price">€${item.price},00</div>
            
            <div class="quantity">
                <span>${item.inCart}</span>
            </div>

            <div class = "total1">
                €${item.inCart * item.price},00
            </div>
            `

            totalContainer.innerHTML += `
            <h4>
            €${cartCost},00
            </h4>
            `
        });

    }
}

loadCartNumbers();
displayCart();
displayTotal();
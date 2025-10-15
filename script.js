const API='/api';
let cart=JSON.parse(localStorage.getItem('cart'))||[];
let token=localStorage.getItem('token');

async function loadProducts(){
    const res=await fetch(`${API}/products`);
    const products=await res.json();
    const container=document.querySelector('.products-container');
    products.forEach(p=>{
        const card=document.createElement('div');
        card.className='card';
        card.innerHTML=`<img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>Prix: €${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Ajouter au panier</button>`;
        container.appendChild(card);
    });
}

function addToCart(product){
    cart.push(product);
    localStorage.setItem('cart',JSON.stringify(cart));
    alert('Produit ajouté au panier');
}

async function login(){
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const res=await fetch(`${API}/login`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({email,password})
    });
    const data=await res.json();
    if(data.token){localStorage.setItem('token',data.token);window.location.href='/';}
    else alert(data.message);
}

async function register(){
    const username=document.getElementById('username').value;
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const res=await fetch(`${API}/register`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({username,email,password})
    });
    const data=await res.json();
    if(data.token){localStorage.setItem('token',data.token);window.location.href='/';}
    else alert(data.message);
}

async function checkout(){
    const res=await fetch(`${API}/checkout`,{
        method:'POST',
        headers:{'Content-Type':'application/json','Authorization':token},
        body:JSON.stringify({cart})
    });
    const data=await res.json();
    alert(data.message);
    cart=[];
    localStorage.setItem('cart',JSON.stringify(cart));
    window.location.href='/';
}

document.addEventListener('DOMContentLoaded',()=>{if(document.querySelector('.products-container')) loadProducts();});

async function loadProducts(){
    const res=await fetch(`${API}/products`);
    const products=await res.json();
    const container=document.querySelector('.products-container');
    container.innerHTML = ''; // vide avant d'ajouter
    products.forEach(p=>{
        const card=document.createElement('div');
        card.className='card';
        card.innerHTML=`
        <img src="${p.image}" alt="${p.name}">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p>Prix: €${p.price}</p>
        <button onclick='addToCart(${JSON.stringify(p)})'>Ajouter au panier</button>
        `;
        container.appendChild(card);
    });
}


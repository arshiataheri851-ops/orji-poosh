const products=[
{id:1,name:"کت چرمی آوید",category:"زنانه",price:3850000,tag:"NEW",size:["S","M","L"],color:"مشکی",image:"https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",desc:"کت چرمی با فرم آزاد و جزئیات مینیمال؛ انتخابی جسورانه برای استایل روز و شب."},
{id:2,name:"اورشرت مینیمال",category:"مردانه",price:2190000,tag:"BEST SELLER",size:["M","L","XL"],color:"کرم",image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85",desc:"اورشرت خوش‌فرم با پارچه لطیف و کاربردی؛ مناسب لایه‌سازی در روزهای خنک."},
{id:3,name:"پیراهن سیلوئت",category:"زنانه",price:2750000,tag:"LIMITED",size:["S","M","L"],color:"ذغالی",image:"https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=900&q=85",desc:"پیراهنی با خطوط ساده و برش معاصر؛ برای لحظه‌هایی که سادگی حرف اول را می‌زند."},
{id:4,name:"تی‌شرت اورجینال",category:"مردانه",price:890000,tag:"ESSENTIAL",size:["M","L","XL"],color:"سفید",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",desc:"تی‌شرت روزمره با فرم راحت و طراحی تمیز؛ پایه‌ای برای ترکیب‌های بی‌پایان."},
{id:5,name:"کیف ساختارمند",category:"اکسسوری",price:1680000,tag:"NEW",size:["FREE"],color:"قهوه‌ای",image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85",desc:"کیفی با فرم ساختارمند و ظاهر ماندگار برای تکمیل استایل روزانه."},
{id:6,name:"بافت رها",category:"زنانه",price:1980000,tag:"NEW",size:["S","M","L"],color:"طوسی",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85",desc:"بافت نرم و خوش‌پوش با سیلوئت آزاد؛ همراه روزهای سرد و آرام."},
{id:7,name:"کت تک مدرن",category:"مردانه",price:4250000,tag:"EDITOR'S PICK",size:["M","L","XL"],color:"مشکی",image:"https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=900&q=85",desc:"کت تک با برش مدرن و استایلی متمایز برای موقعیت‌های رسمی و نیمه‌رسمی."},
{id:8,name:"عینک فریم کلاسیک",category:"اکسسوری",price:1250000,tag:"ESSENTIAL",size:["FREE"],color:"مشکی",image:"https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",desc:"فریم کلاسیک با طراحی ساده؛ جزئی کوچک با تأثیری بزرگ."}
];
const fa=n=>new Intl.NumberFormat("fa-IR").format(n);
const money=n=>fa(n)+" تومان";
let cart=JSON.parse(localStorage.getItem("orji-cart")||"[]"),activeFilter="همه";
const $=s=>document.querySelector(s);
function renderProducts(filter="همه",target="#products"){const root=$(target);if(!root)return;root.innerHTML=products.filter(p=>filter==="همه"||p.category===filter).map(p=>`<article class="product-card"><div class="product-image-wrap" data-open="${p.id}"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag">${p.tag}</span><button class="quick-add" data-open="${p.id}">مشاهده و انتخاب سایز +</button></div><div class="product-meta"><div><h3>${p.name}</h3><p>${p.category} · ${p.color}</p></div><span class="price">${money(p.price)}</span></div></article>`).join("");}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2300)}
function openProduct(id){const p=products.find(x=>x.id===Number(id));if(!p)return;$("#dialog-content").innerHTML=`<div class="dialog-product"><img src="${p.image}" alt="${p.name}"><div><span class="eyebrow">ORJI POOSH / COLLECTION</span><h2>${p.name}</h2><strong>${money(p.price)}</strong><p>${p.desc}</p><label for="size-select">انتخاب سایز</label><select id="size-select">${p.size.map(s=>`<option value="${s}">${s}</option>`).join("")}</select><label>رنگ: ${p.color}</label><button class="btn btn-dark" id="add-product">افزودن به سبد خرید</button></div></div>` ;$("#add-product").onclick=()=>{addToCart(p.id,$("#size-select").value);$("#product-dialog").close()};$("#product-dialog").showModal()}
function addToCart(id,size){const p=products.find(x=>x.id===id);const found=cart.find(x=>x.id===id&&x.size===size);if(found)found.qty++;else cart.push({id,size,qty:1});saveCart();toast("به سبد خرید اضافه شد")}
function saveCart(){localStorage.setItem("orji-cart",JSON.stringify(cart));renderCart()}
function renderCart(){$("#cart-count").textContent=fa(cart.reduce((s,x)=>s+x.qty,0));$("#cart-items").innerHTML=cart.length?cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-row"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>سایز: ${x.size} · تعداد: ${fa(x.qty)}</p><strong>${money(p.price*x.qty)}</strong><br><button data-remove="${p.id}" data-size="${x.size}">حذف</button></div></div>`}).join(""):'<p class="empty-cart">هنوز چیزی انتخاب نکردی.</p>';$("#cart-total").textContent=money(cart.reduce((s,x)=>s+products.find(p=>p.id===x.id).price*x.qty,0))}
function showCart(){$("#cart-drawer").classList.add("open");$("#overlay").classList.add("open")}
function hideCart(){$("#cart-drawer").classList.remove("open");$("#overlay").classList.remove("open")}
document.addEventListener("click",e=>{const open=e.target.closest("[data-open]");if(open){openProduct(open.dataset.open);return}const remove=e.target.closest("[data-remove]");if(remove){cart=cart.filter(x=>!(x.id===Number(remove.dataset.remove)&&x.size===remove.dataset.size));saveCart()}});
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;renderProducts(activeFilter)}));
document.querySelectorAll(".collection-card").forEach(c=>c.addEventListener("click",()=>{const f=c.dataset.filter;document.querySelectorAll(".filter").forEach(b=>{b.classList.toggle("active",b.dataset.filter===f)});renderProducts(f)}));
$(".cart-trigger").onclick=showCart;$(".close-drawer").onclick=hideCart;$("#overlay").onclick=hideCart;
$(".menu-toggle").onclick=()=>$(".nav").classList.toggle("open");document.querySelectorAll(".nav a").forEach(a=>a.onclick=()=>$(".nav").classList.remove("open"));
$(".search-toggle").onclick=()=>{$("#search-dialog").showModal();$("#search-input").focus()};
$("#search-input").addEventListener("input",e=>{const q=e.target.value.trim();$("#search-results").innerHTML=products.filter(p=>p.name.includes(q)||p.category.includes(q)).map(p=>`<div class="search-result" data-open="${p.id}"><span>${p.name}</span><b>${money(p.price)}</b></div>`).join("")});
document.querySelectorAll(".dialog-close").forEach(b=>b.onclick=()=>b.closest("dialog").close());
$("#newsletter-form").onsubmit=e=>{e.preventDefault();$("#newsletter-message").textContent="ممنون! ایمیلت ثبت شد. (اتصال سرویس خبرنامه در نسخه عملیاتی انجام می‌شود.)";e.target.reset()};
$(".checkout-btn").onclick=()=>toast("برای پرداخت آنلاین، درگاه پرداخت و اطلاعات فروشگاه باید متصل شوند.");
renderProducts();renderCart();

// Gentle pointer-driven 3D tilt for desktop; disabled for touch and reduced-motion users.
(()=> {
  const finePointer=window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(!finePointer||reduced)return;
  const tilt=(el,e,max=5)=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width;
    const y=(e.clientY-r.top)/r.height;
    const ry=(x-.5)*max*2;
    const rx=(.5-y)*max*2;
    el.style.transform=`perspective(1100px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-3px)`;
  };
  document.addEventListener("pointermove",e=>{
    const card=e.target.closest(".product-card,.collection-card");
    if(card)tilt(card,e,card.classList.contains("collection-card")?3.5:4);
  },{passive:true});
  document.addEventListener("pointerout",e=>{
    const card=e.target.closest(".product-card,.collection-card");
    if(card&&!card.contains(e.relatedTarget))card.style.transform="";
  },{passive:true});
  const hero=$(".hero");
  if(hero){
    hero.addEventListener("pointermove",e=>{
      const r=hero.getBoundingClientRect();
      const dx=(e.clientX-r.left)/r.width-.5;
      const dy=(e.clientY-r.top)/r.height-.5;
      const image=$(".hero-image");
      const content=$(".hero-content");
      if(image)image.style.transform=`scale(1.08) translate3d(${-dx*12}px,${-dy*9}px,0)`;
      if(content)content.style.transform=`translate3d(${dx*8}px,${dy*6}px,45px)`;
    },{passive:true});
    hero.addEventListener("pointerleave",()=>{
      const image=$(".hero-image"),content=$(".hero-content");
      if(image)image.style.transform="";
      if(content)content.style.transform="";
    });
  }
})();

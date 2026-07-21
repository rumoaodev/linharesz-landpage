/* ===================== NAVBAR SCROLL ===================== */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===================== MENU MOBILE ===================== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', ()=> navLinks.classList.remove('open'));
});

/* ===================== SCROLL REVEAL ===================== */
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => io.observe(el));

/* ===================== LIGHTBOX GALERIA ===================== */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
function openLightbox(el){
  const img = el.querySelector('img');
  lightboxImg.src = img.src;
  lightbox.classList.add('open');
}
document.getElementById('lightboxClose').addEventListener('click', ()=> lightbox.classList.remove('open'));
lightbox.addEventListener('click', (e)=>{ if(e.target === lightbox) lightbox.classList.remove('open'); });

/* ===================== DEPOIMENTOS (CARROSSEL) ===================== */
const slides = document.querySelectorAll('.testi-slide');
const dotsWrap = document.getElementById('testiDots');
let current = 0;
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if(i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsWrap.appendChild(dot);
});
function goToSlide(i){
  slides[current].classList.remove('active');
  dotsWrap.children[current].classList.remove('active');
  current = i;
  slides[current].classList.add('active');
  dotsWrap.children[current].classList.add('active');
}
setInterval(() => {
  goToSlide((current + 1) % slides.length);
}, 6000);

/* ===================== PARTÍCULAS (CANVAS) ===================== */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const colors = ['rgba(168,85,247,0.7)','rgba(59,130,246,0.7)','rgba(34,211,238,0.7)'];
function createParticles(){
  particles = [];
  const count = Math.min(70, Math.floor(window.innerWidth / 20));
  for(let i=0;i<count;i++){
    particles.push({
      x: Math.random()*canvas.width,
      y: Math.random()*canvas.height,
      r: Math.random()*2 + 0.5,
      speedY: Math.random()*0.4 + 0.1,
      speedX: (Math.random()-0.5) * 0.3,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }
}
createParticles();
window.addEventListener('resize', createParticles);

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach(p => {
    p.y -= p.speedY;
    p.x += p.speedX;
    if(p.y < -10) p.y = canvas.height + 10;
    if(p.x < -10) p.x = canvas.width + 10;
    if(p.x > canvas.width + 10) p.x = -10;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = p.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = p.color;
    ctx.fill();
  });
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ===================== FORMULÁRIO DE CONTATO ===================== */
const form = document.getElementById('contactForm');
form.addEventListener('submit', function(e){
  e.preventDefault();
  const data = new FormData(form);
  const nome = data.get('nome');
  const msg = `Olá! Meu nome é ${nome}, empresa: ${data.get('empresa') || 'N/A'}. Mensagem: ${data.get('mensagem')}`;
  window.open(`https://wa.me/5500000000000?text=${encodeURIComponent(msg)}`, '_blank');
  form.reset();
});
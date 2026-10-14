'use strict';
document.documentElement.classList.add('js');
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const header = $('.header');
const nav = $('#navegacao');
const menu = $('.menu-toggle');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menu'); }
menu.addEventListener('click', () => { const open = menu.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('open', open); menu.setAttribute('aria-expanded', String(open)); menu.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu'); });
$$('a', nav).forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if(e.key === 'Escape' && nav.classList.contains('open')) {closeMenu();menu.focus();} });
document.addEventListener('click', e => {if(!header.contains(e.target))closeMenu();});
const desktop = window.matchMedia('(min-width:701px)');
desktop.addEventListener('change', closeMenu);
const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 25);
window.addEventListener('scroll', updateHeader, { passive: true }); updateHeader();

const gallery = [
 {image:'gourmet-projeto',title:'Área gourmet',alt:'Visualização de área gourmet com armários verdes, madeira e balcão central',type:'Visualização de projeto publicada pela Projettare. A execução deste ambiente não foi confirmada.',source:'https://www.facebook.com/photo/?fbid=1638176464979838'},
 {image:'painel',title:'Painel de dormitório',alt:'Painel ripado com televisão e nichos iluminados',type:'Fotografia publicada no portfólio oficial da Projettare.',source:'https://www.instagram.com/projettare_moveisplanejados/p/DeRI0OIj29W/'},
 {image:'cozinha',title:'Cozinha planejada',alt:'Cozinha clara com ilha central e iluminação sob os armários',type:'Fotografia de capa do vídeo oficial. A resolução pública disponível é de 360 × 640 px.',source:'https://www.instagram.com/projettare_moveisplanejados/reel/DeL_PnmthPA/'},
 {image:'escritorio-projeto',title:'Espaço de trabalho',alt:'Visualização de escritório com estantes amadeiradas e mesa',type:'Visualização de projeto publicada pela Projettare. A execução deste ambiente não foi confirmada.',source:'https://www.instagram.com/projettare_moveisplanejados/p/DdcLiErvVXY/'},
 {image:'comercial-projeto',title:'Ambiente comercial',alt:'Visualização de ambiente comercial com balcão e estantes',type:'Visualização de projeto publicada pela Projettare. A execução deste ambiente não foi confirmada.',source:'https://www.instagram.com/projettare_moveisplanejados/p/Ddo92frAHy3/'},
 {image:'cozinha-azul',title:'Cozinha Azul Lord',alt:'Cozinha com armários azuis, bancada preta e revestimento claro',type:'Fotografia publicada em 2023. Projeto autoral: Balatori Arquitetura. Execução: Projettare. Designer técnico: Rogério Carvalho.',source:'https://pt.linkedin.com/posts/rog%C3%A9rio-carvalho-76a75b51_cozinhaazul-cozinha-cozinhaplanejada-activity-7083563555681124352-uIwC'}
];
let activeIndices = gallery.map((_, i) => i);
let current = 0;
let galleryOpener;
const dialog = $('#galeria');
function showPhoto(index) {
 current = index;
 const item = gallery[index];
 $('#lightbox-image').src = `images/${item.image}.webp`;
 $('#lightbox-image').alt = item.alt;
 $('#lightbox-title').textContent = item.title;
 $('#lightbox-description').textContent = item.type;
 $('#lightbox-source').href = item.source;
 const count = `${activeIndices.indexOf(index)+1} / ${activeIndices.length}`;
 $('#lightbox-count').textContent = `PORTFÓLIO PROJETTARE · ${count}`;
 $('#lightbox-status').textContent = `Imagem ${count}: ${item.title}`;
}
function step(direction) {const pos = activeIndices.indexOf(current);showPhoto(activeIndices[(pos + direction + activeIndices.length)%activeIndices.length]);}
$$('[data-gallery]').forEach(link => link.addEventListener('click', e => {
 if(typeof dialog.showModal !== 'function') return;
 e.preventDefault();galleryOpener = link;showPhoto(Number(link.dataset.gallery));dialog.showModal();document.body.classList.add('modal-open');$('.modal-close').focus();
}));
$('.modal-close').addEventListener('click', () => dialog.close());
$('.gallery-prev').addEventListener('click', () => step(-1));
$('.gallery-next').addEventListener('click', () => step(1));
dialog.addEventListener('keydown', e => {if(e.key==='ArrowRight'){e.preventDefault();step(1);}if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}});
dialog.addEventListener('click', e => {if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close', () => {document.body.classList.remove('modal-open');if(galleryOpener)galleryOpener.focus();});
let touchX = null;
$('#lightbox-image').addEventListener('touchstart', e => {touchX=e.changedTouches[0].clientX;},{passive:true});
$('#lightbox-image').addEventListener('touchend', e => {if(touchX!==null){const delta=e.changedTouches[0].clientX-touchX;if(Math.abs(delta)>55)step(delta<0?1:-1);touchX=null;}},{passive:true});
$$('[data-filter]').forEach(button => button.addEventListener('click', () => {
 const category = button.dataset.filter;
 $$('[data-filter]').forEach(b => b.setAttribute('aria-pressed',String(b===button)));
 $$('.project').forEach(article => {article.hidden=category!=='todos'&&article.dataset.category!==category;});
 $('.project-grid').classList.toggle('filtered',category!=='todos');
 activeIndices=$$('.project:not([hidden]) [data-gallery]').map(link=>Number(link.dataset.gallery));
 $('#gallery-status').textContent = `${activeIndices.length} ambientes exibidos`;
}));

const waBase = 'https://wa.me/5517981851985?text=';
const environment = $('#ambiente');
function updateContact(){const subject=environment.value?`um projeto de ${environment.value.toLowerCase()}`:'um projeto de móveis planejados';$('#contact-whatsapp').href=waBase+encodeURIComponent(`Olá! Conheci o trabalho da Projettare pelo site e gostaria de conversar sobre ${subject}.`);}
environment.addEventListener('change',updateContact);
$$('[data-environment]').forEach(link=>link.addEventListener('click',()=>{environment.value=link.dataset.environment;updateContact();}));
const previews={cozinha:['cozinha',360,640,'Cozinha planejada com ilha e armários claros','Cozinha / fotografia do portfólio'],dormitorio:['dormitorio',1080,1350,'Dormitório com armários espelhados e iluminação','Dormitório / fotografia do portfólio'],painel:['painel',512,640,'Painel ripado com televisão e nichos','Painel / fotografia do portfólio'],escritorio:['escritorio-projeto',640,335,'Visualização de escritório com estantes e mesa','Escritório / visualização de projeto']};
$$('[data-solution]').forEach(detail=>detail.addEventListener('toggle',()=>{if(!detail.open)return;$$('[data-solution]').forEach(d=>{if(d!==detail)d.open=false;});const [image,width,height,alt,caption]=previews[detail.dataset.solution];$('#solution-image').src=`images/${image}.webp`;$('#solution-image').width=width;$('#solution-image').height=height;$('#solution-image').alt=alt;$('#solution-caption').textContent=caption;}));

if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal-once');observer.unobserve(entry.target);}});},{threshold:.14});$$('.intro-heading,.intro-story,.section-heading,.value-grid article,.steps li').forEach(el=>observer.observe(el));}

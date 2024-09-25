// ================= header scroll animation js ====================

function onscroll_header() {
	if (window.scrollY > 250) {
		header.classList.add('scroll_header');
		banner.classList.add('scroll_header_padding');
	} else {
		header.classList.remove('scroll_header');
		banner.classList.remove('scroll_header_padding');
	}
}
var header = document.querySelector('header');
var banner = document.querySelector('.banner_section')
window.addEventListener("scroll", onscroll_header);
window.addEventListener("load", onscroll_header);


// ================= search recommendation div js ==================

const div = document.querySelector('.search_bar');
const suggestion = document.querySelector('.search_recommendation');

div.addEventListener('input', (e) => {
	
	if (e.target.value == '') {
		suggestion.classList.remove('activated');
	}
	else {
		suggestion.classList.add('activated')
	}
	suggestion.innerHTML = e.target.value;
})

div.addEventListener('focusout',()=>{
	suggestion.classList.remove('activated');
})


// ============ product add to cart btn js ========================

const add_to_cart_btn = document.querySelectorAll('.add_to_cart_btn');
add_to_cart_btn.forEach((btn)=>btn.addEventListener('click',()=>{
	if(btn.innerHTML == 'Add to Cart'){
		btn.innerHTML='Remove'
		btn.classList.add('added');
	}
	else{
		btn.innerHTML='Add to Cart'
		btn.classList.remove('added')
	}
}))

const add_to_wishlist_btn = document.querySelectorAll('.add_to_wishlist_btn');
add_to_wishlist_btn.forEach((btn)=>btn.addEventListener('click',()=>{
	btn.classList.toggle('added');
}))


// ============== lens js ========================

const lens = document.querySelector('.magnifier');
const product_img = document.querySelector('.product_img_div');
const magnified_img = document.querySelector('.magnified_image')

function magnify(product_img,magnified_img){
	product_img?.addEventListener('mousemove' , movelens	)
}

function movelens(e){
	let x , y , cx , cy;
	// get position of the cursor
	const product_img_dimension = product_img.getBoundingClientRect();
	x = e.pageX - product_img_dimension.left - lens.offsetWidth/2;
	y = e.pageY - product_img_dimension.top - lens.offsetHeight/2;
	lens.style.cssText = `top: ${y}px; left: ${x}px;`
}

magnify(product_img,magnified_img)

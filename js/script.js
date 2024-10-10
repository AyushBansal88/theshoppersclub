// ================= header scroll animation js ====================

function onscroll_header() {
  if (window.scrollY > 250) {
    header.classList.add('scroll_header');
    banner.classList.add('scroll_header_padding');
  } else {
    header.classList.remove('scroll_header');
    banner?.classList.remove('scroll_header_padding');
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

div.addEventListener('focusout', () => {
  suggestion.classList.remove('activated');
})

// =============== sidebar category js ==========================

const main_ul_div = document.querySelector('.main_ul_div');
const sidebar_toggle_btn = document.querySelectorAll('.sub_category_btn');
const main_category_toggle_btn = document.querySelectorAll('.main_category_toggle_btn');

sidebar_toggle_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const attr = btn.getAttribute('btn-target');
    const sub_category = document.querySelector(`[btn-parent="${attr}"]`);
    main_ul_div.classList.add('hide');
    sub_category.classList.add('show');
  })
})

main_category_toggle_btn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const parent = btn.parentElement.parentElement.parentElement;
    parent.classList.remove('show');
    main_ul_div.classList.remove('hide');
  })
})

// ============ product add to cart btn js ========================

const add_to_cart_btn = document.querySelectorAll('.add_to_cart_btn');
add_to_cart_btn.forEach((btn) => btn.addEventListener('click', () => {
  if (btn.innerHTML == 'Add to Cart') {
    btn.innerHTML = 'Added'
    btn.classList.add('added');
  }
  else {
    btn.innerHTML = 'Add to Cart'
    btn.classList.remove('added')
  }
}))

// ============================ filter clear js ==========================

const filters = document.querySelectorAll('.form-check-input');
const filter_container = document.querySelector('.filters_container');
const show_more = document.getElementById('show_more');
let selected_arr = [];
show_more?.addEventListener('click', () => {
  filter_container.classList.toggle('more_view');
  show_more.innerHTML = filter_container.classList.contains('more_view') ? 'Show Less' : 'Show More';
});
function changes() {
  if (filter_container.offsetHeight >= 65) {
    show_more.classList.add('d-inline-block');
    show_more.classList.remove('d-none');
  } else {
    show_more.classList.remove('d-inline-block');
    show_more.classList.add('d-none');
  }
}

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    const filter_card = document.createElement('div');
    filter_card.classList.add('filters_option');
    filter_card.setAttribute('data-parent', `${filter.id}`);
    filter_card.innerHTML =
      `${filter.id}
      <a href="javascript://" class="filter_clear_icon">
        <i class="fa fa-close ps-2" aria-hidden="true"></i>
      </a>
    `;

    if (filter.classList.contains('added')) {
      const subfilter = document.querySelector(`[data-parent="${filter.id}"]`);
      subfilter.remove();
      selected_arr.pop(subfilter);
      filter.classList.remove('added');
    } else {
      filter_container.appendChild(filter_card);
      filter.classList.add('added');
      selected_arr.push(filter);
    }
    changes();
    clear_all_visibility()
    const clear_filter = document.querySelectorAll('.filter_clear_icon');
    clear_filter.forEach((btn) => btn.addEventListener('click', () => {
      let parent = btn.parentElement;
      const filter = document.getElementById(`${parent.getAttribute('data-parent')}`);
      filter.classList.remove('added');
      filter.checked = false;
      parent.remove();
      selected_arr.pop(parent);
      clear_all_visibility();
      changes();
    }));
  });
});

// ================= clear all btn js =========================
const clear_all_filter = document.querySelector('.clear_all_filter');
clear_all_filter?.addEventListener('click', () => {
  filter_container.innerHTML = '';
  selected_arr = [];
  clear_all_visibility();
  changes();
  const filters = document.querySelectorAll('.form-check-input.added');
  filters.forEach((filter) => {
    filter.classList.remove('added');
    filter.checked = false;
  })
})

function clear_all_visibility() {
  if (selected_arr.length > 0) {
    clear_all_filter.classList.add('d-block');
    clear_all_filter.classList.remove('d-none');
    filter_container.classList.add('mt-3');
  }
  else {
    clear_all_filter?.classList.remove('d-block');
    clear_all_filter?.classList.add('d-none');
    filter_container?.classList.remove('mt-3');

  }
}

clear_all_visibility();

// ================= price slider js ==========================

const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 500;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});

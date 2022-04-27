'use strict';

const basketCounterEl = document.querySelector('.cartIconWrap span');
const basketTotalEl = document.querySelector('.basketTotal');
const basketTotalValueEl = document.querySelector('.basketTotalValue');
const basketEl = document.querySelector('.basket');

document.querySelector('.cartIconWrap').addEventListener('click', () => {
    basketEl.classList.toggle('hidden');
});

const basket = {};

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (!event.target.closest('.addToCart')) {
        return;
    }
    const featuredItem = event.target.closest('.featuredItem');

    const id = +featuredItem.dataset.id;
    const name = featuredItem.dataset.name;
    const price = +featuredItem.dataset.price;
    addToCart(id, name, price);
});

function addToCart(id, name, price) {

    if (!(id in basket)) {
        basket[id] = { id, name, price, count: 0 };
    }
    basket[id].count++;
    basketCounterEl.textContent = getTotalBasketCount();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);
}

function getTotalBasketCount() {
    return Object.values(basket).reduce((acc, product) => acc + product.count, 0);
    /*const productsArr = Object.values(basket);
    const count = 0;
    for (const product of productsArr) {
        count += product.count;
    }
    return count;*/
}

function getTotalBasketPrice() {
    return Object.values(basket)
        .reduce((acc, product) => acc + product.count * product.price, 0);
}

function renderProductInBasket(productId) {
    // Получаем строку в корзине, которая отвечает за данный продукт.
    const basketRowEl = basketEl
        .querySelector(`.basketRow[data-id="${productId}"]`);
    // Если такой строки нет, то отрисовываем новую строку.
    if (!basketRowEl) {
        renderNewProductInBasket(productId);
        return;
    }

    // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
    // добавленных продуктах.
    const product = basket[productId];
    // Ставим новое количество в строке продукта корзины.
    basketRowEl.querySelector('.productCount').textContent = product.count;
    // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
    basketRowEl
        .querySelector('.productTotalRow')
        .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductInBasket(productId) {
    const productRow = `
    <div class="basketRow" data-id="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(basket[productId].price * basket[productId].count)
        .toFixed(2)}</span>
      </div>
    </div>
    `;
    basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
/*Разобраться разобрался, но самостоятельно такую работу пока сложно выполнить, некоторые функции были не знакомы*/
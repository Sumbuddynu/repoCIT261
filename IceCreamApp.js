if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
};

function ready() {
    var deleteCartItemButtons = document.getElementsByClassName('remove-item-button');
    for(var i = 0; i < deleteCartItemButtons.length; i++) {
        var btn = deleteCartItemButtons[i];
        btn.addEventListener('click', deleteCartItem)
    }

    var cartQuantityInput = document.getElementsByClassName('cart-quantity-input');
    for(var i = 0; i < cartQuantityInput.length; i++) {
        var input = cartQuantityInput[i];
        input.addEventListener('change', changeQuantity);
    }

    var addCartItemButtons = document.getElementsByClassName('ice-cream-button');
    for(var i = 0; i < addCartItemButtons.length; i++) {
        var btn = addCartItemButtons[i];
        btn.addEventListener('click', function addClickItemToCart(event) {
            var clickButton = event.target;
            var item = clickButton.parentElement.parentElement;
            var itemTitle = item.getElementsByClassName('IceCreamNameText')[0].innerText;
            var itemPrice = item.getElementsByClassName('IceCreamPrice')[0].innerText;
            var itemImage = item.getElementsByClassName('iceCreamBox')[0].src;
            addItemToCart(itemTitle, itemPrice, itemImage);
            cartTotal();
        })
    }

    var buyButton = document.getElementsByClassName('buyButton')[0].addEventListener('click', buyButtonMethod);

    document.getElementsByClassName('search-input').onsubmit = function() {
        window.location = 'http://www.google.com/search?q=site:yoursitename.com ' + document.getElementById('txtSearch').value;
        return false;
    }
}

function buyButtonMethod(event) {
    alert("Thank you for buying at Max's! Enjoy Your IceCream :)");
    var items = document.getElementsByClassName('cart-items')[0];
    while (items.hasChildNodes()) {
        items.removeChild(items.firstChild)
    }
    cartTotal();
}

function deleteCartItem(event) {
    var clickButton = event.target;
    clickButton.parentElement.parentElement.remove();
    cartTotal();
}

function changeQuantity(event) {
    var userInput =  event.target;
    if (isNaN(userInput.value) || userInput.value <= 0) {
        userInput.value = 1;
    }
    cartTotal();
}

function addItemToCart(itemTitle, itemPrice, itemImage) {
    var row = document.createElement('div');
    row.classList.add('cart-row');
    var items = document.getElementsByClassName('cart-items')[0];
    var itemNames = items.getElementsByClassName('cart-item-name');
    for(var i = 0; i < itemNames.length; i++) {
        if(itemNames[i].innerText == itemTitle) {
            alert("Item is already in cart!");
            return;
        }
    }
    var rowContents = `
    <div class="cart-item">
            <img src="${itemImage}" width="200px" height="200px">
            <span class="cart-item-name">${itemTitle}</span>
          </div>
          <span class="cart-item-price">${itemPrice}</span>
          <div class="cart-item-quantity">
            <input class="cart-quantity-input" value="1" type="number">
            <button class="remove-item-button">DELETE</button>
          </div>
          `
    row.innerHTML = rowContents;
    items.append(row);
    row.getElementsByClassName('remove-item-button')[0].addEventListener('click', deleteCartItem);
    row.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', changeQuantity);
}

function cartTotal() {
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var rows = cartItems.getElementsByClassName('cart-row');
    var total = 0;
    for(var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var price = row.getElementsByClassName('cart-item-price')[0];
        var quantity = row.getElementsByClassName('cart-quantity-input')[0];
        var priceText = parseFloat(price.innerText.replace('$', ''));
        var quantityText = quantity.value;
        total = total + (priceText * quantityText);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('totalAmount')[0].innerText = "Total: $" + total;
};
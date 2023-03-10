let discountTable = [  {vendor: 'Vendor A', trade: 'Trade 1', discount: 10},  {vendor: 'Vendor B', trade: 'Trade 2', discount: 15},  {vendor: 'Vendor C', trade: 'Trade 3', discount: 20}];

let productTable = [  {id: 1, name: 'Product A', price: 100, vendor: 'Vendor A', trade: 'Trade 1'},  {id: 2, name: 'Product B', price: 200, vendor: 'Vendor B', trade: 'Trade 2'},  {id: 3, name: 'Product C', price: 300, vendor: 'Vendor C', trade: 'Trade 3'}];

let cart = [];

function findDiscount(vendor, trade) {
  let discount = 0;
  for (let i = 0; i < discountTable.length; i++) {
    if (discountTable[i].vendor === vendor && discountTable[i].trade === trade) {
      discount = discountTable[i].discount;
      break;
    }
  }
  return discount;
}

function addToCart(productId) {
  let product = productTable.find(p => p.id === productId);
  let discount = findDiscount(product.vendor, product.trade);
  let total = product.price - (product.price * discount / 100);
  cart.push({id: product.id, name: product.name, price: product.price, discount: discount, total: total});
  updateCart();
}

function removeFromCart(productId) {
  let index = cart.findIndex(p => p.id === productId);
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  let cartTable = document.getElementById('cart').querySelector('tbody');
  cartTable.innerHTML = '';
  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    let row = cartTable.insertRow();
    let idCell = row.insertCell();
    let nameCell = row.insertCell();
    let priceCell = row.insertCell();
    let discountCell = row.insertCell();
    let totalCell = row.insertCell();
    let actionCell = row.insertCell();
    idCell.innerText = cart[i].id;
    nameCell.innerText = cart[i].name;
    priceCell.innerText = cart[i].price;
    discountCell.innerText = cart[i].discount + '%';
    totalCell.innerText = cart[i].total;
    actionCell.innerHTML = '<button onclick="removeFromCart(' + cart[i].id + ')">Remove</button>';
    total += cart[i].total;
  }
  document.getElementById('total').innerText = total;
}

for (let i = 0; i < productTable.length; i++) {
  let row = document.getElementById('product-table').querySelector('tbody').insertRow();
  let idCell = row.insertCell();
  let nameCell = row.insertCell();
  let priceCell = row.insertCell();
  let vendorCell = row.insertCell();
  let tradeCell = row.insertCell();
  let actionCell = row.insertCell();
  idCell.innerText = productTable[i].id;
  nameCell.innerText = productTable[i].name;
  priceCell.innerText = productTable[i].price;
  vendorCell.innerText = productTable[i].vendor;
  tradeCell.innerText = productTable[i].trade;
  actionCell.innerHTML = '<button onclick="addToCart(' + productTable[i].id + ')">Add to Cart</button>';
}

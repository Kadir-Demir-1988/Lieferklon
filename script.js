let menu = [
  {
    name: "Tomatensuppe",
    description: "Tomatensuppe mit frischen Kraütern",
    price: 7.5,
    foodimg: "./img/tomatensuppe.jpg",
    amount: 0,
  },
  {
    name: "Brokkolisuppe",
    description: "Brokkolisuppe mit Petersillie",
    price: 6.5,
    foodimg: "./img/brokkoli.jpg",
    amount: 0,
  },
  {
    name: "Gemüsesuppe",
    description: "Gemüsesuppe mit Schnittlauch",
    price: 8.0,
    foodimg: "./img/gemüsesuppe.jpg",
    amount: 0,
  },
  {
    name: "Kartoffelsuppe",
    description: "Kartoffelsuppe mit Möhren",
    price: 6.0,
    foodimg: "./img/kartoffelsuppe.jpg",
    amount: 0,
  },
  {
    name: "Kürbiscremesuppe",
    description: "Kürbiscremesuppe mit Balsamico",
    price: 9.0,
    foodimg: "./img/kürbissuppe.jpg",
    amount: 0,
  },
  {
    name: "Grüner Tee",
    description: "Grüner Tee mit Minze",
    price: 3.0,
    foodimg: "./img/schwarztee.jpg",
    amount: 0,
  },
];

let basket = [];

function Start() {
  load();
  render();
  renderPrice();
}

// menüangebot
function render() {
  let content = document.getElementById("menuposts");
  content.innerHTML = "";
  for (let i = 0; i < menu.length; i++) {
    content.innerHTML += outsourcehtml(menu, i);
  }
}

// preisfenster rechnen
function renderPrice() {
  let content = document.getElementById("fullpricewindow");
  content.innerHTML = "";
  content.innerHTML += renderPriceWindow();
}

function renderOrder() {
  let content = document.getElementById("basket");
  content.innerHTML = "";
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].amount > 0) {
      content.innerHTML += renderBasket(menu[i].name, menu[i].price, i);
    }
  }
}

function addBasket(name, price, i) {
  if (!basket.includes(name)) {
    basket.push(name);
    basket.push(price);
  }
  menu[i].amount++;
  renderOrder();
  renderPrice();
  save();
}

function add(i) {
  menu[i].amount++;
  renderOrder();
  renderPrice();
  save();
}

function remove(i) {
  if (menu[i].amount > 1) {
    menu[i].amount--;
  } else {
    menu[i].amount = 0;
    let nameIndex = basket.indexOf(menu[i].name);
    if (nameIndex !== -1) {
      basket.splice(nameIndex, 2);
    }
  }
  renderOrder();
  renderPrice();
  save();
}

function save() {
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem("menu", JSON.stringify(menu));
}

function load() {
  let basketAsText = localStorage.getItem("basket");
  let menuAsText = localStorage.getItem("menu");
  if (basketAsText) {
    basket = JSON.parse(basketAsText);
  }
  if (menuAsText) {
    menu = JSON.parse(menuAsText);
  }
  renderOrder();
  renderPrice();
}

function showBasket() {
  let cartList = document.getElementById("reswarenkorb");

  if (cartList.classList.contains("hidden-mobile")) {
    cartList.classList.remove("hidden-mobile");
    cartList.classList.add("show");
  } else {
    cartList.classList.remove("show");
    cartList.classList.add("hidden-mobile");
  }
}

function closeCart() {
  let cartList = document.getElementById("reswarenkorb");
  cartList.classList.remove("show");
  cartList.classList.add("hidden-mobile");
}

function buy() {
  let emptyBasket = menu.every((item) => item.amount === 0);
  if (emptyBasket) {
    alert("Bitte Waren hinzufügen!");
    return;
  }
  alert("Vielen Dank für Ihre Bestellung!");

  // Warenkorb leeren
  basket = [];
  for (let i = 0; i < menu.length; i++) {
    menu[i].amount = 0;
  }

  // Warenkorbanzeige leeren
  let basketElement = document.getElementById("basket");
  basketElement.innerHTML = "";

  // Preisfenster leeren
  let priceWindow = document.getElementById("fullpricewindow");
  priceWindow.innerHTML = "";

  localStorage.removeItem("basket");
  localStorage.removeItem("menu");

  renderPrice();
  renderOrder();
}

window.onload = Start;

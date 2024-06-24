function outsourcehtml(menu, i) {
  return /*html*/ `
          <div class="suppen" id="menuposts${i}">
            <div class="menuangaben">
                      <div class="menuimg">
                          <img class="suppenimg" src="${
                            menu[i]["foodimg"]
                          }" alt="">
                      </div>
                      <div class="angaben">
                          <span>${menu[i]["name"]}</span>
                          <p class="desktop-show">${menu[i]["description"]}</p>

                          <span>${menu[i]["price"]
                            .toFixed(2)
                            .replace(/\./, ",")} €</span>
                      </div>
            </div>
    <div class="addbutton">
                          <img onclick="addBasket('${menu[i]["name"]}', ${
    menu[i]["price"]
  }, ${i})" class="addbuttonimg" src="./img/plus-2718200_640.png">
                      </div>
                  
              </div>
      `;
}

function renderBasket(name, price, i) {
  return /*html*/ ` 
                    <div class="order-head" id="card${i}">
                        <span>${name} </span> 
                        &nbsp;
                        <span>${price} €</span>
                    </div>
                    <div class="ordervalue">
                        <img onclick="remove(${i})" class="addsign" src="./img/minus-svgrepo-com.png">
                        <span class="valuetext">${menu[i]["amount"]}</span>
                        <img onclick="add(${i})" class="addsign" src="./img/add-svgrepo-com.png">
                    </div>

                  `;
}

function renderPriceWindow() {
  let totalPrice = menu.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  let totalWithDelivery = (totalPrice + 2.0).toFixed(2);

  return /*html*/ `
    <span>Gesamtsumme: ${totalWithDelivery.replace(/\./, ",")} €</span>
    <span>Liefergebühr: 2,00 €</span>
    <button onclick=buy() class="buybtn">Bestellen</button>
  `;
}

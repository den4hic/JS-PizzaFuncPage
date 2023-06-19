let basketOrder = []

let a = document.querySelectorAll(".pizza-buy-button")
for(let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", addBasketButton)
}
if(localStorage.items !== undefined){
    basketOrder = JSON.parse(localStorage.basketOrder)
}
function addBasketButton() {
    function makeRoot(filename) {
        let parts = filename.split('.');
        let extension = parts.pop();
        let number = parts[0].split('_').pop();
        return filename.slice(0, 14) + '/half_pizza_' + number + '.png';
    }
    console.log(basketOrder)
    let size = this.dataset.size === "small" ? " (Мала)" : " (Велика)"
    let order = {
        name: this.parentNode.parentNode.parentNode.querySelector(".pizza-name strong").textContent + size,
        size: this.parentNode.querySelectorAll("span")[0].textContent,
        weight: this.parentNode.querySelectorAll("span")[1].textContent,
        price: this.parentNode.querySelector(".pizza-price").textContent,
        count: "1",
        imgSrc: makeRoot(this.parentNode.parentNode.parentNode.parentNode.querySelector(".image").attributes[1].nodeValue)
    }

    basketOrder.push(order)

    localStorage.setItem("basketOrder", JSON.stringify(basketOrder))

    const orderDiv = document.createElement("div")
    orderDiv.className = "order"

    const orderBox = document.createElement("div")
    orderBox.className = "order-box"

    orderDiv.appendChild(orderBox)

    const orderInfoDiv = document.createElement("div")
    orderInfoDiv.className = "order-info"

    const orderFirstDiv = document.createElement("div")
    orderFirstDiv.className = "order-first"

    const pizzaName = document.createElement("h3")

    pizzaName.className = "pizza-name"
    pizzaName.textContent = this.parentNode.parentNode.parentNode.querySelector(".pizza-name strong").textContent + size
    orderFirstDiv.appendChild(pizzaName)

    orderInfoDiv.appendChild(orderFirstDiv)

    const orderSecondDiv = document.createElement("div")
    orderSecondDiv.className = "order-second"

    const imgSize = document.createElement("img")
    imgSize.src = "assets/images/size-icon.svg"
    imgSize.alt = "size info"

    orderSecondDiv.appendChild(imgSize)

    const spanSize = document.createElement("span")
    spanSize.style = "margin-left:3px;"
    spanSize.textContent = this.parentNode.querySelectorAll("span")[0].textContent
    orderSecondDiv.appendChild(spanSize)

    const imgWeight = document.createElement("img")
    imgWeight.style = "margin-left:3px;"
    imgWeight.src = "assets/images/weight.svg"
    imgWeight.alt = "weight info"
    imgWeight.className = "order-weight-info"
    orderSecondDiv.appendChild(imgWeight)

    const spanWeight = document.createElement("span")
    spanWeight.style = "margin-left:3px;"
    spanWeight.textContent = this.parentNode.querySelectorAll("span")[1].textContent
    orderSecondDiv.appendChild(spanWeight)

    orderInfoDiv.appendChild(orderSecondDiv)

    const orderThirdDiv = document.createElement("div")
    orderThirdDiv.className = "order-third"

    const strongPrice = document.createElement("strong")
    strongPrice.textContent = this.parentNode.querySelector(".pizza-price").textContent + "грн"
    strongPrice.className = "order-price"

    orderThirdDiv.appendChild(strongPrice)

    const buttonSubtract = document.createElement("button")
    buttonSubtract.style = "margin-left: 13px;"
    buttonSubtract.className = "subtract"
    buttonSubtract.type = "button"

    const strongMinus = document.createElement("strong")
    strongMinus.textContent = "-"

    buttonSubtract.appendChild(strongMinus)
    orderThirdDiv.appendChild(buttonSubtract)

    const strongCount = document.createElement("strong")
    strongCount.className = "product-count"
    strongCount.textContent = "1"
    strongCount.style = "margin-left: 3px;"
    orderThirdDiv.appendChild(strongCount)

    const buttonAdd = document.createElement("button")
    buttonAdd.className = "add"
    buttonAdd.type = "button"
    buttonAdd.style = "margin-left: 9px;"

    const strongPlus = document.createElement("strong")
    strongPlus.textContent = "+"

    buttonAdd.appendChild(strongPlus)
    orderThirdDiv.appendChild(buttonAdd)

    const buttonDelete = document.createElement("button")
    buttonDelete.className = "delete"
    buttonDelete.type = "button"
    buttonDelete.style = "margin-left: 5px;"

    const strongX = document.createElement("strong")
    strongX.textContent = "x"

    buttonDelete.appendChild(strongX)
    orderThirdDiv.appendChild(buttonDelete)
    orderInfoDiv.appendChild(orderThirdDiv)
    orderBox.appendChild(orderInfoDiv)

    const imageDivContainer = document.createElement("div")
    imageDivContainer.className = "image-container"

    const imgPhoto = document.createElement("img")

    imgPhoto.src = makeRoot(this.parentNode.parentNode.parentNode.parentNode.querySelector(".image").attributes[1].nodeValue)
    imgPhoto.alt = "pizza's photo"

    imageDivContainer.appendChild(imgPhoto)
    orderBox.appendChild(imageDivContainer)
    document.querySelector(".order-list").appendChild(orderDiv)
}

// <div className="order">
//     <div className="order-box">
//         <div className="order-info">
//             <div className="order-first">
//                 <h3 className="pizza-name">BBQ (Мала)</h3>
//             </div>
//             <div className="order-second">
//                 <img src="assets/images/size-icon.svg" alt="size info">
//                     <span>30</span>
//                     <img className="order-weight-info" src="assets/images/weight.svg" alt="weight info">
//                         <span>460</span>
//             </div>
//             <div className="order-third">
//                 <span className="order-price"><strong>556грн</strong></span>
//                 <button className="subtract" type="button"><strong>-</strong></button>
//                 <span className="product-count"><strong>4</strong></span>
//                 <button className="add" type="button"><strong>+</strong></button>
//                 <button className="delete" type="button"><strong>x</strong></button>
//             </div>
//         </div>
//         <div className="image-container">
//             <img src="assets/images/half_pizza_2.png" alt="pizza's 1 photo">
//         </div>
//     </div>
// </div>
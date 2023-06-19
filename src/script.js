let basketOrder = []

let a = document.querySelectorAll(".pizza-buy-button")
for(let i = 0; i < a.length; i++) {
    a[i].addEventListener("click", addBasketButton)
}
if(localStorage.basketOrder !== undefined && localStorage.basketOrder !== ""){
    basketOrder = JSON.parse(localStorage.basketOrder)
    basketOrder.forEach(order => createOrder(order.name, order.size, order.weight, order.price, order.count, order.imgSrc))
}
let allDeleteButton = document.querySelector(".clear-order")


allDeleteButton.addEventListener("click", clear)
function clear() {
    basketOrder = []
    localStorage.setItem("basketOrder", JSON.stringify(basketOrder))

    let allOrders = document.querySelectorAll(".order")
    allOrders.forEach(item => document.querySelector(".order-list").removeChild(item))
    updateOverallPrice()
}

function changeItem() {
    if (this.parentNode.querySelector(".product-count").textContent === "1" && this.className === "subtract" || this.className === "delete") {
        document.querySelector(".order-list").removeChild(this.parentNode.parentNode.parentNode.parentNode)
        basketOrder.splice(basketOrder.findIndex(item => item.name === this.parentNode.parentNode.querySelector(".pizza-name").textContent), 1)
        localStorage.setItem("basketOrder", JSON.stringify(basketOrder))
        updateOverallPrice()
        return;
    }

    let delta = this.className === "subtract" ? -1 : 1
    let index = basketOrder.findIndex(item => item.name === this.parentNode.parentNode.querySelector(".pizza-name").textContent)
    basketOrder[index].count = Number(basketOrder[index].count) + delta
    this.parentNode.querySelector(".product-count").textContent = basketOrder[index].count
    this.parentNode.querySelector(".order-price").textContent = Number(basketOrder[index].price) * Number(basketOrder[index].count) + "грн"
    localStorage.setItem("basketOrder", JSON.stringify(basketOrder))
    updateOverallPrice()
}

function createOrder(name, size, weight, price, count, imgSrc) {

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
    pizzaName.textContent = name
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
    spanSize.textContent = size
    orderSecondDiv.appendChild(spanSize)

    const imgWeight = document.createElement("img")
    imgWeight.style = "margin-left:3px;"
    imgWeight.src = "assets/images/weight.svg"
    imgWeight.alt = "weight info"
    imgWeight.className = "order-weight-info"
    orderSecondDiv.appendChild(imgWeight)

    const spanWeight = document.createElement("span")
    spanWeight.style = "margin-left:3px;"
    spanWeight.textContent = weight
    orderSecondDiv.appendChild(spanWeight)

    orderInfoDiv.appendChild(orderSecondDiv)

    const orderThirdDiv = document.createElement("div")
    orderThirdDiv.className = "order-third"

    const strongPrice = document.createElement("strong")
    strongPrice.textContent = price * Number(count) + "грн"
    strongPrice.className = "order-price"

    orderThirdDiv.appendChild(strongPrice)

    const buttonSubtract = document.createElement("button")
    buttonSubtract.style = "margin-left: 13px;"
    buttonSubtract.className = "subtract"
    buttonSubtract.type = "button"

    buttonSubtract.addEventListener("click", changeItem)

    const strongMinus = document.createElement("strong")
    strongMinus.textContent = "-"

    buttonSubtract.appendChild(strongMinus)
    orderThirdDiv.appendChild(buttonSubtract)

    const strongCount = document.createElement("strong")
    strongCount.className = "product-count"
    strongCount.textContent = count
    strongCount.style = "margin-left: 3px;"
    orderThirdDiv.appendChild(strongCount)

    const buttonAdd = document.createElement("button")
    buttonAdd.className = "add"
    buttonAdd.type = "button"
    buttonAdd.style = "margin-left: 9px;"
    buttonAdd.addEventListener("click", changeItem)

    const strongPlus = document.createElement("strong")
    strongPlus.textContent = "+"

    buttonAdd.appendChild(strongPlus)
    orderThirdDiv.appendChild(buttonAdd)

    const buttonDelete = document.createElement("button")
    buttonDelete.className = "delete"
    buttonDelete.type = "button"
    buttonDelete.style = "margin-left: 5px;"

    buttonDelete.addEventListener("click", changeItem)

    const strongX = document.createElement("strong")
    strongX.textContent = "x"

    buttonDelete.appendChild(strongX)
    orderThirdDiv.appendChild(buttonDelete)
    orderInfoDiv.appendChild(orderThirdDiv)
    orderBox.appendChild(orderInfoDiv)

    const imageDivContainer = document.createElement("div")
    imageDivContainer.className = "image-container"

    const imgPhoto = document.createElement("img")

    imgPhoto.src = imgSrc
    imgPhoto.alt = "pizza's photo"

    imageDivContainer.appendChild(imgPhoto)
    orderBox.appendChild(imageDivContainer)
    document.querySelector(".order-list").appendChild(orderDiv)
    updateOverallPrice()
}
function addBasketButton() {
    function makeRoot(filename) {
        let parts = filename.split('.');
        let extension = parts.pop();
        let number = parts[0].split('_').pop();
        return filename.slice(0, 14) + '/half_pizza_' + number + '.png';
    }

    let size = this.dataset.size === "small" ? " (Мала)" : " (Велика)"
    let order = {
        name: this.parentNode.parentNode.parentNode.querySelector(".pizza-name strong").textContent + size,
        size: this.parentNode.querySelectorAll("span")[0].textContent,
        weight: this.parentNode.querySelectorAll("span")[1].textContent,
        price: this.parentNode.querySelector(".pizza-price").textContent,
        count: "1",
        imgSrc: makeRoot(this.parentNode.parentNode.parentNode.parentNode.querySelector(".image").attributes[1].nodeValue)
    }

    let index = basketOrder.findIndex(item => item.name === order.name)
    if (index === -1){
        basketOrder.push(order)

        localStorage.setItem("basketOrder", JSON.stringify(basketOrder))
        createOrder(order.name, order.size, order.weight, order.price, order.count, order.imgSrc)
    } else {
        let currentOrder = basketOrder[index]

        let allOrderNames = document.querySelectorAll(".order-first .pizza-name")
        currentOrder.count = Number(currentOrder.count) + 1
        for (let i = 0; i < allOrderNames.length; i++) {
            if(allOrderNames[i].textContent === currentOrder.name) {
                allOrderNames[i].parentNode.parentNode.querySelector(".product-count").textContent = currentOrder.count
                allOrderNames[i].parentNode.parentNode.querySelector(".order-price").textContent = Number(basketOrder[index].price) * Number(basketOrder[index].count) + "грн"
            }
        }

        updateOverallPrice()
        localStorage.setItem("basketOrder", JSON.stringify(basketOrder))
    }
}

function updateOverallPrice() {
    let price = 0
    basketOrder.forEach(item => price += Number(item.price) * Number(item.count))
    document.querySelector(".order-full-price").textContent = price + " грн"
    updateOverallQuantity()
}

function updateOverallQuantity() {
    let count = 0
    basketOrder.forEach(item => count += Number(item.count))

    document.querySelectorAll(".shell strong").forEach(item => item.textContent = count)
}
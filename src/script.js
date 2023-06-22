fetch('../src/Pizza.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Помилка при виконанні запиту');
        }
        return response.json();
    })
    .then(data => {
        data.forEach(item => createPizza(item))
        updateOverallQuantity()
    })
    .catch(error => {
        console.error('Помилка:', error);
    });

function createPizza(data) {
    const pizzaCard = document.createElement("div")
    pizzaCard.className = "pizza-card"

    if (data.is_new && data.is_popular) {
        const twoBadgesDiv = document.createElement("div")
        twoBadgesDiv.className = "all-badges"

        const newDiv = document.createElement("div")
        newDiv.className = "pizza-badge"
        newDiv.style = "background: #DB524B"

        const newText = document.createElement("strong")
        newText.textContent = "Нова"

        newDiv.appendChild(newText)
        twoBadgesDiv.appendChild(newDiv)

        const popularDiv = document.createElement("div")
        popularDiv.className = "pizza-badge"
        popularDiv.style = "background: #59B957"

        const popularText = document.createElement("strong")
        popularText.textContent = "Популярна"

        popularDiv.appendChild(popularText)
        twoBadgesDiv.appendChild(popularDiv)
        pizzaCard.appendChild(twoBadgesDiv)
    } else if (data.is_new) {
        const newDiv = document.createElement("div")
        newDiv.className = "pizza-badge"
        newDiv.style = "background: #DB524B; position: absolute;\n" +
            "    top: -10px;\n" +
            "    right: -6px;"

        const newText = document.createElement("strong")
        newText.textContent = "Нова"

        newDiv.appendChild(newText)
        pizzaCard.appendChild(newDiv)
    } else if (data.is_popular) {
        const popularDiv = document.createElement("div")
        popularDiv.className = "pizza-badge"
        popularDiv.style = "background: #59B957; position: absolute;\n" +
            "    top: -10px;\n" +
            "    right: -6px;"

        const popularText = document.createElement("strong")
        popularText.textContent = "Популярна"

        popularDiv.appendChild(popularText)
        pizzaCard.appendChild(popularDiv)
    }

    const imgPizza = document.createElement("img")
    imgPizza.className = "image"
    imgPizza.src = data.icon
    imgPizza.alt = "pizza's photo"

    pizzaCard.appendChild(imgPizza)

    const pizzaItemDiv = document.createElement("div")
    pizzaItemDiv.className = "pizza-item"

    const pizzaNameH1 = document.createElement("h1")
    pizzaNameH1.className = "pizza-name"

    const strongPizzaName = document.createElement("strong")
    strongPizzaName.textContent = data.title

    pizzaNameH1.appendChild(strongPizzaName)
    pizzaItemDiv.appendChild(pizzaNameH1)

    const pizzaType = document.createElement("h6")
    pizzaType.className = "pizza-type"
    pizzaType.textContent = data.type
    pizzaType.dataset.meat = false
    pizzaType.dataset.pineapple = false
    pizzaType.dataset.mushroom = false
    pizzaType.dataset.seafood = false
    pizzaType.dataset.vega = data.type === "Вега піца"

    pizzaItemDiv.appendChild(pizzaType)

    const content = document.createElement("p")
    content.className = "pizza-text"
    let allContent = ""

    for (const contentKey in data.content) {
        data.content[contentKey].forEach(item => allContent += item + ", ")
        if (data.type !== "Вега піца") {
            if(contentKey === "meat" || contentKey === "chicken"){
                pizzaType.dataset.meat = true
            }
            if(contentKey === "pineapple") {
                pizzaType.dataset.pineapple = true
            }
            if(contentKey === "mushroom") {
                pizzaType.dataset.mushroom = true
            }
            if(contentKey === "ocean") {
                pizzaType.dataset.seafood = true
            }
        }
    }

    content.textContent = allContent[0].toUpperCase() + allContent.slice(1, allContent.length-2)

    pizzaItemDiv.appendChild(content)

    const pizzaBuyContainers = document.createElement("div")
    pizzaBuyContainers.className = "pizza-buy-containers"

    if (data.small_size !== undefined) {
        const pizzaBuyDiv = document.createElement("div")
        pizzaBuyDiv.className = "pizza-buy-container"

        const sizeDiv = document.createElement("div")

        const imgSize = document.createElement("img")
        imgSize.alt = "size"
        imgSize.src = "assets/images/size-icon.svg"

        sizeDiv.appendChild(imgSize)

        const spanSize = document.createElement("span")
        spanSize.textContent = data.small_size.size

        sizeDiv.appendChild(spanSize)

        pizzaBuyDiv.appendChild(sizeDiv)

        const weightDiv = document.createElement("div")

        const imgWeight = document.createElement("img")
        imgWeight.alt = "weight"
        imgWeight.src = "assets/images/weight.svg"

        weightDiv.appendChild(imgWeight)

        const spanWeight = document.createElement("span")
        spanWeight.textContent = data.small_size.weight

        weightDiv.appendChild(spanWeight)

        pizzaBuyDiv.appendChild(weightDiv)

        const strongPrice = document.createElement("strong")
        strongPrice.className = "pizza-price"
        strongPrice.textContent = data.small_size.price

        pizzaBuyDiv.appendChild(strongPrice)

        const justCurrency = document.createElement("strong")
        justCurrency.textContent = "грн."

        pizzaBuyDiv.appendChild(justCurrency)

        const buyButton = document.createElement("button")
        buyButton.className = "pizza-buy-button"
        buyButton.textContent = "Купити"
        buyButton.type = "submit"
        buyButton.dataset.size = "small"
        buyButton.addEventListener("click", addBasketButton)

        pizzaBuyDiv.appendChild(buyButton)
        pizzaBuyContainers.appendChild(pizzaBuyDiv)
    }
    if (data.big_size !== undefined) {
        const pizzaBuyDiv = document.createElement("div")
        pizzaBuyDiv.className = "pizza-buy-container"

        const sizeDiv = document.createElement("div")

        const imgSize = document.createElement("img")
        imgSize.alt = "size"
        imgSize.src = "assets/images/size-icon.svg"

        sizeDiv.appendChild(imgSize)

        const spanSize = document.createElement("span")
        spanSize.textContent = data.big_size.size

        sizeDiv.appendChild(spanSize)

        pizzaBuyDiv.appendChild(sizeDiv)

        const weightDiv = document.createElement("div")

        const imgWeight = document.createElement("img")
        imgWeight.alt = "weight"
        imgWeight.src = "assets/images/weight.svg"

        weightDiv.appendChild(imgWeight)

        const spanWeight = document.createElement("span")
        spanWeight.textContent = data.big_size.weight

        weightDiv.appendChild(spanWeight)

        pizzaBuyDiv.appendChild(weightDiv)

        const strongPrice = document.createElement("strong")
        strongPrice.className = "pizza-price"
        strongPrice.textContent = data.big_size.price

        pizzaBuyDiv.appendChild(strongPrice)

        const justCurrency = document.createElement("strong")
        justCurrency.textContent = "грн."

        pizzaBuyDiv.appendChild(justCurrency)

        const buyButton = document.createElement("button")
        buyButton.className = "pizza-buy-button"
        buyButton.textContent = "Купити"
        buyButton.type = "submit"
        buyButton.dataset.size = "big"
        buyButton.addEventListener("click", addBasketButton)

        pizzaBuyDiv.appendChild(buyButton)
        pizzaBuyContainers.appendChild(pizzaBuyDiv)
    }

    pizzaItemDiv.appendChild(pizzaBuyContainers)

    pizzaCard.appendChild(pizzaItemDiv)
    document.querySelector(".pizza-allCards").appendChild(pizzaCard)
}

let basketOrder = []
let currentPage = "Усі"

if(localStorage.basketOrder !== undefined && localStorage.basketOrder !== ""){
    basketOrder = JSON.parse(localStorage.basketOrder)
    basketOrder.forEach(order => createOrder(order.name, order.size, order.weight, order.price, order.count, order.imgSrc))
}


let sortButtons = document.querySelectorAll(".main-button");

function sortPage() {

    if(currentPage !== this.textContent) {
        const allPizza = document.querySelectorAll(".pizza-card")
        const allButtons = document.querySelectorAll(".main-button")
        allButtons.forEach(item => {
            if(item.textContent === currentPage) {
                item.style = "background-color: #fffff5;\n" +
                    "    color: #f2711d;"
                this.style = "background-color: #EE8900;\n" +
                    "    color: white;"
            }
        })

        switch (this.textContent) {
            case "Усі":
                allPizza.forEach(item => item.style.display = "block")
                currentPage = "Усі"
                break
            case "М'ясні":
                allPizza.forEach(item => {
                    if(item.querySelector(".pizza-type").dataset.meat === "false") {
                        item.style.display = "none"
                    } else {
                        item.style.display = "block"
                    }
                })
                currentPage = "М'ясні"
                break
            case "З ананасами":
                allPizza.forEach(item => {
                    if(item.querySelector(".pizza-type").dataset.pineapple === "false") {
                        item.style.display = "none"
                    } else {
                        item.style.display = "block"
                    }
                })
                currentPage = "З ананасами"
                break
            case "З грибами":
                allPizza.forEach(item => {
                    if(item.querySelector(".pizza-type").dataset.mushroom === "false") {
                        item.style.display = "none"
                    } else {
                        item.style.display = "block"
                    }
                })
                currentPage = "З грибами"
                break
            case "З морепродуктами":
                allPizza.forEach(item => {
                    if(item.querySelector(".pizza-type").dataset.seafood === "false") {
                        item.style.display = "none"
                    } else {
                        item.style.display = "block"
                    }
                })
                currentPage = "З морепродуктами"
                break
            case "Вега":
                allPizza.forEach(item => {
                    if(item.querySelector(".pizza-type").dataset.vega === "false") {
                        item.style.display = "none"
                    } else {
                        item.style.display = "block"
                    }
                })
                currentPage = "Вега"
                break
        }
    }
    updateOverallQuantity()
}

sortButtons.forEach(item => item.addEventListener("click", sortPage))

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
    let boughtCount = 0
    let numberOfPizza = 0

    basketOrder.forEach(item => boughtCount += Number(item.count))

    document.querySelectorAll(".shell strong").forEach(item => item.textContent = boughtCount)
    document.querySelectorAll(".pizza-card").forEach(item => {
        if(item.style.display !== "none") {
            numberOfPizza += 1
        }
    })

    document.querySelector(".shell strong").textContent = numberOfPizza
}

import { menuArray } from '/data.js'

const menu = document.getElementById("menu-container")
const addBtns = document.getElementsByClassName("add-btn")
const yourOrderContainer = document.getElementById("your-order-container")
const paymentModal = document.getElementById("payment-modal")
// const orderContainer = document.getElementById("order-container")

document.addEventListener('click', function (e) {

    if (e.target.className === "add-btn" || e.target.className === "remove-btn") {
        updateFoodInOrder(e.target)
    }

    else if (e.target.id === "complete-order-btn") {
        completeOrder()
    }

    else if (e.target.id === "pay-btn") {
        e.preventDefault()
        pay(e.target)
    }

    else if (!paymentModal.classList.contains("display-none") && !(paymentModal.contains(e.target))) { //close modal if user clicks outside of payment modal
        paymentModal.classList.add("display-none")
    }

})

function pay(order) {

    const fullName = (document.getElementById("user-fullname")).value
    const cardNumber = (document.getElementById("user-cardnumber")).value
    const userCvv = (document.getElementById("user-cvv")).value

    if (fullName && cardNumber && userCvv) {
        paymentModal.classList.add("display-none")
        yourOrderContainer.innerHTML = orderConfirmation(fullName)
    }
    else {
        document.getElementById("labels-container").innerHTML += `<h3>invalid entry<h3>`
    }

    console.log(fullName);

}

function orderConfirmation(name) {

    return `<div class="confirmation-message"><h1>Thanks, ${name}! Your order is on its way!<h1></div>`

}

function completeOrder() {
    paymentModal.classList.remove("display-none")
}

function updateFoodInOrder(food) {

    const action = food.className
    const foodPrice = Number(food.dataset.price)
    const foodName = food.dataset.name
    const foodInOrder = yourOrderContainer.querySelector(`#${foodName}`);

    if (foodInOrder) { //If food exists in the order section, just update the food cost

        let currCost = Number((foodInOrder.querySelector(".order-price").textContent).slice(1))
        if (action === "add-btn") {
            currCost += foodPrice
            foodInOrder.querySelector(".order-price").textContent = `$ ${currCost}`

        }

        else if (action === "remove-btn") {

            currCost -= foodPrice

            if (currCost) {
                foodInOrder.querySelector(".order-price").textContent = `$ ${currCost}`
            }

            else {
                //remove food item
                foodInOrder.remove()
            }

        }

    }

    else if (document.getElementById("order-container")) {  //If the order section exists but the food does not, add the food and update the costs
        const orderContainer = document.getElementById("order-container")
        orderContainer.innerHTML += `<div class="order" id=${foodName}>
                <h1 class="order-name">${foodName}</h1>
                <button class="remove-btn" data-price=${foodPrice} data-name=${foodName}>Remove</button>
                <h3 class="order-price price">$ ${foodPrice}</h3>
            </div>`
    }

    else {//If the order section nor food exists
        yourOrderContainer.innerHTML = `<div id="your-order-container">
        <h1 class="centered-text">Your Order</h1>
        <div id="order-container">
            <div class="order" id=${foodName}>
                <h1 class="order-name">${foodName}</h1>
                <button class="remove-btn" data-price=${foodPrice} data-name=${foodName}>Remove</button>
                <h3 class="order-price price">$ ${foodPrice}</h3>
            </div>
        </div>
         <div class="total">
                <h1>Total Price:</h1>
                <h3 class="total-price price">$0</h3>
         </div>
         <button id="complete-order-btn" class="submit-button">Complete Order</button>
        </div>`
    }

    let newTotalPrice = 0
    if (action === "add-btn") {
        newTotalPrice = Number((yourOrderContainer.querySelector(".total-price").textContent).slice(1)) + foodPrice
    }
    else if (action === "remove-btn") {
        newTotalPrice = Number((yourOrderContainer.querySelector(".total-price").textContent).slice(1)) - foodPrice

        if (newTotalPrice === 0) {
            yourOrderContainer.textContent = '' //clear the order
        }
    }
    yourOrderContainer.querySelector(".total-price").textContent = `$ ${newTotalPrice}`

}

document.addEventListener("DOMContentLoaded", function () {
    render()
});

function render() {

    //    name: "Pizza",
    //     ingredients: ["pepperoni", "mushrom", "mozarella"],
    //     id: 0,
    //     price: 14,
    //     emoji: "🍕",
    //     image: 'pizza.png'
    // },

    menu.innerHTML = menuArray.map(function (item) {
        return `<div class="food" id=${item.name}>
                <img class="food-icon" src="/images/${item.image}"></img>
                <div class="food-text">
                    <h1 class="food-name">${item.name}</h1>
                    <h2 class="food-details">${(item.ingredients).join(", ")}</h2>
                    <h3 class="food-price">$ ${item.price}</h3>
                </div>
                <button class="add-btn" data-price=${item.price} data-name=${item.name}> + </button>
         </div>`
    }).join("")
}

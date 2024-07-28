var tbody = document.querySelector("tbody");
var dataCart = localStorage.getItem('cart');
var addCart = JSON.parse(dataCart) || []; // Ensure addCart is an array even if localStorage is empty
var total = document.querySelector(".total");
var totalPrice = 0;
function renderTable() {
    var tr = '';
    totalPrice = 0;
    addCart.forEach((data, index) => {
        tr += `
        <tr>
           <td>${index + 1}</td>
           <td><img src='${data.image}'/></td>
           <td>${data.para}</td>
           <td>${data.price}</td>
           <td><button class="btn" onclick="deleteItem(${index})">delete</button></td>
        </tr>
        `;
        totalPrice += parseInt(data.price);
    });
    tbody.innerHTML = tr;
    total.innerHTML = 'toatal_price : ' + totalPrice + '$';
}

window.addEventListener('load', () => {
    renderTable();
});

function deleteItem(index) {
    // Remove item from array
    addCart.splice(index, 1);
    
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(addCart));
    
    // Re-render table
    renderTable();
}

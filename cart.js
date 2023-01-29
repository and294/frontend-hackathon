//cart
let prices = 0;
//Affiche les trips dans le panier
fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    for (let i in data) {
      //Empty cart message
      if (data[i].length === 0) {
        document.querySelector(".itemContainer").innerHTML = `
        <div class="empty">
<p>Your cart is empty</p>
        </div> 
			`;
      } else {
        document.querySelector(".itemContainer").innerHTML = "";
      }

      //Afficher les voyages
      for (let j in data[i]) {
        let dateToFormat = new Date(data[i][j].date);
        let hour = dateToFormat.getHours();
        let minute = dateToFormat.getMinutes();

        document.querySelector(".itemContainer").innerHTML += `
        <div class="item">
            <p id="trip">${data[i][j].departure} > ${data[i][j].arrival}</p>
            <p id="time">${hour}h${minute}</p>
            <p id="price">${data[i][j].price} €</p>
            <button class='delete' id="${data[i][j]._id} delete" onClick="window.location.reload()">X</button>
        </div> 
			`;

        //Afficher le total
        prices += data[i][j].price;
        console.log(prices);
        let total = document.querySelector("#sum");
        if (data[i].length < 1) {
          total.textContent = `Total: 0 €`;
        } else {
          total.textContent = `Total: ${prices} €`;
        }
      }
    }

    deleteItems();
  });

//Supprimer du panier

function deleteItems() {
  let deleteItem = document.querySelectorAll(".delete");
  for (let i = 0; i < deleteItem.length; i++) {
    deleteItem[i].addEventListener("click", () => {
      let id = deleteItem[i].id;
      fetch(`http://localhost:3000/cart/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.result) {
            deleteItem[i].parentNode.remove();
          }
          console.log("trip deleted");
        });
    });
  }
}

//

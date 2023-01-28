//cart

//Affiche les trips dans le panier
fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i in data) {
      for (let j in data[i]) {
        let dateToFormat = new Date(data[i][j].date);
        let hour = dateToFormat.getHours();
        let minute = dateToFormat.getMinutes();
        console.log(data[i][j]._id);

        document.querySelector(".itemContainer").innerHTML += `
        <div class="item">
            <p id="trip">${data[i][j].departure} > ${data[i][j].arrival}</p>
            <p id="time">${hour}h${minute}</p>
            <p id="price">${data[i][j].price} €</p>
            <button class='delete' id="${data[i][j]._id} delete">X</button>
        </div> 
			`;
      }
    }
 deleteItems();

  });

     //Supprimer du panier

      function deleteItems(){
    let deleteItem = document.querySelectorAll(".delete");

    for (let i = 0; i < deleteItem.length; i++) {
      deleteItem[i].addEventListener("click", () => {
        let id = deleteItem[i].id;
        fetch(`http://localhost:3000/cart/delete/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data)
            					if (data.result) {
                        deleteItem[i].parentNode.remove();
                      }
            console.log("trip deleted");
          });
      });
    }}


      


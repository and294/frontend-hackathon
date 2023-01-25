//cart

fetch("http://localhost:3000/cart")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    for (let i in data) {
      for (let j in data[i]) {
        let dateToFormat = new Date(data[i][j].date);
        let hour = dateToFormat.getHours();
        let minute = dateToFormat.getMinutes();

        document.querySelector(".itemContainer").innerHTML += `
        <div class="item">
            <p id="trip">${data[i][j].departure} > ${data[i][j].arrival}</p>
            <p id="time">${hour}h${minute}</p>
            <p id="price">${data[i][j].price} €</p>
            <button id="delete">X</button>
        </div> 
			`;
      }
    }
  });

let departure = document.querySelector("#departure");
let arrival = document.querySelector("#arrival");
let calendar = document.querySelector("#calendar");
let search = document.querySelector("#search");

document.querySelector("#search").addEventListener("click", () => {
  document.querySelector(".result").innerHTML = "";
  let inputData = {
    departure: departure.value,
    arrival: arrival.value,
    date: calendar.value,
  };
  fetch("http://localhost:3000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputData),
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i in data) {
        for (let j in data[i]) {
          console.log(data.length)
          let dateToFormat = new Date(data[i][j].date);
          let hour = dateToFormat.getHours();
          let minute = dateToFormat.getMinutes();

          document.querySelector(".result").style.justifyContent = "flex-start";
          document.querySelector(".result").innerHTML += `
          <div class='tripContainer'>
            <p id="trip">${data[i][j].departure} > ${data[i][j].arrival}</p>
            <p id="time">${hour}h${minute}</p>
            <p id="price">${data[i][j].price} €</p>
            <button class="book" id='${data[i][j]._id}'>Book</button>
          </div>
          `;

         let book = document.querySelectorAll(".book");
         for (let u = 0; u < book.length; u++) {

           book[u].addEventListener("click", () => {
            let id = book[u].id;
             fetch(`http://localhost:3000/add/${id}`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
             })
               .then((response) => response.json())
               .then((data) => {
               window.location.assign("./cart.html");
               });
           });
         }
        }
      }
    });
});



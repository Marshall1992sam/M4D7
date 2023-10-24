const contenitore = document.getElementById("card-row");

window.onload = function () {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YTA1M2U3NDZhMDAwMTQ4MTQzMjAiLCJpYXQiOjE2OTgxNDQzNDAsImV4cCI6MTY5OTM1Mzk0MH0.iSu24vGbIdWNpBCNxCGQi8EN1_Qym4C-c-jwYjl0V3M"; // Sostituisci con il tuo token

  fetch("https://striveschool-api.herokuapp.com/api/product", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((product) => {
        console.log(product);
        contenitore.innerHTML +=
          /*html*/
          `<div class="col-lg-2 col-md-4 col-sm-6 mb-4">
            <div class="card">
                <img src="${product.imageUrl}" class="card-img-top" alt="Prodotto1" style="width: 150px; max-height: 150px;">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.price}€</p>
                    <a href="#" class="btn btn-primary view-product" data-product-id="${product._id}">Vedi Prodotto</a>
                </div>
            </div>
        </div>`;
      });
    })
    .catch((error) => {
      console.error("Errore nella richiesta API:", error);
    });
};

//VEDI PRODOTTO
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("view-product")) {
    e.preventDefault();
    const productId = e.target.getAttribute("data-product-id");
    window.location.href = `product.html?id=${productId}`;
  }
});

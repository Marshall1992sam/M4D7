const API_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM3YTA1M2U3NDZhMDAwMTQ4MTQzMjAiLCJpYXQiOjE2OTgxNDQzNDAsImV4cCI6MTY5OTM1Mzk0MH0.iSu24vGbIdWNpBCNxCGQi8EN1_Qym4C-c-jwYjl0V3M";
const API_URL = "https://striveschool-api.herokuapp.com/api/product/";

document
  .getElementById("add-product-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const productData = {
      name: document.getElementById("name").value,
      description: document.getElementById("description").value,
      brand: document.getElementById("brand").value,
      imageUrl: document.getElementById("imageUrl").value,
      price: document.getElementById("price").value,
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + API_TOKEN,
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        alert("Product added successfully!");
      } else {
        alert("Failed to add the product!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });

async function displayProducts() {
  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: "Bearer " + API_TOKEN,
      },
    });

    if (response.ok) {
      const products = await response.json();
      const productsGrid = document.getElementById("products-grid");
      productsGrid.innerHTML = "";
      products.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("admin-card", "card", "m-2");
        productDiv.innerHTML = /*html*/ `
    <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
    <div class="card-body">
        <h5 class="card-title">${product.name}</h5>
        <p class="card-text">${product.description}</p>
        <p class="card-text">Brand: ${product.brand}</p>
        <p class="card-text">Price: ${product.price}€</p>
        <button class="btn btn-primary" onclick="editProduct('${product._id}')">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Delete</button>
    </div>
  `;
        productsGrid.appendChild(productDiv);
      });
    } else {
      alert("Failed to fetch products!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

async function editProduct(productId) {
  const newName = prompt("Enter the new name:");
  const newDescription = prompt("Enter the new description:");
  const newBrand = prompt("Enter the new brand:");
  const newImageUrl = prompt("Enter the new image URL:");
  const newPrice = prompt("Enter the new price:");

  const updatedProductData = {
    name: newName,
    description: newDescription,
    brand: newBrand,
    imageUrl: newImageUrl,
    price: newPrice,
  };

  try {
    const response = await fetch(API_URL + productId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + API_TOKEN,
      },
      body: JSON.stringify(updatedProductData),
    });

    if (response.ok) {
      alert("Product updated successfully!");
      displayProducts();
    } else {
      alert("Failed to update the product!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

async function deleteProduct(productId) {
  if (!confirm("Are you sure you want to delete this product?")) {
    return;
  }

  try {
    const response = await fetch(API_URL + productId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + API_TOKEN,
      },
    });

    if (response.ok) {
      alert("Product deleted successfully!");
      displayProducts();
    } else {
      alert("Failed to delete the product!");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Please try again.");
  }
}

displayProducts();

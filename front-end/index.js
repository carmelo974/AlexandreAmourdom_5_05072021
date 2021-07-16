main();

function main() {
  const articles = getArticles();
}

// recuperer les articles depuis l'API
function getArticles() {
  fetch("http://localhost:3000/api/cameras")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .catch(function (error) {
      alert(error);
    })

    // mise en forme
    .then(function (dataAPI) {
      const cameras = dataAPI;
      console.log(cameras);
      cameras.forEach(function (camera) {
        let productCard = document.createElement("div");
        productCard.classList.add("product_card");
        document.querySelector(".container-products").appendChild(productCard);

        let productLink = document.createElement("a");
        productCard.appendChild(productLink);
        productLink.href = `product.html?id=${camera._id}`;
        productLink.classList.add("link");

        let productImgDiv = document.createElement("div");
        productLink.appendChild(productImgDiv);
        productImgDiv.classList.add("product_img");

        let productImg = document.createElement("img");
        productImgDiv.appendChild(productImg);
        productImg.src = camera.imageUrl;

        let productInfo = document.createElement("div");
        productLink.appendChild(productInfo);
        productInfo.classList.add("product_info");

        let productInfoTitle = document.createElement("div");
        productInfo.appendChild(productInfoTitle);
        productInfoTitle.classList.add("product_info_title");
        productInfoTitle.textContent = camera.name;

        let productPrice = document.createElement("div");
        productInfo.appendChild(productPrice);
        productPrice.classList.add("product_price");
        productPrice.textContent = camera.price / 100 + "€";

        let productDescription = document.createElement("div");
        productInfo.appendChild(productDescription);
        productDescription.classList.add("product_description");
        productDescription.textContent = camera.description;
      });
    });
}

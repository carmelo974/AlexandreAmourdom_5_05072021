main();

async function main() {
  const articles = await getArticles();

  for (article of articles) {
    displayArticle(article);
  }
}

// recuperer les articles depuis l'API
function getArticles() {
  return fetch("http://localhost:3000/api/cameras")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (articles) {
      return articles;
    })
    .catch(function (error) {
      alert(error);
    });
}
// afficher les articles sur la page 
function displayArticle(article) {
  const templateElt = document.getElementById("templateArticle");
  const cloneElt = document.importNode(templateElt.content, true);

  cloneElt.getElementById("link").href +=`?id=${article._id}` 
  cloneElt.getElementById("product_img").src = article.imageUrl;
  cloneElt.getElementById("product_name").textContent = article.name;
  cloneElt.getElementById("product_decription").textContent =
    article.description;
  cloneElt.getElementById("product_price").textContent =
    article.price / 100 + "€";
  cloneElt.getElementById("lenses_select").value = article.lenses;

  document.getElementById("container_products").appendChild(cloneElt);
}

// mise en forme
//     .then(function (dataAPI) {
//       const cameras = dataAPI;
//       console.log(cameras);
//       cameras.forEach(function (camera) {
//         let productCard = document.createElement("div");
//         productCard.classList.add("product_card");
//         document.querySelector(".container-products").appendChild(productCard);

//         let productLink = document.createElement("a");
//         productCard.appendChild(productLink);
//         productLink.href = `product.html?id=${camera._id}`;
//         productLink.classList.add("link");

//         let productImgDiv = document.createElement("div");
//         productLink.appendChild(productImgDiv);
//         productImgDiv.classList.add("product_img");

//         let productImg = document.createElement("img");
//         productImgDiv.appendChild(productImg);
//         productImg.src = camera.imageUrl;

//         let productInfo = document.createElement("div");
//         productLink.appendChild(productInfo);
//         productInfo.classList.add("product_info");

//         let productInfoTitle = document.createElement("div");
//         productInfo.appendChild(productInfoTitle);
//         productInfoTitle.classList.add("product_info_title");
//         productInfoTitle.textContent = camera.name;

//         let productPrice = document.createElement("div");
//         productInfo.appendChild(productPrice);
//         productPrice.classList.add("product_price");
//         productPrice.textContent = camera.price / 100 + "€";

//         let productDescription = document.createElement("div");
//         productInfo.appendChild(productDescription);
//         productDescription.classList.add("product_description");
//         productDescription.textContent = camera.description;
//       });
//     });
// }

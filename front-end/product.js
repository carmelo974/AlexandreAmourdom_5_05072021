// recupération de la chaine de requête dans l'url
const queryString_url_id = window.location.search;
// console.log(queryString_url_id);

// Méthode 1 - extraire l'id
// const leId = queryString_url_id.slice(4);
// console.log(leId);

//Méthode 2 - extraire l'id
const urlSearchParams = new URLSearchParams(queryString_url_id);
// console.log(urlSearchParams);
const leId = urlSearchParams.get("id");
// console.log(leId);

// sélection de la classe pour affichage html
const positionElement = document.querySelector(".container-page-produit");
// const productImg = document.querySelector(".img");
// const productInfoTitle = document.querySelector(".product_info_title");

function main() {
  const articles = getArticles();
}

function getArticles() {
  fetch(`http://localhost:3000/api/cameras/${id}`)
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })

    .catch(function (error) {
      alert(error);
    })

    .then(function (dataAPI) {
      const camera = dataAPI;
      // productImg.src = camera.imageUrl;
      //   productInfoTitle.textContent = camera.name;
    });
}

//structure html pour l'affichage
const structureProduct = `
    <div class="product_img">
    <img src="${leId.imageUrl}" alt="" class="img">
    </div>
    <div class="product_info">
    <div class="product_info_title">${leId.name}</div>
    <div class="product_price">${leId.price}</div>
    <div class="product_description">${leId.description}</div>
    </div>
    `;

//affichage html dans la page produit
positionElement.innerHTML = structureProduct;

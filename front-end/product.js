(async function () {
  let articleId = getArticleId();
  console.log(articleId);
  const article = await getArticle(articleId);
  console.log(article);
  displayArticle(article);
})();

// extraire l'id
function getArticleId() {
  return new URL(location.href).searchParams.get("id");
}

// récupèrer les données de l'article via son Id
function getArticle(articleId) {
  return fetch(`http://localhost:3000/api/cameras/${articleId}`)
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

//afficher l'article sur la page
function displayArticle(article) {
  document.getElementById("product_img").src = article.imageUrl;
  document.getElementById("product_name").textContent = article.name;
  document.getElementById("product_decription").textContent =
    article.description;
  document.getElementById("product_price").textContent =
    article.price / 100 + "€";

  //fonction qui permet de récupèrer le choix des lentilles
  function displayLense() {
    let optionLense = article.lenses;
    let arrayLense = "";
    for (let c = 0; c < article.lenses.length; c++) {
      arrayLense += `<option>${optionLense[c]}</option>
        `;
    }
    console.log(article.lenses);
    const optionLentille = document.querySelector("#lenses_select");
    optionLentille.innerHTML = arrayLense;
    console.log(optionLentille);
  }
  displayLense();
}
let quantityCamera = document.querySelector("#cameraNumber");

// ----------------------gestion du panier----------------------------

// function removeDuplicates(productInCard) {
//   for (x = 0; x < productInCard.length; x++) {
//     for (let y = x + 1; y < productInCard.length; y++){
//       if(productInCard[x]==productInCard[y]){
//         productInCard.splice(y,1)
//       }
//     }
//   }
//   return productInCard;
// }

//  sélection du bouton ajouter au panier
// const productInfo = document.querySelector("#product_card");
// console.log(productInfo);
const btn_ajouter = document.querySelector("#btn_ajouter");

// recupération des valeurs du panier
btn_ajouter.addEventListener("click", (event) => {
  event.preventDefault();
  let productAdded = {
    id: getArticleId(),
    name: product_name.innerHTML,
    price:
      parseFloat(product_price.innerHTML) * parseFloat(quantityCamera.value),
    lenses: lenses_select.innerText,
    quantity: parseFloat(quantityCamera.value),
  };

  console.log(productAdded);

  // ------------------------------------------------local storage----------------------------------
  // stocker les valeurs du formulaire ajouter au panier

  // déclaration de la variable "productInCard" dans laquelle on mettra les key et valeurs qui seront dans le local storage
  // JSON.parse convertit les données en format JSON en javascript
  let productInCard = JSON.parse(localStorage.getItem("product"));
  console.log(productInCard);

  // popup de confirmation
  const popupConfirmation = () => {
    if (
      window.confirm(`${product_name.innerHTML} a bien été ajouté
Consulter votre panier OK ou revenir à l'accueil ANNULER`)
    ) {
      window.location.href = "cart.html";
    } else {
      window.location.href = "index.html";
    }
  };

  // Fonction pour ajouter un produit dans le localStorage
  const addProduct = () => {
    // Ajout dans le tableau "productInCard" des valeurs choisi par l'utilisateur
    productInCard.push(productAdded);

    // conversion en format JSON et envoie de la key "product" dans le localStorage
    localStorage.setItem("product", JSON.stringify(productInCard));
  };

  // si le localStorage contient des valeurs
  if (productInCard) {
    addProduct();
    popupConfirmation();
  }

  // si le localStorage ne contient pas  de valeurs
  else {
    productInCard = [];
    addProduct();
    popupConfirmation();
  }
});

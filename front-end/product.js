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

function displayArticle(article) {
  document.getElementById("product_img").src = article.imageUrl;
  document.getElementById("product_name").textContent = article.name;
  document.getElementById("product_decription").textContent =
    article.description;
  document.getElementById("product_price").textContent =
    article.price / 100 + "€";

  function displayLense() {
    let optionLense = article.lenses;
    let arrayLense = "";
    for (let c = 0; c < article.lenses.length; c++) {
      arrayLense += `<option>${optionLense[c]}</option>
        `;
    }
    const optionLentille = document.querySelector("#lenses_select");
    optionLentille.innerHTML = arrayLense;
    console.log(optionLentille);
  }
  displayLense();
}
let quantityCamera = document.querySelector("#cameraNumber");
//   console.log(quantityCamera);
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
  // Fonc
  // si le localStorage contient des valeurs
  if (productInCard) {
    productInCard.push(productAdded);
    localStorage.setItem("product", JSON.stringify(productInCard));
    popupConfirmation();
  }
  // si le localStorage ne contient pas  de valeurs
  else {
    productInCard = [];
    productInCard.push(productAdded);
    localStorage.setItem("product", JSON.stringify(productInCard));
    popupConfirmation();

    console.log(productInCard);
  }
});

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
  // const templateElt = document.getElementById("templateArticle");
  // const cloneElt = document.importNode(templateElt.content, true);
  // cloneElt.getElementById("lenses_select").textContent = article.lenses;
  // document.getElementById("lenses_select").textContent = article.lenses;
  // document.getElementById("product_card").appendChild(cloneElt);
}
// ----------------------gestion du panier----------------------------
// sélection choix lentilles
const lenses = document.querySelector("#lenses_select");
console.log(lenses);
// lenses.forEach((item, i) =>{
//   lenses += "<option>" + item +"</option>";
// });
// select += "</select>;"

//  sélection du bouton ajouter au panier
// const productInfo = document.querySelector("#product_card");
// console.log(productInfo);
const btn_ajouter = document.querySelector("#btn_ajouter");

// recupération des valeurs du panier
btn_ajouter.addEventListener("click", (event) => {
  event.preventDefault();
  let productAdded = {
    // id: articleId._id,
    name: product_name.innerHTML,
    price: product_price.innerHTML,
    quantity: parseFloat(document.querySelector("#cameraNumber").value),
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
  // si le localStorage ne contient pas  de valeurs dans localStorage
  else {
    productInCard = [];
    productInCard.push(productAdded);
    localStorage.setItem("product", JSON.stringify(productInCard));
    popupConfirmation();

    console.log(productInCard);
  }
});

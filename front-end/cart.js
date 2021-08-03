let copyOfLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(copyOfLocalStorage);
let panier = [];
// ------------------------affichage des produits du panier-------------------------------
const affichageElement = document.querySelector("#container_product_panier");
// console.log(affichageElement);

// si le panier est vide

if (copyOfLocalStorage === null) {
  const panierVide = `
    <div class = "container_panier_vide">
    <div>Votre panier est vide</div>
    </div>`;
  affichageElement.innerHTML = panierVide;
} else {
  // afficher les produits si le panier n'est pas vide

  for (j = 0; j < copyOfLocalStorage.length; j++) {
    panier =
      panier +
      ` <table class="your_camera">
          <thead>
            <tr class="title_table">
              <th class="article_camera_name">Produit</th>
              <th class="quantity_camera">Quantité</th>
              <th class="price_camera">Prix</th>
              <th class="total_price_camera">Total</th>
            </tr>
            
          </thead>
          <tbody id="products_list">
            <tr class="value_products_list"> 
              <td class="camera_name text_center">${copyOfLocalStorage[j].name}</td>
              <td class="quantity_product">${copyOfLocalStorage[j].quantity}</td>
              <td id="products_price">${copyOfLocalStorage[j].price}</td>
              <td id="products_total">${copyOfLocalStorage.quantity * copyOfLocalStorage.price}</td>
              <td><button id="btn_clear_article">Supprimer votre article</button></td>
            </tr>
          </tbody>
        </table>
        
      `;
      

  }
  if (j === copyOfLocalStorage.length) {
    affichageElement.innerHTML = panier;
  }
}

// supprimer un article
// const buttonRemoveArticle = document.querySelector("#btn_clear_article")
// console.log(buttonRemoveArticle);

// buttonRemoveArticle.addEventListener("click", (e) => {
//   deleteItem()

// })

// ----------------------vider entièrement le panier------------------------
// code HTML à afficher
const btnClearCard = `  <button id="btn_clear_card">Supprimer votre panier</button>`;

// insertion bouton dans le html, befeoreend = Juste à l'intérieur de l'element , après son dernier enfant.
affichageElement.insertAdjacentHTML("beforeend", btnClearCard);

const buttonEmptyCard = document.querySelector("#btn_clear_card");
// console.log(buttonEmptyCard);
// supression local Storage
buttonEmptyCard.addEventListener("click", (e) => {
  e.preventDefault();
  if (copyOfLocalStorage) {
    // removeItem pour vider le localStorage
    localStorage.removeItem("product");
    alert["Le panier a été vidé"];
    //rechargement de la page panier
    window.location.href = "cart.html";
  } else {
    // si le panier est deja vide
    alert("votre panier est vide");
  }
});

// --------------------montant total panier--------------------
// variable pour le prix total
let prixTotalCalcul = [];

// recuperer les prix dans le panier
for (let t = 0; t < copyOfLocalStorage.length; t++) {
  let prixTotalPanier = copyOfLocalStorage[t].price;
  // mettre les prix du panier dans la variable tableau prixTotalCalcul
  prixTotalCalcul.push(prixTotalPanier);
}

// additionner les prix du tableau "prixTotalCalcul" avec la méthode.reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);
// console.log(prixTotal);
const prixTotalCard = `<div id="products_total_value">Prix total: ${prixTotal}</div>`;
// affichage HTML
affichageElement.insertAdjacentHTML("afterend", prixTotalCard);

// ----------------------------------formulaire de commande----------------------------
const inputs = document.querySelectorAll('input[type="text"]');
const form = document.querySelector("form");

let firstName, lastName, adress, city, posta, email;
// vérification avant envoie du formulaire
const errorDisplay = (tag, message, valid) => {
  const container = document.querySelector("#" + tag + "_container");
  const span = document.querySelector("#" + tag + "_container > span");

  if (!valid) {
    container.classList.add("error");
    span.textContent = message;
  } else {
    container.classList.remove("error");
    span.textContent = message;
  }
};
const firstNameChecker = (value) => {
  if (!value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)) {
    errorDisplay("firstName", "le champ ne doit contenir que des lettres");
    firstName = null;
  } else {
    errorDisplay("firstName", "", true);
    firstName = value;
  }
};

const lastNameChecker = (value) => {
  if (!value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)) {
    errorDisplay("lastName", "le champ ne doit contenir que des lettres");
    lastName = null;
  } else {
    errorDisplay("lastName", "", true);
    lastName = value;
  }
};
const adressChecker = (value) => {
  if (!value.match()) {
    errorDisplay("adress", "le champ n'est pas valide");
    adress = null;
  } else {
    errorDisplay("adress", "", true);
    adress = value;
  }
};
const cityChecker = (value) => {
  if (!value.match(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/)) {
    errorDisplay("city", "l'adresse n'est pas valide");
    city = null;
  } else {
    errorDisplay("city", "", true);
    city = value;
  }
};
const emailChecker = (value) => {
  if (!value.match(/^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i)) {
    errorDisplay("email", "le mail n'est pas valide");
    email = null;
  } else {
    errorDisplay("email", "", true);
    email = value;
  }
};

const postalChecker = (value) => {
  if (!value.match(/^[\d]{5}$/)) {
    errorDisplay("postal", "Le Code postal doit être au format 99999");
    postal = null;
  } else {
    errorDisplay("postal", "", true);
    postal = value;
  }
};

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        firstNameChecker(e.target.value);
        break;
      case "lastName":
        lastNameChecker(e.target.value);
        break;
      case "adress":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "postal":
        postalChecker(e.target.value);
        break;
      default:
        nul;
    }
  });
});
// si le formulaire est valide

const productsOrder = [];
productsOrder.push(copyOfLocalStorage);

form.addEventListener("submit", (e) => {
  //pour éviter que le form change de page automatiquement
  e.preventDefault();
  if (firstName && lastName && adress && city && postal && email) {
    const order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        adress: adress,
        city: city,
        postal: postal,
        email: email,
      },
      products: productsOrder,
    };
    alert("Commande validée");

    console.log(order);
    // vide tous les champs input après envoie du formulare
    inputs.forEach((input) => (input.value = ""));
    // mettre l'objet dans le localStorage "order"
    const btnCommander = document.querySelector("#btn_commander");

    btnCommander.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.setItem("order", JSON.stringify(order));
    });
  } else {
    alert("Veuillez remplir correctement les champs");
  }
  // envoie de la requête
  const promise = fetch("http://localhost:3000/api/cameras/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-type": "application/json",
    },
  });
  console.log(promise);
  promise.then(async (res) => {
    try {
      const contenu = await res.json();
      console.log("contenu");
      console.log(contenu);
    } catch (e) {
      console.log(e);
    }
  });
});

let copyOfLocalStorage = JSON.parse(localStorage.getItem("product"));
console.log(copyOfLocalStorage);
let panier = [];
// ------------------------affichage des produits du panier-------------------------------

const affichageElement = document.querySelector(".products_list");
// console.log(affichageElement);

// si le panier est vide
function displayCart() {
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
        `

            <tr class="value_products_list"> 
              <td class="camera_name">${copyOfLocalStorage[j].name}</td>
              <td class="quantity_product"><label for="cameraNumber"></label>
              <input class="col-4 cameraNumber" type="number" name="cameraNumber" value="${copyOfLocalStorage[j].quantity}" >
              </td>
              <td class="products_price_">${copyOfLocalStorage[j].price} €</td>
              <td><button class="btn_remove btn_style"  type="button" ><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-dash" viewBox="0 0 16 16">
              <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4z"/>
              <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
            </svg></button></td>
            </tr>
        
      `;
    }
    if (j === copyOfLocalStorage.length) {
      affichageElement.innerHTML = panier;
    }
  }
}
displayCart();
// --------------------------------------------------------bouton supprimer article----------------------------------

// productInCard = [];
// sélection de tous les boutons btn_remove
const btnRemove = document.querySelectorAll(".btn_remove");
console.log(btnRemove);

function removeArticle() {
  for (let p = 0; p < btnRemove.length; p++) {
    btnRemove[p].addEventListener("click", (e) => {
      e.preventDefault();
      let idRemove = copyOfLocalStorage[p].id;
      for (let l = 0; l < copyOfLocalStorage.length; l++) {
        console.log(copyOfLocalStorage[l]);
        console.log(idRemove);
        if (copyOfLocalStorage[l].id == idRemove) {
          copyOfLocalStorage.splice(l, 1);
          break;
        }
      }
      localStorage.removeItem("product");
      localStorage.setItem("product", JSON.stringify(copyOfLocalStorage));
      location.reload();
    });
  }
}
removeArticle();
// ----------------------vider entièrement le panier------------------------
// code HTML à afficher
const btnClearCard = ` <button id="btn_clear_card" class="btn_clear btn_style" type="button"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-cart-x-fill" viewBox="0 0 16 16">
<path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7.354 5.646 8.5 6.793l1.146-1.147a.5.5 0 0 1 .708.708L9.207 7.5l1.147 1.146a.5.5 0 0 1-.708.708L8.5 8.207 7.354 9.354a.5.5 0 1 1-.708-.708L7.793 7.5 6.646 6.354a.5.5 0 1 1 .708-.708z"/>
</svg></button>`;
// const displayBtnClear = document.querySelector("#container_product_panier");

// insertion bouton dans le html, befeoreend = Juste à l'intérieur de l'element , après son dernier enfant.
affichageElement.insertAdjacentHTML("beforeend", btnClearCard);

const buttonEmptyCard = document.querySelector("#btn_clear_card");

// supression local Storage
buttonEmptyCard.addEventListener("click", (e) => {
  e.preventDefault();
  if (copyOfLocalStorage) {
    // removeItem pour vider le localStorage
    localStorage.removeItem("product");
    alert("Le panier a été vidé");
    //rechargement de la page panier
    window.location.href = "cart.html";
  } else {
    // si le panier est deja vide
    alert("votre panier est vide");
  }
});

let elementForm = document.getElementById("formulaire_container");

function removeForm() {
  elementForm.remove();
}

buttonEmptyCard.addEventListener("click", (e) => {
  removeForm();
});

// --------------------montant total panier--------------------

// variable pour le prix
let prixTotalCalcul = [];

// recuperer les prix dans le panier
function recupPrice() {
  for (let t = 0; t < copyOfLocalStorage.length; t++) {
    // parseInt convertit la chaine de caractère en entier
    let prixTotalPanier = parseInt(copyOfLocalStorage[t].price);

    // mettre les prix du panier dans la variable tableau prixTotalCalcul
    prixTotalCalcul.push(prixTotalPanier);
  }
}
recupPrice();
// additionner les prix du tableau "prixTotalCalcul" avec la méthode.reduce
const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixTotalCalcul.reduce(reducer, 0);
// console.log(prixTotal);
const prixTotalCard = `<div id="products_total_value">Total: ${prixTotal} €</div>`;
// affichage HTML
affichageElement.insertAdjacentHTML("afterend", prixTotalCard);

// ----------------------------------formulaire de commande----------------------------

const inputs = document.querySelectorAll('input[type="text"]');
const form = document.querySelector("form");

let firstName, lastName, address, city, zipCode, email;
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
    errorDisplay("address", "le champ n'est pas valide");
    address = null;
  } else {
    errorDisplay("address", "", true);
    address = value;
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
    errorDisplay("zipCode", "Le Code postal doit être au format 99999");
    zipCode = null;
  } else {
    errorDisplay("zipCode", "", true);
    zipCode = value;
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
      case "address":
        adressChecker(e.target.value);
        break;
      case "city":
        cityChecker(e.target.value);
        break;
      case "email":
        emailChecker(e.target.value);
        break;
      case "zipCode":
        postalChecker(e.target.value);
        break;
      default:
        null;
    }
  });
});

// si le formulaire est valide

let productsOrder = [];
// productsOrder.push(copyOfLocalStorage);
copyOfLocalStorage.forEach(function (product) {
  productsOrder.push(product.id);

  // console.log(product);
});

form.addEventListener("submit", (e) => {
  //pour éviter que le form change de page automatiquement
  e.preventDefault();
  if (firstName && lastName && address && city && zipCode && email) {
    var order = {
      contact: {
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        zipCode: zipCode,
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
      // récupérer l'id de la response
      console.log(contenu.orderId);
      //mettre l'id et le prix dans le localStorage
      localStorage.setItem("responseId", contenu.orderId);
      localStorage.setItem("prixTotal", JSON.stringify(prixTotal));
      // changement de page, direction page de confirmation
      window.location = "order.html";
    } catch (e) {
      console.log(e);
      alert(`erreur ${e}`);
    }
  });
});

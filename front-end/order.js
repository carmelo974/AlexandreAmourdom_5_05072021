//Récupérer l'id et le prix provenant du localStorage
const responseId = localStorage.getItem("responseId");
console.log(responseId);
const prixTotal = localStorage.getItem("prixTotal");
console.log(prixTotal);

//Element du DOM pour affichage
const displayOrder = document.getElementById("confirmation_container");
console.log(displayOrder);
const orderConfirmation = `
                <div class="confirm">
                <p>Votre commande: ${responseId} a bien été prise en compte</p>
                <p>Le montant total est de ${prixTotal} €</p>
                <p> Orinoco vous remercie d'avoir passé commande &#128521;</p>
                </div>
`;
displayOrder.insertAdjacentHTML("afterbegin", orderConfirmation);

localStorage.clear();

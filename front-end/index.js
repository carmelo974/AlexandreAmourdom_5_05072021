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
  // cloneElt.getElementById("lenses_select").value = article.lenses;

  document.getElementById("container_products").appendChild(cloneElt);
}


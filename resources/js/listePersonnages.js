/**
 * @author Emmanuel Trudeau & Marc-Alexandre Bouchard
 */

/**
 * Créer un liste contenant les super-héros.
 *
 * @param {Object} characters
 */
function createListe(characters) {
  const body = document.getElementById('body');
  body.className = "bg-cyan-800 flex flex-col justify-center items-center my-5";
  const div = document.createElement('div');
  const ul = document.createElement('ul');
  ul.className = "list-group flex flex-col justify-center align-center ";
  const titre = document.createElement("h1");
  titre.className = "text-center text-2xl text-white font-bold";
  titre.textContent = "Super-Héros";

  characters.forEach((character) => {
    createItem(character, ul)
  })
  div.appendChild(titre);
  div.appendChild(ul);
  body.appendChild(div);
}

/**
 * Retourne un div contenant les information d'un super-hero
 *
 * @param {Object} character
 * @param {HTMLElement} ul
 */
function createItem(character, ul) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const name = document.createElement('h3');
  const realname = document.createElement('h3');

  name.textContent = character.name;
  realname.textContent = character.realname;
  div.className = "text-wrap";

  div.appendChild(name);
  div.appendChild(realname);

  li.className = "text-2xl m-2 font-bold text-white bg-orange-500 p-2 text-center";
  li.onclick = function () { showProducts(character.name); };

  li.appendChild(div);
  ul.appendChild(li);
}

/**
 * Fonction qui montre les montre produits reléis au super-héros.
 *
 * @param name Le nom du super-héros.
 * @returns {Promise<void>}
 */
async function showProducts(name) {
  if (document.getElementById('divProduits')) {
    document.getElementById('divProduits').remove();
  }
  const body = document.getElementById('body');
  const div = document.createElement('div');
  const produits = document.createElement('h1');
  div.id = 'divProduits';
  div.className = "flex flex-col";
  produits.textContent = "Produits";
  produits.className = "text-center text-2xl text-white font-bold mt-5";
  div.appendChild(produits);

  fetchProduits(name).then((produits) => {
    div.appendChild(createListeProduits(produits));

    body.appendChild(div);
  });
}

/**
 * Fonction qui fetch les produits avec un filtre.
 *
 * @param name Le nom du superhéros en guise de filtre.
 * @returns {Promise<*>}
 */
async function fetchProduits(name) {
  if (name.startsWith('The')) {
    name = name.replace('The ', '');
  }

  const query = `query Produits($filtre: String) {
    produits(filtre: $filtre) {
      description
      url
    }
  }`;

  const response = await fetch("http://localhost:4000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        filtre: name,
      },
    }),
  });

  const json = await response.json();

  return json.data.produits;
}

/**
 * Fonction qui crée la liste de produit d'un super-héros.
 *
 * @param produits Les produits du super-héros.
 * @returns {HTMLUListElement} La liste des produits.
 */
function createListeProduits(produits) {
  const ul = document.createElement("ul");
  ul.className = "list-group flex flex-col justify-center align-center w-full";
  if (produits.length === 0) {
    const noProduits = document.createElement("h2");
    noProduits.textContent = "Aucun produits reliés au super-héros...";
    noProduits.className = "text-2xl mt-5 font-bold text-white";
    ul.appendChild(noProduits);
    return ul;
  }

  produits.forEach(produit => {
    createProduit(produit, ul)
  })
  return ul;
}

/**
 * Fonction qui crée une balise de type li de produit.
 *
 * @param produit Le produit.
 * @param ul La liste à laquelle l'ajouter.
 */
function createProduit(produit, ul) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const description = document.createElement('h3');
  const urlH3 = document.createElement('h3');
  const url = document.createElement('a');

  description.textContent = produit.description;
  urlH3.textContent = produit.url;

  url.href = produit.url;
  url.className = "block";

  div.className = "text-wrap";
  div.appendChild(description);
  div.appendChild(urlH3);

  url.appendChild(div);

  li.className = "text-2xl m-2 font-bold text-white bg-red-500 p-2 text-center";

  li.appendChild(url);
  ul.appendChild(li);
}

export { createListe };

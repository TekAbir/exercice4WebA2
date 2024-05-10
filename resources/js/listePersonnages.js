/**
 * @author Emmanuel Trudeau & Marc-Alexandre Bouchard
 */

/**
 * Creer un liste contenant les super-heros
 * 
 * @param {Object} characters 
 */
function createListe(characters) {
  const body = document.getElementById('body');
  body.className = "bg-cyan-800 flex justify-center items-center";
  const ul = document.createElement('ul');
  ul.className = "list-group flex flex-col justify-center align-center w-10/12";
  characters.forEach((character) => {
    createItem(character, ul)
  })
  body.appendChild(ul);
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
  const id = document.createElement('h3');
  const name = document.createElement('h3');
  const realname = document.createElement('h3');

  id.textContent = character.id;
  name.textContent = character.name;
  realname.textContent = character.realname;
  div.className = "text-wrap";

  div.appendChild(id);
  div.appendChild(name);
  div.appendChild(realname);

  li.className = "text-2xl m-2 font-bold text-white bg-orange-500 p-2 text-center";
  li.onclick = function () { showProducts(character.name, ul); };

  li.appendChild(div);
  ul.appendChild(li);
}


async function showProducts(name, listePersonnage) {
  const body = document.getElementById('body');
  const div = document.createElement('div');
  div.className = "flex flex-col"
  listePersonnage.remove();

  fetchProduits(name).then((produits) => {
    div.appendChild(createListeProduits(produits));

    const button = document.createElement('button');
    button.textContent = 'Return';
    button.className = "bg-orange-500 rounded-2xl px-4 py-2 mt-5";
    button.onclick = () => {
      button.remove();
      div.remove();
      body.appendChild(listePersonnage);
    };

    div.appendChild(button);
    body.appendChild(div);
  });
}


async function fetchProduits(name) {
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

function createProduit(produit, ul) {
  const li = document.createElement('li');
  const div = document.createElement('div');
  const description = document.createElement('h3');
  const url = document.createElement('a');

  description.textContent = produit.description;
  url.textContent = produit.url;
  url.href = produit.url;
  div.className = "text-wrap";

  div.appendChild(description);
  div.appendChild(url);

  li.className = "text-2xl m-2 font-bold text-white bg-red-500 p-2 text-center";

  li.appendChild(div);
  ul.appendChild(li);
}

export { createListe };

import axios from "axios";

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

function showProducts(name, ul) {
  const body = document.getElementById('body');
  ul.remove();

  const query = `
  query Produits($filtre: String) {
    produits(filtre: $filtre) {
      description
      url
    }
  }`;

  const variables = { filtre: name };

  axios
    .get("http://localhost:4000", {
      params: {
        query: query,
        variables: variables
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => console.error(error));

  const button = document.createElement('button');
  button.textContent = 'Return';
  button.className = "bg-orange-500 rounded-2xl px-4 py-2";
  button.onclick = () => {
    button.remove();
    body.appendChild(ul);
  };

  body.appendChild(button);
}

export { createListe };

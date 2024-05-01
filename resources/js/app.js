import axios from "axios";

axios
  .get("http://localhost:3004/api/")
  .then((response) => {
    const body = document.getElementById('body');
    body.className = "bg-cyan-800 flex justify-center items-center";
    const ul = document.createElement('ul');
    ul.className = "list-group flex flex-col justify-center align-center w-10/12";
    response.data.forEach((character) => {
      if (character.name) {
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

        li.className = "text-2xl m-2 font-bold text-white bg-amber-400 p-2 text-center";
        li.appendChild(div);
        ul.appendChild(li);
      }
    })
    body.appendChild(ul);
  })
  .catch((error) => console.error(error));

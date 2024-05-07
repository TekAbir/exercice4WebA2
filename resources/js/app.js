import axios from "axios";
import {createListe} from "./listePersonnages";

axios
  .get("http://localhost:3001/api/")
  .then((response) => {
    createListe(response.data);
  })
  .catch((error) => console.error(error));

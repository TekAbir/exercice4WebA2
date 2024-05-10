/**
 * @author Emmanuel Trudeau & Marc-Alexandre Bouchard
 */

import axios from "axios";
import {createListe} from "./listePersonnages";

/**
 * Retourne la liste des super-heros
 */
axios
  .get("http://localhost:3001/api/")
  .then((response) => {
    createListe(response.data);
  })
  .catch((error) => console.error(error));

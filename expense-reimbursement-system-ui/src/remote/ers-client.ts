import axios from "axios";
import { environment } from "../environment";

//set up our base environment for our ers connection
export const ersClient = axios.create({
  baseURL: environment.ersBaseUrl, //the base network address with no URI's on
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

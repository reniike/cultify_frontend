import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/semicolon/cultify/v1/api",
});

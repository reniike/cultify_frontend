import axios from "axios";

export default axios.create({
  // baseURL: "https://cultify.onrender.com/semicolon/cultify/v1/api",
  baseURL: "http://localhost:8080/semicolon/cultify/v1/api",
});

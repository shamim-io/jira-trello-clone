import axios from "axios";
const instance = axios.create({
  baseURL: "https://shamim-jira.herokuapp.com/subscribers",
  //https://shamim-jira.herokuapp.com/subscribers
});

export default instance;

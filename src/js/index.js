import Vue from "vue";
//import axios from "axios";

import App from "../App.vue";
import "../scss/main.scss";

// const base = axios.create({
//   baseURL: ""
// });
// Vue.prototype.$http = base;

new Vue({
  el: "#app",
  render: h => h(App)
});

<template>
  <div class="app-container">
    <div class="card">
      <div v-if="!isLoading">
        <div v-if="isUser">
          <h2>
            Welcome
            {{userName}}
          </h2>
          <p>
            <a @click="toggle" class="link">View user data object</a>
          </p>
          <pre v-if="!isToggled">{{userData}}</pre>
          <button class="btn" id="logout" @click="signOut">Logout</button>
        </div>
        <button v-else class="sa_sign_in" id="login" @click="signIn"></button>
      </div>
      <div v-else>
        Loading...
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
          xml:space="preserve"
        >
          <path
            fill="#2e9ff2"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      kwsSdk: "",
      isUser: false,
      isToggled: true,
      isLoading: true,
      userName: "",
      userData: ""
    };
  },
  created() {
    this.kwsSdk = new KwsSdk({
      clientId: process.env.VUE_APP_CLIENT_ID,
      clubUrl: process.env.VUE_APP_SSO,
      kwsApiHost: process.env.VUE_APP_API_HOST,
      language: process.env.VUE_APP_LANGUAGE,
      implicit: true,
      crossDomain: true,
      callbackHost: process.env.VUE_APP_CALLBACK_HOST
    });
    // If the token exist
    if (window.localStorage.getItem("sa.kws.user.token")) {
      // Remove the token from the URL
      window.location.hash = "";
      // VM
      let vm = this;
      this.kwsSdk.app.user
        .get()
        .then(function(user) {
          vm.userData = JSON.stringify(user, null, 2);
          vm.isUser = true;
          vm.userName = user.username;
        })
        .catch(function() {
          console.log("Call failed. User is not authenticated");
          vm.isUser = false;
        })
        .finally(function() {
          vm.isLoading = false;
        });
    } else {
      this.isLoading = false;
    }
  },
  methods: {
    signIn: function() {
      this.kwsSdk.signIn();
    },
    signOut: function() {
      this.kwsSdk.signOut();
    },
    toggle: function() {
      this.isToggled = !this.isToggled;
    }
  }
};
</script>

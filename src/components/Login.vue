<template>
  <div class="Login">
    EMAIL:
    <input type="text" v-model="email" />
    <br />PASSWORD:
    <input type="password" v-model="password" />
    <br />
    <button @click="login">Login</button>
    {{ error }} <br />
    還沒註冊? <button @click="signup">Signup</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  methods: {
    login() {
      let user = {
        email: this.email,
        password: this.password
      };
      axios.post("http://localhost:5000/login", user).then(
        res => {
          // 成功的話
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/");
          }
        },
        err => {
          this.error = err.response.data.error;
          console.log(err.response);
        }
      );
    },
    signup() {
      this.$router.push("/signup");
    }
  }
};
</script>

<style scoped></style>

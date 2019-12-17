<template>
  <div>
    NAME:
    <input type="text" v-model="name" />
    <br />E-mail:
    <input type="text" v-model="email" />
    <br />Password:
    <input type="password" v-model="password" />
    <br />
    <button @click="signup">Signup</button>
    {{ error }}
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      consoleLog: "",
      error: ""
    };
  },
  methods: {
    signup() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      if (
        newUser.name === "" ||
        newUser.email === "" ||
        newUser.password === ""
      ) {
        alert("不得有資料為空");
      } else {
        axios
          .post("http://localhost:5000/signup", newUser)
          .then(res => {
            this.error = "";
            this.$router.push("/login");
            res;
          })
          .catch(err => {
            this.error = err.response.data.error;
          });
      }
    }
  }
};
</script>

<style scoped></style>

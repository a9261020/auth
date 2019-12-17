<template>
  <div class="Landing">
    <h1>Hello {{ name }}</h1>
    <h2>your email is {{ email }}</h2>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "landing",
  data() {
    return {
      name: "",
      email: ""
    };
  },
  created() {
    if (localStorage.getItem("token") === null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    axios
      .get("http://localhost:5000/user", {
        headers: { token: localStorage.getItem("token") }
      })
      .then(res => {
        this.name = res.data.user.name;
        this.email = res.data.user.email;
      });
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    }
  }
};
</script>

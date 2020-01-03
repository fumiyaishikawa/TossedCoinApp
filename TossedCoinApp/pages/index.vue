<template>
  <div class="container">
    <logo />
    <h1 class="title">ログイン画面</h1>
    <p>
      <label for="email">メールアドレス</label>
      <input type="text" id="email" v-model="email" />
    </p>
    <p>
      <label for="password">パスワード</label>
      <input type="text" id="password" v-model="password" />
    </p>
    <button @click="login">ログイン</button>
    <p>
      <nuxt-link to="/signup">新規登録はこちら</nuxt-link>
    </p>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";
import firebase from "~/plugins/firebase";

export default {
  components: {
    Logo
  },
  data() {
    return {
      email: this.email,
      password: this.password
    };
  },
  methods: {
    //ログイン処理
    login() {
      //FIrebaseAuthenticationを使ってemailとpasswordで認証
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          console.log("ログイン成功");
          this.$router.push("/dashboard");
        })
        .catch(error => {
          alert(error.message);
          return;
        });

      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style>
.container {
  width: 400px;
  margin: 100px auto;
  text-align: center;
}
h1 {
  margin-top: 50px;
}
button {
  margin-top: 30px;
}
</style>

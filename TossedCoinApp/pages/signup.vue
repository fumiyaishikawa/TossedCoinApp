<template>
  <div class="container">
    <logo />
    <h1 class="title">新規登録画面</h1>
    <p>
      <label for="name">ユーザ名</label>
      <input type="text" id="name" v-model="name" />
    </p>
    <p>
      <label for="email">メールアドレス</label>
      <input type="text" id="email" v-model="email" />
    </p>
    <p>
      <label for="password">パスワード</label>
      <input type="text" id="password" v-model="password" />
    </p>
    <button @click="signup">新規登録</button>
    <p>
      <nuxt-link to="/">ログインはこちら</nuxt-link>
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
      name: "",
      email: "",
      password: "",
      money: 1000
    };
  },
  methods: {
    //新規登録処理
    signup() {
      //FirebaseAuthenticationを使ってemailとpasswordで登録します
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/dashboard");
        })
        .catch(error => {
          alert(error.message);
        });

      firebase
        .firestore()
        .collection("users")
        .add({
          name: this.name,
          email: this.email,
          money: this.money
        });

      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

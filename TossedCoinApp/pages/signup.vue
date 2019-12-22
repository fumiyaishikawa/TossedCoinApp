<template>
  <div class="container">
    <logo />
    <h1 class="title">新規登録画面</h1>
    <p>
      <label for="name">ユーザ名</label>
      <input type="text" id="name" v-model="name" placeholder="UserName" />
    </p>
    <p>
      <label for="email">メールアドレス</label>
      <input type="text" id="email" v-model="email" placeholder="E-Mail Address" />
    </p>
    <p>
      <label for="password">パスワード</label>
      <input type="text" id="password" v-model="password" placeholder="Password" />
    </p>
    <button @click="signup">新規登録</button>
    <p>
      <nuxt-link to="/">ログインはこちら</nuxt-link>
    </p>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
  },
  data() {
    return {
      name: this.$store.state.name,
      email: this.$store.state.email,
      password: this.$store.state.password,
      givemoney: 1000 //新規登録時に付与するお金
    };
  },
  methods: {
    //新規登録処理
    signup() {
      this.$store.commit("signup", {
        name: this.name,
        email: this.email,
        password: this.password,
        givemoney: this.givemoney
      });
    }
  }
};
</script>

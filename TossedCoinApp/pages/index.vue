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
    <button>ログイン</button>
    <p>
      <nuxt-link to="/signup">新規登録はこちら</nuxt-link>
    </p>
  </div>
</template>

<script>
import Logo from "~/components/Logo.vue";

export default {
  components: {
    Logo
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

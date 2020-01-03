<template>
  <div class="container">
    <h2>ユーザーぺージ</h2>
    <p>
      <nuxt-link to="/">ログインはこちら</nuxt-link>
    </p>
    <p>
      <nuxt-link to="/signup">新規登録はこちら</nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  props: ["user"]
};
</script>

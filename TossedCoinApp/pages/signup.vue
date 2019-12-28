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
import firebase from "~/plugins/firebase";

export default {
  components: {
    Logo
  },
  data() {
    return {
      name: this.$store.state.name,
      email: this.email,
      password: this.password,
      givemoney: 1000 //新規登録時に付与するお金
    };
  },
  methods: {
    /*
     * 新規登録処理
     * 現状では新規登録できるけど、ログイン状態で新規登録するとuidのアップデートがうまくいかない
     * 問題：ログインユーザーと新規ユーザーのuidが一緒に更新されてしまう。
     * 対応：ログイン中は新規登録できないようにすればOK
     */
    signup() {
      /*
       * FirebaseAuthenticationを使ってemailとpasswordで登録
       * 正常に処理されればダッシュボードに遷移する
       */
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.push("/dashboard");
        })
        .catch(error => {
          alert(error.message);
        });

      /*
       * firestoreへのユーザーデータの保存処理
       * name, savingを保存後に更新処理でuidを保存する
       * uidはonAuthStateChanged内じゃないと使うことができないが、onAuthStateChangedの中だとthis.nameなどがうまく扱えないので二度手間だけど更新処理を追加している
       */
      firebase
        .firestore()
        .collection("users")
        .add({
          uid: null,
          username: this.name,
          saving: this.givemoney
        })
        .then(doc => {
          firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              firebase
                .firestore()
                .collection("users")
                .doc(doc.id)
                .update({
                  uid: firebase.auth().currentUser.uid
                });
            } else {
              // No user is signed in.
            }
          });
        });

      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

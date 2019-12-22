import firebase from '~/plugins/firebase'

export const state = () => ({
    //新規登録用
    name: "",
    email: "",
    password: "",
    saving: 0 //ユーザーの貯金
})

export const mutations = {
    signup(state, value) {
        //FirebaseAuthenticationを使ってemailとpasswordで登録する
        //問題なければダッシュボードに移動する
        firebase
            .auth()
            .createUserWithEmailAndPassword(value.email, value.password)
            .then(user => {
                this.$router.push("/dashboard");
            })
            .catch(error => {
                alert(error.message);
                return
            });
        //FirebaseAuthenticationによる認証が問題なければその他の情報をFirestoreに保存する
        //ユーザー認証後は認証用emailとストアのemailが一致したユーザーデータを受け取るようにする?
        //新規登録時に1000円お金をプレゼントしてsavingに保存
        firebase.firestore().collection('users').add({
            name: value.name,
            email: value.email,
            saving: value.givemoney
        });

        state.name = "";
        state.email = "";
        state.password = "";
        state.saving = "";
    }
}

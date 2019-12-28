import firebase from 'firebase'

//.envに記載したfirebaseの情報を記載
const config = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    databaseURL: process.env.FB_DATABASE_URL,
    projectId: process.env.FB_PROJECTID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APPID
}

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

export default firebase //~plugins/firebasesでどこからでも呼び出せる

import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA_ihfnWrpaPYQF8NQfhpgoI_0pJE5eFZs",
  authDomain: "omuro-musume-analyzer.firebaseapp.com",
  databaseURL: "https://omuro-musume-analyzer.firebaseio.com",
  projectId: "omuro-musume-analyzer",
  storageBucket: "omuro-musume-analyzer.appspot.com",
  messagingSenderId: "688414234368",
  appId: "1:688414234368:web:be8c19f5dcab95d72945e5"
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export async function getCharacter(id: string) {
  const result = await firebase.firestore().collection('character').doc(id).get()
  return result.exists ? result.data() : null
}

export async function submitAnnotation(data: {id,cute,active,adult,fat,chest,sadism,erotic,sentimental,leader,outdoor}) {
  await firebase.firestore().collection('annotation').add(data)
}

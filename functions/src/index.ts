import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

admin.initializeApp()
const store = admin.firestore()
const func = functions.region('asia-northeast1')

type Annotation = {
  id: string
  cute: number
  active: number
  adult: number
  fat: number
  chest: number
  sadism: number
  erotic: number
  sentimental: number
  leader: number
  outdoor: number
}

export const hello = func.https.onRequest((request, response) => {
  response.send(`hello!`)
})

export const onCreateAnnotationDoc = func.firestore.document('annotation/{id}').onCreate(async (snapshot, context) => {
  const characterId = snapshot.data().id
  const response = await store.collection('annotation').where('id', '==', characterId).get()
  const data: Annotation[] = []
  response.forEach((doc) => {
    data.push(doc.data() as Annotation)
  })
  const result = data.reduce((a, b) => ({
    id: characterId,
    cute: a.cute + b.cute,
    active: a.active + b.active,
    adult: a.adult + b.adult,
    fat: a.fat + b.fat,
    chest: a.chest + b.chest,
    sadism: a.sadism + b.sadism,
    erotic: a.erotic + b.erotic,
    sentimental: a.sentimental + b.sentimental,
    leader: a.leader + b.leader,
    outdoor: a.outdoor + b.outdoor,
  }))
  const average = {
    id: characterId,
    annotationCount: data.length,
    cute: result.cute / data.length,
    active: result.active / data.length,
    adult: result.adult / data.length,
    fat: result.fat / data.length,
    chest: result.chest / data.length,
    sadism: result.sadism / data.length,
    erotic: result.erotic / data.length,
    sentimental: result.sentimental / data.length,
    leader: result.leader / data.length,
    outdoor: result.outdoor / data.length,
  }
  await store.collection('annotationAverage').doc(characterId).set(average)
})

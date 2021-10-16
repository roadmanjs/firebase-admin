
<p align="center">
  <h1 align="center"> Roadman - <a href="https://firebase.google.com" target="_blank">Firebase Admin</a>   </h1>
</p>


## A roadman for firebase-admin.

### How to use
```
yarn add @roadmanjs/firebase-admin
```

app.ts
```ts
import {roadman} from 'roadman'
import {firebaseRoadman} from '@roadmanjs/firebase-admin';

await roadman({
  roadmen: [firebaseRoadman]
});
```

#### Env required
```sh
FIREBASE_SA= 
```

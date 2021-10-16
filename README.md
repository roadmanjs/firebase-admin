
<p align="center">
  <h1 align="center"> Roadman - <a href="https://couchset.org" target="_blank">CouchSet</a>   </h1>
</p>


<div align="center">

<img width="500px" src="./docs/couchset-roadman.jpg"></img>


</div>


## A roadman for couchbase using couchset.

### How to use
```
yarn add @roadmanjs/couchset
```

app.ts
```ts
import {roadman} from 'roadman'
import {couchsetRoadman} from '@roadmanjs/couchset';

await roadman({
  roadmen: [couchsetRoadman]
});
```

#### Env required
```sh
COUCHBASE_URL= 
COUCHBASE_BUCKET= 
COUCHBASE_USERNAME= 
COUCHBASE_PASSWORD=
```

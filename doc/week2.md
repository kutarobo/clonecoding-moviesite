### 9강

1. mongoos model schema 작성

   ```js
   const mongoose = require('mongoose');
   const Schema = mongoose.Schema;

   const 스키마이름 = mongoose.Schema(
     {
       userFrom: {
         // attribute 이름
         type: Schema.Types.ObjectId, // type
         ref: 'User',
       },
       movieId: {
         type: String,
       },
     },
     { timestamp: true }, // timestamp: true 일시 create 시간 자동생성.
   );

   // mongoose.model('모델명', 작성한 스키마)
   const Favorite = mongoose.model('Favorite', favoriteSchema);
   ```

   // todo mongoose schema 관련내용 찾아보자

2. react/destructuring-assignment 관련 내용 수정 [참고링크](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md)

   - 기존코드

     ```js
     const movieId = props.movieId; // movieInfo 를 여기서 미리할당
     const userFrom = props.userFrom;
     // fixme 아래 코드들이 해당 린트에 걸린다.
     const movieTitle = props.movieInfo.title;
     const moviePost = props.movieInfo.backdrop_path;
     const movieRunTime = props.movieInfo.runTime;
     ```

   - 수정된 코드

     ```js
     const { movieId, userFrom, movieInfo } = props; // movieInfo 를 여기서 미리할당 받아서 lint를 통과시킨다.
     const movieTitle = movieInfo.title;
     const moviePost = movieInfo.backdrop_path;
     const movieRunTime = movieInfo.runTime;
     ```

### 10강

1. favorite 서버설정

- routes 추가

  - `server/routes/추가할라우트파일.js`

  ```js
  // express의 router 사용
  const express = require('express');
  const router = express.Router();
  ...

  ...
  ```

- index에 routes 연결

  - server/index.js

  ```js
  app.use('/api/favorite', require('./routes/favorite')); // routes 경로를 매칭시켜준다
  ```

  - 이때 위 코드에서 경로를 매핑했기때문에 아래 코드의 api call을 할때에는 `'/api/favorite'`는 생략이 가능해졌다.

  ```js
  router.post('/favoriteNumber', (req, res) => {
  ```

### 11 강

### 12 강

### 13강

1. 상단 메뉴 그리기

- client/src/components/views/NavBar/Sections/LeftMenu.js

### todo

1. mongoos

- [쿼리 사용법](https://mongoosejs.com/docs/queries.html)
-

2. express 와 route

```js
// server index.js
const express = require('express');
const app = express();

app.use('/api/favorite', require('./routes/favorite')); // routes 경로를 매칭시켜준다
```

- express 기능.
- use 이외에 http 메서드인 get, post, put, patch, delete 도 사용하능.
  - 단 http 메서드를 사용할 경우 주소 이외에 http 메서드 까지 일치하는 요청일 경우 매핑된다.
    - ex) `app.post('/api/favorite', ....)` 일경우 주소가 `/api/favorite` 이면서 `post` 요청일 경우에만 매칭이 된다.

```js
// 위 express 에서 매핑된 server routes/favorite 파일
const express = require('express');
const router = express.Router();

router.post('/favorited', (req, res) => {
  // blabla
});

module.exports = router; // router 로 모듈생성
```

- router 객체는 express.Router()로 만들어짐
- router에도 app처럼 use, get, post, put, patch, delete 같은 메서드를 붙일 수 있다.
- use를 제외하고 각 http 메서드와 상응한다
- `app.use` 와 마찬가지로 하나의 `router` 에 여러개의 미들웨어를 장착할 수 있다.
  ```js
  router.get('/', middleware1, middleware2, middleware3);
  ```
- 특수 패턴

  ```js
  router.get('/users/:id', function (req, res) {
    console.log(req.params, req.query);
  });
  ```

  - `'/users/:id'` - :id 부분은 실제 url에서 `/users/`뒤에 오는 값을 치환한 값을 파마리터로 갖는다.
  - 예를들어 `/users/123` 일 경우 req.params.id 로 값 123을 조회할 수 있다.
  - `/users/123?limit=5&skip=10` 일경우 req.query 로 querystring을 읽어온다.
    - req.query {limut:'5', skip: '10'}
  - 패턴은 와일드 카드처럼 이용되기 때문에 일반 라우터를 방해하지않기 위해 더 나중에 위치시킨다.

- 자주사용하는 응답메서드

  - send

    - 버퍼 데이터나 문자열을 전송하거나,
    - HTML 코드를 전송하기도 하고,
    - JSON데이터도 전송할 수 있다.

  - sendFile

    - 파일전송

  - json
    - json 데이터를 전송
  - redirect
    - `res.redirect(주소)` 와 같은 방식으로 사용하고 다른 라우터로 응답을 보낸다
  - render
    - template 엔진을 랜더링 할 때 사용한다.
    - views 폴더 pug 확장자를 가진 파일들이 템플릿 엔진이다

3. 기능 개선

- 14강

  - [x] remove 버튼 클릭시 리플레시가 아니라 state를 건드려서 삭제시키자.
        [깃헙 링크](https://github.com/kutarobo/clonecoding-moviesite/pull/15/commits/6eec8b59cfb3a46e88c6465fb40578d8e22b3866)

4. 복습

- 유저페이지 만들어보기
  - 이름과 메일주소가져와서 뿌리기.
    [깃헙링크](https://github.com/kutarobo/clonecoding-moviesite/pull/15/commits/768eaaefb40145a60301f38fdc4d937ffd0f5720)

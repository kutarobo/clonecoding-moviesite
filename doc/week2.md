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

특별한 것 없음

### 12 강

1. todo

- favorite 버그
  - 강사가 만든 버튼은 페이지 로딩시 실제값을 가져오는 부분이 누락되어있다.
    - axios get 으로 정보 가져와서 버튼에 세팅하기.

### 13강

1. 상단 메뉴 그리기

- client/src/components/views/NavBar/Sections/LeftMenu.js

### todo

1. mongoos model schema
2. routes 공부
3. 기능 개선

- 12강
  - favorite 버그
  - 강사가 만든 버튼은 페이지 로딩시 실제값을 가져오는 부분이 누락되어있다.
    - axios get 으로 정보 가져와서 버튼에 세팅하기.

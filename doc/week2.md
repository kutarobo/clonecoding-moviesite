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

### 2강 
1. bolier-plate 세팅
2. 환경설정 파일세팅
    - 로컬 개발용 환경파일 추가 (server/dev.js)
3. 몽고디비 세팅
    - key 가 필요, 몽고db에 로그인해서 받을 수 있다. [mongodb.com](mongodb.com)
    - 로그인 -> 클러스터 생성
        - aws 및 region 선택
        - M0 (free tier) 선택
        - cluster name 지정 후 create cluster
        - connect your application
            - add user
            - add fire wall ip
            - key copy -> dev.js 복붙

### 3강
1. 클론 할 movie 사이트의 api를 사용하기 위한 설정
- api key 받기
    - themoviedb.org
    - 회원가입 및 로그인
    - 프로필>settings>api>request api key>click here> developer
    - url: localhost:3000
    -  api key v3 auth 복사해서 어딘가 저장해두기.

2. 자주사용할 api 상수 저장
- client/components/config.js 상수추가
    ```js  
    export const API_URL = 'https://api.themoviedb.org/3';
    export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
    ```



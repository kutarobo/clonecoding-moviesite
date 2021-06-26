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

---

### 3강

1. 클론 할 movie 사이트의 api를 사용하기 위한 설정

- api key 받기
  - themoviedb.org
  - 회원가입 및 로그인
  - 프로필>settings>api>request api key>click here> developer
  - url: localhost:3000
  - api key v3 auth 복사해서 어딘가 저장해두기.

2. 자주사용할 api 상수 저장

- client/components/config.js 상수추가
  ```js
  export const API_URL = 'https://api.themoviedb.org/3';
  export const IMAGE_BASE_URL = 'http://image.tmdb.org/t/p/';
  ```

npm 이슈.

- 예제자체의 버젼노후화
  - npm audit fix 사용.
- 글로벌쪽의 오래된 버젼의 패키지들이 꼬인상태
  - 글로벌의 node_modules를 제거 후 `npm install npm@latest -g` 를 하여 버젼을 변경함.

> ant Design 버젼에 따른 Icon 이슈
> [참고 블로그 링크 1](https://shinye0213.tistory.com/278) > [참고 블로그 링크 2](https://shinye0213.tistory.com/317)
> 요약.

1. `npm install @ant-design/icons --save-dev` 설치
2. 코드에서 import 시 사용할 아이콘자체를 임포트하여 컴포넌트로 사용한다

---

### 4강

1. MainImage component 만들기

   - LandingPage에서 api 호출
     - pros로 image url, title, overview 정보를 넘겨준다.
     - useState, useEffect 사용.

2. useState

   > Hooks가 제공하는 내장 API

   ```js
   import { useState } from 'react';

   const Example = () => {
     const [count, setCount] = useState(0);

     return (
       <div>
         <p>{`count: ${count}`}</p>
         <button onClick={() => setCount(count + 1)}>+</button>
       </div>
     );
   };

   export default Example;
   ```

   - useState

     - useState는 함수에 state를 제공합니다. initialState를 파라미터로 받고, state와 state를 변경할 setState 함수를 반환합니다.

   - useState가 반환하는 첫 번째 인자인 state와 두 번째 인자인 setState를 비구조화 할당 문법을 통해 count, setCount로 받아서 사용할 수 있게 됩니다.
   - setCount로 count state를 변경하면 렌더링이 다시 일어납니다.
   - Example은 함수이기 때문에, 렌더링 할 컴포넌트 대신에 값을 반환할 수도 있습니다.
     > [주의] use~는 Custom Hook의 naming rule입니다. 이 rule을 지키면 lint에서 hooks와 관련된 규칙들을 점검해줄 수 있기 때문에 따르는 것을 권장합니다.

3. useEffect

   > Hooks가 제공하는 내장 API

   - componentDidMount 등 클래스 컴포넌트에 제공되었던 Life Cycle API는 useEffect로 사용할 수 있다
   - Life Cycle API에서의 API 요청, DOM 조작 등이 side effect이기 때문에, useEffect라는 이름의 API가 됨
   - 클래스 컴포넌트에서의 componentDidMount, componentDidUpdate, componentWillUnmount가 useEffect로 실행

   ```js
   function useEffect(effect: EffectCallback, inputs?: InputIdentityList)
   ```

   - render가 발생할 때 마다 effect가 실행된다
     - componentDidMount: 초기
     - componentDUpdate: 매번
   - 두 번째 파라미터인 inputs를 통해 특정한 상태가 update 되었을 때만 effect가 실행되도록 설정할 수 있다

   ```js
   import { useState, useEffect } from 'react';

   export function Data() {
     const [data, setData] = useState(null);

     useEffect(() => {
       API.getData().then((response) => {
         setData(response);
       });
     }, []);

     const isLoading = data == null;
     if (isLoading) {
       return 'Loading..';
     }
     return data;
   }
   ```

   - 위 예제는 useEffect의 inputs에 빈 배열을 넘겨서 최초(componentDidMount)에만 실행되도록 함. (두번째 inputs 인자 생략시 무한로딩이 발생 할 수 있음)
   - useEffect는 여러 개 사용할 수 있기 때문에 각 state마다 정의해 줄 수도 있고, 예제처럼 최초에 실행되는 것만 정의해주어도 된다.

   <br>
   <br>

   ```js
   useEffect(() => {
     window.addEventListener('mousemove', logMousePosition);
     return () => {
       window.removeEventListener('mousemove', logMousePosition);
     };
   }, []);
   ```

   - useEffect로 componentWillUnmount 효과를 주는 예제
   - effect 함수의 return 값이 있는 경우 hook의 cleanup 함수로 인식하고 다음 effect가 실행되기 전에 실행해준다.
   - componentWillUnmount는 컴포넌트가 사라지기 전에 한 번만 실행했지만, cleanup 함수는 새로운 effect 실행 전에 매번 호출된다는 차이가 있다
   - 위 예제코드에서는 inputs로 빈 배열을 넘겨주었기 때문에 unmount 될 때 한 번만 실행된다

[휴먼스케이프 기술블로그 - 이소영님 포스팅 참고](https://medium.com/humanscape-tech/hooks-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-usestate-useeffect-811636d1035e)

---

### 5강

1. vscode 개발 팁
   > ES7 React/Redux/GraphQL/React-Native snippets 설치 > rfce 단축키 입력하면 아래와 같이 템플릿화 된 코드가 자동 완성된다.

```js
import React from 'react';

function GridCards() {
  return <div></div>;
}

export default GridCards;
```

2. React.Fragments

- React의 일반적인 패턴은 컴포넌트가 여러개의 요소를 반환하는 것입니다. Fragments를 사용하면 DOM에 별도 노드를 추가하지 않고 자식 목록을 그룹화할 수 있습니다.
  [참고 링크](https://reactjs-kr.firebaseapp.com/docs/fragments.html#short-syntax)

### 8강

1. 영화출연진들 가져오기 기능추가

- GridCard component 재활용
  - landingpage에 따른 if 분기로 화면 나눔
  - props에 따라 if로 새로그리는데 이게 좋은 방법일까?
    - 클린코드 관점에서 하나의 기능에 집중하지 못하는데 차라리 분리하는게 낫지않을까?
    - 이 강의는 클론코딩으로 구현하는것 자체에 초점이 맞춰져 있으므로 강의가 끝난 이후 리팩토링을 고민해보자.

2. 토글버튼에 이벤트를 주어 출연진 카드 토글

- useState로 토글상태를 관리하여 클릭시 반전시킨다.

  ```js
  const toggleActocView = () => {
    setActorToggle(!ActorToggle);
  };
  ```

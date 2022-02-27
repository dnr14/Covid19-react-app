<h2 align=center>COIVE19 프로젝트 📚</h2>

<p align=center> 📆 2021.07.24 ~ 2021.08.08</p>

<div align=center>
    <img src="https://img.shields.io/badge/17.0.2-React-61DAFB?style=flat&logo=react&logoColor=61DAFB"/>
    <img src="https://img.shields.io/badge/7.0.0-D3-F9A03C?style=flat&logo=D3.js&logoColor=F9A03C"/>
    <img src="https://img.shields.io/badge/5.2.0-React router dom-CA4245?style=flat&logo=react router&logoColor=CA4245"/>
    <img src="https://img.shields.io/badge/5.3.0-Styled components-DB7093?style=flat&logo=styled-components&logoColor=DB7093"/>
    <img src="https://img.shields.io/badge/4.17.1-Express-000000?style=flat&logo=Express&logoColor=000000"/>
</div>
<br>
<p align=center><img src=./client/src/assets/images/covid19.gif  width=60% /></p>
<p align=center> 🏠 <a href=http://www.react-covid19.p-e.kr>웹 페이지</a></p>
<p align=center> 💼 <a href=https://github.com/dnr14/covid19-react-app/wiki/%ED%99%94%EB%A9%B4-%EA%B5%AC%EC%84%B1-%EB%B0%8F-%EC%A3%BC%EC%9A%94-%EA%B8%B0%EB%8A%A5-%EC%84%A4%EB%AA%85> 화면 구성 및 주요 기능 설명</a></p>
<p align=center>

## 1. 프로젝트 살펴보기 🔎

### 🔥 개요

공공 API를 활용하여 코로나 진행 상황을 그래프로 볼 수 있으면 사용자에게 의미 있는 사이트를 제공 할 수 있을 거라 생각해서 진행하였습니다.

### 👨‍💻 주요 기능

- 메인 페이지
  - 사용자가 이용했을 때 제일 궁금해하는 현황을 핵심으로 보여줍니다.
- 통계 페이지
  - 주 페이지에서 볼 수 없는 현황과 사용자가 원하는 날짜를 선택해서 볼 수 있습니다.
- 공공 API에서 제공해주는 데이터를 그래프로 표현하여 쉽게 현황 파악이 가능합니다.

### 💻 기술 스택

- `React` : 웹UI 라이브러리
- `D3` : 코로나 데이터를 시각화하기 위해 사용
- `Styled-components` : css-in-js을 통해 컴포넌트 스타일을 관리하기 위해 사용했습니다.
- `Express` : 웹서버 개발을 위한 웹 프레임워크

 <br>

> #### ⚙ 프로젝트 실행 해보기

```ts
git clone https://github.com/dnr14/covid19-react-app.git
cd covid19-react-app
cd client npm build
cd server npm start
브라우저 localhost:5000 접속
```

<br>

> #### 📁 프로젝트 구조

```ts
-- client
├─assets
│  ├─images  // 리액트에 사용되는 이미지 모음
│  └─style   // styled-components 모음
├─components // 재사용되는 컴포넌트 모음
│  └─chart
├─hooks      // Custom hooks
└─util       // 유틸함수 모음

-- server
├─middlewares // http 요청을 로깅을 위한 미들웨어
└─router      // express 경로 router 모음

```

<br>

# 2. 배포 👨‍🔧

#### 배포 환경 그림

<img src=./client/src/assets/images/deploy.png  />

<br>

> #### 📜 배포 과정 설명

1. 개발이 완료된 `main branch`에서 deploy를 진행 합니다.
2. Amazon EC2에 접속하여 github에 있는 코드를 가져와서 배포를 진행했습니다.
3. 배포가 완료되고 사용자는 배포된 사이트([covid19 사이트](http://www.react-covid19.p-e.kr))를 접속합니다.

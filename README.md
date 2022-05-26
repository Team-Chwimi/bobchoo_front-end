<div align="center">
  <br />
  <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/logo.png" alt="밥추" width="100px" height="100px" />
  <br />
  <h1>밥추</h1>
  <br />
</div>

<br />

## 목차

1. [**서비스 소개**](#1)
2. [**기술 스택**](#2)
3. [**주요 기능**](#3)
4. [**화면 설계 내용**](#4)
5. [**ERD**](#5)
6. [**API 명세**](#6)
7. [**구현 결과**](#7)
8. [**구현 성과**](#8)
9. [**캐릭터 디자인**](#9)
10. [**개발 팀 소개**](#10)
11. [**Git 규칙**](#11)

<br />

<div id="1"></div>

## 💁 서비스 소개

**밥추** 서비스는 설문을 통해 또는 랜덤으로 식사 메뉴를 추천해주는 서비스입니다. 또한 현위치 주변에서 해당 메뉴를 파는 식당 목록을 제공합니다.  
**밥추** 서비스는 모바일 친화적인 웹사이트와 iOS, 안드로이드 앱으로 이용 가능합니다.

### 서비스 기획 배경

식사 메뉴를 고르지 못하는 사람들을 대신하여 선택하기 위해 기획했습니다.

### 사이트 링크

[**🔗 밥추 사이트**](https://bobchoo.site/)

> iOS와 안드로이드 앱은 현재 심사중입니다.

### 저장소 링크

[**🔗 백엔드 저장소**](https://github.com/Team-Chwimi/bobchoo_back-end)  
[**🔗 프론트엔드 저장소**](https://github.com/Team-Chwimi/bobchoo_front-end)  
[**🔗 iOS 저장소**](https://github.com/Team-Chwimi/bobchoo_ios)  
[**🔗 안드로이드 저장소**](https://github.com/Team-Chwimi/bobchoo_android)

### 노션 링크

[**🔗 서비스 노션 링크**](https://chwimi.notion.site/0c2ceb824f3c48d2a77e595a1b3b66ad)

<br />

<div id="2"></div>

## 🛠 기술 스택

### **기술 스택**

<img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/tech_stack.png" alt="tech_stack" width="900px"/>

### **서비스 구성도**

<img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/technical_architecture.png" alt="technical_architecture" width="500px" />

<br />

<div id="3"></div>

## 💡 주요 기능

### 식사 메뉴 추천

설문 또는 랜덤으로 식사 메뉴 추천

### 식당 지도 제공

해당 메뉴를 파는 식당 목록과 경로 제공

<br />

<div id="4"></div>

## 💻 화면 설계 내용

|          [Figma](https://www.figma.com/file/xwVM8exgzfoKCq5dmpims5/%EC%B7%A8%EB%AF%B8%ED%8C%80?node-id=0%3A1)          |
| :--------------------------------------------------------------------------------------------------------------------: |
|                                                         모바일                                                         |
| <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/figma.png" alt="Figma" width="900px"/> |

<br />

<div id="5"></div>

## 🗄️ ERD

<img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/erd.png" alt="ERD" width="900px"/>

<br />

<div id="6"></div>

## 📋 API 명세

[**🔗 API 명세 상세보기**](https://chwimi.notion.site/API-be1207b0c6c5411e8c4e9b11ac4d982a)  
[**🔗 스웨거 링크**](https://bobchoo.site/api/v1/swagger-ui/)

<br />

<div id="7"></div>

## 🎨 구현 결과

### PC

- 메인 페이지
- 설문 화면 및 결과
- 랜덤 화면 및 결과
- 지도

### iOS

### Android

<br />

<div id="8"></div>

## 🌟 구현 성과

### 백엔드

- JMeter 부하테스트

  - 조건
    - 1초 동안 동시접속자
    - POST API 5회/1명
  - PC 사양
    - CPU : Ryzen 2600X
    - RAM : 16G GPU
    - GTX1060 6G

  | <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/jmeter_test1.png" alt="jmeter_test1" width="700px"/>
  | :-------------------------------------------------------------------------------------------------------: |
  | 동시 접속자 수 : 10000명 |
  | 걸린 시간 : 1분 25초 |

  | <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/jmeter_test2.png" alt="jmeter_test2" width="700px"/> |
  | :----------------------------------------------------------------------------------------------------------------------------------: |
  |                                                       동시 접속자 수 : 15000명                                                       |
  |                                                         걸린 시간 : 2분 24초                                                         |

### 프론트엔드

- lighthouse로 성능테스트
  | SEO 100점 |
  | :-------------------------------------------------------------------------------------------------------: |
  | <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/lighthouse_seo.png" alt="lighthouse_seo" width="600px"/>

<br />

<div id="9"></div>

## 🐷 캐릭터 디자인

### 밥돌이 (밥추의 마스코트)

(디자인 : [이아영](https://github.com/dgh03207))

|                                                             나쵸 먹는 밥돌이                                                              |                                                              당근 먹는 밥돌이                                                              |
| :---------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/bobdol_nacho.gif" alt="나쵸 먹는 밥돌이" height="300px"/> | <img src="https://github.com/Team-Chwimi/bobchoo_docs/blob/master/readme_assets/bobdol_carrot.gif" alt="당근 먹는 밥돌이" height="300px"/> |

<br />

<div id="10"></div>

## 👪 개발 팀 소개

### 취미팀(就美팀)

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/anottrx" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/59449215?v=4" alt="구련아 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/eunyeong1113" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/59558623?v=4" alt="이은영 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/choymoon" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/27428109?v=4" alt="조용문 프로필" />
      </a>
    </td>
     <td align="center" width="150px">
      <a href="https://github.com/dgh03207" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/58917737?v=4" alt="이아영 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/DeerGum" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/47655983?v=4" alt="황정준 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/anottrx" target="_blank">
        구련아
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/eunyeong1113" target="_blank">
        이은영
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/choymoon" target="_blank">
        조용문
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/dgh03207" target="_blank">
        이아영
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/DeerGum" target="_blank">
        황정준
      </a>
    </td>
  </tr>
   <tr>
    <td align="center">
        Front-end
    </td>
    <td align="center">
        Front-end
    </td>
    <td align="center">
        iOS
    </td>
    <td align="center">
        Back-end
    </td>
    <td align="center">
        Back-end<br />Android
    </td>
  </tr>
</table>

<br />

<div id="11"></div>

## 📌 Git 규칙

### Git Convention

```
Feat : 새로운 기능을 추가할 경우
Fix : 버그를 고친 경우
Hotfix : 급하게 치명적인 버그를 고쳐야하는 경우
Design : CSS 등 사용자 UI 디자인 변경
Style : 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우
Modify : 단순한 코드 수정
Delete : 삭제한 코드 설명
Remove : 파일을 삭제하는 작업만 수행한 경우
Comment: 필요한 주석 추가 및 변경
Docs : 문서를 수정한 경우
Test : 테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)
Chore : 빌드 태스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)
Refactor : 코드 리팩토링 경우
Rename : 파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우
Merge : to ← from (#1)
Merge : 변경된 내용 작성
```

> Tag : 커밋 내용에 대한 설명

> 커밋 내용에 대한 설명은 간결하면서도 그 설명만 보고도 어떠한 커밋인지 추측할 수 있을 정도로 작성

### 예시

```
Feat : 설문 질문 조회 API 구현
Design : 설문 페이지 마크업 및 스타일링 구현
Refactor : 설문 질문 조회 API 코드 리팩터링
Merge : develop ← feature/map
Remove : Map 파일 삭제
```

### 브랜치 전략

```
master : 제품으로 출시될 수 있는 브랜치
develop : 다음 출시 버전을 개발하는 브랜치
feature : 기능을 개발하는 브랜치
release : 이번 출시 버전을 준비하는 브랜치
hotfix : 출시 버전에서 발생한 버그를 수정 하는 브랜치
```

### 예시

```
master
release-1.0.0
develop
feature/map
```

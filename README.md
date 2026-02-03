# MODO

## 🏠 배포 주소 

https://modo-phi.vercel.app/

### Test 계정
- ID : admin@modo.com
- pw : admin123

---


## 📌 프로젝트 개요 

이 프로젝트는 리빙 카테고리 기반 쇼핑몰을 가정하여 제작한 커머스 웹 애플리케이션입니다.

상품 탐색, 장바구니, 좋아요, 체크아웃, 리뷰 작성까지 실제 서비스에 필요한 핵심 쇼핑 플로우를 직접 구현한 개인 프로젝트입니다.

디자인과 프론트엔드/ 백엔드를 설계히였으며, 모바일과 데스크탑 환경에 대응하는 반응형 UI로 구현하였습니다.

---

## 🌟 주요 기능

### 회원 인증
- 로그인 및 로그아웃
- Access Token 메모리 저장
- Refresh Token HttpOnly 쿠키 저장
- 토큰 만료 시 자동 갱신 처리

<img width="1728" height="988" alt="Image" src="https://github.com/user-attachments/assets/16f50648-efbc-4999-8c4e-f41f10af2f94" />

<img width="1727" height="986" alt="Image" src="https://github.com/user-attachments/assets/994bea39-4ade-41f1-a2a1-79217792cb5c" />


### 상품
- 홈 화면 상품 섹션 구성
- 상품 목록 및 상세 조회
- 카테고리 기반 필터링
- 가격순 필터링
- 구매 상품 리뷰 작성 및 삭제

<img width="1728" height="989" alt="Image" src="https://github.com/user-attachments/assets/9d833125-226c-4178-ad3e-281c6890498b" />

<img width="1728" height="988" alt="Image" src="https://github.com/user-attachments/assets/af920d58-82ba-4fac-86ee-1b2bf03a4285" />

<img width="1728" height="983" alt="Image" src="https://github.com/user-attachments/assets/5f669f84-fe7c-4aaa-b9d1-0e888ee3f8c0" />

<img width="1728" height="986" alt="Image" src="https://github.com/user-attachments/assets/6c4ad463-981b-44ba-9113-1d7cf8a51fb4" />


### 검색
- 상품 검색 및 조회
- 최근 검색어 저장

<img width="1728" height="986" alt="Image" src="https://github.com/user-attachments/assets/e5427309-e4d6-4bb7-9078-883bb28e8462" />

<img width="1728" height="988" alt="Image" src="https://github.com/user-attachments/assets/77f09852-2734-415e-9470-0c1265e14dd3" />


### 장바구니
- 상품 추가 및 수량 변경
- 선택한 상품 장바구니에서 제거
- 바로구매 플로우와 일반 장바구니 상태 분리 관리
  
<img width="1728" height="984" alt="Image" src="https://github.com/user-attachments/assets/74423d76-15a4-4317-a10d-a8dac7b04220" />

### 좋아요
- 좋아요 추가 및 해제
- 좋아요 목록 페이지
  
<img width="1728" height="977" alt="Image" src="https://github.com/user-attachments/assets/fe2e1690-fd24-427d-9513-a93f97bc4702" />
  

### 체크아웃
- 구매 상품 체크아웃
  
<img width="1728" height="983" alt="Image" src="https://github.com/user-attachments/assets/20030c41-8d4d-4f7c-9e0e-a81cea7c5ff5" />

<img width="1727" height="985" alt="Image" src="https://github.com/user-attachments/assets/1b187ce9-64e7-49a6-a749-4111092fca2f" />


### 마이페이지
- 사용자 주문 내역 조회
- 사용자가 작성한 리뷰 내역 확인

<img width="1728" height="981" alt="Image" src="https://github.com/user-attachments/assets/29c0aebe-5f3d-4ff3-8ce3-6595c0eaccfb" />

<img width="1728" height="981" alt="Image" src="https://github.com/user-attachments/assets/94d8aafe-b0cc-46e7-90c8-a9d0b374f968" />


### 공통 UI
- 페이지 상태에 따른 헤더 조건부 렌더링
- 모바일·데스크탑 환경 대응 반응형 레이아웃
- CLS 최소화를 고려한 고정 비율 이미지 레이아웃
- 홈 화면 상단 및 하단 배너를 통한 CTA 유도 및 사용자 동선 설계

<img width="374" height="981" alt="Image" src="https://github.com/user-attachments/assets/ba9d5a5e-cc13-4de5-8936-53d95e9bb558" />

<img width="377" height="987" alt="Image" src="https://github.com/user-attachments/assets/65411760-9e1e-4342-8811-08394a4e838e" />

---

## ⚒️ 기술 스택

### 프론트엔드
- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand

### 백엔드
- Next.js API Routes 기반 서버 구현
- Prisma ORM
- PostgreSQL (Neon Serverless Database)

### 기타
- JWT 기반 인증
- REST API

---

## 🗂️ 프로젝트 구조

/app
- components
- app router 기반 페이지
- store
- api
- constants
- lib
- types

/prisma
- schema
- seed

---

## 🌱 고민했던 부분 

### 1. Header 카테고리 데이터 패칭 Client → Server Component 전환
- 초기: Header 카테고리 데이터를 Client Component에서 fetch
  - 초기 JS 번들 증가
  - Header 렌더링 지연
  - 불필요한 클라이언트 fetch 발생
- 해결:
  - 카테고리 조회 로직을 서버 함수로 분리
  - Header를 Server Component로 유지
  - 페이지 진입 시 서버에서 카테고리 미리 패칭
    
```ts
const categories = await getHeaderCategories();
<Header categories={categories} />
```

- 결과:
  - 클라이언트 JS 감소
  - 초기 렌더 타이밍 개선
  - Lighthouse Performance +7점 상승


### 2. Server Component 중심의 초기 렌더링 구조 개선
- 해결:
  - 홈 페이지를 Server Component로 유지
  - 상품 데이터(NEW, TREND) 서버에서 병렬 패칭

```ts
const [newProducts, trendProducts] = await Promise.all([
  getProductsByType("new", 4),
  getProductsByType("trend", 8),
]);
```

- 결과:
  - 초기 클라이언트 fetch 제거
  - JS 실행 시간 감소
  - LCP 안정화

### 3. LCP 이미지 최적화 기준 정립
- 해결:
  - Hero 영역 이미지: next/image + priority
  - 하단 배너 영역: 초기 뷰포트 밖 → lazy loading 필요 없음

- 결과: LCP 및 초기 렌더 경로 안정화
  

### 4.이미지 레이아웃 안정화
- 해결 : 이미지 로딩 과정에서 발생하는 레이아웃 시프트(CLS)를 줄이기 위해 고정 비율 레이아웃 적용


### 5. 최종 성과
- 개발 서버: 70점대
- 프로덕션 빌드: Performance 90~91점
- Header 렌더링 개선
- LCP 안정화
- JS 실행 시간 감소
- 불필요한 클라이언트 fetch 제거




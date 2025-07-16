# Changelog

All notable changes to this project will be documented in this file.

## [0.0.6] - 2025-07-16

### 🐛 Bug Fixes

- `package.json`에 `activationEvents` 등록하지 않아 확장앱이 실행되지 않던 오류 해결
- 기타 최적화(라고 쓰고 삽질이라 읽는다)

## [0.0.5] - 2025-07-16

### ✨ Features

- `TransferEncoder` 페이지에 **역변환 기능(decode)** 추가
  - Bytecode 입력 시 from, to, amount 추출
- 공통 레이아웃 컴포넌트 `Layout.svelte` 도입
  - 페이지마다 반복되던 구조 제거, `<slot />` 기반 삽입 방식 사용
- 글로벌 CSS(`global.css`) 도입 및 전체 스타일 정리
  - `.layout`, `.box`, `.center-button`, `.error-message` 등 공통 클래스로 정리

### 💄 UI 개선

- 주소 변환 페이지(`AddressToHex`)와 트랜스퍼 인코더(`TransferEncoder`)의 **레이아웃 통일**
- 가운데 변환 버튼 높이를 좌우 입력박스 높이에 맞춰 정렬 (`min-height` 사용)
- `textarea`를 사용하여 주소 및 bytecode 시인성 개선
- 에러 메시지(`error-message`)를 레이아웃 밖으로 위치시켜 구조 분리 및 시각적 일관성 확보

### 🐛 Bug Fixes

- `Interface.encodeFunctionData` 사용 시 `0x` 자동 제거 처리
- `ethers.Interface`에서 발생하던 invalid address 오류 해결
  - `tronAddressToEthHex` 유틸 함수로 주소 포맷 변환 처리
- `<textarea />` 자가 닫힘 태그 → `<textarea></textarea>`로 수정 (Svelte 경고 제거)

---

## [0.0.4] - 2025-07-16

### Added

- 단축키 추가 (ctrl+shift+z)
- VS Code 확장 기능 정상 작동 버전 배포
- Svelte WebView에서 주소 변환(AddressToHex) 및 TransferEncoder 메뉴 완성
- TRC20 `transferFrom(address,address,uint256)` ABI 인코딩 기능 UI 연동
- Svelte 앱 내 route 전환 및 메뉴별 초기 상태 관리 개선
- USDT Smart Contract 전송 파라미터 인코딩 유틸리티 추가

### Fixed

- WebView 초기 진입 시 공백 상태에서 첫 메뉴 자동 로드
- 잘못된 import/export 오류: `"exports is not defined in ES module scope"` 해결
- 빌드 시 `extension.js` 누락 문제 해결 (`outDir` 설정 조정 및 `.vscodeignore` 수정)

---

## [0.0.3] - 2025-07-15

### Added

- `src/webview`에 SvelteKit 프로젝트 통합
- Vite 기반 WebView 번들링 (`vite.config.ts`에 `public/build` 출력 설정)
- WebView UI에 TRC20 인코딩 화면 구성
- VS Code 명령어 `tron-tools.open`으로 WebView 열기

### Changed

- 프로젝트 디렉터리 구조 통일 (`src/extension`, `src/webview` 등)
- WebView용 정적 파일 VS Code 확장에서 참조 가능하도록 수정

---

## [0.0.2] - 2025-07-15

### Fixed

- 마켓 등록 테스트
- 화면 UI 조정

---

## [0.0.1] - 2025-07-15

### Initial Release

- 프로젝트 초기 구조 구성
- TRC20 `transferFrom` 함수 정의 및 ABI 파라미터 수동 인코딩 기능
- TronWeb 초기 연동 테스트 (address, hex, ABI utils 등)
- 기본적인 tsconfig 및 extension activate 함수 구현

---

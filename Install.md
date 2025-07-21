# tron-tools

tron-tools

## Reriement Tools

| 항목            | 선택                      |
| ------------- | ----------------------- |
| **언어**        | ✅ TypeScript            |
| **UI**        | ✅ Svelte                |
| **빌드 도구**     | ✅ Vite                  |
| **ABI 라이브러리** | ✅ Ethers.js or TronWeb  |
| **통신 방식**     | ✅ WebView `postMessage` |

## 확장 로직

| 역할           | 기술 스택                   | 설명                                     |
| -------------- | --------------------------- | ---------------------------------------- |
| 🧠 확장 로직   | TypeScript                  | 명령 등록, WebView 창 띄우기 등          |
| 🎨 UI (웹뷰)   | Svelte (with Vite)          | 빠른 빌드, 간결한 코드, 재사용성         |
| 📦 번들링 도구 | Vite                        | Svelte 앱을 빠르게 WebView용 JS로 번들링 |
| 📜 ABI 처리    | Ethers.js 또는 TronWeb      | ABI 인코딩, 주소 처리                    |
| 🔌 통신        | `postMessage` (WebView API) | WebView <-> Extension 간 메시지 통신     |

### Information Archture

```sh
tron-tools/
├── images                     # 확장 이미지 등
├── LICENSE
├── media                      # VS Code 확장용 아이콘
├── public                     # 정적 파일
├── package.json
├── package-lock.json
├── svelte.config.js
├── tsconfig*.json             # TS 설정 파일 (Webview/Extension 분리됨)
├── vite.config.ts            # WebView용 Vite 설정
├── src/
│   ├── extension.ts          # VS Code 확장 진입점
│   ├── main.ts               # 아마도 Svelte WebView 진입점
│   ├── app.css
│   ├── vite-env.d.ts
│   ├── assets/               # 아이콘 등 정적 에셋
│   └── webview/              # 실제 WebView 구조
│       ├── App.svelte
│       ├── index.html
│       ├── main.ts
│       ├── vscode.d.ts       # VS Code ↔ Webview 통신용 타입
│       ├── store.ts          # 전역 상태관리
│       ├── styles/global.css
│       ├── components/       # 공통 UI 컴포넌트
│       │   ├── Layout.svelte
│       │   └── Menu.svelte
│       └── pages/            # 주요 기능 페이지들
│           ├── AddressToHex.svelte
│           ├── ResourceStatus.svelte
│           └── TransferEncoder.svelte
```

## Install svelte + Vite

```sh
npm create vite@latest . -- --template svelte-ts
npm install
```

## VS Code ExtentionApp prepared

```sh
mkdir -p src/webview
mkdir -p public/build
npm run build
npm run package
#code --install-extension tron-tools-0.0.1.vsix
#Ctrl+Shift+P → Open TRON Tools Panel 실행
#삭제 및 재설치
#code --uninstall-extension miniaslee.tron-tools
#code --install-extension tron-tools-0.0.2.vsix
```

### dist

```sh
dist
└── extension
    ├── icon.png             ← 주 아이콘 (256x256 PNG)
    ├── src
    │   ├── extension.d.ts
    │   └── extension.js
    └── tsconfig.extension.tsbuildinfo
```

### npm run package

```sh
tron-tools-0.0.1.vsix
├─ [Content_Types].xml
├─ extension.vsixmanifest
└─ extension/
   ├─ LICENSE.txt [1.04 KB]
   ├─ index.html [0.36 KB]
   ├─ package.json [1.24 KB]
   ├─ readme.md
   ├─ svelte.config.js [0.34 KB]
   ├─ tsconfig.webview.json [0.34 KB]
   ├─ dist/
   │  └─ extension/
   │     ├─ icon.png [5.85 KB]
   │     └─ tsconfig.extension.tsbuildinfo [28.25 KB]
   └─ public/
      └─ build/
         ├─ bundle.js [84.38 KB]
         └─ index.html [0.26 KB]
```

## Function List

| 메소드            | 입력 필드            |
| -------------- | ---------------- |
| `transferFrom` | from, to, amount |
| `transfer`     | to, amount       |
| `approve`      | spender, amount  |
| `allowance`    | owner, spender   |
| `balanceOf`    | owner            |
| `totalSupply`  |                  |

## reference url

- <https://apilist.tronscanapi.com/api/contract/analysis?address=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t&type=2&start_timestamp=1752537600000&end_timestamp=1752623999000>
- <https://tronscan.org/#/tools/advanced-filter?type=tx&secondType=5&times=90d&fromAddress=TLdHstz3ZSudms9S6C9m1aTcLirqrpL3R7&relation=or&methodId=23b872dd&methodName=transferFrom>

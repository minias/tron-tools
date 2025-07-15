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

| 역할         | 기술 스택                       | 설명                             |
| ---------- | --------------------------- | ------------------------------ |
| 🧠 확장 로직   | TypeScript                  | 명령 등록, WebView 창 띄우기 등         |
| 🎨 UI (웹뷰) | Svelte (with Vite)          | 빠른 빌드, 간결한 코드, 재사용성            |
| 📦 번들링 도구  | Vite                        | Svelte 앱을 빠르게 WebView용 JS로 번들링 |
| 📜 ABI 처리  | Ethers.js 또는 TronWeb        | ABI 인코딩, 주소 처리                 |
| 🔌 통신      | `postMessage` (WebView API) | WebView <-> Extension 간 메시지 통신 |

### Information Archture

```sh
tron-tools/
├── src/
│   ├── extension.ts              # 확장 진입점 (VS Code 진입 파일)
│   └── webview/                   # Svelte UI 앱
│       ├── App.svelte            # Svelte 메인 컴포넌트
│       ├── store.ts
│       ├── main.ts               # Svelte 진입점
│       └── index.html            # 웹뷰용 HTML
│       └── pages/
│           ├── TransferEncoder.svelte
│           └── AddressToHex.svelte
├── public/
│   └── build/                    # Vite 빌드 결과물
│       └── bundle.js             # WebView에서 사용할 JS
├── .vscode/
│   └── launch.json               # 확장 디버깅 설정 (선택)
├── dist/
│   ├── extension/                # 컴파일된 확장 코드
│   └── webview/                  # 웹뷰 빌드 결과물 (vite에서 따로 생성됨)
├── tsconfig.json                 # TypeScript 설정
├── tsconfig.extension.json
├── tsconfig.webview.json
├── package.json                  # npm 스크립트 및 의존성
├── vite.config.ts                # Vite 빌드 설정
├── .gitignore
├── README.md
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

 DONE  Packaged: /Volumes/CTO/github.com/minias/tron-tools/tron-tools-0.0.1.vsix (12 files, 47.68 KB)
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

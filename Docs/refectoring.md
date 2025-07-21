# Refectoring

## 개선된 IA

```sh
tron-tools/
├── src/
│   ├── extension/                # VS Code 확장 진입점
│   │   └── extension.ts
│   ├── webview/                  # WebView(Svelte UI)
│   │   ├── main.ts
│   │   ├── App.svelte
│   │   ├── index.html
│   │   ├── styles/
│   │   ├── store.ts
│   │   ├── vscode.d.ts
│   │   ├── components/           # Layout, Menu 등 공용 컴포넌트
│   │   └── pages/                # 개별 기능 화면
│   │       ├── AddressToHex.svelte
│   │       ├── TransferEncoder.svelte
│   │       └── ResourceStatus.svelte
│   ├── domain/                   # 핵심 도메인 로직
│   │   ├── address.ts            # Tron 주소 변환 (hex <-> base58)
│   │   └── transfer.ts           # transfer 파라메터 encode
│   ├── usecase/                  # 유스케이스 계층
│   │   ├── convert-address.usecase.ts
│   │   └── encode-transfer.usecase.ts
│   ├── infra/                    # 외부 연동 로직 (tronweb 등)
│   │   └── tronweb.service.ts
│   ├── shared/                   # 유틸, 상수, 타입
│   │   ├── utils/
│   │   ├── constants/
│   │   └── types.ts
```

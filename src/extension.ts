// src/extension.ts
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
  // 1. WebView 명령 등록
  context.subscriptions.push(
    vscode.commands.registerCommand('tron-tools.open', () => {
      console.log('🚀 tron-tools.open 커맨드 실행됨');
      const panel = vscode.window.createWebviewPanel(
        'tronToolsWebview',
        'Tron Tools',
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'public', 'build'))]
        }
      );

      const bundlePath = vscode.Uri.file(
        path.join(context.extensionPath, 'public', 'build', 'bundle.js')
      );

      const bundleUri = panel.webview.asWebviewUri(bundlePath);

      panel.webview.html = getWebviewHtml(panel.webview, context.extensionUri);
    })
  );
  // 2. 상태 표시줄 아이콘 추가
  // const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
  // statusBarItem.text = '$(rocket) Tron Tools';
  // statusBarItem.tooltip = 'Tron Tools 열기';
  // statusBarItem.command = 'tron-tools.open';
  // statusBarItem.show();

  // context.subscriptions.push(statusBarItem);
  // 좌측 사이드바 트리뷰 등록
  const treeDataProvider = new DummyTreeProvider();
  const treeView = vscode.window.createTreeView('tronToolsPanel', {
    treeDataProvider
  });
  context.subscriptions.push(treeView);
}

export function deactivate() {}

class DummyTreeProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
  
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }
  getChildren(): vscode.TreeItem[] {
    const item = new vscode.TreeItem('트론툴즈', vscode.TreeItemCollapsibleState.None);
    item.command = {
      command: 'tron-tools.open',
      tooltip: 'Tron Tools 열기',
      title: '트론툴즈'
    };
    item.iconPath = new vscode.ThemeIcon('rocket'); // optional codicon
    return [item];
  }
}
function getWebviewHtml(webview: vscode.Webview, extensionUri: vscode.Uri) {
  const bundleUri = webview.asWebviewUri(
    vscode.Uri.joinPath(extensionUri, 'dist', 'bundle.js')
  );
  return `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tron Tools</title>
</head>
<body>
  <script src="${bundleUri}"></script>
</body>
</html>`;
}

##### VSCode添加至右键菜单

https://blog.csdn.net/assassinator_567/article/details/106719647

##### VSCode格式化配置

vscode-settings.json

```json
{
    "editor.minimap.maxColumn": 9999,
    "editor.wordWrapColumn": 9999,
    "editor.codeActionsOnSave": null,
    "[html]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "html.format.wrapLineLength": 9999,
    "terminal.integrated.shell.windows": "C:\\Windows\\System32\\cmd.exe",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "explorer.confirmDragAndDrop": false,
    "explorer.confirmDelete": false,
    "[json]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "javascript.updateImportsOnFileMove.enabled": "always",
    "editor.tabSize": 2,
    "git.autofetch": true,
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "window.zoomLevel": 0,
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "vscode_custom_css.imports": [
        "file:///C:/users/MyUsersName/synthwave84.css"
    ],
    "vscode_custom_css.policy": true,
    "update.enableWindowsBackgroundUpdates": true,
    "background.customImages": [
        "D:/pictures/pic3.jpg"
    ],
    "background.style": {
        "content": "''",
        "pointer-events": "none",
        "position": "absolute", //图片位置
        "width": "100%",
        "height": "100%",
        "z-index": "99999",
        "background.repeat": "repeat-Y",
        "background-size": "cover",
        "opacity": ".2" //透明度
    },
    "background.useFront": true,
    "background.useDefault": false,
    "glassit.alpha": 220,
    "editor.fontSize": 13,
    "angular.enable-experimental-ivy-prompt": false,
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[scss]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "[less]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    "workbench.editorAssociations": {
        "*.db": "default"
    },
    "security.workspace.trust.untrustedFiles": "open",
    "todo-tree.general.tags": [
        "BUG",
        "HACK",
        "FIXME",
        "TODO",
        "XXX",
        "[ ]",
        "[x]"
    ],
    "todo-tree.regex.regex": "(//|#|<!--|;|/\\*|^|^\\s*(-|\\d+.))\\s*($TAGS)",
    "editor.suggestSelection": "first",
    "vsintellicode.modify.editor.suggestSelection": "automaticallyOverrodeDefaultValue",
    "[css]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    }
}
```


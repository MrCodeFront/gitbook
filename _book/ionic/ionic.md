# ionic（移动端UI）

---

官网地址：[https://ionicframework.com/](https://ionicframework.com/)

兼容 ios|android(md) 系统

##### 安装

```bash
npm install -g @ionic/cli
```

##### 创建项目

```bash
ionic start --list
ionic start 项目名称
ionic start 项目名称 blank
ionic start 项目名称 tabs --cordova
ionic start 项目名称 tabs --capacitor
ionic start 项目名称 super --type=ionic-angular
ionic start 项目名称 blank --type=ionic1
```

##### 路由返回并销毁页面

```typescript
import { NavController } from '@ionic/angular';

constructor(){
    public navController: NavController,
}
    
/** 返回 */
back() {
	this.navController.navigateBack('home');
}
```

```html
<ion-button color="light" (click)="back()">
	<ion-icon name="chevron-back"></ion-icon>
</ion-button>
```

##### 页面创建

```typescript
// 非app路径下，无法生成module且无法合并到指定的module
ionic g page 页面路径 -m app
// app路径下，自动创建module
ionic g page 页面路径
```


# Overlay 遮罩

---

参考：

[https://zhuanlan.zhihu.com/p/146943731](https://zhuanlan.zhihu.com/p/146943731)

github：[https://github.com/angular/components/tree/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay](https://github.com/angular/components/tree/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay)



### OverlayContainer

[OverlayContainer](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/overlay-container.ts) 在 body 元素的最后创建了一个元素，用于包裹全部的浮层元素。之后我们会称该元素为 container element。

```html
<div class="cdk-overlay-container"></div>
```

该元素会在 `getContainerElement` 方法第一次被调用的时候创建（惰性实例化）。

注意这个服务是全局的。

### Overlay

[Overlay](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/overlay.ts) 是一个服务，通过它的 [create](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay.ts%23L66-L76) 方法可以创建一个新的浮层，这个过程中主要做了以下几件事：

1. 创建一个 host element 和一个 pane element，然后将 pane element 作为 `PortalOutlet` 的挂载点，而这里 `PortalOutlet` 的类型就是我在之前一篇文章中讲过的 `DomPortalOutlet`，它将会被用来挂在组件内容。
2. 创建一个 `OverlayConfig` 对象，`OverlayConfig` 的构造方法仅仅是把 plain object 上面的非 `undefined` 属性转移到新创建的 `OverlayConfig` 对象上。
3. 创建一个 `OverlayRef` 并返回，值得注意的是第一步中创建的 `PortalOutlet` 会被传递给 `OverlayRef` 的构造方法。

`OverlayRef` 类非常重要，它负责了浮层机制的绝大部分逻辑，并且是暴露给组件开发者操纵浮层的接口对象。

### OverlayRef

[OverlayRef](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L65-L82) 的构造方法确定了该浮层的 scroll strategy 和 position strategy，这部分我们之后来谈。

组件开发者在新创建的浮层上添加组件时，应该调用 OverlayRef 的 [attach 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L103-L171)，参数应该是一个 `Portal` 对象。这个方法做了如下几件事情：

1. 将 `Portal` attach 到 `DomPortalOutlet` 上，这一步会动态创建组件开发者定义的内容
2. 启用 position strategy
3. 通过 [_updateStackingOrder 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L421-L425)更新 host element 在 container element 中的位置，最新创建的浮层应该在 DOM 树的最上方
4. 通过 _updateElementSize 方法更新 pane element 元素的样式
5. 启用 scroll strategy
6. 在 Angular zone 稳定之后（一般是组件 DOM 已经创建）调整浮层的位置
7. 打开浮层的鼠标事件支持
8. 根据配置创建 backdrop（之后再讲）
9. 根据配置修改 pane element 的 CSS 类
10. 派发 attach 事件
11. 将自己注册到 `KeyboardDispatcher` 中（之后再讲）

OverlayRef 类还有以下几个重要的方法：

- [detach](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L173-L213)，卸载当前浮层添加的组件。
- [dispose](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L215-L244)，销毁当前浮层。

### PositionStrategy

`attach` 方法的第二步是启用 position strategy，这里我们先来讲解比较简单的 `GlobalPositionStrategy`，也是 BottomSheet 组件所使用的。

> position strategy 就是定位策略，提供了一组定位浮层内元素的方法。

[GlobalPositionStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/position/global-position-strategy.ts) 实现了 [PositionStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/position/position-strategy.ts%23L12-L24) 接口，用户也可以通过实现该接口自定义一个 position strategy。

[attach 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/position/global-position-strategy.ts%23L35-L50)在浮层启用 position strategy 时被调用。对于 `GlobalPositionStrategy` 而言，主要是对 host element 增加了 `cdk-global-overlay-wrapper` CSS 类。

```scss
.cdk-global-overlay-wrapper {
  display: flex;
  position: absolute;
  z-index: 1000;
  pointer-events: none;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
```

[apply 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/position/global-position-strategy.ts%23L152-L193)在需要调整浮层元素位置时被调用。该方法通过修改 host element 和 pane element 的样式来控制浮层元素的位置。

还有如下方法比较重要：

[dispose](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/position/global-position-strategy.ts%23L195-L214)，在 position strategy 被销毁（比如跟随浮层被销毁，或者浮层切换了 position strategy）的时候做回复操作。

其他方法都是暴露出来修改定位的，这里就不 cover 了。

## 辅助机制

### Backdrop

有些浮层需要有一个后置的全屏图层，来凸显浮层内容，同时作为 MouseEvent 的 target，支持“点击浮层外关闭”这样的功能。

Backdrop 由 `_attachBackdrop` 方法所创建，实质上是创建了这样一个元素

```
<div class="cdk-overlay-backdrop cdk-overlay-backdrop-showing"></div>
```

并把它插入到 host element 之前，保持图层叠加的顺序。

同时在浮层上[绑定](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/overlay-ref.ts%23L398)了一个 click 事件的 handler，通过此 handle 派发 `_backdropClick` 事件。

### KeyboardDispatcher

[KeyboardDispatcher](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/keyboard/overlay-keyboard-dispatcher.ts) 负责将键盘事件分派给最近打开的浮层。

之前讲到浮层 attach 的时候会调用 KeyboardDispatcher 的 [add 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/keyboard/overlay-keyboard-dispatcher.ts%23L43-L55)，该方法会将调用此方法的 overlay 注册在 `_attachedOverlays` 数组的最后，且会第一个 overlay 注册的时候在 document 上绑定 keydown 事件的 handler，而该 [handler](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/keyboard/overlay-keyboard-dispatcher.ts%23L80-L95) 会从数组尾部开始逆序查找监听了 keydown 事件的 overlay，并对它派发 keydown 事件。

`KeyboardDispatcher` 使得最近一个打开的 overlay 才能监听键盘事件，一种常见的使用场景就是支持按 esc 键时有序地关闭 overlay。

### ScrollStrategy

scroll strategy 确定了在浮层展开时，原文档应当如何滚动。任意的 scroll strategy 都需要实现 [ScrollStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/scroll/scroll-strategy.ts%23L11-L26) 接口。

我们以 CDK 提供的 [CloseScrollStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/scroll/close-scroll-strategy.ts) 为例，这种 strategy 会在页面内容滚动时关闭浮层。

在 `OverlayRef` 初始化时会调用 [attach 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/scroll/close-scroll-strategy.ts%23L37-L43)，而 Overlay 的 attach 方法会调用 [enable 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/scroll/close-scroll-strategy.ts%23L45-L68)，这个方法会监听全局滚动事件，并根据滚动范围和设置的门限调用 [_detach 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/scroll/close-scroll-strategy.ts%23L83-L90)，最终是调用 `OverlayRef` 的 detach 方法卸载浮层内容。

## 例子

下面以 BottomSheet 组件为例，看一下 overlay 是如何使用的。

用户用 [open 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/material/bottom-sheet/bottom-sheet.ts%23L64-L111)创建一个新的 BottomSheet 组件，这个方法会通过 [_createOverlay](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/material/bottom-sheet/bottom-sheet.ts%23L145-L164) 创建一个新的浮层，该方法的全部代码如下：

```typescript
/**
   * Creates a new overlay and places it in the correct location.
   * @param config The user-specified bottom sheet config.
   */
  private _createOverlay(config: MatBottomSheetConfig): OverlayRef {
    const overlayConfig = new OverlayConfig({
      direction: config.direction,
      hasBackdrop: config.hasBackdrop,
      disposeOnNavigation: config.closeOnNavigation,
      maxWidth: '100%',
      scrollStrategy: config.scrollStrategy || this._overlay.scrollStrategies.block(),
      positionStrategy: this._overlay.position().global().centerHorizontally().bottom('0')
    });


    if (config.backdropClass) {
      overlayConfig.backdropClass = config.backdropClass;
    }


    return this._overlay.create(overlayConfig);
  }

```

可以看到默认使用的是 [BlockScrollStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/scroll/block-scroll-strategy.ts) 和 [GlobalPositionStrategy](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/master/src/cdk/overlay/position/global-position-strategy.ts)。

> 实际上是通过工厂类 [OverlayPositionBuilder](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/position/overlay-position-builder.ts%23L27) 和 [ScrollStrategyOptions](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/cdk/overlay/scroll/scroll-strategy-options.ts%23L28) 创建的。
> 个人觉得这不是个好设计，会导致没用到的 Strategy 没法被 tree shake 掉。

然后 [_attachContainer 方法](https://link.zhihu.com/?target=https%3A//github.com/angular/components/blob/7cd78ffc59c1975012b4a7913f147cedc9c97ae0/src/material/bottom-sheet/bottom-sheet.ts%23L128-L143)就会将 BottomSheep 组件内容 attach 到 portal 上了。

```typescript
const containerRef: ComponentRef<MatBottomSheetContainer> = overlayRef.attach(
  containerPortal
)
```
## 弹框拖拽

参考：https://www.jianshu.com/p/deb0b018b2ee

1创建拖拽服务

```typescript
import {Injectable, RendererFactory2} from '@angular/core'
@Injectable({
    providedIn: 'root'
})
export class ModalDragService {
    constructor(
        private rendererFactory2: RendererFactory2,
    ){}
    enableModalDrag(refModal) {
        const render = this.rendererFactory2.createRenderer(null, null);
        const modalBackground = refModal.elementRef.nativeElement;
        const modalElement = refModal.elementRef.nativeElement.querySelector('.ant-modal-content');
        const modalTitleElement = this.createModalTitleElement(render, modalElement);
        this.dragListen(render, modalTitleElement, modalElement, modalBackground);
    }
    createModalTitleElement(render, modalElement) {
        let element = document.createElement('div') as any;
        render.setStyle(element, 'width', '100%');
        render.setStyle(element, 'height', '54px');
        render.setStyle(element, 'position', 'absolute');
        render.setStyle(element, 'top', '0');
        render.setStyle(element, 'left', '0');
        render.setStyle(element, 'cursor', 'move');
        render.setStyle(element, '-moz-user-select', 'none');
        render.setStyle(element, '-webkit-user-select', 'none');
        render.setStyle(element, '-ms-user-select', 'none');
        render.setStyle(element, '-khtml-user-select', 'none');
        render.setStyle(element, 'user-select', 'none');
        render.appendChild(modalElement, element);
        return element;
    }
    dragListen(render, modalTitleElement, modalElement, modalBackground) {
        render.listen(modalTitleElement, 'mousedown', function(event){
            this.mouseDownX = event.clientX;
            this.mouseDownY = event.clientY;
            this.modalX = modalElement.offsetLeft;
            this.modalY = modalElement.offsetTop;
            render.setStyle(modalElement, 'left', `${this.modalX}px`);
            render.setStyle(modalElement, 'top', `${this.modalY}px`);
            this.canMove = true;
        }.bind(this));
        render.listen(modalTitleElement, 'mouseup', function(event){
            this.canMove = false;
        }.bind(this));
        render.listen(modalBackground, 'mousemove', function(event){
            if (this.canMove){
                let moveX = event.clientX - this.mouseDownX;
                let moveY = event.clientY - this.mouseDownY;
                let newModalX = this.modalX + moveX;
                let newModalY = this.modalY + moveY;
                render.setStyle(modalElement, 'left', `${newModalX}px`);
                render.setStyle(modalElement, 'top', `${newModalY}px`);
            }
        }.bind(this));
    }
}
```

2.创建modal之后, 使用enableModalDrag方法激活

```typescript
const  modal = this.modalService.create({
    nzTitle: '添加',
    nzContent: FormComponent,
    nzComponentParams: {
    },
    nzWidth:700,
    nzFooter:null,
});
// 设置窗口可拖动
this.modalDragService.enableModalDrag(modal);
```


###### 获取文件的base64

> return new Promise((resolve, reject) => {
>
> ​	const render = new FileReader();
>
> ​	reader.readAsDataURL(file);
>
> ​	reader.onload = () => resolve(reader.result);
>
> ​	reader.onerror = error => reject(error);
>
> })
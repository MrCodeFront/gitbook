##### nestapi.rossai.cn/rossapp	// 获取所有app应用信息

##### nestapi.rossai.cn/rossapp	// 添加新应用

```
id: number;
app_version: string;
app_logo_addr: string;
platform_type: string;
app_status: number;
download_urls: string;
app_name: string;
used_customers: string;
app_device_type: string;
package_name: string;
remark: string;
create_time: Date;
update_time: Date;
```

##### nestapi.rossai.cn/rossapp/update/:id	// 更改app应用信息

```
app_version:x.x.x
download_urls:http://cloudpf.weunit.cn/app_download/apk/app仓库名称.apk
app_name
app_logo_addr
```

##### ftp上传apk

```
站点：cloudpf.weunit.cn
密码：Ross_ftp
文件路径：/mnt/nfs-020/yly_docker/www/public/app_download/apk
```

##### 裁片超市

```
app对应id：9
文件名：01-cutting-supermarket.apk
xml：cp_version.xml
打包环境：caipian-build-env
```

##### 裁片超市(天守)

```
app对应id：58
文件名：01-cutting-supermarket.apk
xml：cp_TianShou_version.xml
打包环境：caipian-build-env
```

##### 扫码app（scan-app）

```
app对应id：54
文件名：01-scan-app.apk
xml：scan_version.xml
打包环境：cordova直接打包，版本修改在config.xml中
```

##### wms

```
app对应id：56
文件名：02-pdawms-new.apk
xml：wms_version.xml
打包环境：wms-build-env
```

##### 上线平板

```
app对应id：46
文件名：02-onlinearrange.apk
xml：oa_version.xml
打包环境：cordova直接打包，版本修改在config.xml中
```

##### aql

```
app对应id：38
文件名：01-AQL.apk
xml：aql_version.xml
打包环境：AQL-build-env
```
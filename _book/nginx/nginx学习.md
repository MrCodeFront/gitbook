### Nignx 学习

---

参考：[https://blog.csdn.net/weixin_45745641/article/details/119223601](https://blog.csdn.net/weixin_45745641/article/details/119223601)

查找nginx所在目录

```nginx
whereis nginx
```

查找根下所有名字包含nginx的文件

```nginx
find / -name nginx
```

删除nignx安装的相关文件

```nginx
rm -rf 查找出来的路径
```

启动

```nginx
./nginx 或 service nginx start
```

重启

```nginx
./nginx -s reload 或 service nginx restart
```

停止

```nginx
./nginx -s stop 或 service nginx stop
```

下载nginx包

```nginx
wget -c http://nginx.org/download/nginx-1.15.8.tar.gz
```

解压包

```nginx
tar -zxvf nginx-1.15.8.tar.gz
```

https服务替代 ./configure

```nginx
./configure --with-http_ssl_module
```

编译安装

```nginx
make && make install
```

查看nginx进程

```nginx
ps aux|grep nginx
```


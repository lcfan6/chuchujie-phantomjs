# 接口规范
=======

## 请求

url >待截取网页的url
encoding >返回数据是否为base64

## 响应

如果请求参数带有base64，响应是一段JSON字符串
```
    {
        error: 0,
        data: {
            img: 'asdf'
        }
    }
```
如果是普通请求，返回就是图片本身

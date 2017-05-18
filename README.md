# Simple Web Perf

> Simple web performance reporter for mobile browsers.
> 
> 一个精简的网页性能数据上报工具，为主流移动浏览器优化。

<!-- -->

> Inspired by [hax/WebPerf](https://github.com/hax/WebPerf):
> 
> > WebPerf provides a unified API for web performance

## 兼容性

* 支持以下移动平台的主流浏览器：
	* iOS 9+
	* Android 4+
* 同样支持以下桌面浏览器：
	* Firefox (Latest 2 versions)
	* Chrome (Latest 2 versions)
	* Safari (Latest 2 versions)

## 安装

```sh
npm i simple-web-perf
```

## 使用方法

（待完成）

## API

* `WebPerf.navigationTiming()`

	返回网页性能相关的数据，其格式近似符合 Navigation Timing Level 2 的定义（但未包含浏览器无法获取的字段和性能统计不需要的字段）。

* `WebPerf.nt()`

	返回网页性能相关的数据，各字段名均已缩短，便于上报。

* `WebPerf.setLogger(Function)`

	指定上报方式。

***

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)

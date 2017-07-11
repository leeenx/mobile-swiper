# mobile-swiper

经常会用到移动端左右切换幻灯片组件，今天提取了一个简易的方便后续使用。组件无任何依赖直接即可以使用。
DEMO中使用了 `touchstart` 和 touchend` 事件，所以仅适用于移动端

## 用法

直接调用以下代码
 ```js
 new mobileSwiper("#selector"); 
 ```

要求 `#selector` 是以下结构：  

```html
<ul id="selector">
  <li>
    <img src="//jdc.jd.com/img/216x264?color=fff&text=1">
  </li>
  <li>
    <img src="//jdc.jd.com/img/216x264?color=f00&text=1">
  </li>
  <li>
    <img src="//jdc.jd.com/img/216x264?color=ff0&text=1">
  </li>
  <li>
    <img src="//jdc.jd.com/img/216x264?color=f0f&text=1">
  </li>
  <li>
    <img src="//jdc.jd.com/img/216x264?color=333&text=1">
  </li>
</ul>
```


# zxwatermark

> 前端添加水印

---

### 更新日志

v1.0.0 初始版本
最好用 1.0.4 以后的
v1.0.4 修改版本导入需要.default 问题
v1.0.5 添加关键字

---

### 使用（Usage）

\*\*方式：安装 npm 包导入到需要使用的项目中去：

```javascript
npm i zxwatermark--save

// import
import watermark from 'zxwatermark'
```

### **导入后就可以调用下面的方法**

（After that you can call any of methods that are explained in the following）

---

## watermark.setWaterMark

使用时该方法时传入一个 options 配置对象, 配置对象主要有两个属性：`w_texts`、`w_options`。
`w_texts`：水印文案的数组集合可设置多行文案。
`w_options`：水印参数配置项，如字体大小、颜色等

You can use the `watermark.setWaterMark` method to set watermark. The value will automatically be escaped for you.

```javascript
import watermark from "zxwatermark";
// w_texts：水印文案数组集合
watermark.setWaterMark({
  w_texts: ["zzz", "xxxx"],
});
```

options 配置对象还有另一个属性 `w_options`水印参数配置： 用于设置水印的具体参数如宽度，大小等，各参数说明见下表

If you need more options, like setting the width, you can add an object with options as the last parameter:

```javascript
import watermark from "watermark-package";
watermark.setWaterMark({
  w_texts: ["zzz", "xxx"],
  w_options: {
    w_width: 240,
    w_height: 140,
    w_top: "0px",
    w_left: "0px",
    w_rotateDeg: 25,
    w_font: "1.2rem Vedana",
    w_color: "#666",
    w_opacity: "0.2",
    w_zIndex: "100000",
  },
});
```

| key         | value                                                                                                                       | default value   |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------- | :-------------- |
| `w_width`   | A `number` that the width of the watermark block.<br />(水印块宽度)                                                         | 240             |
| w_height    | A `number` that the height of the watermark block.<br />(水印块高度)                                                        | 140             |
| w_top       | A `string` that the distance between the watermark mask layer and the top of the page.<br />(水印遮罩层距离页面顶部的距离)  | '0px'           |
| w_left      | A `string` that the distance between the watermark mask layer and the left of the page.<br />(水印遮罩层距离页面左边的距离) | '0px'           |
| w_rotateDeg | A `string` that specifies SameSite attribute that restricts cookie access based on the site context.<br />(水印角度)        | 25              |
| w_font      | A `string` that the watermark font size, font style<br />(水印的字体大小、字体风格)                                         | '1.2rem Vedana' |
| w_color     | A `string` that the watermark font color<br />(水印字体颜色)                                                                | '#666'          |
| w_opacity   | A `string` that the watermark mask layer transparency<br />(水印遮罩层透明度)                                               | '0.2'           |
| w_zIndex    | A `string` that the zIndex of watermark mask<br />(水印遮罩层层级)                                                          | 10000           |

## watermark.removeWatermark

清除水印

clear watermark

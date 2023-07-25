var Watermark = {};
const WaterMarkDomId = "zxWatermark";
// 参数配置
var w_options = {
  // 水印块宽度
  w_width: 240,
  // 水印块高度
  w_height: 140,
  // 水印区域top距离
  w_top: "0px",
  // 水印区域left距离
  w_left: "0px",
  // 旋转角度
  w_rotateDeg: 25,
  // 字体大小、风格
  w_font: "bold 48px serif",
  // 字体颜色 rgb | 16进制字符串
  w_color: "#666",
  // 透明度
  w_opacity: "0.1",
  // 层级
  w_zIndex: "100000",
};

// 添加水印生成一个遮罩
Watermark.setWaterMark = (options) => {
  let id = Watermark.loadWatermark(options);
  if (document.getElementById(id) === null) {
    id = Watermark.loadWatermark(options);
  }
};
// 移除水印
Watermark.removeWatermark = () => {
  let id = WaterMarkDomId;
  if (document.getElementById(id) !== null) {
    // 移除
    queueMicrotask(() => {
      document.body.removeChild(document.getElementById(id));
    });
  }
};
/**
 *
 * @param {{w_text:String;w_options:Object}} options
 * w_text:["zzzz","xxx"]
 * w_options：{
 *    // 水印块宽度
      w_width: 240,
      // 水印块高度
      w_height: 140,
      // 水印区域top距离
      w_top: "0px",
      // 水印区域left距离
      w_left: "0px",
      // 旋转角度
      w_rotateDeg: 25,
      // 字体大小、风格
      w_font: "1.2rem Vedana",
      // 字体颜色 rgb | 16进制字符串
      w_color: "#666",
      // 透明度
      w_opacity: "0.1",
      // 层级
      w_zIndex: "100000",
 * }
 */
Watermark.loadWatermark = (options) => {
  let _options = {};
  let _w_texts = options.w_texts;
  if (
    options.w_options &&
    Object.prototype.toString.call(options.w_options) === "[object Object]"
  ) {
    _options = Object.assign({}, w_options, options.w_options);
  } else {
    _options = w_options;
  }

  let id = WaterMarkDomId;
  if (document.getElementById(id) !== null) {
    document.body.removeChild(document.getElementById(id));
  }

  let canvas = document.createElement("canvas");
  canvas.width = _options.w_width;
  canvas.height = _options.w_height;
  let ctx = canvas.getContext("2d");
  ctx.rotate(-((_options.w_rotateDeg * Math.PI) / 180)); // 水印旋转角度
  ctx.font = _options.w_font;
  ctx.fillStyle = _options.w_color;
  ctx.textAlign = "center";
  ctx.textBaseline = "Middle";
  // 水印在画布的位置x，y轴
  if (
    options.w_texts &&
    Object.prototype.toString.call(options.w_texts) === "[object Array]"
  ) {
    for (let i = 0; i < _w_texts.length; i++) {
      const element = _w_texts[i];
      ctx.fillText(element, canvas.width / 5, canvas.height / 1.4 + i * 30);
    }
  }

  var div = document.createElement("div");
  div.id = id;
  div.className = "wm-complete";
  div.style.pointerEvents = "none";
  div.style.top = _options.w_top;
  div.style.left = _options.w_left;
  div.style.opacity = _options.w_opacity;
  div.style.position = "fixed";
  div.style.zIndex = _options.w_zIndex;
  div.style.width = "100%";
  div.style.height = "100%";
  div.style.background = "url(" + canvas.toDataURL() + ") left top repeat";
  document.body.appendChild(div);

  queueMicrotask(() => {
    Watermark.observeDomChange(div, options);
  });
  return id;
};
Watermark.observeDomChange = (waterMarkDom, options) => {
  // 选择需要观察变动的节点
  const targetNode = document.querySelector("body");
  // 观察器的配置（需要观察什么变动）
  const config = { attributes: true, childList: true, subtree: true };

  // 当观察到变动时执行的回调函数
  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      // type：观察的变动类型（attribute、characterData或者childList）。
      // target：发生变动的DOM节点。
      // addedNodes：新增的DOM节点。
      // removedNodes：删除的DOM节点。
      // previousSibling：前一个同级节点，如果没有则返回null。
      // nextSibling：下一个同级节点，如果没有则返回null。
      // attributeName：发生变动的属性。如果设置了attributeFilter，则只返回预先指定的属性。
      // 原文链接：https://blog.csdn.net/qq_35385241/article/details/121989261
      if (mutation.target === waterMarkDom) {
        mutation.target.remove();
        Watermark.loadWatermark(options);
        observer.disconnect();
      }
      if (
        mutation.removedNodes.length &&
        mutation.removedNodes[0] === waterMarkDom
      ) {
        // window.alert('非法操作！！！')
        Watermark.loadWatermark(options);
        // 停止观察
        observer.disconnect();
      }
    }
  };
  Watermark.Observer = new MutationObserver(callback);
  Watermark.Observer.observe(targetNode, config);
};

export default Watermark;

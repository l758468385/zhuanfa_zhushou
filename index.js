const express = require("express");
const path = require("path");
const cors = require("cors");
const { log } = require("console");
const app = express();

const cartSeeJsFilePath = path.join(
  __dirname,
  "../cartsee-store/dist/cart-see.js"
);
const conversionJsFilePath = path.join(
  __dirname,
  "../plugin-conversion-assistant/dist/conversion-assistant.js"
);

// APM
const apmJsFilePath = path.join(__dirname, "../lf-apm-frontend/dist/apm.js");

// 通用统计
const lfEventJsFilePath = path.join(
  __dirname,
  "../statistics/lf-analytics-frontend/dist/lfEvent.test.js"
);

// 历史订单
const oldHistoryFilePath = path.join(
  __dirname,
  "../shopify-order-Store/dist/shopify-history.js"
);
// 及时雨
const jsyFilePath = path.join(__dirname, "../jishiyu/jsy.js");

// V2 fb应用
const pixelVonversion = path.join(
  "D:\\phpstudy_pro\\WWW\\with-blade\\extensions\\pixel-conversion\\assets\\app.js"
);

const PORT = 3321;

app.use(cors());

// 转化助手 JS
app.get("/conversion.js", (_, res) => {
  log("代理成功");
  res.sendFile(conversionJsFilePath);
});

// CartSee JS
app.get("/cart-see.js", (_, res) => {
  log("代理成功");
  res.sendFile(cartSeeJsFilePath);
});

// APM JS
// CartSee JS
app.get("/apm.js", (_, res) => {
  log("代理成功");
  res.sendFile(apmJsFilePath);
});

app.get("/lfEvent.js", (_, res) => {
  log("代理成功");
  res.sendFile(lfEventJsFilePath);
});

// 历史订单转发
app.get("/oldHistory.js", (_, res) => {
  log("代理成功");
  res.sendFile(oldHistoryFilePath);
});

// 及时雨转发
app.get("/jsy.js", (_, res) => {
  log("代理成功");
  res.sendFile(jsyFilePath);
});

// 转化像素转发
app.get("/pixel-conversion.js", (_, res) => {
  log("代理成功");
  res.sendFile(pixelVonversion);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

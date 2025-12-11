module.exports = {
  // 服务器配置
  server: {
    port: 3321,
    cors: true,
  },
  
  // 插件配置
  plugins: [
    {
      name: "conversion-assistant", // 插件名称
      route: "/conversion.js",      // 访问路由
      path: "../plugin-conversion-assistant/dist/conversion-assistant.js", // 文件路径
      enabled: true,               // 是否启用
    },
    {
      name: "cart-see",
      route: "/cart-see.js",
      path: "../cartsee-store/dist/cart-see.js",
      enabled: true,
    },
    {
      name: "apm",
      route: "/apm.js",
      path: "../lf-apm-frontend/dist/apm.test.js",
      enabled: true,
    },
    {
      name: "lf-event",
      route: "/lfEvent.js",
      path: "../statistics/lf-analytics-frontend/dist/lfEvent.test.js",
      enabled: true,
    },
    {
      name: "old-history",
      route: "/oldHistory.js",
      path: "../shopify-order-Store/dist/shopify-history.js",
      enabled: true,
    },
    {
      name: "jsy",
      route: "/jsy.js",
      path: "../jishiyu/jsy.js",
      enabled: false,
    },
    {
      name: "pixel-conversion",
      route: "/pixel-conversion.js",
      path: "d:/phpstudy_pro/WWW/with-blade/extensions/pixel-conversion/assets/app.js",
      enabled: true,
    },
    {
      name: "worry-free-purchase",
      route: "/worry-free-purchase.js",
      path: "../worryfreepurchase-store/dist/index.js",
      enabled: true,
    },

    // wshop 本地 ga
     {
      name: "ga",
      route: "/ga.js",
      path: "d:/phpstudy_pro/WWW/wshop/platform/resources/views/applications/GoogleAnalysis/index.js",
      enabled: true,
    },

    // wshop 本地 gads
     {
      name: "gads",
      route: "/gads.js",
      path: "d:/phpstudy_pro/WWW/wshop/platform/resources/views/applications/GoogleAds/index.js",
      enabled: true,
    },
  ],
}; 
const express = require("express");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const chalk = require("chalk"); // 添加彩色日志
const config = require("./config");
const app = express();

// 日志函数
const logger = {
  info: (message) => console.log(chalk.blue(`[INFO] ${message}`)),
  success: (message) => console.log(chalk.green(`[SUCCESS] ${message}`)),
  error: (message) => console.log(chalk.red(`[ERROR] ${message}`)),
  warning: (message) => console.log(chalk.yellow(`[WARNING] ${message}`)),
};

// 应用中间件
if (config.server.cors) {
  app.use(cors());
  logger.info("CORS 已启用");
}

// 静态文件服务
app.use(express.static(path.join(__dirname, "public")));

// 注册插件路由
config.plugins.forEach(plugin => {
  if (!plugin.enabled) {
    logger.warning(`插件 ${plugin.name} 已禁用，跳过路由注册`);
    return;
  }

  const filePath = path.isAbsolute(plugin.path) 
    ? plugin.path 
    : path.join(__dirname, plugin.path);

  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    logger.error(`插件 ${plugin.name} 的文件路径不存在: ${filePath}`);
    return;
  }

  app.get(plugin.route, (req, res) => {
    logger.success(`转发请求: ${plugin.route} -> ${filePath}`);
    res.sendFile(filePath);
  });

  logger.info(`已注册插件路由: ${plugin.name} (${plugin.route})`);
});

// 添加简单的管理页面
app.get("/", (req, res) => {
  let html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>插件转发管理</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
        h1 { color: #333; }
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        .enabled { color: green; }
        .disabled { color: red; }
      </style>
    </head>
    <body>
      <h1>插件转发管理</h1>
      <table>
        <tr>
          <th>插件名称</th>
          <th>路由</th>
          <th>文件路径</th>
          <th>状态</th>
        </tr>
  `;

  config.plugins.forEach(plugin => {
    const filePath = path.isAbsolute(plugin.path) 
      ? plugin.path 
      : path.join(__dirname, plugin.path);
    
    const fileExists = fs.existsSync(filePath);
    const status = plugin.enabled 
      ? (fileExists ? '<span class="enabled">启用</span>' : '<span class="disabled">文件不存在</span>') 
      : '<span class="disabled">禁用</span>';

    html += `
      <tr>
        <td>${plugin.name}</td>
        <td>${plugin.route}</td>
        <td>${plugin.path}</td>
        <td>${status}</td>
      </tr>
    `;
  });

  html += `
      </table>
      <p>服务运行在: http://localhost:${config.server.port}</p>
    </body>
    </html>
  `;

  res.send(html);
});

// 错误处理中间件
app.use((err, req, res, next) => {
  logger.error(`服务器错误: ${err.message}`);
  res.status(500).send("服务器内部错误");
});

// 启动服务器
const PORT = config.server.port || 3321;
app.listen(PORT, () => {
  logger.success(`服务器已启动: http://localhost:${PORT}`);
  logger.info(`访问 http://localhost:${PORT} 查看管理界面`);
});

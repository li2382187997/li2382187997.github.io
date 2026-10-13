# 小卷的周末创意市集 · 个人网站

通信工程学生小卷（李雅洁）的个人作品集网站，以"创意小摊"为主题，把项目做成摊位上的商品：点开摊位上的物件，就能看到对应的项目档案、真实过程材料与复盘。

## 在线访问

<https://li2382187997.github.io/>

推送到 `main` 分支后，GitHub Actions 会自动完成静态导出并发布到 GitHub Pages（配置见 `.github/workflows/deploy-pages.yml`）。

## 摊位上的作品

- **Linux 终端**：AI 语音驱动的嵌入式 Linux 控制终端，三层系统联动与板端联调实录。
- **实习成果展**：北辰青年线上实践交付 —— 推文、海报、模拟公众号阅读器。
- **绘画工作台**：零依赖单文件 Web 应用，IndexedDB 持久化，可离线使用。
- **AI 作品集**：本站自身的设计与实现过程。
- 以及技能工具墙、认识小卷、联系明信片等互动板块。

## 技术栈

| 项 | 说明 |
|---|---|
| 框架 | Next.js 16（App Router）+ React 19 |
| 动效 | GSAP（摊位层叠与交互动画） |
| 样式 | Tailwind CSS v4 |
| 部署 | `next.config.ts` 配置 `output: "export"`，构建产物为纯静态站点，托管于 GitHub Pages |

## 本地开发

```bash
npm ci          # 安装依赖
npm run dev     # 启动开发服务（走 vinext 开发链路）
npx next build  # 静态导出，产物在 out/
```

## 目录结构

```
├── app/                 # 页面与全局样式（首页 + 项目详情页）
├── components/          # 交互组件（摊位预览、shadcn/ui 基础组件）
├── lib/portfolio-data.ts # 全部项目数据与素材清单
├── public/              # 图片、视频等静态素材
└── .github/workflows/   # GitHub Pages 自动部署
```

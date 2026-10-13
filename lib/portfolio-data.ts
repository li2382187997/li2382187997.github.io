export type Project = {
  slug: string;
  label: string;
  kicker: string;
  title: string;
  summary: string;
  role: string;
  aiBoundary: string;
  process: string[];
  outcomes: string[];
  reflection: string;
  tech: string[];
  media?: { type: "image" | "video"; src: string; alt: string }[];
  external?: { label: string; href: string };
};

export const projects: Project[] = [
  {
    slug: "mobing-shop",
    label: "馍饼店",
    kicker: "01 · 最新上架",
    title: "《馍饼店》横屏经营小游戏",
    summary: "独立设计的中国早点主题经营小游戏：接单、备料、制作、出餐全靠手上功夫，点开就能玩。",
    role: "玩法设计、美术绘制、工程实现、测试与构建均由我独立完成",
    aiBoundary: "AI 辅助讨论玩法点子与生成部分代码片段；我负责玩法与数值设计、Canvas 美术实现、模块拆分、40 个测试的编写与验收，以及构建脚本。",
    process: ["从早点摊的真实动作里提炼玩法循环", "把核心逻辑做成浏览器与 Node 双端兼容", "为各系统补测试并写脚本打包单文件版"],
    outcomes: ["13 道菜品 · 4 类厨具 · 16 位街坊顾客", "约 1800 行核心源码，零第三方依赖", "40 个 Node 测试全部通过", "构建出 149 KB 单文件 HTML，支持导入微信开发者工具"],
    reflection: "这个项目让我第一次把“游戏手感”当作工程问题来解：手势判定的容错、生长进度的存档都比写页面难。回头看最值钱的决定，是让核心逻辑可以被自动化测试——改手势判定时敢随手重构。",
    tech: ["Canvas", "JavaScript", "Node 内置测试", "单文件构建", "微信小游戏入口"],
    media: [
      { type: "image", src: "/projects/mobing/main.png", alt: "制作界面：三位顾客、订单气泡与三块案板" },
      { type: "image", src: "/projects/mobing/farm.png", alt: "后院田园：种植与加工链" },
      { type: "image", src: "/projects/mobing/menu.png", alt: "菜谱：13 道菜品图鉴" },
      { type: "image", src: "/projects/mobing/day.png", alt: "当日结算" },
    ],
    external: { label: "在线试玩", href: "https://8fc1a47661f4472e88663adb937c2118.app.workbuddy.host/" },
  },
  {
    slug: "linux-ai-terminal",
    label: "Linux 终端",
    kicker: "02 · 镇店作品",
    title: "AI 语音驱动的 Linux 嵌入式控制终端",
    summary: "用 12 天完成三层系统联动，把 AI 生成的代码真正接到开发板、串口、网络和触摸屏上。",
    role: "AI 协作开发 · 独立集成与验收",
    aiBoundary: "AI 负责辅助生成与修改代码；我负责需求拆解、提示与迭代、板端集成、串口与网络调试、触摸交互和最终验收。",
    process: ["拆分 Linux、STM32、Ubuntu 三层任务", "联调语音、网络、串口和触摸输入", "针对真实设备问题反复验证与修正"],
    outcomes: ["2026.08.31—09.11，12 天完成", "约 400 行 C 代码，形成 4 个功能模块", "联动 3 个 LED、4 张界面图片", "实现 3 秒语音采集与 5 秒录音流程"],
    reflection: "这次经历让我确认：会让 AI 写出代码只是起点，真正的工程能力体现在能否解释需求、定位问题，并让系统在真实设备上稳定跑通。",
    tech: ["C", "Linux", "STM32", "Ubuntu", "串口通信", "网络通信", "触摸交互"],
    media: [
      { type: "image", src: "/projects/linux/home.jpg", alt: "终端主界面在开发板上运行" },
      { type: "image", src: "/projects/linux/voice-ready.jpg", alt: "语音指令采集界面" },
      { type: "image", src: "/projects/linux/voice-result.jpg", alt: "语音识别结果与设备联动" },
      { type: "image", src: "/projects/linux/light-control.jpg", alt: "灯光控制界面与 LED 联动" },
      { type: "image", src: "/projects/linux/memo.jpg", alt: "备忘录功能实机画面" },
      { type: "image", src: "/projects/linux/album.jpg", alt: "相册功能实机画面" },
      { type: "image", src: "/projects/linux/boot.jpg", alt: "系统启动后的终端画面" },
      ...Array.from({ length: 12 }, (_, index) => ({
        type: "image" as const,
        src: `/projects/linux/process/process-${String(index + 1).padStart(2, "0")}.jpg`,
        alt: `Linux 嵌入式控制终端开发记录 ${String(index + 1).padStart(2, "0")}`,
      })),
      { type: "video", src: "/projects/linux/demo.mp4", alt: "Linux 嵌入式控制终端完整演示视频" },
    ],
  },
  {
    slug: "beichen-internship",
    label: "实习成果册",
    kicker: "03 · 实践记录",
    title: "北辰青年线上实习成果",
    summary: "完成 4 次 AI 课程和 4 项工作任务，形成从内容研究到交互产品的主要交付。",
    role: "线上实习生 · 个人完成主要交付",
    aiBoundary: "使用 AI 辅助资料整理、内容草拟和交互实现；我负责选题判断、结构设计、内容核验、迭代与最终交付。",
    process: ["完成 AI 课程并整理方法", "独立推进内容策划与视觉物料", "把长篇招新材料做成交互阅读器"],
    outcomes: ["2026.08.10—09.06 完成线上实习", "完成 4 次 AI 课程学习与 4 项工作任务", "校园招新内容包含 13 个章节与 10 张海报", "求职面试技巧内容完成 3 轮迭代"],
    reflection: "我学会了不把 AI 当作一次性答案，而是把它放进研究、产出、核验和复盘的完整工作流中。",
    tech: ["AI 内容协作", "内容策划", "信息架构", "视觉物料", "交互阅读器"],
    media: [
      { type: "image", src: "/projects/beichen/certificate.png", alt: "北辰青年暑期线上实习实践证书" },
      ...[1,2,3,4].map((n) => ({ type: "image" as const, src: `/projects/beichen/slides/manual-${n}.png`, alt: `AI 个人说明书 ${n}/4` })),
      ...[1,2,3,4,5].map((n) => ({ type: "image" as const, src: `/projects/beichen/slides/odyssey-${n}.png`, alt: `奥德赛时期洞察报告 ${n}/5` })),
      { type: "image", src: "/projects/beichen/slides/recruit-cover.png", alt: "校园招新内容主视觉" },
      ...[2,3,4,5,6,7,8,9,10,11].map((n) => ({ type: "image" as const, src: `/projects/beichen/slides/recruit-${String(n).padStart(2,"0")}.png`, alt: `校园招新海报 ${String(n).padStart(2,"0")}` })),
      ...[1,2,3].map((n) => ({ type: "image" as const, src: `/projects/beichen/slides/wechat-${n}.jpg`, alt: `公众号长文排版 ${n}/3` })),
    ],
    external: { label: "查看实习成果材料", href: "https://my.feishu.cn/docx/R1KldCt6toT6oIx4bmrcSMdLnQf" },
  },
  {
    slug: "drawing-workbench",
    label: "绘画工作台",
    kicker: "04 · 一日开发",
    title: "我的绘画工作台",
    summary: "把自己的绘画资料管理习惯做成一个可在本地运行的轻量工具。",
    role: "需求提出、AI 协作开发、功能验收均由我独立完成",
    aiBoundary: "AI 辅助生成单文件前端代码；我定义使用场景、功能优先级和交互细节，并逐项测试数据存储、拖放与备份流程。",
    process: ["从自己的画画流程中提炼需求", "一天内快速实现并持续试用", "围绕本地数据安全补充备份能力"],
    outcomes: ["2026.08.13 用 1 天完成首版", "支持拖放、剪贴板和本地图片整理", "使用 IndexedDB 与 localStorage 保存数据", "支持计时、主题切换与 JSON 备份"],
    reflection: "这是我第一次把日常兴趣里的真实不便，转化成一个自己愿意持续使用的小产品。",
    tech: ["HTML", "CSS", "JavaScript", "IndexedDB", "localStorage", "响应式设计"],
    media: [
      { type: "image", src: "/projects/drawing/showcase.png", alt: "绘画工作台作品管理界面" },
      { type: "image", src: "/projects/drawing/timer.png", alt: "绘画工作台计时界面" },
      { type: "image", src: "/projects/drawing/dark.png", alt: "绘画工作台深色模式界面" },
    ],
    external: { label: "在线试玩", href: "https://024bb0c4d8d64695b7f852cf63aec87b.app.workbuddy.host/" },
  },
  {
    slug: "personal-portfolio",
    label: "AI 作品集",
    kicker: "05 · 成长档案",
    title: "AI 个人作品集",
    summary: "把一次次 AI 实验、工作任务与复盘整理成可持续更新的成长记录。",
    role: "内容策划、结构整理与持续维护",
    aiBoundary: "AI 辅助整理表达和页面呈现；项目事实、素材选择、成果核验与最终取舍由我完成。",
    process: ["收集分散的项目材料", "按目标、过程、成果与复盘重新组织", "持续补充真实截图和可访问链接"],
    outcomes: ["集中展示 AI 实践与项目成果", "保留原始材料，方便继续深入查看", "形成可持续维护的个人成长档案"],
    reflection: "作品集不只是陈列结果，也是在训练我如何清晰、诚实地讲述自己做过的事。",
    tech: ["AI 应用实践", "内容结构", "作品整理", "复盘表达"],
    external: { label: "前往飞书完整作品集", href: "https://my.feishu.cn/page/N4kGmOL8Pdr2V1aH19gcw9DAnKc" },
  },
];

export const profile = {
  name: "小卷",
  realName: "李雅洁",
  intro: "通信工程专业学生，喜欢用 AI 把想法做成真实作品。",
  education: "淮南师范学院 · 通信工程 · 2023 级",
  score: "GPA 3.91 / 4.5 · 专业排名 1 / 49",
  awards: ["2024 北斗杯省级二等奖 · 负责人", "2025 环境监测机器人省级三等奖 · 核心成员", "国家励志奖学金", "校一等奖学金 · 优秀学生标兵"],
  interests: ["画画", "追番", "养猫", "美食"],
};

export const links = {
  email: "mailto:2382187997@qq.com",
  github: "https://github.com/li2382187997",
  portfolio: "https://my.feishu.cn/page/Vfg5mUs5hdKfw4au0j4cePO6n8b",
};

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { profile, type Project } from "@/lib/portfolio-data";

gsap.registerPlugin(useGSAP);

type PortalMedia = { src: string; title: string; group: string; type?: "image" | "video" };

const linuxMedia: PortalMedia[] = [
  { src: "/projects/linux/home.jpg", title: "终端首页", group: "实机功能" },
  { src: "/projects/linux/boot.jpg", title: "系统启动", group: "实机功能" },
  { src: "/projects/linux/album.jpg", title: "相册模块", group: "实机功能" },
  { src: "/projects/linux/voice-ready.jpg", title: "语音采集", group: "实机功能" },
  { src: "/projects/linux/voice-result.jpg", title: "语音识别结果", group: "实机功能" },
  { src: "/projects/linux/light-control.jpg", title: "灯光控制", group: "实机功能" },
  { src: "/projects/linux/memo.jpg", title: "备忘录", group: "实机功能" },
  ...Array.from({ length: 12 }, (_, index) => ({
    src: `/projects/linux/process/process-${String(index + 1).padStart(2, "0")}.jpg`,
    title: `开发记录 ${String(index + 1).padStart(2, "0")}`,
    group: "开发过程",
  })),
  { src: "/projects/linux/demo.mp4", title: "完整演示视频", group: "演示视频", type: "video" as const },
];

export function LinuxMiniMap({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const current = linuxMedia[active];

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shots = gsap.utils.toArray<HTMLElement>(".linux-shot");
    shots.forEach((shot, index) => {
      const offset = wrapOffset(index, active, shots.length);
      const distance = Math.abs(offset);
      gsap.to(shot, {
        xPercent: -50,
        yPercent: -50,
        x: offset * Math.min(window.innerWidth * .46, 720),
        z: distance * -260,
        rotationY: offset * -17,
        scale: offset === 0 ? 1 : .78,
        autoAlpha: distance > 1 ? 0 : offset === 0 ? 1 : .28,
        zIndex: 20 - distance,
        duration: reduced ? 0 : .72,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, { scope: stageRef, dependencies: [active], revertOnUpdate: true });

  const move = (step: number) => setActive((value) => (value + step + linuxMedia.length) % linuxMedia.length);
  const firstInGroup = (group: string) => linuxMedia.findIndex((item) => item.group === group);

  return (
    <section
      className="media-portal linux-gallery"
      aria-label={`${project.label}全屏影像轨道`}
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}
    >
      <header className="portal-heading">
        <div><span>02 · LINUX TERMINAL</span><strong>{current.title}</strong></div>
        <p>{current.group} · {String(active + 1).padStart(2, "0")} / {linuxMedia.length}</p>
      </header>

      <div
        className="portal-stage"
        ref={stageRef}
        onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerUp={(event) => { const delta = dragStart.current === null ? 0 : event.clientX - dragStart.current; if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1); dragStart.current = null; }}
      >
        {linuxMedia.map((item, index) => (
          <figure className={`portal-sheet linux-shot${index === active ? " is-active" : ""}`} key={item.src} aria-hidden={index !== active} onClick={() => index !== active && setActive(index)}>
            {item.type === "video" ? (
              <video src={item.src} controls preload="metadata" playsInline aria-label={item.title} />
            ) : (
              <Image src={item.src} alt={`${item.title}，真实开发板画面`} fill sizes="96vw" priority={index === 0} />
            )}
          </figure>
        ))}
      </div>

      <div className="portal-controls">
        <button type="button" onClick={() => move(-1)} aria-label="上一张">←</button>
        <div className="portal-groups" aria-label="选择 Linux 素材分组">
          {["实机功能", "开发过程", "演示视频"].map((group) => <button type="button" className={current.group === group ? "is-active" : ""} key={group} onClick={() => setActive(firstInGroup(group))}>{group}</button>)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="下一张">→</button>
      </div>
      <div className="portal-progress" aria-label="选择 Linux 项目图片">
        {linuxMedia.map((item, index) => <button type="button" key={item.src} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`查看${item.title}`} />)}
      </div>
    </section>
  );
}

type ShowcaseSlide = {
  id: string;
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  proof: string;
  images: string[];
  imageLabels?: string[];
  bullets?: string[];
  link?: { label: string; href: string };
  tone: "blue" | "green" | "pink" | "gold";
};

const beichenSlides: ShowcaseSlide[] = [
  {
    id: "certificate", number: "01", eyebrow: "实习凭证", title: "从这张证书开始",
    description: "2026.08.10—09.06，完成北辰青年线上实习。证书是入口，后面的每一张才是实际交付。",
    proof: "4 次 AI 课程 · 4 项工作任务", images: ["/projects/beichen/certificate.png"], tone: "gold",
  },
  {
    id: "manual", number: "02", eyebrow: "W1 · 个人说明书", title: "先让团队知道怎样和我协作",
    description: "把事实、目标和偏好拆开，整理成一套能持续更新的个人协作档案。",
    proof: "4 张说明书 · Raw / Wiki / Outputs 三层知识库",
    images: [1,2,3,4].map((n) => `/projects/beichen/slides/manual-${n}.png`),
    imageLabels: ["身份档案", "目标与任务", "沟通与反馈", "预警与支持"], tone: "blue",
  },
  {
    id: "insight", number: "03", eyebrow: "W2 · 群体洞察", title: "把迷茫写成一份可行动的报告",
    description: "围绕“奥德赛时期”完成选题、观点、长文与主视觉，用真实经历支撑洞察。",
    proof: "约 900 字成稿 · 5 张视觉内容卡",
    images: [1,2,3,4,5].map((n) => `/projects/beichen/slides/odyssey-${n}.png`),
    imageLabels: ["主视觉", "概念定义", "方法一", "方法二", "方法三"], tone: "green",
  },
  {
    id: "article", number: "04", eyebrow: "W2 · 公众号交付", title: "从长文到可发布页面",
    description: "把内容重新组织成读得下去的公众号长图，逐段检查叙事、节奏和视觉一致性。",
    proof: "完整长文排版 · 真实发布物料",
    images: [1,2,3].map((n) => `/projects/beichen/slides/wechat-${n}.jpg`),
    imageLabels: ["长文上篇", "长文中篇", "长文下篇"], tone: "green",
  },
  {
    id: "recruit", number: "05", eyebrow: "W2 · 校园招新", title: "一个人走完内容、视觉、前端与部署",
    description: "先定彼得潘叙事线，再完成推文、海报和在线阅读器；每张海报都能在这里继续翻。",
    proof: "13 章推文 · 10 张海报 · 阅读器上线",
    images: ["/projects/beichen/slides/recruit-cover.png", ...[2,3,4,5,6,7,8,9,10,11].map((n) => `/projects/beichen/slides/recruit-${String(n).padStart(2,"0")}.png`)],
    imageLabels: ["招新封面", ...[2,3,4,5,6,7,8,9,10,11].map((n) => `海报 ${String(n).padStart(2,"0")}`)],
    link: { label: "打开在线阅读器", href: "https://75a637a723e04761bf468efa143362bd.app.workbuddy.link/" }, tone: "blue",
  },
  {
    id: "interview", number: "06", eyebrow: "W3 · 岗位与面试", title: "把求职准备做成可迭代流程",
    description: "不只做一次岗位分析，而是把分析、经历匹配、材料优化和模拟面试串成可复用工作流。",
    proof: "3 类岗位分析 · 2 轮模拟 · 3 轮复盘",
    images: [], bullets: ["岗位分析", "经历匹配", "材料优化", "模拟面试"], tone: "pink",
  },
  {
    id: "growth", number: "07", eyebrow: "AI 能力成长", title: "最终留下的是一套做事方法",
    description: "AI 给选项，我做判断；用内容、视觉、工程、知识管理和求职实践去验证结果。",
    proof: "人机协作方法 · 可继续复用的个人 Skill",
    images: [], bullets: ["内容与视觉", "前端工程", "知识管理", "数据分析", "求职体系"], tone: "gold",
  },
];

function wrapOffset(index: number, active: number, length: number) {
  let offset = index - active;
  if (offset > length / 2) offset -= length;
  if (offset < -length / 2) offset += length;
  return offset;
}

function ImmersiveShowcase({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);
  const current = beichenSlides[active];

  useEffect(() => setImageIndex(0), [active]);

  useGSAP(() => {
    const cards = gsap.utils.toArray<HTMLElement>(".archive-sheet");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    cards.forEach((card, index) => {
      const offset = wrapOffset(index, imageIndex, cards.length);
      const distance = Math.abs(offset);
      gsap.to(card, {
        xPercent: -50,
        yPercent: -50,
        x: offset * Math.min(window.innerWidth * .43, 680),
        z: distance * -280,
        rotationY: offset * -18,
        scale: offset === 0 ? 1 : .76,
        autoAlpha: distance > 1 ? 0 : offset === 0 ? 1 : .24,
        zIndex: 20 - distance,
        duration: reduced ? 0 : .72,
        ease: "power3.inOut",
        overwrite: "auto",
      });
    });
  }, { scope: stageRef, dependencies: [active, imageIndex], revertOnUpdate: true });

  const visualSlides = beichenSlides.filter((slide) => slide.images.length > 0);
  const moveChapter = (step: number) => setActive((value) => (value + step + visualSlides.length) % visualSlides.length);
  const moveImage = (step: number) => {
    if (!current.images.length) return;
    setImageIndex((value) => (value + step + current.images.length) % current.images.length);
  };

  return (
    <section
      className="media-portal archive-explorer"
      aria-label={`${project.label}全屏立体成果展架`}
      tabIndex={0}
      onKeyDown={(event) => { if (event.key === "ArrowLeft") moveImage(-1); if (event.key === "ArrowRight") moveImage(1); }}
    >
      <header className="portal-heading">
        <div><span>{project.slug === "personal-portfolio" ? "05 · AI PORTFOLIO" : "03 · BEICHEN ARCHIVE"}</span><strong>{current.title}</strong></div>
        <p>{current.eyebrow} · {String(imageIndex + 1).padStart(2, "0")} / {String(Math.max(current.images.length, 1)).padStart(2, "0")}</p>
      </header>

      <nav className="archive-chapters" aria-label="选择成果章节">
        {visualSlides.map((slide, index) => <button type="button" key={slide.id} className={index === active ? "is-active" : ""} onClick={() => setActive(index)}><span>{slide.number}</span>{slide.eyebrow.replace(/^W\d · /, "")}</button>)}
      </nav>

      <div
        className="portal-stage archive-stage"
        ref={stageRef}
        onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerUp={(event) => { if (dragStart.current !== null) { const delta = event.clientX - dragStart.current; if (Math.abs(delta) > 45) moveImage(delta > 0 ? -1 : 1); } dragStart.current = null; }}
      >
        {current.images.map((src, index) => (
          <figure className={`portal-sheet archive-sheet${index === imageIndex ? " is-active" : ""}`} key={src} aria-hidden={index !== imageIndex} onClick={() => index !== imageIndex && setImageIndex(index)}>
            <Image src={src} alt={`${current.title}：${current.imageLabels?.[index] ?? `成果图 ${index + 1}`}`} fill sizes="96vw" priority={active === 0 && index === 0} />
          </figure>
        ))}
      </div>

      <div className="portal-controls archive-controls">
        <button type="button" onClick={() => moveImage(-1)} aria-label="上一张成果图">←</button>
        <div className="archive-caption"><strong>{current.imageLabels?.[imageIndex] ?? current.eyebrow}</strong><span>{current.proof}</span></div>
        <button type="button" onClick={() => moveImage(1)} aria-label="下一张成果图">→</button>
      </div>
      <div className="portal-progress" aria-label="选择当前章节图片">{current.images.map((src, index) => <button type="button" key={src} className={index === imageIndex ? "is-active" : ""} onClick={() => setImageIndex(index)} aria-label={`查看第 ${index + 1} 张`} />)}</div>
      <div className="archive-chapter-switch"><button type="button" onClick={() => moveChapter(-1)}>上一章节</button>{current.link && <a href={current.link.href} target="_blank" rel="noreferrer">{current.link.label} ↗</a>}<button type="button" onClick={() => moveChapter(1)}>下一章节</button></div>
    </section>
  );
}

export function ProjectCarousel({ project }: { project: Project }) {
  if (project.slug === "beichen-internship" || project.slug === "personal-portfolio") {
    return <ImmersiveShowcase project={project} />;
  }
  const visualMedia = project.media?.filter((item) => item.type === "image") ?? [];
  const slides = visualMedia.length > 0
    ? visualMedia.map((item, index) => ({ eyebrow: `实物素材 0${index + 1}`, text: item.alt, image: item.src }))
    : project.outcomes.map((text, index) => ({ eyebrow: `成果 0${index + 1}`, text, image: "" }));
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef<number | null>(null);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sheets = gsap.utils.toArray<HTMLElement>(".generic-sheet");
    sheets.forEach((sheet, index) => {
      const offset = wrapOffset(index, active, sheets.length);
      gsap.to(sheet, { xPercent: -50, yPercent: -50, x: offset * Math.min(window.innerWidth * .44, 700), z: Math.abs(offset) * -260, rotationY: offset * -18, scale: offset === 0 ? 1 : .76, autoAlpha: Math.abs(offset) > 1 ? 0 : offset === 0 ? 1 : .25, zIndex: 20 - Math.abs(offset), duration: reduced ? 0 : .7, ease: "power3.inOut", overwrite: "auto" });
    });
  }, { scope: stageRef, dependencies: [active], revertOnUpdate: true });

  const move = (step: number) => setActive((current) => (current + step + slides.length) % slides.length);

  return (
    <section className="media-portal generic-gallery" aria-label={`${project.label}全屏成果轮播`} tabIndex={0} onKeyDown={(event) => { if (event.key === "ArrowLeft") move(-1); if (event.key === "ArrowRight") move(1); }}>
      <header className="portal-heading"><div><span>{project.kicker}</span><strong>{project.title}</strong></div><p>{String(active + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}</p></header>
      <div className="portal-stage" ref={stageRef} onPointerDown={(event) => { dragStart.current = event.clientX; event.currentTarget.setPointerCapture(event.pointerId); }} onPointerUp={(event) => { const delta = dragStart.current === null ? 0 : event.clientX - dragStart.current; if (Math.abs(delta) > 45) move(delta > 0 ? -1 : 1); dragStart.current = null; }}>
        {slides.map((slide, index) => {
          return (
            <figure
              className={index === active ? "portal-sheet generic-sheet is-active" : "portal-sheet generic-sheet"}
              aria-hidden={index !== active}
              key={`${slide.eyebrow}-${slide.text}`}
              onClick={() => index !== active && setActive(index)}
            >
              {slide.image ? <Image src={slide.image} alt={slide.text} fill sizes="96vw" priority={index === 0} /> : <figcaption>{slide.text}</figcaption>}
            </figure>
          );
        })}
      </div>
      <div className="portal-controls">
        <button type="button" onClick={() => move(-1)} aria-label="上一张">←</button>
        <div className="archive-caption"><strong>{slides[active].eyebrow}</strong><span>{slides[active].text}</span></div>
        <button type="button" onClick={() => move(1)} aria-label="下一张">→</button>
      </div>
      <div className="portal-progress">{slides.map((slide, index) => <button type="button" key={slide.eyebrow} className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={`查看第 ${index + 1} 张`} />)}</div>
    </section>
  );
}

const artWorks = [
  ["/projects/art/clothing-hoodie.jpg", "服装材质练习：卫衣"],
  ["/projects/art/clothing-knit.jpg", "服装材质练习：毛衣"],
  ["/projects/art/clothing-fluffy.jpg", "服装材质练习：毛绒质感"],
  ["/projects/art/clothing-skirt.jpg", "服装结构练习：百褶裙"],
  ["/projects/art/hair-short-study.jpg", "参考复刻练习：短发"],
  ["/projects/art/hair-hairpin-study.jpg", "参考复刻练习：古风发簪"],
  ["/projects/art/hair-wavy-study.jpg", "参考复刻练习：长卷发"],
  ["/projects/art/cat-drawing.jpg", "小猫绘画练习"],
];

const animeRecords = [
  ["/projects/anime/haikyu-1.jpg", "《排球少年》追番记录"],
  ["/projects/anime/gintama-1.png", "《银魂》追番记录"],
  ["/projects/anime/saiki-1.jpg", "《齐木楠雄的灾难》追番记录"],
];

export function LifeGallery() {
  const [tab, setTab] = useState<"art" | "anime">("art");
  const items = tab === "art" ? artWorks : animeRecords;
  return (
    <section className="life-gallery" aria-label="小卷的画作与追番记录">
      <div className="life-gallery__tabs" role="tablist" aria-label="生活侧面分类">
        <button type="button" className={tab === "art" ? "is-active" : ""} onClick={() => setTab("art")}>我的画作</button>
        <button type="button" className={tab === "anime" ? "is-active" : ""} onClick={() => setTab("anime")}>追番记录</button>
      </div>
      <p className="life-gallery__note">{tab === "art" ? "以下为我的绘画练习；标有“参考复刻”的作品不主张原创角色设计。" : "以下截图仅用于记录个人兴趣，不是我的绘画作品。"}</p>
      <div className="life-gallery__strip">
        {items.map(([src, caption]) => (
          <figure key={src}><div><Image src={src} alt={caption} fill sizes="180px" /></div><figcaption>{caption}</figcaption></figure>
        ))}
      </div>
    </section>
  );
}

const skills = [
  ["AI 协作", "需求拆解 · 提示迭代 · 结果核验"],
  ["嵌入式", "C · Linux · STM32 · 串口联调"],
  ["前端开发", "HTML · CSS · JavaScript · React"],
  ["产品表达", "信息架构 · 内容策划 · 项目复盘"],
  ["成长中", "后端基础 · 全栈实践 · 新工具探索"],
];

export function SkillStack() {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className={expanded ? "skill-stack is-expanded" : "skill-stack"} onPointerEnter={() => setExpanded(true)} onPointerLeave={() => setExpanded(false)}>
      <button className="skill-stack__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        {expanded ? "收起工具卡" : "展开工具卡"}
      </button>
      <div className="skill-stack__cards">
        {skills.map(([title, detail], index) => (
          <article className="skill-ticket" key={title} style={{ "--skill-index": index } as CSSProperties}>
            <span>0{index + 1}</span><strong>{title}</strong><small>{detail}</small>
          </article>
        ))}
      </div>
    </div>
  );
}

export function AboutLayout() {
  const [expanded, setExpanded] = useState(false);
  const facts = [
    ["学习", profile.education],
    ["成绩", profile.score],
    ["实践", "AI 应用、嵌入式与前端开发"],
    ["生活", profile.interests.join(" · ")],
  ];
  return (
    <div className={expanded ? "about-switch is-expanded" : "about-switch"}>
      <button className="about-switch__toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((value) => !value)}>
        <span>{expanded ? "切回简历线索" : "展开小卷名片"}</span><b aria-hidden="true">↗</b>
      </button>
      <div className="about-switch__layout">
        {facts.map(([label, value], index) => (
          <article className="about-line" key={label} style={{ "--about-index": index } as CSSProperties}>
            <span>{label}</span><strong>{value}</strong><i aria-hidden="true">{String(index + 1).padStart(2, "0")}</i>
          </article>
        ))}
      </div>
    </div>
  );
}

type SketchPoint = { id: number; x: number; y: number; rotate: number };

export function SketchPostcard() {
  const [points, setPoints] = useState<SketchPoint[]>([]);
  const lastPoint = useRef(0);

  const draw = (event: PointerEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastPoint.current < 45) return;
    lastPoint.current = now;
    const rect = event.currentTarget.getBoundingClientRect();
    const point = { id: now, x: event.clientX - rect.left, y: event.clientY - rect.top, rotate: Math.round((event.clientX + event.clientY) % 35) - 17 };
    setPoints((current) => [...current.slice(-7), point]);
  };

  return (
    <div className="sketch-postcard" onPointerMove={draw} onPointerDown={draw}>
      <span className="sketch-postcard__hint">在明信片上移动指针，留下灵感笔迹</span>
      <strong>HELLO, NICE TO MEET YOU!</strong>
      <p>谢谢你逛到这里。想聊项目、实习或新的合作，都欢迎来信。</p>
      <div className="sketch-stamp" aria-hidden="true">小卷</div>
      <div className="sketch-trail" aria-hidden="true">
        {points.map((point, index) => (
          <i key={point.id} style={{ left: point.x, top: point.y, rotate: `${point.rotate}deg`, opacity: (index + 1) / points.length }} />
        ))}
      </div>
    </div>
  );
}

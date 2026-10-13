"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AboutLayout,
  LifeGallery,
  LinuxMiniMap,
  ProjectCarousel,
  SketchPostcard,
  SkillStack,
} from "@/components/interactive-previews";
import { links, profile, projects, type Project } from "@/lib/portfolio-data";

gsap.registerPlugin(useGSAP);

type ExtraItem = {
  id: "tools" | "about" | "contact" | "cat-left" | "cat-right";
  label: string;
  kicker: string;
  title: string;
  description: string;
};

type ActiveItem = Project | ExtraItem;

const extras: ExtraItem[] = [
  {
    id: "tools",
    label: "技能工具墙",
    kicker: "摊位工具墙",
    title: "真正用过，才挂上墙",
    description: "AI 协作开发、C、Linux、嵌式调试、HTML、CSS、JavaScript，以及把需求一步步做成可验收成果的能力。",
  },
  {
    id: "about",
    label: "认识小卷",
    kicker: "摊主小册子",
    title: "你好，我是小卷",
    description: `我是李雅洁，也可以亲切地叫我小卷。${profile.education}。${profile.score}。我喜欢把 AI 当作协作伙伴，也喜欢画画、追番、养猫和寻找好吃的。`,
  },
  {
    id: "contact",
    label: "联系明信片",
    kicker: "带走一张明信片",
    title: "很高兴你逛到这里",
    description: "如果你对我的项目、实习经历或合作方向感兴趣，欢迎通过邮箱或 GitHub 联系我。",
  },
  {
    id: "cat-left",
    label: "摸摸左边猫猫",
    kicker: "喵呜 · 摊位彩蛋",
    title: "它替小卷守着今天的作品",
    description: "这只比较安静，最喜欢趴在摊台边观察来来往往的人。再点点右边那只，它们的性格不太一样。",
  },
  {
    id: "cat-right",
    label: "和右边猫猫击掌",
    kicker: "啪！ · 摊位彩蛋",
    title: "击掌成功，今日灵感＋1",
    description: "这只更活泼，负责提醒你：桌上的四件作品都可以点开，工具墙和小册子里也藏着内容。",
  },
];

const isProject = (item: ActiveItem): item is Project => "slug" in item;

const projectAssets = [
  "/images/stall-layers/project-game.png",
  "/images/stall-layers/project-linux.png",
  "/images/stall-layers/project-beichen.png",
  "/images/stall-layers/project-drawing.png",
];

// 摊位上展示的四件作品（《馍饼店》顶替原「AI 作品集」；后者详情页保留，可从快捷入口访问）
const stallProjects = projects.filter((project) => project.slug !== "personal-portfolio");

const extraAssets: Record<ExtraItem["id"], string> = {
  tools: "/images/stall-layers/skills-wall.png",
  about: "/images/stall-layers/about-booklet.png",
  contact: "/images/stall-layers/contact-postcard-front.png",
  "cat-left": "/images/stall-layers/cat-left-body.png",
  "cat-right": "/images/stall-layers/cat-right-body.png",
};

export default function Home() {
  const [activeItem, setActiveItem] = useState<ActiveItem | null>(null);
  const sceneRef = useRef<HTMLElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const openItem = (item: ActiveItem) => {
    setActiveItem(item);
    if (isProject(item)) {
      const url = new URL(window.location.href);
      url.searchParams.set("project", item.slug);
      window.history.pushState({}, "", url);
    }
  };

  const closeItem = () => {
    if (activeItem && isProject(activeItem)) {
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      window.history.pushState({}, "", url);
    }
    if (activeItem && !isProject(activeItem) && activeItem.id === "contact") {
      const postcard = sceneRef.current?.querySelector<HTMLElement>(".postcard-flipper");
      if (postcard) gsap.to(postcard, { rotationY: 0, duration: .32, ease: "power2.out", overwrite: "auto" });
    }
    setActiveItem(null);
  };

  useEffect(() => {
    const syncFromUrl = () => {
      const slug = new URL(window.location.href).searchParams.get("project");
      setActiveItem(slug ? projects.find((project) => project.slug === slug) ?? null : null);
    };
    syncFromUrl();
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const { contextSafe } = useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({
      motionOK: "(prefers-reduced-motion: no-preference)",
      compact: "(max-width: 760px)",
    }, (context) => {
      if (!context.conditions?.motionOK) return;

      const timeline = gsap.timeline();
      timeline
        .from(".stall-stage", { autoAlpha: 0, scale: .965, y: 24, duration: .75, ease: "power2.out" })
        .from(".stall-sign", { autoAlpha: 0, y: -14, duration: .45, ease: "back.out(1.5)" }, "-=.25")
        .from(".stall-hotspot", { autoAlpha: 0, scale: 0, stagger: .06, duration: .35, ease: "back.out(2)" }, "-=.2");

      gsap.to(".stall-hotspot--cat-left .stall-object__image", {
        y: context.conditions?.compact ? -2 : -4,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: "sine.inOut",
      });
      gsap.to(".cat-part--left-tail", {
        rotation: 7,
        repeat: -1,
        yoyo: true,
        duration: 1.35,
        ease: "sine.inOut",
      });
      gsap.timeline({ repeat: -1, repeatDelay: 2.3 })
        .to(".cat-part--right-paw", { rotation: -12, duration: .18, ease: "power1.out" })
        .to(".cat-part--right-paw", { rotation: 13, duration: .2, ease: "sine.inOut" })
        .to(".cat-part--right-paw", { rotation: -8, duration: .18, ease: "sine.inOut" })
        .to(".cat-part--right-paw", { rotation: 0, duration: .24, ease: "power1.out" });
    });
    return () => mm.revert();
  }, { scope: sceneRef });

  useGSAP(() => {
    if (!activeItem || !dialogRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.fromTo(dialogRef.current,
      { autoAlpha: 0, y: 20, scale: .96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: .38, ease: "back.out(1.35)" },
    );
  }, { dependencies: [activeItem], scope: dialogRef, revertOnUpdate: true });

  const animateThenOpen = contextSafe((item: ActiveItem, selector: string, motion: "lift" | "wiggle" | "flip") => {
    const target = sceneRef.current?.querySelector<HTMLElement>(selector);
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      openItem(item);
      return;
    }

    const timeline = gsap.timeline({ onComplete: () => openItem(item) });
    if (motion === "flip") {
      timeline.to(target, { rotationY: 180, duration: .46, ease: "power2.inOut" });
      return;
    }
    if (motion === "wiggle") {
      timeline
        .to(target, { rotation: -5, scale: 1.04, duration: .12, ease: "power1.out" })
        .to(target, { rotation: 5, duration: .14, ease: "sine.inOut" })
        .to(target, { rotation: 0, scale: 1, duration: .16, ease: "power1.out" });
      return;
    }
    timeline
      .to(target, { y: -12, scale: 1.07, duration: .18, ease: "power2.out" })
      .to(target, { y: 0, scale: 1, duration: .22, ease: "back.out(1.5)" });
  });

  const openProject = (project: Project, index: number) => animateThenOpen(project, `.stall-hotspot--project-${index + 1}`, "lift");
  const openExtra = (item: ExtraItem) => {
    if (item.id === "contact") {
      animateThenOpen(item, ".postcard-flipper", "flip");
      return;
    }
    animateThenOpen(item, `.stall-hotspot--${item.id}`, item.id.startsWith("cat-") ? "wiggle" : "lift");
  };

  return (
    <main className="shop-game">
      <header className="game-bar">
        <a className="game-brand" href="#stall">小卷的周末创意小摊</a>
        <p><span aria-hidden="true">✦</span> 点击摊位上的物件来逛作品</p>
        <a className="contact-chip" href={links.email}>联系摊主</a>
      </header>

      <section className="stall-viewport" id="stall" aria-label="可互动的个人作品摊位" ref={sceneRef}>
        <div className="stall-stage">
          <Image
            className="stall-art"
            src="/images/stall-layers/stall-background.png"
            alt="白天的可爱周末创意市集摊位"
            fill
            priority
            sizes="(max-width: 900px) 1160px, 100vw"
          />

          <div className="stall-sign" aria-label="摊位介绍">
            <span>通信工程学生 · AI 应用实践</span>
            <strong>小卷的创意小摊</strong>
          </div>

          {stallProjects.map((project, index) => (
            <button className={`stall-hotspot stall-object stall-hotspot--project-${index + 1}`} key={project.slug} type="button" aria-label={`查看${project.label}`} onClick={() => openProject(project, index)}>
              <Image className="stall-object__image" src={projectAssets[index]} alt="" fill sizes="20vw" />
              <span className="hotspot-dot" aria-hidden="true">＋</span>
              <span className="hotspot-label">{project.label}</span>
            </button>
          ))}

          {extras.map((item) => (
            <button className={`stall-hotspot stall-object stall-hotspot--${item.id}`} key={item.id} type="button" aria-label={item.label} onClick={() => openExtra(item)}>
              {item.id === "cat-left" && <Image className="cat-part cat-part--left-tail" src="/images/stall-layers/cat-left-tail.png" alt="" fill sizes="10vw" />}
              {item.id === "contact" ? (
                <span className="postcard-flipper" aria-hidden="true">
                  <Image className="postcard-face postcard-face--front" src="/images/stall-layers/contact-postcard-front.png" alt="" fill sizes="16vw" />
                  <Image className="postcard-face postcard-face--back" src="/images/stall-layers/contact-postcard-back.png" alt="" fill sizes="16vw" />
                </span>
              ) : <Image className="stall-object__image" src={extraAssets[item.id]} alt="" fill sizes="22vw" />}
              {item.id === "cat-right" && <Image className="cat-part cat-part--right-paw" src="/images/stall-layers/cat-right-paw.png" alt="" fill sizes="8vw" />}
              <span className="hotspot-dot" aria-hidden="true">＋</span>
              <span className="hotspot-label">{item.label}</span>
            </button>
          ))}

        </div>
      </section>

      <nav className="counter-menu" aria-label="摊位物件快捷入口">
        {projects.map((project) => (
          <button key={project.slug} type="button" onClick={() => openItem(project)}><span>{project.kicker.split(" · ")[0]}</span>{project.label}</button>
        ))}
        {extras.slice(0, 3).map((item) => (
          <button key={item.id} type="button" onClick={() => openItem(item)}><span>＋</span>{item.label}</button>
        ))}
      </nav>

      <Dialog open={Boolean(activeItem)} onOpenChange={(open) => !open && closeItem()}>
        <DialogContent className={activeItem && isProject(activeItem) ? "stall-dialog project-stage-dialog" : "stall-dialog"} ref={dialogRef}>
          {activeItem && (
            <>
              <DialogHeader className={isProject(activeItem) ? "sr-only" : ""}>
                <p className="dialog-kicker">{activeItem.kicker}</p>
                <DialogTitle>{activeItem.title}</DialogTitle>
                <DialogDescription>{isProject(activeItem) ? activeItem.summary : activeItem.description}</DialogDescription>
              </DialogHeader>

              {isProject(activeItem) && (
                <>
                  {activeItem.slug === "linux-ai-terminal" && <LinuxMiniMap project={activeItem} />}
                  {activeItem.slug !== "linux-ai-terminal" && <ProjectCarousel project={activeItem} />}
                </>
              )}
              {isProject(activeItem) && activeItem.external && (
                <div className="dialog-actions">
                  <a href={activeItem.external.href} target="_blank" rel="noreferrer">{activeItem.external.label} ↗</a>
                </div>
              )}

              {!isProject(activeItem) && activeItem.id === "tools" && <SkillStack />}
              {!isProject(activeItem) && activeItem.id === "about" && (
                <>
                  <AboutLayout />
                  <LifeGallery />
                  <ul className="mini-list">{profile.awards.map((award) => <li key={award}>{award}</li>)}</ul>
                </>
              )}
              {!isProject(activeItem) && activeItem.id === "contact" && (
                <>
                  <SketchPostcard />
                  <div className="dialog-actions">
                    <a href={links.email}>发送邮件</a>
                    <a href={links.github} target="_blank" rel="noreferrer">打开 GitHub</a>
                    <a href={links.portfolio} target="_blank" rel="noreferrer">飞书作品集</a>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

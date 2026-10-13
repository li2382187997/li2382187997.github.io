import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/portfolio-data";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return {
    title: project ? `${project.title}｜小卷的创意小摊` : "项目档案｜小卷的创意小摊",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return <main className="project-not-found"><p>这件作品暂时不在摊位上。</p><Link href="/">返回创意小摊</Link></main>;
  }

  return (
    <main className="case-page">
      <nav className="case-nav">
        <Link href="/">← 返回创意小摊</Link>
        <span>{project.kicker}</span>
      </nav>

      <header className="case-hero">
        <p>{project.role}</p>
        <h1>{project.title}</h1>
        <div className="case-tech">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
      </header>

      <section className="case-grid">
        <article className="case-card case-card--wide">
          <span className="case-card__label">项目背景</span>
          <p className="case-lead">{project.summary}</p>
        </article>
        <article className="case-card">
          <span className="case-card__label">我的角色</span>
          <p>{project.role}</p>
        </article>
        <article className="case-card">
          <span className="case-card__label">AI 参与边界</span>
          <p>{project.aiBoundary}</p>
        </article>
        <article className="case-card">
          <span className="case-card__label">关键过程</span>
          <ol>{project.process.map((item) => <li key={item}>{item}</li>)}</ol>
        </article>
        <article className="case-card case-card--accent">
          <span className="case-card__label">可验证成果</span>
          <ul>{project.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
        </article>
        <article className="case-card case-card--wide">
          <span className="case-card__label">复盘</span>
          <p className="case-lead">{project.reflection}</p>
        </article>
      </section>

      {project.media && project.media.length > 0 && (
        <section className="case-media" aria-label="项目材料">
          <div className="case-section-title"><span>真实材料</span><h2>看看它实际做成了什么</h2></div>
          <div className="media-grid">
            {project.media.map((media) => media.type === "image" ? (
              <figure key={media.src}>
                <Image src={media.src} alt={media.alt} width={1200} height={800} sizes="(max-width: 760px) 100vw, 50vw" />
                <figcaption>{media.alt}</figcaption>
              </figure>
            ) : (
              <figure key={media.src}>
                <video controls preload="metadata" aria-label={media.alt}><source src={media.src} type="video/mp4" />你的浏览器暂不支持播放该视频。</video>
                <figcaption>{media.alt}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <footer className="case-footer">
        <div><span>逛完这件作品了吗？</span><strong>摊位上还有三件。</strong></div>
        <div className="case-footer__actions">
          {project.external && <a href={project.external.href} target="_blank" rel="noreferrer">{project.external.label} ↗</a>}
          <Link href="/">继续逛摊位 →</Link>
        </div>
      </footer>
    </main>
  );
}

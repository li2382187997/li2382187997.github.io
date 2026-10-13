import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小卷的周末创意市集｜AI 应用与个人作品集",
  description: "通信工程学生小卷的个人作品集，展示 AI 应用、嵌入式 Linux、北辰实习与绘画工具实践。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  );
}

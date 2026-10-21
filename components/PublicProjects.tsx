/**
 * [INPUT]: 依赖公开项目快照、首页文案与 Card 分区组件
 * [OUTPUT]: 导出 PublicProjects 项目目录组件
 * [POS]: components 的源码目录，链接区贴齐卡片底部；不请求 GitHub 或持有凭据
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */

import { Code, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Locale, UI_STRINGS } from "@/lib/home-i18n";
import { PUBLIC_PROJECTS } from "@/lib/public-projects";

export function PublicProjects({ locale }: { locale: Locale }) {
  const copy = UI_STRINGS[locale];

  return (
    <section aria-labelledby="public-projects-title" className="mt-12 lg:mt-16">
      <h2
        id="public-projects-title"
        className="text-sm font-bold tracking-wide sm:text-base lg:text-xl xl:text-2xl"
      >
        {copy.publicProjectsTitle} · {PUBLIC_PROJECTS.length}
      </h2>
      <p className="mt-3 max-w-3xl text-sm opacity-70 sm:text-base">
        {copy.publicProjectsDescription}
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-2 xl:gap-8">
        {PUBLIC_PROJECTS.map((project) => (
          <Card
            key={project.fullName}
            className="flex min-w-0 flex-col border-current bg-transparent text-inherit transition-shadow hover:shadow-lg"
          >
            <CardHeader className="pb-4">
              <CardTitle className="text-base leading-tight font-bold break-words sm:text-lg lg:text-xl">
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-[1.5px] underline-offset-4"
                >
                  {project.fullName.split("/")[1]}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 pb-4">
              {project.description ? (
                <p className="text-sm break-words opacity-80 sm:text-base">{project.description}</p>
              ) : null}
              <p className="text-xs opacity-70">
                {project.license ?? copy.licenseUnknownLabel}
                {project.archived ? ` · ${copy.archivedLabel}` : ""}
              </p>
            </CardContent>
            <CardFooter className="mt-auto flex-col items-start gap-3 text-sm">
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-start gap-2 hover:underline"
              >
                <Code size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                <span className="break-all">
                  {copy.sourceLinkLabel} · {project.fullName}
                </span>
              </a>
              {project.websiteUrl ? (
                <a
                  href={project.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-start gap-2 hover:underline"
                >
                  <ExternalLink size={16} aria-hidden="true" className="mt-0.5 shrink-0" />
                  <span className="break-all">
                    {copy.projectLinkLabel} ·{" "}
                    {project.websiteUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                  </span>
                </a>
              ) : null}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

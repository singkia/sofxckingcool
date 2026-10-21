/**
 * [INPUT]: 依赖首页文案、布局规则、可访问配色与 PublicProjects 公开项目目录
 * [OUTPUT]: 对外提供 Home 首页组件
 * [POS]: pages 的首页入口，首屏字标适配 320px；负责主题随机化与卡片导航
 * [PROTOCOL]: 变更时更新此头部，然后检查 CLAUDE.md
 */
/* oxlint-disable react/set-state-in-effect -- SSR 首次渲染保持确定；挂载后同步浏览器偏好与随机主题。 */

import { ExternalLink, Globe, Shuffle } from "lucide-react";
import { useState, useEffect, useCallback, startTransition, useMemo } from "react";
import { generateRandomColors, isAccessibleColorPair } from "@/utils/colors";
import { Font } from "@/components/Font";
import { PublicProjects } from "@/components/PublicProjects";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { getHomeLogoInlineOffset, getHomeLogoSize } from "@/lib/home-layout";
import {
  DEFAULT_LOCALE,
  detectLocaleFromLanguages,
  HOME_LOCALE_STORAGE_KEY,
  isLocale,
  Locale,
  pickRandomLocale,
  SITES,
  UI_STRINGS,
} from "@/lib/home-i18n";

const BODY_FONT_CLASS_BY_LOCALE: Record<Locale, string> = {
  "zh-Hant": "font-zh-hant",
  "zh-Hans": "font-zh-hans",
  en: "",
  ja: "font-ja",
  fr: "",
  ko: "font-ko",
};

function getDisplayUrl(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function getUrlColor(value: string | null) {
  return value && /^[0-9a-f]{6}$/i.test(value) ? `#${value}` : null;
}

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState("");
  const [textColor, setTextColor] = useState("");
  // SSR 按最窄支持视口渲染，挂载后采用实际宽度。
  const [logoSize, setLogoSize] = useState(() => getHomeLogoSize(320));
  const [colorsSetByUrl, setColorsSetByUrl] = useState(false);
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [localeHydrated, setLocaleHydrated] = useState(false);

  const generateRandomColorsForPage = useCallback(() => {
    if (!colorsSetByUrl) {
      const { backgroundColor, textColor } = generateRandomColors();
      setBackgroundColor(backgroundColor);
      setTextColor(textColor);
    }
  }, [colorsSetByUrl]);

  const shuffleThemeAndLocale = useCallback(() => {
    generateRandomColorsForPage();
    startTransition(() => {
      setLocale((currentLocale) => pickRandomLocale(currentLocale));
    });
  }, [generateRandomColorsForPage]);

  const setInitialColorsForPage = useCallback(() => {
    const { backgroundColor, textColor } = generateRandomColors();
    setBackgroundColor(backgroundColor);
    setTextColor(textColor);
  }, []);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bgColor = getUrlColor(searchParams.get("bg"));
    const txtColor = getUrlColor(searchParams.get("txt"));

    if (bgColor && txtColor && isAccessibleColorPair(bgColor, txtColor)) {
      setBackgroundColor(bgColor);
      setTextColor(txtColor);
      setColorsSetByUrl(true);
    } else {
      setInitialColorsForPage();
      setColorsSetByUrl(false);
    }
  }, [setInitialColorsForPage]);

  useEffect(() => {
    const storedLocale = window.localStorage.getItem(HOME_LOCALE_STORAGE_KEY);
    const nextLocale = isLocale(storedLocale)
      ? storedLocale
      : detectLocaleFromLanguages(window.navigator.languages);

    setLocale(nextLocale);
    setLocaleHydrated(true);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;

    if (!localeHydrated) {
      return;
    }

    window.localStorage.setItem(HOME_LOCALE_STORAGE_KEY, locale);
  }, [locale, localeHydrated]);

  useEffect(() => {
    document.documentElement.style.backgroundColor = backgroundColor;
    document.body.style.backgroundColor = backgroundColor;
  }, [backgroundColor]);

  useEffect(() => {
    const handleKeyPress = () => {
      generateRandomColorsForPage();
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [generateRandomColorsForPage]);

  useEffect(() => {
    const updateLogoSize = () => {
      setLogoSize(getHomeLogoSize(window.innerWidth));
    };

    updateLogoSize();
    window.addEventListener("resize", updateLogoSize);

    return () => {
      window.removeEventListener("resize", updateLogoSize);
    };
  }, []);

  const currentFontClassName = BODY_FONT_CLASS_BY_LOCALE[locale];
  const uiStrings = UI_STRINGS[locale];

  const visibleSiteCards = useMemo(
    () =>
      SITES.map((site) => ({
        site,
        copy: site.copies[locale],
      })),
    [locale]
  );

  return (
    <div
      className={cn("min-h-screen font-sans transition-colors duration-300", currentFontClassName)}
      style={{
        fontFamily: locale === "en" || locale === "fr" ? "Helvetica Neue, sans-serif" : undefined,
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      <div className="mx-auto px-4 py-8 sm:py-12 md:px-6 lg:px-8 lg:py-16">
        <header className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-start xl:mb-16">
          <div
            className="mb-1 flex max-w-full min-w-0 items-center sm:mb-0"
            style={{ marginLeft: getHomeLogoInlineOffset() }}
          >
            <Font text="SO FXCKING COOL" color={textColor} size={logoSize} />
          </div>
          <div className="relative hidden sm:block sm:self-auto">
            <button
              aria-label={uiStrings.shuffleLabel}
              title={uiStrings.shuffleLabel}
              onClick={shuffleThemeAndLocale}
              className="rounded p-2 xl:p-4"
              style={{ backgroundColor: textColor, color: backgroundColor }}
            >
              <Shuffle size={24} className="xl:h-8 xl:w-8" />
            </button>
          </div>
        </header>

        <main>
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-sm font-bold tracking-wide sm:text-base lg:text-xl xl:text-2xl">
              {uiStrings.showcaseCount(visibleSiteCards.length)}
            </h2>
          </div>

          {visibleSiteCards.length === 0 ? (
            <div className="py-16 text-center">
              <Globe size={48} className="mx-auto mb-4 opacity-50" />
              <p className="mb-2 text-lg font-bold">{uiStrings.emptyTitle}</p>
              <p className="text-sm opacity-75">{uiStrings.emptyDescription}</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:gap-8">
              {visibleSiteCards.map(({ site, copy }) => {
                return (
                  <Card
                    key={site.id}
                    className="transition-all hover:shadow-lg"
                    style={{
                      backgroundColor: backgroundColor,
                      borderColor: textColor,
                      color: textColor,
                    }}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="max-w-3xl text-base leading-tight font-bold sm:text-lg lg:text-xl">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-[1.5px] underline-offset-4"
                            style={{ color: textColor }}
                          >
                            {copy.title}
                          </a>
                        </CardTitle>
                        <a
                          className="shrink-0"
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={uiStrings.externalLinkLabel}
                        >
                          <ExternalLink size={18} />
                        </a>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex min-h-[108px] flex-col justify-between gap-6">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-base">
                          <a
                            className="text-sm opacity-80 hover:underline sm:text-base"
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {copy.description}
                          </a>
                        </div>
                        <div className="flex items-end">
                          <div className="flex items-center gap-2 text-sm opacity-70">
                            <Globe size={14} />
                            <a
                              className="hover:underline"
                              href={site.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {getDisplayUrl(site.url)}
                            </a>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
          <PublicProjects locale={locale} />
        </main>
      </div>
    </div>
  );
}

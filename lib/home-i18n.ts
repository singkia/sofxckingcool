export type Locale = "zh-Hant" | "zh-Hans" | "en" | "ja" | "fr" | "ko";

export interface LocalizedSiteCopy {
  title: string;
  description: string;
}

export interface LocalizedSite {
  id: string;
  url: string;
  copies: Record<Locale, LocalizedSiteCopy>;
}

export const DEFAULT_LOCALE: Locale = "en";
export const HOME_LOCALE_STORAGE_KEY = "sofxckingcool.home.locale";

export const SUPPORTED_LOCALES: Locale[] = [
  "zh-Hant",
  "zh-Hans",
  "en",
  "ja",
  "fr",
  "ko",
];

export const SITE_ORDER = [
  "jikan",
  "lomopic",
  "wordcounter",
  "chinese-converter",
] as const;

const SITE_RECORD: Record<(typeof SITE_ORDER)[number], LocalizedSite> = {
  jikan: {
    id: "jikan",
    url: "https://jikan.life/",
    copies: {
      "zh-Hant": {
        title: "年度進度壁紙產生器",
        description: "根據年度進度與個人目標產生像素風動態壁紙。",
      },
      "zh-Hans": {
        title: "年度进度壁纸生成器",
        description: "根据年度进度与个人目标生成像素风动态壁纸。",
      },
      en: {
        title: "Year Progress Wallpaper Generator",
        description:
          "Generate pixel-style dynamic wallpapers based on your year progress and goals.",
      },
      ja: {
        title: "年間進捗壁紙ジェネレーター",
        description:
          "年間の進捗と目標をもとに、ピクセル風の動的壁紙を生成します。",
      },
      fr: {
        title: "Générateur de fonds d'écran de progression annuelle",
        description:
          "Générez des fonds d'écran dynamiques en pixel art à partir de votre progression annuelle et de vos objectifs.",
      },
      ko: {
        title: "연간 진행도 배경화면 생성기",
        description:
          "연간 진행도와 목표를 바탕으로 픽셀 스타일의 동적 배경화면을 생성합니다.",
      },
    },
  },
  lomopic: {
    id: "lomopic",
    url: "https://www.lomopic.com/",
    copies: {
      "zh-Hant": {
        title: "拍立得照片產生器",
        description: "把照片轉成復古即影即有風格的線上工具。",
      },
      "zh-Hans": {
        title: "拍立得照片生成器",
        description: "把照片转换成复古即时成像风格的在线工具。",
      },
      en: {
        title: "Instant Photo Frame Generator",
        description:
          "Turn your photos into vintage instant-camera style pictures.",
      },
      ja: {
        title: "インスタント写真フレーム生成器",
        description:
          "写真をレトロなインスタント写真風に変換するオンラインツールです。",
      },
      fr: {
        title: "Générateur de cadres photo instantanés",
        description:
          "Transformez vos photos en images au style d'appareil instantané vintage.",
      },
      ko: {
        title: "즉석 사진 프레임 생성기",
        description:
          "사진을 빈티지 즉석카메라 스타일 이미지로 바꿔주는 온라인 도구입니다.",
      },
    },
  },
  wordcounter: {
    id: "wordcounter",
    url: "https://www.wordcounter.cv/",
    copies: {
      "zh-Hant": {
        title: "字數與字元統計工具",
        description: "支援多語言的字數、字元與文字分析工具。",
      },
      "zh-Hans": {
        title: "字数与字符统计工具",
        description: "支持多语言的字数、字符与文本分析工具。",
      },
      en: {
        title: "Word and Character Counter",
        description:
          "A multilingual tool for word counting, character counting, and text analysis.",
      },
      ja: {
        title: "文字数・文字カウントツール",
        description: "多言語に対応した文字数・単語数・テキスト分析ツールです。",
      },
      fr: {
        title: "Compteur de mots et de caractères",
        description:
          "Un outil multilingue pour compter les mots, les caractères et analyser le texte.",
      },
      ko: {
        title: "단어 및 문자 수 카운터",
        description:
          "다국어 단어 수, 문자 수, 텍스트 분석을 지원하는 도구입니다.",
      },
    },
  },
  "chinese-converter": {
    id: "chinese-converter",
    url: "https://cc.sofxcking.cool/",
    copies: {
      "zh-Hant": {
        title: "中文簡繁轉換器",
        description: "基於 OpenCC 的免費線上簡繁體轉換工具。",
      },
      "zh-Hans": {
        title: "中文简繁转换器",
        description: "基于 OpenCC 的免费在线简繁体转换工具。",
      },
      en: {
        title: "Chinese Simplified-Traditional Converter",
        description:
          "A free online converter between Simplified and Traditional Chinese, powered by OpenCC.",
      },
      ja: {
        title: "中国語簡体字・繁体字変換ツール",
        description:
          "OpenCC を利用した無料の中国語簡体字・繁体字変換ツールです。",
      },
      fr: {
        title: "Convertisseur chinois simplifié-traditionnel",
        description:
          "Un convertisseur gratuit entre chinois simplifié et traditionnel, propulsé par OpenCC.",
      },
      ko: {
        title: "중국어 간체-번체 변환기",
        description: "OpenCC 기반의 무료 중국어 간체-번체 변환 도구입니다.",
      },
    },
  },
};

export const SITES = SITE_ORDER.map((id) => SITE_RECORD[id]);

export const UI_STRINGS: Record<
  Locale,
  {
    emptyTitle: string;
    emptyDescription: string;
    showcaseCount: (count: number) => string;
    externalLinkLabel: string;
  }
> = {
  "zh-Hant": {
    emptyTitle: "沒有可顯示的網站",
    emptyDescription: "目前沒有可用的連結網站。",
    showcaseCount: (count) => `目前展示 ${count} 個網站`,
    externalLinkLabel: "打開網站",
  },
  "zh-Hans": {
    emptyTitle: "没有可显示的网站",
    emptyDescription: "当前没有可用的关联网站。",
    showcaseCount: (count) => `当前展示 ${count} 个网站`,
    externalLinkLabel: "打开网站",
  },
  en: {
    emptyTitle: "No websites found",
    emptyDescription: "No linked websites are available right now.",
    showcaseCount: (count) => `${count} websites in the current showcase`,
    externalLinkLabel: "Open website",
  },
  ja: {
    emptyTitle: "表示できるサイトがありません",
    emptyDescription: "現在利用できるリンク済みサイトはありません。",
    showcaseCount: (count) =>
      `現在のショーケースには ${count} 件のサイトがあります`,
    externalLinkLabel: "サイトを開く",
  },
  fr: {
    emptyTitle: "Aucun site trouvé",
    emptyDescription: "Aucun site lié n'est disponible pour le moment.",
    showcaseCount: (count) => `${count} sites dans la vitrine actuelle`,
    externalLinkLabel: "Ouvrir le site",
  },
  ko: {
    emptyTitle: "표시할 웹사이트가 없습니다",
    emptyDescription: "지금 사용할 수 있는 연결된 웹사이트가 없습니다.",
    showcaseCount: (count) => `현재 쇼케이스에 웹사이트 ${count}개가 있습니다`,
    externalLinkLabel: "웹사이트 열기",
  },
};

export function isLocale(value: string | null | undefined): value is Locale {
  return value !== null && SUPPORTED_LOCALES.includes(value as Locale);
}

export function detectLocaleFromLanguages(
  languages: readonly string[] | undefined
): Locale {
  const candidates = languages?.length ? languages : [DEFAULT_LOCALE];

  for (const entry of candidates) {
    const normalized = entry.toLowerCase();

    if (
      normalized.includes("-hant") ||
      normalized === "zh-tw" ||
      normalized === "zh-hk" ||
      normalized === "zh-mo"
    ) {
      return "zh-Hant";
    }

    if (normalized.startsWith("zh")) {
      return "zh-Hans";
    }

    if (normalized.startsWith("ja")) {
      return "ja";
    }

    if (normalized.startsWith("fr")) {
      return "fr";
    }

    if (normalized.startsWith("ko")) {
      return "ko";
    }

    if (normalized.startsWith("en")) {
      return "en";
    }
  }

  return DEFAULT_LOCALE;
}

export function pickRandomLocale(
  currentLocale: Locale,
  random = Math.random
): Locale {
  const candidates = SUPPORTED_LOCALES.filter(
    (locale) => locale !== currentLocale
  );

  if (candidates.length === 0) {
    return currentLocale;
  }

  const index = Math.floor(random() * candidates.length);
  return candidates[index] ?? currentLocale;
}

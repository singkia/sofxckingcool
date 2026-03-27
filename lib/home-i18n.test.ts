import test from "node:test";
import assert from "node:assert/strict";

import {
  detectLocaleFromLanguages,
  pickRandomLocale,
  SITE_ORDER,
  SITES,
  SUPPORTED_LOCALES,
} from "@/lib/home-i18n";

test("detectLocaleFromLanguages maps Traditional Chinese variants to zh-Hant", () => {
  assert.equal(detectLocaleFromLanguages(["zh-TW", "en-US"]), "zh-Hant");
  assert.equal(detectLocaleFromLanguages(["zh-HK"]), "zh-Hant");
  assert.equal(detectLocaleFromLanguages(["zh-Hant-MO"]), "zh-Hant");
});

test("detectLocaleFromLanguages maps simplified Chinese and falls back to English", () => {
  assert.equal(detectLocaleFromLanguages(["zh-CN"]), "zh-Hans");
  assert.equal(detectLocaleFromLanguages(["zh-SG", "ja-JP"]), "zh-Hans");
  assert.equal(detectLocaleFromLanguages(["de-DE"]), "en");
});

test("detectLocaleFromLanguages maps supported non-Chinese locales", () => {
  assert.equal(detectLocaleFromLanguages(["ja-JP"]), "ja");
  assert.equal(detectLocaleFromLanguages(["fr-CA"]), "fr");
  assert.equal(detectLocaleFromLanguages(["ko-KR"]), "ko");
  assert.equal(detectLocaleFromLanguages(["en-US"]), "en");
});

test("pickRandomLocale never returns the current locale when alternatives exist", () => {
  const picks = new Set(
    Array.from({ length: 24 }, (_, index) =>
      pickRandomLocale("en", () => index / 24)
    )
  );

  assert(!picks.has("en"));
  assert(picks.size > 1);
});

test("every site exposes copy for every supported locale", () => {
  assert.equal(SITES.length, SITE_ORDER.length);

  for (const site of SITES) {
    for (const locale of SUPPORTED_LOCALES) {
      const copy = site.copies[locale];
      assert.ok(copy, `${site.id} is missing ${locale}`);
      assert.ok(copy.title.length > 0, `${site.id} ${locale} title is empty`);
      assert.ok(
        copy.description.length > 0,
        `${site.id} ${locale} description is empty`
      );
    }
  }
});

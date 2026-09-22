import type { CityContent } from "./types";
import classesData from "../../../data/classes.json";

import georgiaAtlanta from "./georgia--atlanta";
import georgiaAugusta from "./georgia--augusta";
import illinoisChicago from "./illinois--chicago";
import illinoisQuincy from "./illinois--quincy";
import indianaIndianapolis from "./indiana--indianapolis";
import louisianaBatonRouge from "./louisiana--baton-rouge";
import louisianaNewOrleans from "./louisiana--new-orleans";
import missouriHannibal from "./missouri--hannibal";
import missouriKansasCity from "./missouri--kansas-city";
import missouriStLouis from "./missouri--st-louis";
import nebraskaOmaha from "./nebraska--omaha";
import oklahomaOklahomaCity from "./oklahoma--oklahoma-city";
import oklahomaTulsa from "./oklahoma--tulsa";
import tennesseeMemphis from "./tennessee--memphis";
import tennesseeNashville from "./tennessee--nashville";
import texasArlington from "./texas--arlington";
import texasAustin from "./texas--austin";
import texasDallas from "./texas--dallas";
import texasElPaso from "./texas--el-paso";
import texasFortWorth from "./texas--fort-worth";
import texasHouston from "./texas--houston";
import texasSanAntonio from "./texas--san-antonio";

const classSlugs = new Set(classesData.map((c) => c.slug));

/**
 * The rules from types.ts that the type system can't express. Any violation
 * throws, which fails the build: a city page should never ship thin or with
 * a broken class link.
 */
function validateCityContent(content: CityContent): string[] {
  const errors: string[] = [];
  const len = content.metaDescription.length;
  if (len < 120 || len > 160) errors.push(`metaDescription is ${len} chars (want 120–160)`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(content.updated)) errors.push(`updated "${content.updated}" is not YYYY-MM-DD`);
  if (content.intro.length < 2 || content.intro.length > 3) errors.push("intro needs 2–3 paragraphs");
  if (content.materialHandling.length < 3 || content.materialHandling.length > 5)
    errors.push("materialHandling needs 3–5 entries");
  if (content.localConsiderations.length < 2 || content.localConsiderations.length > 4)
    errors.push("localConsiderations needs 2–4 entries");
  if (content.faqs.length < 3 || content.faqs.length > 5) errors.push("faqs needs 3–5 entries");
  if (content.featuredClasses.length < 2 || content.featuredClasses.length > 4)
    errors.push("featuredClasses needs 2–4 entries");
  for (const slug of content.featuredClasses) {
    if (!classSlugs.has(slug)) errors.push(`featuredClasses has unknown slug "${slug}"`);
  }
  if (content.serviceArea.length === 0) errors.push("serviceArea is empty");
  if (content.sources.length < 4) errors.push("sources needs at least 4 entries");
  return errors;
}

/**
 * Registry of hyper-local city content. Add an import and an entry here for
 * each new city file; entries are keyed by their own `slug`.
 */
const cityContent: Record<string, CityContent> = Object.fromEntries(
  [
    georgiaAtlanta,
    georgiaAugusta,
    illinoisChicago,
    illinoisQuincy,
    indianaIndianapolis,
    louisianaBatonRouge,
    louisianaNewOrleans,
    missouriHannibal,
    missouriKansasCity,
    missouriStLouis,
    nebraskaOmaha,
    oklahomaOklahomaCity,
    oklahomaTulsa,
    tennesseeMemphis,
    tennesseeNashville,
    texasArlington,
    texasAustin,
    texasDallas,
    texasElPaso,
    texasFortWorth,
    texasHouston,
    texasSanAntonio,
  ].map((content) => {
    const errors = validateCityContent(content);
    if (errors.length) {
      throw new Error(`Invalid city content for ${content.slug}:\n  ${errors.join("\n  ")}`);
    }
    return [content.slug, content];
  })
);

export function getCityContent(slug: string): CityContent | undefined {
  return cityContent[slug.toLowerCase()];
}

export type { CityContent } from "./types";

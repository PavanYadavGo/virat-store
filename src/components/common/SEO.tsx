import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: "website" | "product" | "article";
  ogImage?: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const DEFAULT_TITLE = "Virat Sports | Cricket & Performance Sportswear";
const DEFAULT_DESC =
  "Shop cricket-inspired sportswear at Virat. Explore cricket jerseys, sports T-shirts, shorts and tracksuits designed for everyday comfort and performance.";
const DEFAULT_IMAGE = "https://www.viratsports.in/images/hero/header-1.webp";
const BASE_URL = "https://www.viratsports.in";

function updateMetaTag(attrName: "name" | "property", attrValue: string, content: string) {
  let element = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attrName, attrValue);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function updateLinkTag(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }
  element.setAttribute("href", href);
}

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonical,
  ogType = "website",
  ogImage = DEFAULT_IMAGE,
  schema,
}: SEOProps) {
  useEffect(() => {
    // 1. Page Title
    const fullTitle = title ? `${title} | Virat Sports` : DEFAULT_TITLE;
    document.title = fullTitle;

    // 2. Meta Description
    updateMetaTag("name", "description", description);

    // 3. Canonical URL
    const canonicalUrl = canonical
      ? canonical.startsWith("http")
        ? canonical
        : `${BASE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}`
      : `${BASE_URL}${window.location.pathname}`;
    updateLinkTag("canonical", canonicalUrl);

    // 4. Open Graph
    updateMetaTag("property", "og:title", fullTitle);
    updateMetaTag("property", "og:description", description);
    updateMetaTag("property", "og:type", ogType);
    updateMetaTag("property", "og:url", canonicalUrl);
    updateMetaTag("property", "og:image", ogImage);

    // 5. Twitter Card
    updateMetaTag("name", "twitter:card", "summary_large_image");
    updateMetaTag("name", "twitter:title", fullTitle);
    updateMetaTag("name", "twitter:description", description);
    updateMetaTag("name", "twitter:image", ogImage);

    // 6. Structured Data
    const scriptId = "page-structured-data";
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement | null;

    if (schema) {
      if (!scriptElement) {
        scriptElement = document.createElement("script");
        scriptElement.id = scriptId;
        scriptElement.type = "application/ld+json";
        document.head.appendChild(scriptElement);
      }
      scriptElement.textContent = JSON.stringify(
        Array.isArray(schema)
          ? { "@context": "https://schema.org", "@graph": schema }
          : { "@context": "https://schema.org", ...schema }
      );
    } else if (scriptElement) {
      scriptElement.remove();
    }

    return () => {
      // Clean up dynamic schema when leaving the page
      const currentScript = document.getElementById(scriptId);
      if (currentScript) {
        currentScript.remove();
      }
    };
  }, [title, description, canonical, ogType, ogImage, schema]);

  return null;
}

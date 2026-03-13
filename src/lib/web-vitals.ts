/**
 * Lightweight Core Web Vitals reporter.
 * Logs LCP, FID/INP, CLS, FCP, and TTFB to console in development
 * and can be extended to send to an analytics endpoint.
 */

type MetricName = "CLS" | "FID" | "INP" | "LCP" | "FCP" | "TTFB";

interface WebVitalMetric {
  name: MetricName;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
}

const thresholds: Record<MetricName, [number, number]> = {
  CLS: [0.1, 0.25],
  FID: [100, 300],
  INP: [200, 500],
  LCP: [2500, 4000],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
};

function rate(name: MetricName, value: number): WebVitalMetric["rating"] {
  const [good, poor] = thresholds[name];
  if (value <= good) return "good";
  if (value <= poor) return "needs-improvement";
  return "poor";
}

function logMetric(metric: WebVitalMetric) {
  const emoji = metric.rating === "good" ? "🟢" : metric.rating === "needs-improvement" ? "🟡" : "🔴";
  const unit = metric.name === "CLS" ? "" : "ms";
  console.log(
    `${emoji} ${metric.name}: ${metric.name === "CLS" ? metric.value.toFixed(3) : Math.round(metric.value)}${unit} (${metric.rating})`
  );
}

/**
 * Initialize Web Vitals monitoring using the browser Performance API.
 * Call once in main.tsx after initial render.
 */
export function reportWebVitals(onMetric?: (metric: WebVitalMetric) => void) {
  const handler = onMetric || (import.meta.env.DEV ? logMetric : undefined);
  if (!handler || typeof PerformanceObserver === "undefined") return;

  // LCP
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries[entries.length - 1];
      if (last) {
        const m: WebVitalMetric = { name: "LCP", value: last.startTime, rating: rate("LCP", last.startTime) };
        handler(m);
      }
    });
    lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
  } catch {}

  // FCP
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === "first-contentful-paint") {
          const m: WebVitalMetric = { name: "FCP", value: entry.startTime, rating: rate("FCP", entry.startTime) };
          handler(m);
        }
      }
    });
    fcpObserver.observe({ type: "paint", buffered: true });
  } catch {}

  // CLS
  try {
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });
    clsObserver.observe({ type: "layout-shift", buffered: true });
    // Report on page hide
    addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        const m: WebVitalMetric = { name: "CLS", value: clsValue, rating: rate("CLS", clsValue) };
        handler(m);
      }
    }, { once: true });
  } catch {}

  // FID
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entry = list.getEntries()[0] as PerformanceEventTiming;
      if (entry) {
        const value = entry.processingStart - entry.startTime;
        const m: WebVitalMetric = { name: "FID", value, rating: rate("FID", value) };
        handler(m);
      }
    });
    fidObserver.observe({ type: "first-input", buffered: true });
  } catch {}

  // TTFB
  try {
    const nav = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming;
    if (nav) {
      const m: WebVitalMetric = { name: "TTFB", value: nav.responseStart, rating: rate("TTFB", nav.responseStart) };
      handler(m);
    }
  } catch {}
}

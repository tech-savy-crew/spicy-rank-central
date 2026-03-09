import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackToTop } from "./BackToTop";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const IS_DEV = import.meta.env.DEV;

function DevBanner() {
  if (!IS_DEV) return null;
  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] text-center text-xs py-1 font-medium text-white"
      style={{ backgroundColor: "#D4380D" }}
    >
      🚧 Site Under Development — Not Indexed
    </div>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`min-h-screen flex flex-col ${IS_DEV ? "pt-6" : ""}`}>
      <DevBanner />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-[60] font-medium text-sm"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
    </div>
  );
}

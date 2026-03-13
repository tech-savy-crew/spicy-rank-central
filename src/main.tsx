import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Report Core Web Vitals in dev (logs to console)
import("./lib/web-vitals").then(({ reportWebVitals }) => reportWebVitals());

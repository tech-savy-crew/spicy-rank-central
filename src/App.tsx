import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const Index = lazy(() => import("./pages/Index"));
const ReviewPage = lazy(() => import("./pages/ReviewDetailPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const CompareDetailPage = lazy(() => import("./pages/CompareDetailPage"));
const AlternativesPage = lazy(() => import("./pages/AlternativesPage"));
const RankingsPage = lazy(() => import("./pages/RankingsPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AdvertisePage = lazy(() => import("./pages/AdvertisePage"));
const WriteForUsPage = lazy(() => import("./pages/WriteForUsPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const BestListPage = lazy(() => import("./pages/BestListPage"));
const BestListDetailPage = lazy(() => import("./pages/BestListDetailPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-background">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/review/:slug" element={<ReviewPage />} />
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/reviews/:slug" element={<ReviewPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/compare/:slug" element={<CompareDetailPage />} />
              <Route path="/alternatives/:slug" element={<AlternativesPage />} />
              <Route path="/rankings" element={<RankingsPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/advertise" element={<AdvertisePage />} />
              <Route path="/write-for-us" element={<WriteForUsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/best/:slug" element={<BestListPage />} />
              <Route path="/best-lists/:slug" element={<BestListDetailPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

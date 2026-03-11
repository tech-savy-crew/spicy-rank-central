import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

const Index = lazy(() => import("./pages/Index"));
const ReviewDetailPage = lazy(() => import("./pages/ReviewDetailPage"));
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
              {/* Reviews */}
              <Route path="/reviews" element={<ReviewsPage />} />
              <Route path="/reviews/:slug" element={<ReviewDetailPage />} />
              <Route path="/review/:slug" element={<ReviewRedirect />} />
              {/* Comparisons */}
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/compare/:slug" element={<CompareDetailPage />} />
              {/* Best Lists */}
              <Route path="/best-lists/:slug" element={<BestListDetailPage />} />
              {/* Alternatives */}
              <Route path="/alternatives/:slug" element={<AlternativesPage />} />
              {/* Rankings & Categories */}
              <Route path="/rankings" element={<RankingsPage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              {/* Company */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/advertise" element={<AdvertisePage />} />
              <Route path="/write-for-us" element={<WriteForUsPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/privacy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;

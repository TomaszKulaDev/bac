"use client";

import NewsGrid from "@/app/home/NewsGrid";
import Footer from "@/app/home/Footer";
import NewsGridEducation from "./home/NewsGridEducation";
import NewsGridTopVideoDance from "./home/NewsGridTopVideoDance";
import NewsGridInterviews from "./home/NewsGridInterviews";
import RecommendedPractices from "./home/components/RecommendedPractices";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import InfoBar from "./home/components/InfoBar";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Info Bar */}
      <div className="mb-0 mt-4">
        <InfoBar />
      </div>

      <main>
        {/* Recommended Practices */}
        <section className="py-2">
          <RecommendedPractices />
        </section>

        {/* News Grid */}
        <section className="py-2 border-b border-gray-100">
          <NewsGrid />
        </section>

        {/* News Grid Education */}
        <section className="py-2 border-b border-gray-100">
          <NewsGridEducation />
        </section>

        {/* News Grid Top Video Dance */}
        <section className="py-2 border-b border-gray-100">
          <NewsGridTopVideoDance />
        </section>

        {/* News Grid Interviews */}
        <section className="py-2">
          <NewsGridInterviews />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

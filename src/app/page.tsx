"use client";

import NewsGrid from "@/app/home/NewsGrid";
import Footer from "@/app/home/Footer";
import NewsGridEducation from "./home/NewsGridEducation";
import NewsGridTopVideoDance from "./home/NewsGridTopVideoDance";
import RecommendedPractices from "./home/components/RecommendedPractices";
import ScrollToTopButton from "@/components/ScrollToTopButton";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <main className="pt-8">
        {/* Recommended Practices */}
        <section className="py-4 bg-gray-50">
          <RecommendedPractices />
        </section>

        {/* News Grid */}
        <section className="py-8">
          <NewsGrid />
        </section>

        {/* News Grid Education */}
        <section className="py-8">
          <NewsGridEducation />
        </section>
        {/* News Grid Top Video Dance */}
        <section className="py-8">
          <NewsGridTopVideoDance />
        </section>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
}

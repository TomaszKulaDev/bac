"use client";

import Image from "next/image";
import Link from "next/link";
import {
  featuredArticles,
  secondaryArticles,
  sidebarArticles,
} from "./data/articlesData";
import { Author, NewsArticle } from "./types/article";
import { AUTHORS } from "./data/authorsData";
import SectionHeaderWithAuthors from "./components/SectionHeaderWithAuthors";

// Typy dla komponentów
interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}

interface ArticleCardProps {
  article: NewsArticle;
  variant?: "featured" | "secondary" | "sidebar";
}

// Style
const STYLES = {
  articleTitle: {
    fontFamily: '"Fira Sans", Arial, Helvetica, sans-serif',
    fontSize: "20px",
    lineHeight: "24px",
    textAlign: "left" as const,
    letterSpacing: "-0.4px",
  },
};

// Komponenty pomocnicze
const ArticleImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
}: ArticleImageProps) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className="w-full h-full object-cover"
    priority={priority}
  />
);

const AuthorInfo = ({ author }: { author?: Author }) => {
  if (!author) return null;

  return (
    <div className="flex items-center">
      <div className="w-5 h-5 rounded-full overflow-hidden mr-1">
        <Image
          src={author.avatar}
          alt={author.name}
          width={20}
          height={20}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="text-gray-600 text-xs">{author.name}</span>
    </div>
  );
};

const ArticleCard = ({ article, variant = "secondary" }: ArticleCardProps) => {
  if (variant === "featured") {
    return (
      <Link
        href={`/artykul/${article.slug}`}
        className="block relative overflow-hidden shadow-sm"
      >
        <div className="aspect-[16/7]">
          <ArticleImage
            src={article.image}
            alt={article.title}
            width={500}
            height={188}
            priority={true}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h2 className="font-bold text-white text-2xl">{article.title}</h2>
        </div>
      </Link>
    );
  }

  if (variant === "sidebar") {
    return (
      <div className="border-t border-gray-200 pt-2">
        <Link href={`/artykul/${article.slug}`} className="block">
          <h3 className="text-sm font-bold hover:text-blue-600">
            {article.title}
          </h3>
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={`/artykul/${article.slug}`}
      className="block overflow-hidden shadow-sm"
    >
      <div className="aspect-[16/9]">
        <ArticleImage
          src={article.image}
          alt={article.title}
          width={150}
          height={75}
        />
      </div>
      <div className="p-2 bg-white">
        <h2
          className="font-bold text-gray-900 mb-1"
          style={STYLES.articleTitle}
        >
          {article.title}
        </h2>
        <AuthorInfo author={article.author} />
      </div>
    </Link>
  );
};

export default function NewsGridEducation() {
  return (
    <div className="bg-white text-gray-900 py-4">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <SectionHeaderWithAuthors
            letter="N"
            title="NAUKA"
            authors={AUTHORS.educationAuthors}
            sectionLabel="UCZĄ DLA NAS:"
          />
          <Link href="/edukacja" className="text-sm hover:underline">
            Zobacz więcej!
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-2">
          {/* Main content area */}
          <div className="col-span-12 lg:col-span-8">
            {/* Featured articles */}
            <div className="grid grid-cols-12 gap-2 mb-2">
              {featuredArticles[0] && (
                <div className="col-span-12 md:col-span-8">
                  <ArticleCard
                    article={featuredArticles[0]}
                    variant="featured"
                  />
                </div>
              )}
              {featuredArticles[1] && (
                <div className="col-span-12 md:col-span-4">
                  <ArticleCard article={featuredArticles[1]} />
                </div>
              )}
            </div>

            {/* Secondary articles grid */}
            <div className="grid grid-cols-3 gap-2">
              {secondaryArticles.slice(0, 9).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-4">
              <SectionHeaderWithAuthors
                letter="N"
                title="NAUKA"
                authors={AUTHORS.educationAuthors}
                sectionLabel="UCZĄ DLA NAS:"
              />
            </div>
            <div className="space-y-2">
              {sidebarArticles.slice(1, 15).map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  variant="sidebar"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

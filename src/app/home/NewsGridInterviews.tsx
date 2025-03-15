"use client";

import Image from "next/image";
import Link from "next/link";
import {
  interviewFeaturedArticles,
  interviewSecondaryArticles,
  interviewSidebarArticles,
} from "./data/articlesData";
import { Author, NewsArticle } from "./types/article";
import { AUTHORS } from "./data/authorsData";
import SectionHeaderWithAuthors from "./components/SectionHeaderWithAuthors";
import { useMemo } from "react";

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
  index?: number;
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

const SidebarArticleCard = ({
  article,
  index = 0,
}: {
  article: NewsArticle;
  index?: number;
}) => {
  const imageUrl =
    article.image ||
    "https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80";

  // Tylko pierwszy artykuł ma zdjęcie, reszta to tylko napisy
  if (index === 0) {
    return (
      <div className="flex py-3 border-b border-gray-100 last:border-b-0 group pl-3">
        <div className="flex-shrink-0 w-[80px] h-[60px] mr-3 overflow-hidden">
          <Image
            src={imageUrl}
            alt={article.title}
            width={80}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 pr-3">
          <Link href={`/artykul/${article.slug}`}>
            <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors">
              {article.title}
            </h3>
          </Link>
        </div>
      </div>
    );
  }

  // Uproszczona wersja dla pozostałych artykułów - tylko tekst
  return (
    <div className="py-2 border-b border-gray-100 last:border-b-0 group pl-3">
      <Link href={`/artykul/${article.slug}`} className="block">
        <div className="flex items-center">
          <div className="w-1.5 h-1.5 bg-[#ffd200] rounded-full mr-2 flex-shrink-0"></div>
          <h3 className="text-xs font-medium text-gray-900 leading-tight line-clamp-1 group-hover:text-gray-700 transition-colors">
            {article.title}
          </h3>
        </div>
      </Link>
    </div>
  );
};

const ArticleCard = ({
  article,
  variant = "secondary",
  index = 0,
}: ArticleCardProps) => {
  const author = useMemo(() => {
    const authorIndex = index % AUTHORS.newsAuthors.length;
    return AUTHORS.newsAuthors[authorIndex];
  }, [index]);

  if (variant === "featured") {
    return (
      <Link
        href={`/artykul/${article.slug}`}
        className="block relative overflow-hidden shadow-sm group"
      >
        <div className="aspect-[16/7] relative">
          <ArticleImage
            src={article.image}
            alt={article.title}
            width={500}
            height={188}
            priority={true}
          />
          {/* Nakładka gradientowa */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

          {/* Avatar autora w lewym górnym rogu */}
          <div className="absolute top-3 left-3 flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1 transition-transform group-hover:scale-105">
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white">
              <Image
                src={author.avatar}
                alt={author.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2 mr-3">
              <p className="text-white text-xs font-medium">{author.name}</p>
              <p className="text-white/80 text-[10px]">{author.role}</p>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <h2 className="font-bold text-white text-2xl">{article.title}</h2>
        </div>
      </Link>
    );
  }

  if (variant === "sidebar") {
    return <SidebarArticleCard article={article} index={index} />;
  }

  return (
    <Link
      href={`/artykul/${article.slug}`}
      className="block overflow-hidden shadow-sm group"
    >
      <div className="aspect-[16/9] relative">
        <ArticleImage
          src={article.image}
          alt={article.title}
          width={150}
          height={75}
        />
        {/* Nakładka gradientowa zawsze widoczna */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-70" />

        {/* Avatar i informacje o autorze - zawsze widoczne */}
        <div className="absolute top-2 left-2 flex items-center bg-black/30 backdrop-blur-sm rounded-full p-1 transition-all duration-300 group-hover:scale-105">
          <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white">
            <Image
              src={author.avatar}
              alt={author.name}
              width={28}
              height={28}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-2 mr-2">
            <p className="text-white text-xs font-medium whitespace-nowrap">
              {author.name}
            </p>
            <p className="text-white/80 text-[10px] whitespace-nowrap">
              {author.role}
            </p>
          </div>
        </div>
      </div>
      <div className="p-2 bg-white">
        <h2 className="font-bold text-gray-900" style={STYLES.articleTitle}>
          {article.title}
        </h2>
      </div>
    </Link>
  );
};

export default function NewsGridInterviews() {
  return (
    <div className="bg-white text-gray-900 py-6 mt-4">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between mb-2">
          <SectionHeaderWithAuthors
            letter="W"
            title="WYWIADY Z TANCERZAMI"
            authors={AUTHORS.newsAuthors}
            sectionLabel="ROZMAWIAJĄ DLA NAS:"
          />
          <Link
            href="/wywiady-z-tancerzami"
            className="text-sm hover:underline"
          >
            Zobacz wszystkie wywiady!
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-12 gap-2 mb-2">
              {interviewFeaturedArticles[0] && (
                <div className="col-span-12 md:col-span-8">
                  <ArticleCard
                    article={interviewFeaturedArticles[0]}
                    variant="featured"
                    index={0}
                  />
                </div>
              )}
              {interviewFeaturedArticles[1] && (
                <div className="col-span-12 md:col-span-4">
                  <ArticleCard
                    article={interviewFeaturedArticles[1]}
                    index={1}
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {interviewSecondaryArticles.map((article, index) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  index={index + 2}
                />
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="mb-2">
              <div className="flex items-center">
                <div className="bg-[#ffd200] rounded-md w-6 h-6 flex items-center justify-center mr-1.5">
                  <span className="font-bold text-black text-xs">W</span>
                </div>
                <h2 className="text-xs font-bold uppercase">
                  NAJNOWSZE WYWIADY
                </h2>
              </div>
            </div>
            <div className="space-y-0">
              {interviewSidebarArticles.map((article, index) => (
                <SidebarArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-2 text-center">
              <Link
                href="/wywiady-z-tancerzami"
                className="inline-block px-3 py-1 text-xs text-gray-600 hover:text-gray-900 hover:underline transition-colors"
              >
                Zobacz więcej
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

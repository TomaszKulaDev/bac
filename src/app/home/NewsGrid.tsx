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
  index?: number;
}

// Style
const STYLES = {
  articleTitle: {
    fontFamily: '"Fira Sans", Arial, Helvetica, sans-serif',
    fontSize: "18px",
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

const SectionHeader = ({
  letter,
  title,
}: {
  letter: string;
  title: string;
}) => (
  <div className="flex items-center">
    <div className="bg-[#ffd200] rounded-full w-8 h-8 flex items-center justify-center mr-2">
      <span className="font-bold text-black">{letter}</span>
    </div>
    <h2 className="text-base font-bold uppercase">{title}</h2>
  </div>
);

// Nowy komponent dla elementów sidebara w stylu portalu informacyjnego
const SidebarArticleCard = ({
  article,
  index = 0,
}: {
  article: NewsArticle;
  index?: number;
}) => {
  // Domyślny obrazek, jeśli artykuł nie ma obrazka
  const imageUrl =
    article.image ||
    "https://images.unsplash.com/photo-1545128485-c400ce7b6892?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80";

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
          <h3 className="text-sm font-bold text-gray-900 leading-tight line-clamp-3 group-hover:text-gray-700 transition-colors">
            {article.title}
          </h3>
        </Link>
        {article.sidebarCategory && (
          <span className="text-xs text-gray-500 mt-1 inline-block">
            {article.sidebarCategory}
          </span>
        )}
      </div>
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

export default function NewsGrid() {
  return (
    <div className="bg-white text-gray-900 py-4">
      <div className="max-w-[1300px] mx-auto px-4">
        <div className="flex items-center justify-between mb-4">
          <SectionHeaderWithAuthors
            letter="B"
            title="BACHATA NA DZIŚ"
            authors={AUTHORS.mainAuthors}
          />
          <Link href="/bachat-posty" className="text-sm hover:underline">
            Zobacz Bachata Posty!
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

          {/* Sidebar - News Portal Style */}
          <div className="col-span-12 lg:col-span-4">
            <div className="mb-4 border-b border-gray-200 pb-2 pl-3">
              <SectionHeader letter="B" title="BACHATA NEWS" />
            </div>

            <div className="space-y-0">
              {sidebarArticles.map((article, index) => (
                <SidebarArticleCard
                  key={article.id}
                  article={article}
                  index={index}
                />
              ))}
            </div>

            <div className="mt-4 text-center">
              <Link
                href="/bachata-news"
                className="inline-block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors"
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

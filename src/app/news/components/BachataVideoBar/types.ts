export interface BachataNewsItem {
  id: string;
  title: string;
  image: string;
  url: string;
}

export interface BachataVideoItem {
  id: string;
  title: string;
  youtubeId: string;
  url: string;
  channelTitle?: string;
  subscriberCount?: string;
  channelImage?: string;
}

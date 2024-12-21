export interface EventsWinnersItem {
  id: string;
  title: string;
  description?: string;
  image: string;
  url: string;
}

export interface EventsWinnersGridProps {
  eventsItems: EventsWinnersItem[];
  title?: string;
  showHeader?: boolean;
}

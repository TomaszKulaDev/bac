export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  title: string;
  question: string;
  totalVotes: number;
  options: PollOption[];
}

export type PollsRecord = {
  [key: string]: PollData;
};

export interface PollProps {
  data: PollData;
  onVote: (pollId: string, optionId: string) => void;
}

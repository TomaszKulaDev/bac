export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface PollData {
  id: string;
  title: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
}

export interface PollProps {
  data: PollData;
  onVote: (pollId: string, optionId: string) => void;
}

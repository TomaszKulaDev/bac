"use client";

import { useState } from "react";
import { Poll } from "./Poll";
import { polls } from "./data";
import { PollsRecord } from "./types";

export function PollsSection() {
  const [pollsState, setPollsState] = useState<PollsRecord>(polls);

  const handleVote = (pollId: string, optionId: string) => {
    setPollsState((currentPolls) => {
      const poll = currentPolls[pollId];
      if (!poll) {
        console.error(`Poll with id ${pollId} not found`);
        return currentPolls;
      }

      return {
        ...currentPolls,
        [pollId]: {
          ...poll,
          options: poll.options.map((option) => ({
            ...option,
            votes: option.id === optionId ? option.votes + 1 : option.votes,
          })),
          totalVotes: poll.totalVotes + 1,
        },
      };
    });
  };

  const requiredPolls = ["partnerPoll", "frequencyPoll", "outfitPoll"];
  const hasAllRequiredPolls = requiredPolls.every(
    (pollId) => pollsState[pollId]
  );

  if (!hasAllRequiredPolls) {
    console.error("Missing required polls");
    return null;
  }

  return (
    <div className="w-full mt-8">
      <div className="grid grid-cols-3 gap-6">
        <Poll data={pollsState.partnerPoll} onVote={handleVote} />
        <Poll data={pollsState.frequencyPoll} onVote={handleVote} />
        <Poll data={pollsState.outfitPoll} onVote={handleVote} />
      </div>
    </div>
  );
}

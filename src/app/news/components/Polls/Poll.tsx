"use client";

import { useState } from "react";
import { PollProps } from "./types";
import { FaCheckCircle } from "react-icons/fa";

export function Poll({ data, onVote }: PollProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleVote = (optionId: string) => {
    if (!hasVoted) {
      setSelectedOptions((prev) => {
        if (prev.includes(optionId)) {
          return prev.filter((id) => id !== optionId);
        }
        return [...prev, optionId];
      });
    }
  };

  const handleSubmitVotes = () => {
    if (selectedOptions.length > 0 && !hasVoted) {
      selectedOptions.forEach((optionId) => {
        onVote(data.id, optionId);
      });
      setHasVoted(true);
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 2000);
    }
  };

  const calculatePercentage = (votes: number) => {
    if (data.totalVotes === 0) return 0;
    return Math.round((votes / data.totalVotes) * 100);
  };

  return (
    <div className="bg-[#f8fafc] border border-gray-200 rounded-lg p-6 relative shadow-sm">
      {showThankYou && (
        <div className="absolute inset-0 bg-white/95 flex items-center justify-center z-10 animate-fade-in">
          <div className="text-center">
            <FaCheckCircle className="text-blue-600 text-4xl mx-auto mb-2" />
            <p className="text-blue-600 font-medium">
              Dziękujemy za Twoje głosy!
            </p>
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        <svg
          className="w-5 h-5 text-blue-600"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M7 2a2 2 0 012 2v12a2 2 0 01-2 2H3a2 2 0 01-2-2V4a2 2 0 012-2h4zm0 1H3a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1zm8-1a2 2 0 012 2v12a2 2 0 01-2 2h-4a2 2 0 01-2-2V4a2 2 0 012-2h4zm0 1h-4a1 1 0 00-1 1v12a1 1 0 001 1h4a1 1 0 001-1V4a1 1 0 00-1-1z" />
        </svg>
        {data.title}
      </h2>

      <div className="space-y-4">
        <p className="text-lg font-bold text-gray-700 leading-tight">
          {data.question}
        </p>
        <p className="text-sm text-gray-500">Możesz wybrać kilka odpowiedzi</p>
        <div className="space-y-2">
          {data.options.map((option) => {
            const percentage = calculatePercentage(option.votes);
            const isSelected = selectedOptions.includes(option.id);

            return (
              <div key={option.id} className="relative">
                <input
                  type="checkbox"
                  name={`poll-${data.id}`}
                  id={`${data.id}-${option.id}`}
                  checked={isSelected}
                  onChange={() => handleVote(option.id)}
                  disabled={hasVoted}
                  className="peer absolute opacity-0 w-full h-full cursor-pointer disabled:cursor-default"
                />
                <label
                  htmlFor={`${data.id}-${option.id}`}
                  className={`block p-3 border transition-all duration-300 relative overflow-hidden bg-white
                    ${
                      hasVoted
                        ? "cursor-default"
                        : "hover:bg-blue-50/50 cursor-pointer"
                    }
                    ${
                      isSelected
                        ? "border-blue-400 bg-blue-50/50"
                        : "border-gray-200"
                    }`}
                >
                  {hasVoted && (
                    <div
                      className="absolute left-0 top-0 h-full bg-blue-50/50 transition-all duration-700 ease-out"
                      style={{ width: `${percentage}%` }}
                    />
                  )}

                  <div className="relative flex items-center justify-between">
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 border-2 rounded flex-shrink-0 transition-colors
                          ${
                            isSelected
                              ? "border-amber-500 bg-amber-500"
                              : "border-gray-300"
                          }`}
                      />
                      <span
                        className={`font-medium ${
                          isSelected ? "text-amber-700" : "text-gray-700"
                        }`}
                      >
                        {option.text}
                      </span>
                    </span>

                    {hasVoted && (
                      <span className="text-sm font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        {percentage}% ({option.votes})
                      </span>
                    )}
                  </div>
                </label>
              </div>
            );
          })}
        </div>

        {!hasVoted && selectedOptions.length > 0 && (
          <button
            onClick={handleSubmitVotes}
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Zagłosuj ({selectedOptions.length}{" "}
            {selectedOptions.length === 1 ? "wybór" : "wybory"})
          </button>
        )}

        {hasVoted && (
          <div className="mt-4 text-sm text-gray-500 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-medium">
              Oddanych głosów: {data.totalVotes}
            </span>
            <span className="text-blue-600 font-medium">
              Dziękujemy za udział w ankiecie!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

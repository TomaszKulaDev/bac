import { Song } from "../../../types";
import { DifficultyLevel, StyleType, TempoType } from "./types";

export const getSongLevel = (song: Song): DifficultyLevel => {
  if (song.beginnerFriendly) return "beginner";
  if (song.advanced) return "advanced";
  if (song.intermediate) return "intermediate";
  return "unspecified";
};

export const getSongStyle = (song: Song): StyleType => {
  if (song.impro) return "impro";
  if (song.sensual) return "sensual";
  if (song.dominicana) return "dominicana";
  return "unspecified";
};

export const getSongTempo = (song: Song): TempoType => {
  if (song.fast) return "fast";
  if (song.medium) return "medium";
  if (song.slow) return "slow";
  return "unspecified";
};

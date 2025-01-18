import { useState, useCallback } from "react";
import { VideoPlayer } from "./VideoPlayer";
import { CountdownTimer } from "./controls/CountdownTimer";
import { SpeedControl } from "./controls/SpeedControl";
import { MirrorToggle } from "./controls/MirrorToggle";
import { LoopSectionControl } from "./controls/LoopSectionControl";
import { PracticeExercise } from "./controls/PracticeExercise";
import { Lesson } from "../types";

interface PracticeModeProps {
  lesson: Lesson;
  onComplete: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  lesson,
  onComplete,
}) => {
  const [speed, setSpeed] = useState(1);
  const [showMirror, setShowMirror] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [loopSection, setLoopSection] = useState<[number, number] | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);

  const handleProgress = useCallback((progress: number) => {
    // Implementacja śledzenia postępu
    console.log("Progress:", progress);
  }, []);

  const startPractice = useCallback(() => {
    setShowCountdown(false);
  }, []);

  const handleExerciseComplete = useCallback((exerciseId: string) => {
    // Implementacja zakończenia ćwiczenia
    console.log("Exercise completed:", exerciseId);
    // Tutaj możemy dodać logikę zapisywania postępu
  }, []);

  return (
    <div className="space-y-6">
      <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
        <VideoPlayer
          url={lesson.videoUrl}
          speed={speed}
          mirror={showMirror}
          loopSection={loopSection}
          onProgress={handleProgress}
          onDurationChange={setVideoDuration}
        />

        {showCountdown && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <CountdownTimer onComplete={startPractice} />
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">
        <SpeedControl value={speed} onChange={setSpeed} />
        <MirrorToggle value={showMirror} onChange={setShowMirror} />
        <LoopSectionControl
          value={loopSection}
          onChange={setLoopSection}
          duration={videoDuration}
        />
      </div>

      {lesson.practiceExercises && (
        <div className="space-y-4">
          {lesson.practiceExercises.map((exercise) => (
            <PracticeExercise
              key={exercise.id}
              exercise={exercise}
              onComplete={handleExerciseComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

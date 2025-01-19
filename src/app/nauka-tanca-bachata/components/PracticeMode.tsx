// import { useState, useCallback } from "react";
// import { VideoPlayer } from "./VideoPlayer";
// import { CountdownTimer } from "./controls/CountdownTimer";
// import { SpeedControl } from "./controls/SpeedControl";
// import { MirrorToggle } from "./controls/MirrorToggle";
// import { PracticeExercise } from "./controls/PracticeExercise";
// import { Lesson } from "../types";

// interface PracticeModeProps {
//   lesson: Lesson;
//   onComplete: () => void;
// }

// export const PracticeMode: React.FC<PracticeModeProps> = ({
//   lesson,
//   onComplete,
// }) => {
//   const [speed, setSpeed] = useState(1);
//   const [showMirror, setShowMirror] = useState(false);
//   const [showCountdown, setShowCountdown] = useState(true);
//   const [loopSection, setLoopSection] = useState<[number, number] | null>(null);
//   const [videoDuration, setVideoDuration] = useState(0);
//   const [selectedVideo, setSelectedVideo] = useState(lesson.videos[0]);

//   const handleProgress = useCallback((progress: number) => {
//     console.log("Progress:", progress);
//   }, []);

//   const handleDurationChange = useCallback((duration: number) => {
//     setVideoDuration(duration);
//   }, []);

//   const handleExerciseComplete = useCallback(
//     (exerciseId: string) => {
//       console.log("Exercise completed:", exerciseId);
//       onComplete();
//     },
//     [onComplete]
//   );

//   return (
//     <div className="space-y-6">
//       <div className="aspect-video bg-black rounded-lg overflow-hidden">
//         {showCountdown ? (
//           <div className="w-full h-full flex items-center justify-center">
//             <CountdownTimer
//               onComplete={() => setShowCountdown(false)}
//               initialTime={3}
//             />
//           </div>
//         ) : (
//           <VideoPlayer
//             url={selectedVideo.videoUrl}
//             speed={speed}
//             mirror={showMirror}
//             loopSection={loopSection}
//             onProgress={handleProgress}
//             onDurationChange={handleDurationChange}
//             onLoopSectionChange={setLoopSection}
//           />
//         )}
//       </div>

//       <div className="flex flex-wrap gap-4">
//         <SpeedControl value={speed} onChange={setSpeed} />
//         <MirrorToggle value={showMirror} onChange={setShowMirror} />
//       </div>

//       {lesson.practiceExercises && (
//         <div className="space-y-4">
//           {lesson.practiceExercises.map((exercise) => (
//             <PracticeExercise
//               key={exercise.id}
//               exercise={exercise}
//               onComplete={handleExerciseComplete}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

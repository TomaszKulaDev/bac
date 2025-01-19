// import { useState, useEffect } from 'react';

// interface CountdownTimerProps {
//   onComplete: () => void;
//   initialTime?: number;
// }

// export const CountdownTimer: React.FC<CountdownTimerProps> = ({
//   onComplete,
//   initialTime = 3,
// }) => {
//   const [count, setCount] = useState(initialTime);

//   useEffect(() => {
//     if (count === 0) {
//       onComplete();
//       return;
//     }

//     const timer = setInterval(() => {
//       setCount((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [count, onComplete]);

//   return (
//     <div className="text-8xl font-bold text-white">{count}</div>
//   );
// };

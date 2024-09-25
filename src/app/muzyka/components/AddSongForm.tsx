// import React, { useState } from "react";

// interface AddSongFormProps {
//   onAddSong: (song: {
//     title: string;
//     artist: string;
//     youtubeId: string;
//   }) => void;
// }

// const AddSongForm: React.FC<AddSongFormProps> = ({ onAddSong }) => {
//   const [newSong, setNewSong] = useState({
//     title: "",
//     artist: "",
//     youtubeId: "",
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onAddSong(newSong);
//     setNewSong({ title: "", artist: "", youtubeId: "" });
//   };

//   return (
//     <div className="mb-8">
//       <h2 className="text-2xl font-bold mb-4">Dodaj nową piosenkę</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Tytuł"
//           value={newSong.title}
//           onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
//           className="mr-2 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Artysta"
//           value={newSong.artist}
//           onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
//           className="mr-2 p-2 border rounded"
//         />
//         <input
//           type="text"
//           placeholder="YouTube ID"
//           value={newSong.youtubeId}
//           onChange={(e) =>
//             setNewSong({ ...newSong, youtubeId: e.target.value })
//           }
//           className="mr-2 p-2 border rounded"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Dodaj
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddSongForm;

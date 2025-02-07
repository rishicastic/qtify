import React, { useState, useEffect } from "react";
import axios from "axios";

const Qtify = () => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const albumsResponse = await axios.get("https://api.example.com/albums");
      const songsResponse = await axios.get("https://api.example.com/songs");
      setAlbums(albumsResponse.data);
      setSongs(songsResponse.data);
    };
    fetchData();
  }, []);

  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Qtify Music</h1>
      <input
        type="text"
        placeholder="Search songs..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded-md w-full mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">Top Albums</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {albums.map((album) => (
          <div key={album.id} className="border p-2 rounded-md">
            <img src={album.cover} alt={album.title} className="w-full h-32 object-cover rounded-md" />
            <p className="mt-2 font-semibold">{album.title}</p>
          </div>
        ))}
      </div>
      <h2 className="text-2xl font-bold mt-6 mb-2">Songs</h2>
      <ul className="border p-4 rounded-md bg-gray-100">
        {filteredSongs.map((song) => (
          <li key={song.id} className="flex justify-between items-center border-b p-2">
            <span>{song.title}</span>
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Play</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Qtify;

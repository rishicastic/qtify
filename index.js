import React, { useState, useEffect } from "react";
import axios from "axios";

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Qtify</h1>
      <ul className="flex space-x-4">
        <li><a href="#" className="hover:text-gray-400">Home</a></li>
        <li><a href="#" className="hover:text-gray-400">Albums</a></li>
        <li><a href="#" className="hover:text-gray-400">Songs</a></li>
        <li><a href="#" className="hover:text-gray-400">Playlists</a></li>
      </ul>
    </nav>
  );
};

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <input
      type="text"
      placeholder="Search songs..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="border p-2 rounded-md w-full mb-4"
    />
  );
};

const Button = ({ label, onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 text-white px-4 py-2 rounded-md">
      {label}
    </button>
  );
};

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
    <div>
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
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
              <Button label="Play" onClick={() => console.log(`Playing ${song.title}`)} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Qtify;

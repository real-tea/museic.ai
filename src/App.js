// import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Configuration , OpenAIApi } from 'openai';
import { useState } from 'react';

function App() {

  const [isLoading , setIsLoading] = useState(true);
  const [inputText , setInputText] = useState("");
  const [numberOfSongs, setNumberOfSongs] = useState(10);

  const API_KEY = process.env.API_KEY;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
  const openai = new OpenAIApi(new Configuration({apiKey : API_KEY}));



  const EXAMPLES = [
    "I like Kanye West for my gym songs",
    "I've been feeling like a Shakespearean Villain lately",
    "Smitten by this lady i met in the metro"
  ]

  const handleEnterKey = async(e) => {
    if(e.key === 'Enter' || e.type === 'click'){
      if(e.preventDefault){
        e.preventDefault();
      }
      setIsLoading(true);

      let searchInput = inputText;
      if (e.exampleText) {
        searchInput = e.exampleText;
      }

      const modifiedInput =
        searchInput +
        `, recommend me ${numberOfSongs} songs to listen to, just respond with the list and format it as the song name in double quotation marks followed by the artist name`;
      const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: modifiedInput }],
      });

      const songList = res.data.choices[0].message.content
        .split("\n")
        .map((song) => song.replace(/^\d+\.\s/, ""))
        .filter((song) => song.startsWith('"'));

      if (songList.length > 0) {
        await searchSongs(songList);
      }

      setInputText("");
      setIsLoading(false);
    }
  }

  async function searchSongs(songList) {
    setSongs([]);
    setIsLoading(true);
    const addedSongs = new Set();

    for (const song of songList) {
      const [songName, artistName] = getSongAndArtist(song);

      console.log(`Search for ${songName} by ${artistName}`);

      const songResults = await searchTracks(
        `${songName} ${artistName}`,
        numberOfSongs
      );
      const matchingTracks = getMatchingTracks(
        songResults,
        songName,
        artistName
      );

      let topTrack =
        matchingTracks.length > 0
          ? getUniqueTopTrack(matchingTracks)
          : getHighestPopularityTrack(songResults);

      if (topTrack) {
        const trackId = topTrack.id;
        if (!addedSongs.has(trackId)) {
          addedSongs.add(trackId);
          setSongs((prevSongs) => [...prevSongs, topTrack]);
        } else {
          const nextTrack = songResults.find(
            (track) => !addedSongs.has(track.id)
          );
          if (nextTrack) {
            addedSongs.add(nextTrack.id);
            setSongs((prevSongs) => [...prevSongs, nextTrack]);
          }
        }
        setIsLoading(false);
      } else {
        console.log(`No track found for ${song}`);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className="App">
      
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
//Icons
import searchIcon from "./assets/images/icon-search.svg";
import playIcon from "./assets/images/icon-play.svg";
import newWindowIcon from './assets/images/icon-new-window.svg'
import NavBar from "./components/NavBar";

const Dictionary = () => {
  const [font, setFont] = useState("serif");
  const [word, setWord] = useState("Dictionary");
  const [data, setData] = useState("");
  const [audio, setAudio] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [error, setError] = useState(null); 

  const fetchWord = async () => {
    try {
        const response = await axios.get(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        setData(response.data);
        setError(null); 
        return response.data;
    } catch (error) {
        setData(null); 
        setError(`Failed to fetch ${word}. Please check whether you have spelled it correctly and try again.`); 
    }
  };

  useEffect(()=> {
    handleSearch()
  }, [])

  const handleSearch = async (e) => {
    e?.preventDefault();
    setAudio('');
    setError(null); 
    const fetchedData = await fetchWord();
    handleAudioLink(fetchedData);
  };

  const handleAudioLink = (data) => {
    if(data){
      const phonetics = data[0]?.phonetics;
      for (let i = 0; i < phonetics.length; i++) {
        if (phonetics[i].audio && phonetics[i].audio !== "") {
          setAudio(phonetics[i].audio);
          break;
        }
    }
    }
  };

  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  return (
    <div className={`dictionary`} style={{ fontFamily: font }}>
      <NavBar font={font} setFont={setFont} setIsOn={setIsOn} isOn={isOn} />
      <div>
        <form onSubmit={handleSearch} action="submit">
          <input
            name="search"
            onChange={(e) => setWord(e.target.value)}
            type="text"
            value={word}
            placeholder="Search for anything"
          />
          <img onClick={handleSearch} src={searchIcon} alt="search-icon" />
        </form>
      </div>
      {error && <h1 style={{color: 'red'}}>Error: {error}</h1>}
      {data && (
        <>
          <div>
            <h1>{data[0]?.word}</h1>
            <h5>{data[0]?.phonetics[0]?.text}</h5>
          </div>
          {audio && (
            <>
              <img src={playIcon} onClick={playAudio} alt="play" />
              <audio src={audio} className="audio-element"></audio>
            </>
          )}
          <div>
            {data[0]?.meanings.map((item, i) => (
              <div className="meaning" key={i}>
                <h3 className="partOfSpeech">{item.partOfSpeech}</h3>
                <h2>Meaning</h2>
                <ul>
                  {item.definitions.map((def, j) => (
                    <li key={j}>{def.definition}</li>
                  ))}
                </ul>
                {item.antonyms.length > 0 && (
                  <>
                    <h3>Antonyms</h3>
                    {item.antonyms.map((ant, k) => (
                      <span key={k}>{ant}</span>
                    ))}
                  </>
                )}
                {item.synonyms.length > 0 && (
                  <>
                    <h3>Synonyms</h3>
                    {item.synonyms.map((syn, l) => (
                      <span key={l}>{syn}</span>
                    ))}
                  </>
                )}
              </div>
            ))}
          </div>
          {data[0]?.sourceUrls[0].length > 0 && (
            <>
              <span>Source: </span>
              <a href={data[0]?.sourceUrls[0]}>{data[0]?.sourceUrls[0]}</a>
              <span><img src={newWindowIcon} alt="newWindowIcon" /></span>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Dictionary;

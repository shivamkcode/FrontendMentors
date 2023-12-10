import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
//Icons
import DictionaryIcon from "./assets/images/logo.svg";
import dropDownIcon from "./assets/images/icon-arrow-down.svg";
import moonIcon from "./assets/images/icon-moon.svg";
import searchIcon from "./assets/images/icon-search.svg";
import playIcon from "./assets/images/icon-play.svg";
import newWindowIcon from './assets/images/icon-new-window.svg'
// import Meaning from './components/meaning'

const Dictionary = () => {
  const [font, setFont] = useState("serif");
  const [isOpen, setIsOpen] = useState(false);
  const [word, setWord] = useState("Dictionary");
  const [isOn, setIsOn] = useState(false);
  const [data, setData] = useState("");
  const [audio, setAudio] = useState("");

  const fetchWord = async () => {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    setData(response.data);
    console.log(response.data[0]);
    return response.data;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const fetchedData = await fetchWord();
    handleAudioLink(fetchedData);
  };

  const toggle = () => {
    setIsOn(!isOn);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAudioLink = (data) => {
    const phonetics = data[0].phonetics;
    for (let i = 0; i < phonetics.length; i++) {
      if (phonetics[i].audio && phonetics[i].audio !== "") {
        setAudio(phonetics[i].audio);
        break;
      }
    }
  };

  const playAudio = () => {
    const audioEl = document.getElementsByClassName("audio-element")[0];
    audioEl.play();
  };

  return (
    <div className="dictionary" style={{ fontFamily: font }}>
      <nav>
        <img src={DictionaryIcon} alt="DictionaryIcon" />
        <div>
        <h3>{font}</h3>
        <img onClick={toggleOpen} src={dropDownIcon} alt="dropDownIcon" />
        {isOpen && (
          <ul style={{ listStyleType: "none" }}>
            <li onClick={() => setFont("Serif")}>
              <span>Serif</span>
            </li>
            <li onClick={() => setFont("sans-seif")}>
              <span>Sans Serif</span>
            </li>
            <li onClick={() => setFont("monospace")}>
              <span>Mono</span>
            </li>
          </ul>
        )}
        <label className="switch">
          <input type="checkbox" checked={isOn} onChange={toggle} />
          <span className="slider round"></span>
        </label>
        <img src={moonIcon} alt="moon-icon" />
        </div>
      </nav>
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
      <div>
        <h1>{data[0]?.word}</h1>
        <h5>{data[0]?.phonetics[1].text}</h5>
      </div>
      {audio && (
        <>
          <img src={playIcon} onClick={playAudio} alt="play" />
          <audio src={audio} className="audio-element"></audio>
        </>
      )}
      <div>
        {data[0]?.meanings.map((item, i) => (
          <div key={i}>
            <h3>{item.partOfSpeech}</h3>
            <h3>Meaning</h3>
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
    </div>
  );
};

export default Dictionary;

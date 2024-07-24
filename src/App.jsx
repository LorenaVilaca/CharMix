// App.js
import React, { useState } from 'react';
import ReactLoading from 'react-loading';
import FileInput from './components/FileInput';
import ImageSelect from './components/ImageSelect';
import { prompts } from './utils/prompts';
import { createOpenAIInstance, getCharImage, getOtherImage, getMixedImagePrompt, getMixedImage } from './api';
import './App.css';

const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [charImage, setCharImage] = useState(undefined);
  const [otherImage, setOtherImage] = useState(undefined);
  const [finalImage, setFinalImage] = useState("");

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("File is not an image, try another type");
    } else {
      setImage(file);
    }
  };

  const createChar = async () => {
    if (!loading && apiKey) {
      setLoading(true);
      const openai = createOpenAIInstance(apiKey);
      const tagInfos = prompts.tagObject;
      const charDescription = await getCharImage(openai, charImage);
      const otherImageDescription = await getOtherImage(openai, otherImage, tagInfos);
      const mixedImagePrompt = await getMixedImagePrompt(openai, charDescription, otherImageDescription, tagInfos);
      await getMixedImage(openai, mixedImagePrompt, setFinalImage);
      setLoading(false);
    } else if (!apiKey) {
      alert("Please enter your API key.");
    }
  };

  return (
    <>
      <h1>CharMix</h1>
      <div className="card">
        <label>
          OpenAI API Key:
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your OpenAI API Key"
          />
        </label>
        <FileInput label="Character Image" onChange={(event) => handleFileChange(event, setCharImage)} />
        <ImageSelect />
        <FileInput label="Any Image" onChange={(event) => handleFileChange(event, setOtherImage)} />
      </div>
      <button onClick={createChar}>
        {loading ? <ReactLoading type="spinningBubbles" color="grey" height="20px" width="20px" /> : "Create Image"}
      </button>
      {finalImage && <img style={{ width: "300px", height: "300px" }} src={finalImage} alt="Generated" />}
    </>
  );
};

export default App;

import React, { useState } from 'react';
import { Button, Input, Spacer } from '@nextui-org/react';
import ReactLoading from 'react-loading';
import FileInput from './components/FileInput';
import ImageSelect from './components/ImageSelect';
import { prompts } from './utils/prompts';
import { createOpenAIInstance, getCharImage, getOtherImage, getMixedImagePrompt, getMixedImage, getCharArtstyle } from './api';
import { convertBase64 } from './utils/tobase64';
import { motion } from 'framer-motion'

export const App = () => {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [charImage, setCharImage] = useState(undefined);
  const [otherImage, setOtherImage] = useState(undefined);
  const [finalImage, setFinalImage] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const handleFileChange = (event, setImage) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setImage(file);
    } else {
      alert("File is not an image, try another type");
    }
  };

  const createChar = async () => {
    if (selectedTag == undefined || selectedTag == null) {
      alert("Select a tag");
      return
    }
    
    const tagInfos = prompts["tag"+selectedTag.label]
    if (!loading && apiKey) {
      setLoading(true);
      const image64 = await convertBase64(charImage);
      const openai = createOpenAIInstance(apiKey);
      const charDescription = await getCharImage(openai, image64);
      const charArtstyle = await getCharArtstyle(openai, image64);
      // console.log( charArtstyle)
      const otherImageDescription = await getOtherImage(openai, otherImage, tagInfos);
      const mixedImagePrompt = await getMixedImagePrompt(openai, charDescription, otherImageDescription, tagInfos, charArtstyle);
      await getMixedImage(openai, mixedImagePrompt, setFinalImage);
      setLoading(false);
    } else if (!apiKey) {
      alert("Please enter your API key.");
    }
  };

  return (
    <motion.div 
    className={
      'min-h-screen flex w-full flex-col items-center justify-center h-full'
    }
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.7 } }}
    exit={{ opacity: 0 }}
    >
      <h1>CharMix</h1>
      <div className="card">
        <Input
          placeholder="OpenAI API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          fullWidth
          clearable
        />
        <Spacer y={1} />
        <FileInput label="Character Image" onChange={(event) => handleFileChange(event, setCharImage)} />
        <Spacer y={1} />
        <ImageSelect onChange={setSelectedTag} />
        <Spacer y={1} />
        <FileInput label="Any Image" onChange={(event) => handleFileChange(event, setOtherImage)} />
      </div>
      <Spacer y={1} />
      <Button isLoading= {loading} onClick={createChar} disabled={loading} className='bg-slate-600'>
        Create Image
      </Button>
      {finalImage && (
        <>
          <Spacer y={1} />
          <img style={{ width: "300px", height: "300px" }} src={finalImage} alt="Generated" />
        </>
      )}
    </motion.div>
  );
};

export default App;

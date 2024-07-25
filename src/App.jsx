import React, { useState } from 'react';
import { Button, Input, Spacer } from '@nextui-org/react';
import FileInput from './components/FileInput';
import ImageSelect from './components/ImageSelect';
import { prompts } from './utils/prompts';
import { createOpenAIInstance, getCharImage, getOtherImage, getMixedImagePrompt, getMixedImage, getCharArtstyle } from './api';
import { convertBase64 } from './utils/tobase64';
import { motion } from 'framer-motion';
import NavBarNUI from './components/NavBar'; 
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
      return;
    }
    
    const tagInfos = prompts["tag"+selectedTag.label];
    if (!loading && apiKey) {
      setLoading(true);
      const image64 = await convertBase64(charImage);
      const openai = createOpenAIInstance(apiKey);
      const charDescription = await getCharImage(openai, image64);
      const charArtstyle = await getCharArtstyle(openai, image64);
      const otherImageDescription = await getOtherImage(openai, otherImage, tagInfos);
      const mixedImagePrompt = await getMixedImagePrompt(openai, charDescription, otherImageDescription, tagInfos, charArtstyle);
      await getMixedImage(openai, mixedImagePrompt, setFinalImage);
      setLoading(false);
    } else if (!apiKey) {
      alert("Please enter your API key.");
    }
  };
  const Header = () => (
    <>
      <h1 className='font-bold text-8xl'>
        Character Creator
      </h1>
      <p  className='font-light text-2xl w-[646px]'>
        Transform your images into unique and personalized characters.
        Upload two photos and watch the magic happen!
      </p>
    </>
  )

  const Banner = () => (
    <>
      
    </>
  )

  return (
    <motion.div 
    className={
      'min-h-screen flex w-full flex-col h-full'
    }
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.7 } }}
    exit={{ opacity: 0 }}
    >
      <NavBarNUI hasKey={false}/>
      <div className='flex flex-col w-full space-y-4'>
        <Header/>

        <div className="flex gap-4 m-8">
          <div className='flex flex-col w-1/2 h-[460px] bg-secondary-900 rounded-xl'>
            <FileInput label="Character Image" onChange={(event) => handleFileChange(event, setCharImage)} />
          </div>
          <div className='flex flex-col w-1/2 h-[460px] bg-primary-900 rounded-xl'>
            <FileInput label="Any Image" onChange={(event) => handleFileChange(event, setOtherImage)} />
            <ImageSelect onChange={setSelectedTag} />
          </div>
          
  
        </div>

        <Button isLoading={loading} onClick={createChar} disabled={loading} className='bg-slate-600'>
          Create Image
        </Button>

        {finalImage && (
          <>
            <img style={{ width: "300px", height: "300px" }} src={finalImage} alt="Generated" />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default App;

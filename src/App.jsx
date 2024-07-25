import React, { useState } from 'react';
import { Button, Input, Spacer, Image } from '@nextui-org/react';
import FileInput from './components/FileInput';
import ImageSelect from './components/ImageSelect';
import { prompts } from './utils/prompts';
import { createOpenAIInstance, getCharImage, getOtherImage, getMixedImagePrompt, getMixedImage, getCharArtstyle } from './api';
import { convertBase64 } from './utils/tobase64';
import { motion } from 'framer-motion';

const Header = React.memo(() => (
  <>
    <h1 className='font-bold text-8xl'>
      Character Creator
    </h1>
    <p className='font-light text-2xl w-[646px]'>
      Transform your images into unique and personalized characters.
      Upload two photos and watch the magic happen!
    </p>
  </>
));

const Banner = React.memo(() => (
  <Image
    className="h-screen w-full mx-4 self-center"
    alt="Char Mix Logo"
    src="src/assets/Banner.png"
  />
));

const Body = React.memo(({ apiKey, setApiKey, handleFileChange, setCharImage, setOtherImage, setSelectedTag, loading, createChar, finalImage }) => (
  <div className='h-screen'>
    <h1 className='font-bold text-9xl'> CRIE SEU PERSONAGEM </h1>
    <div className="flex gap-4 my-16 m-8">

      <div className='flex flex-col w-1/2 gap-4 '>
        <Input
          placeholder="OpenAI API Key"
          label='OpenAI KEY'
          classNames={{ input: 'font-semibold text-3xl', label: 'text-white font-bold text-4xl py-4' , inputWrapper: 'h-20 w-[544px] bg-[#3E3E3E]' }}
          labelPlacement='outside'
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          fullWidth
          clearable
        />
        <FileInput label="Imagem do Personagem" onChange={(event) => handleFileChange(event, setCharImage)} />
        <FileInput label="Complemento do Personagem" onChange={(event) => handleFileChange(event, setOtherImage)} />
        <ImageSelect onChange={setSelectedTag} />
      </div>

      <div className='w-1/2  flex-col justify-end'>
        <div className='flex flex-col mb-7 w-[432px] h-5/6 py-4 bg-white items-center rounded-xl'>
          <h1 className='font-bold text-5xl p-3'> RESULTADO </h1>
          {finalImage && (
            <Image
              className="h-[400px] w-[340px] p-5 self-center "
              alt="Char Mix Logo"
              src={finalImage}
            />
          )}
        </div>
        <Button isLoading={loading} onClick={createChar} disabled={loading} className='bg-orange-500 h-[123px] w-[444px]'>
        <h1 className='font-bold text-5xl'> CRIAR </h1>
        </Button>
      </div>
      
    </div>

    
  </div>
));

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
    if (!selectedTag) {
      alert("Select a tag");
      return;
    }

    const tagInfos = prompts["tag" + selectedTag.target.value];

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

  return (
    <motion.div
      className='min-h-screen flex w-full flex-col h-full'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.7 } }}
      exit={{ opacity: 0 }}
    >
      <div className='flex items-center flex-col w-full space-y-4'>
        <Banner />
        <Body
          apiKey={apiKey}
          setApiKey={setApiKey}
          handleFileChange={handleFileChange}
          setCharImage={setCharImage}
          setOtherImage={setOtherImage}
          setSelectedTag={setSelectedTag}
          loading={loading}
          createChar={createChar}
          finalImage={finalImage}
        />
      </div>
    </motion.div>
  );
};

export default App;

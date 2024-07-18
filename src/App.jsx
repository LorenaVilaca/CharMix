import { useState } from 'react'
import './App.css'
import OpenAI from 'openai';
import { convertBase64 } from './utils/tobase64';
import { prompts } from './utils/prompts';
import ReactLoading from 'react-loading';
import Select from 'react-select'

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: 'black',
  }),
}
const App = () => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_AI_KEY, 
    dangerouslyAllowBrowser: true,
  });

  const [loading, setLoading] = useState(false);
  const [charImage, setCharImage] = useState(undefined);
  const [otherImage, setOtherImage] = useState(undefined);
  const [finalImage, setFinalImage] = useState("");

  const getCharImage = async () => {
    let image64 = await convertBase64(charImage);
    
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "system",
            "content": prompts.describeCharImageSystem,
          },
          {
            "role": "user",
            "content": [
              {"type": "text", "text": prompts.describeImageUser},
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:image/jpeg;base64,${image64}`
                },
              },
            ],
          }
        ],
      });

      return (result.choices[0].message.content);

    } catch (e) {
      console.log(e);
    }
  }

  const getOtherImage = async (object) => {
    let image64 = await convertBase64(otherImage);
    console.log(object.describeImageSystem)
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4o",
        // mudar aq
        messages: [
          {
            "role": "system",
            "content": object.describeImageSystem,
          },
          {
            "role": "user",
            "content": [
              {"type": "text", "text": prompts.describeImageUser},
              {
                "type": "image_url",
                "image_url": {
                  "url": `data:image/jpeg;base64,${image64}`
                },
              },
            ],
          }
        ],
      });

      return (result.choices[0].message.content);
    } catch (e) {
      console.log(e);
    }
  }

  const getMixedImagePrompt = async (charDescription, otherImageDescription, object) => {
    console.log(object.mixImageUser)

    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "system",
            "content": prompts.mixImagesSystem,
          },
          {
            "role": "user",
            "content": [
              {"type": "text", "text": object.mixImageUser},
              {"type": "text", "text": otherImageDescription},
              {"type": "text", "text": charDescription},
            ],
          }
        ],
      });


      console.log(otherImageDescription)
      console.log(charDescription)
      console.log(result.choices[0].message.content)
      return (result.choices[0].message.content);
    } catch (e) {
      console.log(e);
    }
  }

  const options = [
    { value: 'Object', label: 'Object' },
    { value: 'Character', label: 'Character' },
    { value: 'Food', label: 'Food' },
    { value: 'Person', label: 'Person' },
    { value: 'Animal', label: 'Animal' },
  ]

  const getMixedImage = async (mixImagePrompt) => {
    try {
      const result = await openai.images.generate({
        model: "dall-e-3",
        prompt: mixImagePrompt,
        size: "1024x1024",
        quality: 'standard',
        n: 1,
      });

      setFinalImage(result.data[0].url);
    } catch (e) {
      console.log(e);
      setFinalImage("");
    }
  }

  const createChar = async () => {
    if (!loading) {
      setLoading(true)
      const tagInfos = prompts.tagObject
      const charDescription = await getCharImage()
      const otherImageDescription = await getOtherImage(tagInfos)
      const mixedImagePrompt = await getMixedImagePrompt(charDescription, otherImageDescription, tagInfos)
      await getMixedImage(mixedImagePrompt)
      setLoading(false)
    }
  }


  return (
    <>

      <h1>CharMix</h1>
      <div className="card">

        <h2>Character Image</h2>
        <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (event.target.files[0].type !=  "image/jpeg"  && event.target.files[0].type !=  "image/png") {
            alert("File is not a image, try another type")
          } else {
            setCharImage(event.target.files[0]); 
          }
        }}
      />
      <h2>Any Image</h2>
      <p>What is the type of your second image?</p>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name=""
        options={options}
        styles={customStyles}
      />
            <h1></h1>

      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          if (event.target.files[0].type !=  "image/jpeg"  && event.target.files[0].type !=  "image/png") {
            alert("File is not a image, try another type")
          } else {
            setOtherImage(event.target.files[0]); 
          }
        }}
      />
      </div>
      <button onClick={() => createChar()}>
        {loading ? <ReactLoading type={"spinningBubbles"} color={"grey"} height={'20px'} width={'20px'} />: "Create Image"}
      </button>
      <h1></h1>
      {finalImage != "" ? <img style={{width: "300px", height: "300px"}}  src={finalImage}></img> : <></>}

    </>
  )
}

export default App

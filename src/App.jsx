import { useState } from 'react'
import './App.css'
import OpenAI from 'openai';
import { convertBase64 } from './utils/tobase64';
import { prompts } from './utils/prompts';
import ReactLoading from 'react-loading';

const App = () => {
  const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_AI_KEY, 
    dangerouslyAllowBrowser: true,
  });

  const [charResponse, setCharResponse] = useState("");
  const [otherImageResponse, setOtherImageResponse] = useState("");
  const [mixImagePrompt, setMixImagePrompt] = useState("");
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
            "role": "user",
            "content": [
              {"type": "text", "text": prompts.describeCharImage},
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

      setCharResponse(result.choices[0].message.content);

    } catch (e) {
      console.log(e);
      setCharResponse("");
    }
  }

  const getOtherImage = async () => {
    let image64 = await convertBase64(otherImage);

    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "user",
            "content": [
              {"type": "text", "text": prompts.describeOtherImage},
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

      setOtherImageResponse(result.choices[0].message.content);
    } catch (e) {
      console.log(e);
      setOtherImageResponse("");
    }
  }

  const getMixedImagePrompt = async () => {
    try {
      const result = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            "role": "user",
            "content": [
              {"type": "text", "text": prompts.describeOtherImage},
              {"type": "text", "text": otherImageResponse},
              {"type": "text", "text": charResponse},
            ],
          }
        ],
      });


      console.log(otherImageResponse)
      console.log(charResponse)
      console.log(result.choices[0].message.content)
      setMixImagePrompt(result.choices[0].message.content);
    } catch (e) {
      console.log(e);
      setMixImagePrompt("");
    }
  }


  const getMixedImage = async () => {
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
      await getCharImage()
      await getOtherImage()
      await getMixedImagePrompt()
      await getMixedImage()
      setLoading(false)
    }
  }


  // useState(async () => {
  //   if (loading) {
  //     setLoading(false)
  //     await getMixedImage()
  //     console.log(finalImage)
      
  //   }
  // },[])


  return (
    <>

      <h1>Character Creator</h1>
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

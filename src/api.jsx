import OpenAI from 'openai';
import { convertBase64 } from './utils/tobase64';
import { prompts } from './utils/prompts';

export const createOpenAIInstance = (apiKey) => {
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
  });
};

export const getCharImage = async (openai, charImage) => {
  const image64 = await convertBase64(charImage);

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompts.describeCharImageSystem,
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompts.describeImageUser },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${image64}` },
            },
          ],
        },
      ],
    });

    return result.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

export const getOtherImage = async (openai, otherImage, object) => {
  const image64 = await convertBase64(otherImage);

  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: object.describeImageSystem,
        },
        {
          role: "user",
          content: [
            { type: "text", text: prompts.describeImageUser },
            {
              type: "image_url",
              image_url: { url: `data:image/jpeg;base64,${image64}` },
            },
          ],
        },
      ],
    });

    return result.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

export const getMixedImagePrompt = async (openai, charDescription, otherImageDescription, object) => {
  try {
    const result = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: prompts.mixImagesSystem,
        },
        {
          role: "user",
          content: [
            { type: "text", text: object.mixImageUser },
            { type: "text", text: otherImageDescription },
            { type: "text", text: charDescription },
          ],
        }
      ],
    });

    return result.choices[0].message.content;
  } catch (error) {
    console.error(error);
  }
};

export const getMixedImage = async (openai, mixImagePrompt, setFinalImage) => {
  try {
    const result = await openai.images.generate({
      model: "dall-e-3",
      prompt: mixImagePrompt,
      size: "1024x1024",
      quality: 'standard',
      n: 1,
    });

    setFinalImage(result.data[0].url);
  } catch (error) {
    console.error(error);
    setFinalImage("");
  }
};

export const prompts = {
  describeCharImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in six main categories: Appearance, Facial expression, Body pose, Clothes, The feeling the image gives and the Artstyle (including if it is 2D or 3D).",
  describeImageUser: "Describe the image",
  mixImagesSystem: "You are a description assistant, skilled in combining the descriptions of two different images in one description of a new character with mixed characteristics. You must structure your description in six main categories: APPEARENCE, FACIAL EXPRESSION, BODY POSE, CLOTHES, THE FELLING THE IMAGE GIVES and ARTSTYLE.",
  tagObject: { 
    tagName: "Object",
    describeImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in 4 main categories: Object type, Color, Texture and Material",
    mixImageUser: "You are a description assistant, skilled in combining the descriptions of two different images in one new character with mixed characteristics. You must structure your description in six main categories: APPEARENC, FACIAL EXPRESSION, BODY POSE, CLOTHES, THE FELLING THE IMAGE GIVES and ARTSTYLE.",
  },
  tagChar: { 
    tagName: "Character",
    describeImageSystem: "",
    mixImageUser: "",
  },
  tagAnimal: { 
    tagName: "Animal",
    describeImageSystem: "",
    mixImageUser: "",
  },
  tagFood: { 
    tagName: "Food",
    describeImageSystem: "",
    mixImageUser: "",
  },
  tagPlace: { 
    tagName: "Place",
    describeImageSystem: "",
    mixImageUser: "",
  },
}
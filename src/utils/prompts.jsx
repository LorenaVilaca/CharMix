export const prompts = {
  describeArtstyleSystem: "You are a description assistant, skilled in describing the Artstyle of an image to others who can't see it (including if it is 2D or 3D).",
  describeArtstyleUser: "What’s the Artstyle of this image?",
  describeCharImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in six main categories: Appearance, Facial expression, Body pose, Clothes, The feeling the image gives and the Artstyle (including if it is 2D or 3D).",
  describeImageUser: "Describe the image",
  mixImagesSystem: "You are a description assistant, skilled in combining the descriptions of two different images in one description of a new character with mixed characteristics. You must structure your description in six main categories: APPEARENCE, FACIAL EXPRESSION, BODY POSE, CLOTHES, THE FELLING THE IMAGE GIVES and ARTSTYLE.",
  tagObject: { 
    tagName: "Object",
    describeImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in 4 main categories: Object type, Color, Texture and Material.",
    mixImageUser: "Combine these two descriptions to create a new character description. Incorporate the colour, texture and material of the Object into the character's clothes.",
    describeImageUser: "Describe this image"
  },
  tagCharacter: { 
    tagName: "Character",
    describeImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in 5 main categories: Appearance, Facial expression, Body pose, Clothes and The feeling the image gives.",
    mixImageUser: "Combine these two descriptions to create a new character description.",
    describeImageUser: "Describe this image",
  },
  tagAnimal: { 
    tagName: "Animal",
    describeImageSystem: "You are a Zoology assistant, skilled in identifying animal species.",
    mixImageUser: "Combine the following character description with the animal species to create a new character.",
    describeImageUser: "What animal species is this?"
  },
  tagFood: { 
    tagName: "Food",
    describeImageSystem: "You are a Cooking assistant, skilled in identifying foods.",
    mixImageUser: "Combine these two descriptions to create a new character description. The character must be made from the Food.",
    describeImageUser: "What food is this?",
  },
  tagLocation: { 
    tagName: "Location",
    describeImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in 3 main categories: Ambient Type, Appropriate Clothing and the feeling the image gives",
    mixImageUser: "Combine the following character description with the Location to create a new character. It should be wearing clothing appropriate for the Location.",
    describeImageUser: "Describe this image",
  },
  tagPerson:{ 
    tagName: "Person",
    describeImageSystem: "You are a description assistant, skilled in describing an image to others who can't see it. You must structure your description in 5 main categories: Appearance, Facial expression, Body pose, Clothes and The feeling the image gives.",
    mixImageUser: "Combine these two descriptions to create a new character description.",
    describeImageUser: "Describe this image",
  },
}
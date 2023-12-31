import { createContext, useState } from "react";
import OpenAI from "openai";
export const GenerateContext = createContext();

const GenerateProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState([]);
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });
  async function generateImgs(img) {
    setError(false);
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY2}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: img,
          n: 3,
        }),
      }
    );
    if (response.ok) {
      const image = await response.json();
      console.log(image.data);
      setImgs(image.data);
    } else {
      setError(true);
    }
    setLoading(false);
  }
  async function generateText(text) {
    setError(false);
    setLoading(true);
    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        input: text,
        voice: "echo",
        response_format: "mp3",
      }),
    });
    if (response.ok) {
      const audioBlob = await response.blob();
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    } else {
      setError(true);
    }
    setLoading(false);
  }
  console.log(error);
  return (
    <GenerateContext.Provider
      value={{
        generateImgs,
        setImgs,
        imgs,
        loading,
        error,
        generateText,
        audioUrl,
        setAudioUrl,
      }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export default GenerateProvider;

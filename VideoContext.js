import { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoKey, setVideoKey] = useState('');

  const generateUniqueKey = () => {
    return `videoKey_${Date.now()}`;
  };

  const setKey = () => {
    const uniqueKey = generateUniqueKey();
    setVideoKey(uniqueKey);
  };

  return (
    <VideoContext.Provider value={{ videoKey, setKey }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideoContext must be used within a VideoProvider');
  }
  return context;
};

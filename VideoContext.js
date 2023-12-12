import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [videoKey, setVideoKey] = useState('');

  const generateUniqueKey = () => {
    return `videoKey_${Date.now()}`;
  };

  const setKey = () => {
    const uniqueKey = generateUniqueKey();
    setVideoKey(uniqueKey);
    AsyncStorage.setItem('videoKey', uniqueKey);
  };

  useEffect(() => {
    const loadKey = async () => {
      try {
        const storedKey = await AsyncStorage.getItem('videoKey');
        if (storedKey) {
          setVideoKey(storedKey);
        }
      } catch (error) {
        console.error('Error loading videoKey from AsyncStorage:', error);
      }
    };

    loadKey();
  }, []); 

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

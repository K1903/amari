import Homepage from './Screens/Homepage';
import Closet from './Screens/Closet.jsx';
import SavedOutfits from './Screens/SavedOutfits.jsx';
import { useState } from 'react';
import ScreenContext from './Contexts/ScreenContext';
import HomeScreen from "./HomeScreen"
import CameraScreen from "./CameraScreen"
import ObjectCreationScreen from './ObjectCreationScreen';
import AppNavigator from './AppNavigator';
import ClothingStorage from './ClothingStorage'

export default function App() {
  const [screen, setScreen] = useState("home");

  if (screen === "home") {
    return <ScreenContext.Provider value={[screen, setScreen]}>
    <Homepage />
    </ScreenContext.Provider>
  } else if (screen === "closet") {
    return <ScreenContext.Provider value={[screen, setScreen]}>
    <Closet />
    </ScreenContext.Provider>
  } else if (screen === "savedOutfits") {
    return <ScreenContext.Provider value={[screen, setScreen]}>
    <SavedOutfits />
    </ScreenContext.Provider>
  } else if (screen === "addArticle") {
    return <ScreenContext.Provider value={[screen, setScreen]}>
    <AppNavigator />
    </ScreenContext.Provider>
  } else if (screen === "camera") {
    return <ScreenContext.Provider value={[screen, setScreen]}>
    <CameraScreen />
    </ScreenContext.Provider>
  } else if (screen === "objectCreation") {
  }


  return (
    <Homepage/>
  );
}
// App.js
import React, { useState, useEffect } from 'react';
import ThemeLogic from './src/AppLogic/ThemeLogic';
import { ErrorBoundary } from "@sentry/react-native";
import * as Sentry from 'sentry-expo';
import * as Font from 'expo-font';

Sentry.init({
  dsn: 'https://e8ae9b33312c53fc424e8546d2d91091@o4506706303909888.ingest.sentry.io/4506706307383296',
  enableInExpoDevelopment: true,
  debug: true,
});

const loadFonts = async () => {
  await Font.loadAsync({
    Acme: require('./assets/fonts/Acme.ttf'), 
  });
};

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  
  useEffect(() => {
    const loadAsync = async () => {
      await loadFonts();
      setFontsLoaded(true);
    };

    loadAsync();
  }, []);

  if (!fontsLoaded) {
    return null; // You can render a loading component or return null until the fonts are loaded
  }

  return (
    <ErrorBoundary>
      <ThemeLogic/>
    </ErrorBoundary>
    );
};

export default App;

// App.js
import ThemeLogic from './AppLogic/ThemeLogic';
import { ErrorBoundary } from "@sentry/react-native";
import * as Sentry from 'sentry-expo';

Sentry.init({
  dsn: 'https://e8ae9b33312c53fc424e8546d2d91091@o4506706303909888.ingest.sentry.io/4506706307383296',
  enableInExpoDevelopment: true,
  debug: true,
});

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeLogic/>
    </ErrorBoundary>
    );
};

export default App;

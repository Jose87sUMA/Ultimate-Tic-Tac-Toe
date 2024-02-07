// App.js
import ThemeLogic from './AppLogic/ThemeLogic';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://e8ae9b33312c53fc424e8546d2d91091@o4506706303909888.ingest.sentry.io/4506706307383296',
});

const App = () => {
  return (
    <ThemeLogic/>
    );
};

export default Sentry.wrap(App);

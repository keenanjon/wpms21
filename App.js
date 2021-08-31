import React from 'react';
import Home from './views/Home';
import Navigator from './navigators/Navigator';
import {MainProvider} from './contexts/MainContext';

const App = () => {
  return (
    <MainProvider>
      <Navigator />
    </MainProvider>
  );
};

export default App;

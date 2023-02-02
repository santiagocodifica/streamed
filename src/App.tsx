import { Routes, Route } from '@solidjs/router';
import { Component } from 'solid-js';

import Navbar from './components/Navbar';
import Main from './layouts/Main';

const App: Component = () => {

  return (
    <div class={`bg-dark1 text-light1`}>
      <Navbar />
      <Routes>
        <Route path="/" component={ Main } />
      </Routes>
    </div>
  );
};

export default App;

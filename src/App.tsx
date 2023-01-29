import { Routes, Route } from '@solidjs/router';
import type { Component } from 'solid-js';

import Search from './layouts/Search';
import Navbar from './components/Navbar';
import { useShow } from '../hooks/useShow';

const App: Component = () => {


  return (
    <div class={`bg-dark1 text-light1`}>
      <Navbar />
      <Routes>
        <Route path="/" component={ Search } />
      </Routes>
    </div>
  );
};

export default App;

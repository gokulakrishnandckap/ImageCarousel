import React from 'react';
import './App.css';
import Carousel from './Carousel';

const images = [
  'https://source.unsplash.com/random/800x600?sig=1',
  'https://source.unsplash.com/random/800x600?sig=2',
  'https://source.unsplash.com/random/800x600?sig=3',
  'https://source.unsplash.com/random/800x600?sig=4',
  'https://source.unsplash.com/random/800x600?sig=5',
];

function App() {
  return (
    <div className="App">
      <Carousel images={images} />
    </div>
  );
}

export default App;

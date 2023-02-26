import { IAvatars } from '../interfaces';
import dog from '../assets/icons/dog.png';
import penguin from '../assets/icons/penguin.png';
import pufferFish from '../assets/icons/puffer-fish.png';
import reindeer from '../assets/icons/reindeer.png';
import shark from '../assets/icons/shark.png';
import sloth from '../assets/icons/sloth.png';

export const Avatars: IAvatars = {
  dog,
  sloth,
  pufferFish,
  penguin,
  shark,
  reindeer,
};

export const templates = {
  small: {
    title: 'Small board',
    background: '#009900',
    cards: ['To do', 'Done'],
  },
  medium: {
    title: 'Medium board',
    background: '#000099',
    cards: ['To do', 'In process', 'Done'],
  },
  big: {
    title: 'Big board',
    background: '#990000',
    cards: ['To do', 'In process', 'Review', 'Done'],
  },
};

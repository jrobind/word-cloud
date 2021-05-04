import './scss/styles.scss';

import regeneratorRuntime from 'regenerator-runtime';
import { topicsDataURL } from './constants';
import WordCloud from './WordCloud';

async function init() {
  const response = await fetch(topicsDataURL);
  const { topics } = await response.json();

  new WordCloud(topics).renderWords();
}

init();

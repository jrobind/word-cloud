import './scss/styles.scss';

import topicData from '../topics.json';
import WordCloud from './WordCloud';

const { topics } = topicData;

new WordCloud(topics).renderWords();

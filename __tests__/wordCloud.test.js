import { expect } from '@jest/globals';
import WordCloud from '../src/WordCloud';

import topicData from '../topics.json';

jest.mock('../topics.json', () => ({
  topics: [
    {
      label: 'Bread',
      volume: 125,
      sentimentScore: 75,
      sentiment: {
        negative: 3,
        neutral: 133,
        positive: 29,
      },
    },
    {
      label: 'Apple',
      volume: 2,
      sentimentScore: 15,
      sentiment: {
        negative: 30,
        neutral: 0,
        positive: 2,
      },
    },
  ],
}));

const { topics } = topicData;
let cloudInstance;

describe('WordCloud', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <main class="app">
        <h1>My Topics Challenge</h1>
        <div class="topics-container">
          <ul class="topics" role="navigation" aria-label="word cloud"></ul>
          <div class="topic-meta" hidden>
            <h2 class="topic-meta__title">Information on topic <br>
              <span class="topic-meta__label"></span>:
            </h2>
            <p>Total Mentions: <span class="topic-meta__mentions"></span></p>

            <div class="topic-meta__group">
              <p>Positive Mentions: <span class="topic-meta__positive-mentions"></span></p>
              <p>Neutral Mentions: <span class="topic-meta__neutral-mentions"></span></p>
              <p>Negative Mentions: <span class="topic-meta__negative-mentions"></span></p>
            </div>
          </div>
        </div>
      </main>
    `;

    cloudInstance = new WordCloud(topics);
  });

  it('renders a word cloud list', () => {
    cloudInstance.renderWords();

    const topicsList = document.querySelector('.topics');
    const firstTopic = topicsList.querySelectorAll('a')[0];
    const lastTopic = topicsList.querySelectorAll('a')[1];

    expect(topicsList.childElementCount).toBe(2);

    expect(firstTopic.textContent).toBe('Apple');
    expect(firstTopic.getAttribute('topic-label')).toBe('Apple');
    expect(firstTopic.classList.toString()).toBe('fs-1 negative');

    expect(lastTopic.textContent).toBe('Bread');
    expect(lastTopic.getAttribute('topic-label')).toBe('Bread');
    expect(lastTopic.classList.toString()).toBe('fs-6 positive');
  });

  it('renders topic meta data when topic is clicked', () => {
    cloudInstance.renderWords();

    const topicMetaContainer = document.querySelector('.topic-meta');
    const topicsList = document.querySelector('.topics');
    const topicMetaLabel = document.querySelector('.topic-meta__label');
    const topicMetaMentions = document.querySelector('.topic-meta__mentions');
    const topicMetaPositiveMentions = document.querySelector(
      '.topic-meta__positive-mentions',
    );
    const topicMetaNeutralMentions = document.querySelector(
      '.topic-meta__neutral-mentions',
    );
    const topicMetaNegativeMentions = document.querySelector(
      '.topic-meta__negative-mentions',
    );

    expect(topicMetaContainer.hasAttribute('hidden')).toBe(true);

    topicsList.querySelectorAll('a')[0].click();

    expect(topicMetaContainer.hasAttribute('hidden')).toBe(false);
    expect(topicMetaLabel.textContent).toBe('Apple');
    expect(topicMetaMentions.textContent).toBe('2');
    expect(topicMetaPositiveMentions.textContent).toBe('2');
    expect(topicMetaNeutralMentions.textContent).toBe('0');
    expect(topicMetaNegativeMentions.textContent).toBe('30');
  });
});

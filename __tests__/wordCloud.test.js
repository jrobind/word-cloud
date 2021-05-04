import { expect } from '@jest/globals';
import WordCloud from '../src/WordCloud';
import mockTopicData from '../__mocks__/topicData';

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

    cloudInstance = new WordCloud(mockTopicData);
  });

  it('renders a word cloud list', () => {
    cloudInstance.renderWords();

    const topicsList = document.querySelector('.topics');
    const firstTopic = topicsList.querySelectorAll('a')[0];
    const secondTopic = topicsList.querySelectorAll('a')[1];
    const thirdTopic = topicsList.querySelectorAll('a')[2];

    expect(topicsList.childElementCount).toBe(3);

    expect(firstTopic.textContent).toBe('Apple');
    expect(firstTopic.getAttribute('topic-label')).toBe('Apple');
    expect(firstTopic.classList.toString()).toBe('fs-1 negative');

    expect(secondTopic.textContent).toBe('Bread');
    expect(secondTopic.getAttribute('topic-label')).toBe('Bread');
    expect(secondTopic.classList.toString()).toBe('fs-6 positive');

    expect(thirdTopic.textContent).toBe('Pepper');
    expect(thirdTopic.getAttribute('topic-label')).toBe('Pepper');
    expect(thirdTopic.classList.toString()).toBe('fs-3 neutral');
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

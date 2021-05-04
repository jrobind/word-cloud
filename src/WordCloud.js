import { minFontSize, maxFontSize } from './constants';

export default class WordCloud {
  constructor(topics) {
    this.topics = topics;
    this.minFontSize = minFontSize;
    this.maxFontSize = maxFontSize;

    // cache elements
    this.topicsContainer = document.querySelector('.topics');
    this.topicMetaContainer = document.querySelector('.topic-meta');
    this.topicMetaLabel = document.querySelector('.topic-meta__label');
    this.topicMetaMentions = document.querySelector('.topic-meta__mentions');
    this.topicMetaPositiveMentions = document.querySelector(
      '.topic-meta__positive-mentions',
    );
    this.topicMetaNeutralMentions = document.querySelector(
      '.topic-meta__neutral-mentions',
    );
    this.topicMetaNegativeMentions = document.querySelector(
      '.topic-meta__negative-mentions',
    );

    this.topicsContainer.addEventListener(
      'click',
      this.renderTopicMetaData.bind(this),
    );
  }

  renderTopicMetaData(e) {
    e.preventDefault();
    const { target } = e;

    if (!target.hasAttribute('topic-label')) return;

    const {
      volume,
      label,
      sentiment: { negative = 0, neutral = 0, positive = 0 },
    } = this.topics.filter(
      topic => topic.label === target.getAttribute('topic-label'),
    )[0];

    this.topicMetaContainer.removeAttribute('hidden');

    this.topicMetaLabel.textContent = label;
    this.topicMetaMentions.textContent = volume;
    this.topicMetaNegativeMentions.textContent = negative;
    this.topicMetaNeutralMentions.textContent = neutral;
    this.topicMetaPositiveMentions.textContent = positive;
  }

  getFontSizeClass(volume) {
    const fontSize = Math.round(
      (volume / this.getMaximumVolume()) *
        (this.maxFontSize - this.minFontSize) +
        this.minFontSize,
    );

    return `fs-${fontSize}`;
  }

  alphabetisize() {
    return Array.from(this.topics).sort((a, b) =>
      a.label.toLowerCase().localeCompare(b.label.toLowerCase()),
    );
  }

  getMaximumVolume() {
    return Array.from(this.topics).sort((a, b) => a.volume - b.volume)[
      this.topics.length - 1
    ].volume;
  }

  createTopicElement({ label, volume, sentimentScore }) {
    const topicWord = document.createElement('li');
    const topicWordLink = document.createElement('a');

    topicWord.classList.add('topics__topic');
    topicWordLink.classList.add(this.getFontSizeClass(volume));
    topicWordLink.href = '#'; // temporary solution
    topicWordLink.textContent = label;
    topicWordLink.setAttribute('topic-label', label);

    this.setSentimentClass(topicWordLink, sentimentScore);

    topicWord.appendChild(topicWordLink);

    return topicWord;
  }

  setSentimentClass(element, score) {
    if (score > 60) {
      element.classList.add('positive');
    } else if (score < 40) {
      return element.classList.add('negative');
    } else {
      element.classList.add('neutral');
    }

    return element;
  }

  renderWords() {
    this.alphabetisize().forEach(topic => {
      this.topicsContainer.appendChild(this.createTopicElement(topic));
    });
  }
}

const dataModule = (function() {

  // API call
  const doAPICall = function(url) {
    return fetch(url)
      .then(r => r.json())
      .then(data => data)
      .catch(error => console.error('An error occured:', error));
  };

  // LocalStorage -> module in een module = namespacing.
  const localStorage = {
    KEY: 'EMOJIS',
    get: (name) => {
      // This verwijst naar window.
      return this.localStorage.getItem(name);
    },
    set: (name) => {
      this.localStorage.setItem(name, name);
    },
    has: (name) => {
      if (this.localStorage.getItem(name)) {
        return true
      } else {
        return false
      }

    },
    delete: (name) => {
      this.localStorage.removeItem(name);
    }
  };

  return {
    doAPICall: doAPICall,
    localStorage: localStorage
  }
})();
// Constructor pattern
// Welke waardes ( ,  , )


// Reden dat je {} gebruikt bij de paramters is omdat je dan die lijst van paramters ziet bij het aanmaken.
function Emoji({
  name,
  imageUrl,
  starred
}) {
  Object.assign(this, {
    name,
    imageUrl,
    starred
  });

  // Dit hieronder is hetzelfde als die Object assign.
  // this.name = name;
  // this.imageUrl = imageUrl;
  // this.starred = starred;

}

Emoji.prototype.generateHTML = function() {
  return `
  <article class="c-emoji js-emoji ${(this.starred) ? 'u-selected' : ''}" data-key="${this.name}">
    <img class="c-emoji__image" src="${this.imageUrl}" alt="${this.name}">
    <div class="c-emoji-meta">
      <p class="c-emoji__code">${this.name}</p>
      <svg class="c-emoji__star" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="butt" stroke-linejoin="arcs"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
    </div>
  </article>
  `;
};
const emojiModule = (function() {

  const listenToEmojis = function() {
    const emojis = document.querySelectorAll('.js-emoji');
    for (const e of emojis) {
      e.addEventListener('click', function() {
        console.log(e.getAttribute('data-key'));
        const name = e.getAttribute('data-key');
        if (dataModule.localStorage.get(name)) {
          dataModule.localStorage.delete(name);
          e.classList.remove('u-selected');
        } else {
          dataModule.localStorage.set(name);
          e.classList.add('u-selected')
        }
      })
    }
  };

  const redrawEmojis = function() {

  };

  return {
    redrawEmojis: redrawEmojis,
    listenToEmojis: listenToEmojis
  }

})();
// npm init
// zelf gulpfile.js maken
// npm install browser-sync gulp-htmlmin gulp

(async function() {
  console.log("App.js");
  const data = await dataModule.doAPICall('https://api.github.com/emojis');
  console.log(data);

  const emojiObs = [];

  // Keep track of these things (new Emoji?)
  for (const key in data) {
    // console.log('Key is ', key);
    // console.log('Value is?', data[key]);
    const starred = dataModule.localStorage.has(key);



    emojiObs.push(new Emoji({
      name: key,
      imageUrl: data[key],
      starred: starred
    }));

  }

  // Setup holder in emojiModule.
  let emojiHTML = '';

  for (const emoji of emojiObs) {
    emojiHTML += emoji.generateHTML();
  }
  document.querySelector('.js-holder').innerHTML = emojiHTML;

  // Pass it to the module (emojiModule.js)

  emojiModule.listenToEmojis();

})();
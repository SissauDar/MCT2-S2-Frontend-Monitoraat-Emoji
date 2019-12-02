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
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
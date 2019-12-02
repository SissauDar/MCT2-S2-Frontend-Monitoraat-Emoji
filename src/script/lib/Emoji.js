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
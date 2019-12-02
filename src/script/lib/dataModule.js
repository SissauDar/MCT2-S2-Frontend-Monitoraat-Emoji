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
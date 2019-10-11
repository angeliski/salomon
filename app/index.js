(function(){
    console.log('Init app')
    let global = [];

    const save = (quotes) => {
        global = quotes;
    }

    const getOne = () => {
        return global[0];
    }

    const render = (quote) => {
        const $quote = document.getElementById('quote')
        $quote.innerHTML = `"${quote.quote}"`
    
        const $author = document.getElementById('author')
        $author.innerHTML = `&#8212; ${quote.author}`
    
    }

    const ajax = (url) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open("GET", chrome.extension.getURL(url), true);
            xhr.onreadystatechange = () => {
              if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error("Problemas ao carregar as frases."));
                }
              }
            };
            xhr.send();
        });
      };


      ajax('./data/quotes.json')
      .then(save)
      .then(getOne)
      .then(render);

})()
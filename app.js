const { parse } = require('rss-to-json');

// Promise

parse('http://www.isleofwightweather.com/rss.xml').then(rss => {
    return (JSON.stringify(rss, null, 3));
})
.then(data => {
    console.log(data.description);
});
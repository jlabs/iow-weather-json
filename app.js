const { parse } = require('rss-to-json');

// async await
(async () => {

    var rss = await parse('http://www.isleofwightweather.com/rss.xml');

    console.log(JSON.stringify(rss, null, 3));

})();
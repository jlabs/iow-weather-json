const { parse } = require('rss-to-json');

// Promise

const weatherData = parse('http://www.isleofwightweather.com/rss.xml').then(rss => {
    const data = JSON.stringify(rss, (k,v) => v === undefined ? null : v, 3);
    return (data);
})
.then(data => {
    return JSON.parse(data);
})
.then(conditions => {
    const current = conditions.items[0];
    const details = current.description.split(' | ');
    console.log(details);
});

module.exports = weatherData;
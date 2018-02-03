const express = require('express');
const fs      = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
const app     = express();
const conflateHeadlines = require('./conflate-headlines');

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

function writeFile(res, data) {
    fs.writeFile('output.json', data, (err) => {
        console.log('File successfully written! - Check your project directory for the output.json file');
    });

    // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
    res.send('Check your console!');
}

app.get('/scrape', (req, res) => {

    let json = { sunHeadline : '', starHeadline : '', conflation: ''};
    let sunHeadline;
    let starHeadline;
    let sunHeadlineText;
    let starHeadlineText;

    const sunOptions = {
        uri: 'https://www.thesun.co.uk/news/',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    const starOptions = {
        uri: 'https://www.dailystar.co.uk/news',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    // Sun request
    rp(sunOptions).then(($) => {
        headline = $('.teaser__headline').first();
        headlineText = headline.text();
        json.sunHeadline = headlineText;
        // Star request
        return rp(starOptions);
    }).then(($) => {
        headline = $('.story .caption').first();
        headlineText = headline.text();
        json.starHeadline = headlineText;
        json.conflation = conflateHeadlines(json.sunHeadline, json.starHeadline);
        const pjson = JSON.stringify(json, null, 4);
        console.log('pjson', pjson);
        writeFile(res, pjson);
    }).catch((err) => {
        console.log('there was a request error: ', err);
    });
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
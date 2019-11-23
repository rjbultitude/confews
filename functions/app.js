const express = require('express');
const fs      = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
const Twit = require('twit');
const config = require('./config');
const conflateHeadlines = require('./app_modules/conflate-headlines');
const app     = express();

// To write to the system we will use the built in 'fs' library.
// In this example we will pass 3 parameters to the writeFile function
// Parameter 1 :  output.json - this is what the created filename will be called
// Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
// Parameter 3 :  callback function - a callback function to let us know the status of our function

function writeFile(res, data) {
    fs.appendFile('output.json', data, (err) => {
        console.log('File successfully written: output.json', err);
    });
}

function postAndSave(res, json) {
    const T = new Twit(config);
    T.post('statuses/update', { status: json.conflation }, (err, data, response) => {
        if (!err) {
            console.log('data', data);
            console.log('data', response);
        } else {
            console.log('Twittr error', err);
        }
    });
    console.log(json.conflation);
    // Output
    // app.get('/output', (req, res) => res.send(json.conflation));
    // Write to static file
    // const pjson = JSON.stringify(json, null, 4);
    // writeFile(res, `,${pjson}`);
}

function useStatic(json) {
    json.sunHeadline = 'DEADLY ATTACK';
    json.starHeadline = 'Queen breaks finger';
    json.guardianHeadline = 'Tax cuts for big business';
    json.conflation = conflateHeadlines(json);
    console.log('conflated headlines', json.conflation);
}

app.get('/', (req, res) => {

    let json = { sunHeadline : '', starHeadline : '', guardianHeadline : '', conflation: ''};

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

    const guardianOptions = {
        uri: 'https://www.theguardian.com/uk',
        transform: function (body) {
            return cheerio.load(body);
        }
    };

    // Sun request
    rp(sunOptions).then(($) => {
        let headline = $('.teaser__headline').first();
        let headlineText = headline.text();
        json.sunHeadline = headlineText;
        // Star request
        return rp(starOptions);
    }).then(($) => {
        let headline = $('.story .caption').first();
        let headlineText = headline.text();
        json.starHeadline = headlineText;
        return rp(guardianOptions);
    }).then(($) => {
        let headline = $('h1 .js-headline-text').first();
        let headlineText = headline.text();
        json.guardianHeadline = headlineText;
        json.conflation = conflateHeadlines(json);
        postAndSave(res, json);
        return res;
    }).catch((err) => {
        const reqErr = 'there was a request error: ';
        console.log(reqErr, err);
        useStatic(json);
    });
});

module.exports = app;

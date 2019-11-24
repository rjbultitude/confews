const express = require('express');
const fs = require('fs');
const rp = require('request-promise');
const cheerio = require('cheerio');
const Twit = require('twit');
const config = require('./config');
const conflateHeadlines = require('./conflate-headlines');
const app = express();

// For local testing only
function writeFile(res, data) {
    fs.appendFile('output.json', data, (err) => {
      if (err) {
        console.warn('Error writing to file', err);
      }
      console.log('File successfully written: output.json');
    });
}

function postAndSave(res, json) {
    const T = new Twit(config);
    T.post('statuses/update', { status: json.conflation }, (err, data, response) => {
        if (!err) {
            // console.log('Success. Data: ', data);
            console.log('Success. Response', response);
        } else {
            console.log('Twitter error', err.message);
        }
    });
    // Output
    app.get('/output', (req, res) => res.send(json.conflation));
    // Write to static file
    const pjson = JSON.stringify(json, null, 4);
    writeFile(res, `,${pjson}`);
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
        let headline = $('.teaser-hero .headline').first();
        let headlineText = headline.text();
        json.starHeadline = headlineText;
        return rp(guardianOptions);
    }).then(($) => {
        let headline = $('.js-headline-text').first();
        let headlineText = headline.text();
        json.guardianHeadline = headlineText;
        json.conflation = conflateHeadlines(json);
        console.log('json.conflation', json.conflation);
        postAndSave(res, json);
        return res;
    }).catch((err) => {
        const reqErr = 'there was a request error: ';
        console.log(reqErr, err);
        useStatic(json);
    });
});

module.exports = app;

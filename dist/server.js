'use strict';

const express = require('express');
const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');
const app = express();

app.get('/scrape', function (req, res) {

    const url = 'https://www.thesun.co.uk/news/';
    const className = 'teaser__headline';

    request(url, (error, response, html) => {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            const $ = cheerio.load(html);
            // Finally, we'll define the variables we're going to capture
            let headline;
            const json = { headline: '' };
            $('.main-content-wrap').filter(() => {
                var data = $(this);
                console.log('data', data);
                headline = data.children(className).text();
                json.headline = headline;
                console.log('the json: ', json);
            });
        } else {
            console.log('there was an error with the request');
        }

        // To write to the system we will use the built in 'fs' library.
        // In this example we will pass 3 parameters to the writeFile function
        // Parameter 1 :  output.json - this is what the created filename will be called
        // Parameter 2 :  JSON.stringify(json, null, 4) - the data to write, here we do an extra step by calling JSON.stringify to make our JSON easier to read
        // Parameter 3 :  callback function - a callback function to let us know the status of our function

        fs.writeFile('output.json', JSON.stringify(json, null, 4), err => {
            console.log('File successfully written! - Check your project directory for the output.json file');
        });

        // Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
        res.send('Check your console!');
    });
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
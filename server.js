const express = require('express');
const fs      = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const app     = express();

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

    const sunUrl = 'https://www.thesun.co.uk/news/';
    const starUrl = 'https://www.dailystar.co.uk/news';
    let json = { sunHeadline : '', starHeadline : ''};
    let sunHeadline;
    let starHeadline;
    let sunHeadlineText;
    let starHeadlineText;

    // Sun request
    request(sunUrl, (error, response, html) => {
        
        // First we'll check to make sure no errors occurred when making the request

        if(!error) {
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
            var $ = cheerio.load(html);
            headline = $('.teaser__headline').first();
            headlineText = headline.text();
            json.sunHeadline = headlineText;
        } else {
            console.log('there was an error with the request');
        }

        const pjson = JSON.stringify(json, null, 4);
        console.log('pjson', pjson);
        writeFile(res, pjson);
    });

    // Star request
    request(starUrl, (error, response, html) => {
        if(!error) {
            var $ = cheerio.load(html);
            headline = $('.story .caption').first();
            headlineText = headline.text();
            json.starHeadline = headlineText;
        } else {
            console.log('there was an error with the request');
        }

        const pjson = JSON.stringify(json, null, 4);
        console.log('pjson', pjson);
        //writeFile(res, pjson);
    });
    
});

app.listen('8081');

console.log('Magic happens on port 8081');

exports = module.exports = app;
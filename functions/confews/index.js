var __DEV__ = process.env.NODE_ENV === 'development';
console.log('__DEV__', __DEV__);

const {PubSub} = require('@google-cloud/pubsub');
const rp = require('request-promise');
const cheerio = require('cheerio');
const Twit = require('twit');
const fs = require('fs');
const config = require('./config');
const conflateHeadlines = require('./conflate-headlines');
new PubSub();


// Scaping selectors
const sunSelector = '.teaser__headline';
const starSelector = '.teaser-hero .headline';
const guardianSelector = '.js-headline-text';
const expressSelector = '.main-story h4';
const mirrorSelector = '.headline';

// Sources
const sunOptions = {
  uri: 'https://www.thesun.co.uk/news/',
  transform: function(body) {
    return cheerio.load(body);
  }
};
const starOptions = {
  uri: 'https://www.dailystar.co.uk/news',
  transform: function(body) {
    return cheerio.load(body);
  }
};
const guardianOptions = {
  uri: 'https://www.theguardian.com/uk',
  transform: function(body) {
    return cheerio.load(body);
  }
};

const expressOptions = {
  uri: 'https://www.express.co.uk/news',
  transform: function(body) {
    return cheerio.load(body);
  }
}

const mirrorOptions = {
  uri: 'https://www.mirror.co.uk/news',
  transform: function(body) {
    return cheerio.load(body);
  }
}

// For local testing only
function writeFile(data) {
  console.log('write file data', data);
  fs.appendFile('output.json', data, (err) => {
    if (err) {
      console.warn('Error writing to file', err);
    }
    console.log('File successfully written: output.json');
  });
}

function postToTwitter(json) {
  const T = new Twit(config);
  T.post(
    'statuses/update',
    { status: `${json.conflation}` },
    (err, data, response) => {
      if (!err) {
        // console.log('Success. Data: ', data);
        console.log('Success. Response');
      } else {
        console.log('Twitter error', err.message);
      }
  });
}

function useStatic(json) {
  json.sunHeadline = 'DEADLY ATTACK';
  json.starHeadline = 'Queen breaks finger';
  json.guardianHeadline = 'Tax cuts for big business';
  json.conflation = conflateHeadlines(json);
  console.log('conflated headlines', json.conflation);
}

function getHeadlines(res, callBack) {
  let json = {
    sunHeadline: '',
    starHeadline: '',
    guardianHeadline: '',
    expressHeadline: '',
    mirrorHeadline: '',
    conflation: ''
  };

  // Sun request
  rp(sunOptions).then(($) => {
    let headline = $(sunSelector).first();
    let headlineText = headline.text();
    json.sunHeadline = headlineText;
    // Star request
    return rp(starOptions);
  })
  .then(($) => {
    let headline = $(starSelector).first();
    let headlineText = headline.text();
    json.starHeadline = headlineText;
    // Express request
    return rp(expressOptions);
  })
  .then(($) => {
    let headline = $(expressSelector).first();
    let headlineText = headline.text();
    json.expressHeadline = headlineText;
    // Mirror request
    return rp(mirrorOptions);
  })
  .then(($) => {
    let headline = $(mirrorSelector).first();
    let headlineText = headline.text();
    json.mirrorHeadline = headlineText;
    // Guardian request
    return rp(guardianOptions);
  })
  .then(($) => {
    let headline = $(guardianSelector).first();
    let headlineText = headline.text();
    json.guardianHeadline = headlineText;
    json.conflation = conflateHeadlines(json);
    console.log('json.conflation', json.conflation);
    if (__DEV__) {
      const pjson = JSON.stringify(json, null, 4);
      writeFile(pjson);
    }
    if (__DEV__ === false) {
      postToTwitter(json);
    }
    if (callBack) {
      callBack(json);
    }
    return res;
  }).catch((err) => {
    const reqErr = 'there was a request error: ';
    console.log(reqErr, err);
    useStatic(json);
  });
}

exports.subscribe = (pubsubMessage) => {
  const msg = Buffer.from(pubsubMessage.data, 'base64').toString();
  if (msg) {
    getHeadlines();
  }
  // console.log(msg);
};

module.exports = {
  getHeadlines
};

# Confews

## Project Introduction
Confews is a Twitter bot that scrapes and then conflates daily news headlines for amusement. 

## Installation

*Run (in this directory):*

  `npm install`

This ensures the all the node packages are installed. Follow the [NPM guide](https://docs.npmjs.com/cli/install) to install new packages.

## Build

TBC

### Tools

[express](https://expressjs.com/)

[request](https://github.com/request/request)

[cheerio](https://cheerio.js.org/)

### Design

1. Scrape three headlines
2. Perform any source specific sanitisation
3. Add all headlines to an array
4. Perform any general sanitisation
5. Truncate at comma or full stop if available
6. Truncate at three words as alternative to step 5
7. Determine which headlines end with a conjunction and move them to start of array
8. Determine which headlines end with a handle verb and move them to start of array
9. Ensure last headline in array doesn't end with a conjuntion or handle verb


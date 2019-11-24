const express = require('express');
const confewsApp = require('./functions/confews/index');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    confewsApp.getHeadlines(res, (json) => {
      app.get('/output', (req, res) => res.send(json));
    });
});


app.listen(port, () =>
  console.log(`Server is listening on port ${port}.`)
);

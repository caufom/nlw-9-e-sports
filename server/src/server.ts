import express from 'express';

const app = express();

app.get('/ads', (request, response) => {
  return response.status(200).send('Acessou Ads!');
});

app.listen(3333);
const express = require('express');
const app = express();
const KoreaCovidApi = require('./router/KoreaCovidApi');


const PORT = 5000;

app.use("/api", KoreaCovidApi);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

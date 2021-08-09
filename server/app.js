const express = require('express');
const path = require('path');
const KoreaCovidApi = require('./router/KoreaCovidApi');
const logger = require("./middlewares/logger")
const app = express();

const PORT = process.env.PORT || 5000;
const CLIENT_PATH = process.env.CLIENT_PATH;


const root = path.join(__dirname, CLIENT_PATH);
app.use(logger());
app.use(express.json());
app.use(express.static(root));
app.use("/api", KoreaCovidApi);


app.use("*", (req, res) => res.sendFile('index.html', { root }));



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

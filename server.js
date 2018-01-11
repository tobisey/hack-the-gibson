const express = require('express');
const app = express();

// const compression = require('compression');
// app.use(compression());

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(8080, () => console.log(`listening on 8080...`));


/* Mock api service for local testing
 * To run this script:
 * $ npm install express && npm install socket.io
 * $ node mockApi.js
 */

const bodParse = require('body-parser');
const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());
app.use(bodParse());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/home', (req, res) => {
    setTimeout(() => {
        res.send({
            id: '12345',
            name: 'Rojin',
            owner: false,
        });
    }, 1000);
});

app.get('/guest-home', (req, res) => {
    res.send({ id: '12345' });
});

app.post('/signup', (req, res) => {
    setTimeout(() => {
        res.send({
            id: '12345',
            ...req.body,
        });
    }, 1000);
});


http.listen(8080, () => {
    console.log('listening on port 8080');
});


/* Mock api service for local testing
 * To run this script:
 * $ npm install express && npm install socket.io
 * $ node mockApi.js
 */
const app = require('express')();
const http = require('http').Server(app);
const cors = require('cors');

app.use(cors());

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

app.post('/questions', (req, res) => {
    console.log(req.body);
    res.send({
        q: req.body.question,
        des: req.body.description,
    });
});


http.listen(8080, () => {
    console.log('listening on port 8080');
});

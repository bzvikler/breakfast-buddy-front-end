
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

app.post('/user/:id/search-restaurant', (req, res) => {
    const mockResults = [
        {
            restaurantID: '1',
            restaurantName: 'Loaf',
            faveFood: 'Waffles',
            closeTime: '1 PM',
        },
        {
            restaurantID: '2',
            restaurantName: 'Jam Cafe',
            faveFood: 'Pancakes',
            closeTime: '3 PM',
        },
        {
            restaurantID: '3',
            restaurantName: 'McDonalds',
            faveFood: 'McGriddle',
            closeTime: 'Never',
        },
        {
            restaurantID: '4',
            restaurantName: 'Upper Case',
            faveFood: 'Marbelous Cookie',
            closeTime: '6 PM',
        },
    ];

    setTimeout(() => {
        res.send(mockResults);
    }, 1000);
});


http.listen(8080, () => {
    console.log('listening on port 8080');
});


/* Mock api service for local testing
 * To run this script:
 * $ npm install express
 * $ node mock-api.js
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
            lat: 49.265845,
            lon: -123.250135,
        },
        {
            restaurantID: '2',
            restaurantName: 'Jam Cafe',
            faveFood: 'Pancakes',
            closeTime: '3 PM',
            lat: 49.280297,
            lon: -123.109663,
        },
        {
            restaurantID: '3',
            restaurantName: 'McDonalds',
            faveFood: 'McGriddle',
            closeTime: 'Never',
            lat: 49.266682,
            lon: -123.242516,
        },
        {
            restaurantID: '4',
            restaurantName: 'Upper Case',
            faveFood: 'Marbelous Cookie',
            closeTime: '6 PM',
            lat: 49.266656,
            lon: -123.249853,
        },
    ];

    setTimeout(() => {
        res.send(mockResults);
    }, 1000);
});

app.get('/view-restaurant/:id', (req, res) => {
    const mockMap = {
        1: {
            restaurantID: '1',
            restaurantName: 'Macs',
            OpenHours: [{
                day: 'Monday',
                openTime: '00:00',
                closeTime: '24:00',
            }],
            number: '293',
            street: 'skj st',
            city: 'ewfk',
            postalCode: 'efqrf',
            lat: 49.261427,
            lon: -123.245934,
            faveFood: '',
            foodTypes: [{
                food_type: 'pancakes',
            }],
        },
    };

    setTimeout(() => {
        res.send(mockMap[req.params.id]);
    }, 1000);
});


http.listen(8080, () => {
    console.log('listening on port 8080');
});

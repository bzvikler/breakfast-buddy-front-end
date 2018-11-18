
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
            likedRestaurants: [
                {
                    rid: '1',
                    name: 'Macs',
                },
            ],
            favouritedFoods: [
                {
                    restaurantId: '1',
                    restaurantName: 'Macs',
                    food_type: 'pancakes',
                },
            ],
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
            OpenHours: [
                {
                    day: 'Monday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Tuesday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Wednesday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Thursday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Friday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Saturday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
                {
                    day: 'Sunday',
                    openTime: '00:00',
                    closeTime: '24:00',
                },
            ],
            number: '1757',
            street: '128th St.',
            city: 'Surrey',
            postalCode: 'V4B 3V8',
            lat: 49.261427,
            lon: -123.245934,
            faveFood: 'Waffles',
            foodTypes: [
                {
                    food_type: 'pancakes',
                },
                {
                    food_type: 'waffles',
                },
                {
                    food_type: 'breakfast sandwiches',
                },
                {
                    food_type: 'smoothies',
                },
            ],
        },
    };

    setTimeout(() => {
        res.send(mockMap[req.params.id]);
    }, 1000);
});

app.post('/user/:userId/like-restaurant/:restaurantId', (req, res) => {
    setTimeout(() => {
        res.send([
            {
                rid: '1',
                name: 'Macs',
            },
        ]);
    }, 1000);
});

app.delete('/user/:userId/remove-liked-restaurant/:restaurantId', (req, res) => {
    setTimeout(() => {
        res.send([]);
    }, 1000);
});

app.post('/user/:userId/like-food/:restaurantId', (req, res) => {
    setTimeout(() => {
        res.send([
            {
                restaurantId: req.params.restaurantId,
                restaurantName: 'Macs',
                food_type: req.body.food_type,
            },
        ]);
    }, 1000);
});

app.delete('/user/:userId/restaurant/:restaurantId/remove-fave-food/:foodType', (req, res) => {
    setTimeout(() => {
        res.send([]);
    }, 1000);
});


http.listen(8080, () => {
    console.log('listening on port 8080');
});

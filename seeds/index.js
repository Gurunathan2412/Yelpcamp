const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '669a937b65d0046b2880e4f8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images:[
                {
                  url: 'https://res.cloudinary.com/dh2mrevv0/image/upload/v1721487918/YelpCamp/rjoy1noqevpyjksz1pgt.jpg',
                  filename: 'YelpCamp/rjoy1noqevpyjksz1pgt',
                },
                {
                  url: 'https://res.cloudinary.com/dh2mrevv0/image/upload/v1721487919/YelpCamp/igrcdmd3nkzxfks2hzqi.jpg',
                  filename: 'YelpCamp/igrcdmd3nkzxfks2hzqi',
                },
                {
                  url: 'https://res.cloudinary.com/dh2mrevv0/image/upload/v1721487919/YelpCamp/tfkdqkzzupl2ta6xlajf.jpg',
                  filename: 'YelpCamp/tfkdqkzzupl2ta6xlajf',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
const mongoose = require('mongoose');
const cities = require('./cities'); // require the cities.js file for the array
const Campground = require('../models/campground'); //two dots because u need to back out from the seeds folder and then go to models/campground
const {places, descriptors} = require('./seedHelper');


//connect mongoose to mongo db
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//check connection made or not between mongoose and mongo db
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// to check if one element goes in the database
// const seedDB = async () => {
//     await Campground.deleteMany({}); // delete all previous test entries
//     const c = new Campground({title: "Purple Field"});
//     await c.save();
// }

const sample = arr => arr[Math.floor(Math.random() * arr.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for( let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000); //because there are 1000 cities in cities.js
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/155011/1024x768',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, illum quo alias deserunt, eveniet laudantium perspiciatis corrupti consequatur laboriosam suscipit mollitia, ut blanditiis soluta obcaecati? Pariatur dolores temporibus inventore in.',
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close(); // to close the database connection after saving
}); // need to call the function to insert data
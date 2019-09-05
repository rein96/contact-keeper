const mongoose = require('mongoose');
const config = require('config');

// from default.json (mongoURI = name and password mongoDB)
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser : true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log('MongoDB Connected ! (connectDB from db.js)')
        
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }

    // // Alternative using then and catch
    // mongoose.connect(db, {
    //     useNewUrlParser : true,
    //     useCreateIndex: true,
    //     useFindAndModify: false
    // })
    // .then( () => console.log('MonggoDB Connected !'))
    // .catch(err => {
    //     console.error(err.message);
    //     process.exit(1);
    // });

};

module.exports = connectDB;
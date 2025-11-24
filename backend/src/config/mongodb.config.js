const mongoose = require('mongoose');
const { MongoDbConfig } = require('./config');

(async()=> {
    try {
        await mongoose.connect(MongoDbConfig.url, {
            dbName: MongoDbConfig.dbName,
            autoCreate:true,
            autoIndex:true
        })

        console.log("**** Mongo Server Connected *********")
    } catch (error) {
        console.log("******** Mongo Server Error************", error)
        
    }
})();


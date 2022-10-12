const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    const collection = db.collection('dishes');

    collection.insertOne({
        'name': 'Pizza',
        'description': 'test'
    }, (err, result) => {
        assert.equal(err, null);
        console.log('After insert:');
        console.log(result);

        collection.find({}).toArray((err, docs) => {
            assert.equal(err, null);
            console.log('Found', docs);

            db.dropCollection('dishes', (err, result) => {
                assert.equal(err, null);
                client.close();
            })
        });
    });
});
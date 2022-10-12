const mongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'confusion';

mongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected correctly to the server');

    const db = client.db(dbname);
    dboper.insertDocument(db, {
        'name': 'Vadonut',
        'description': 'Test'
    }, 'dishes', (res) => {
        console.log('Inserted object:', res);
        dboper.findDocuments(db, 'dishes', (res) => {
            console.log('Found:', res);
            dboper.updateDocument(db, {'name': 'Vadonut'}, {'description': 'Updated test'}, 'dishes', (res) => {
                console.log('Updated objects:', res);
                dboper.findDocuments(db, 'dishes', (res) => {
                    console.log('Found:', res);
                    db.dropCollection('dishes', (res) => {
                        console.log('Dropped objects:', res);
                        client.close();
                    });
                });
            })
        })
    });



});
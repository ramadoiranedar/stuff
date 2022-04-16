const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;
const uri = 'mongodb://127.0.0.1:27017';
const dbName = 'stuff';

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((errors, client) => {
    if (errors) {
        console.log("Failed to connect MongoDB");
        return false;
    }
    // console.log("Successfully to connect MongoDB");
    
    // Use database
    const db = client.db(dbName);
    
    // 1. Create
    // insertOne
    // db.collection('students').insertOne({
    //     name: "Reyes",
    //     email: "rr@mail.com",
    // }, (errors, result) => {
    //     if (errors) {
    //         console.log('Failed to Create data!');
    //         console.log(errors);
    //         return false;
    //     }
    //     console.log(result);
    // });

    // insertMany
    // db.collection('students').insertMany(
    //     [
    //         {
    //             name: 'Efren',
    //             email: 'efren@mail.com'
    //         },
    //         {
    //             name: 'Reyes',
    //             email: 'reyes@mail.com'
    //         }
    //     ],
    //     (errors, results) => {
    //         if (errors) {
    //             console.log('Failed to add data');
    //             return false;
    //         }

    //         console.log(results);
    //     }
    // )

    // bulkWrite

    // 2. Read
    // find
    // db.collection('students')
    //     .find()
    //     .toArray((errors, results) => {
    //         console.log(results);
    //     }
    // );

    // find based on criteria
    // db.collection('students')
    //     .find({ _id: ObjectID('622f6d5c4d5218e0dd071c88') })
    //     .toArray((errors, results) => {
    //         console.log(results);
    //     });

    // 3. Update
    // updateOne based on id
    // const updatePromise1 = db.collection('students')
    //     .updateOne(
    //         {
    //             _id: ObjectID('622f6d5c4d5218e0dd071c88')
    //         },
    //         {
    //             $set: {
    //                 email: 'es@mail.com'
    //             },
    //         }
    //     );
    // updatePromise1.then((results) => {
    //     console.log(results);
    // }).catch((errors) => {
    //     console.log(errors);
    // });

    // updateMany based on name
    // const updatePromise2 = db.collection('students')
    //     .updateMany(
    //         {
    //             name: 'Reyes'
    //         },
    //         {
    //             $set: {
    //                 name: 'Maragita Fefilova'
    //             },
    //         }
    //     );
    // updatePromise2.then((results) => {
    //     console.log(results);
    // }).catch((errors) => {
    //     console.log(errors);
    // });

    // 4. Delete
    // deleteOne based on ID
    // db.collection('students').deleteOne(
    //     {
    //         _id: ObjectID('62307a5e3f8ff31ea4ec4161')
    //     }
    // ).then((results) => {
    //     console.log(results);
    // }).catch((errors) => {
    //     console.log(errors);
    // });

    // deleteMany based on ID
    db.collection('students').deleteMany(
        {
            name: 'Maragita Fefilova'
        }
    ).then((results) => {
        console.log(results);
    }).catch((errors) => {
        console.log(errors);
    });
    
    // client.close();
});
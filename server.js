const express = require('express');
const path = require('path');
var Mongoclient = require('mongodb').MongoClient;

var cors = require('cors');
const multer = require('multer');
const { error } = require('console');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, './dist/pms/browser')));
app.use(cors());


var CONNECT_STRING ="mongodb+srv://pius2ptr48:joshycd123@cluster0.veybtk5.mongodb.net/"
var DATABASENAME="pms";
var database;


app.listen(port, () => {
    // Mongoclient.connect(CONNECT_STRING,(error,client)=>{
    //     database=client.db(DATABASENAME);
    //     console.log("Mondo dB connected",error)
    // })
    Mongoclient.connect(CONNECT_STRING)
    .then((client) => {
      database=client.db(DATABASENAME);
      database.createCollection("members")
      console.log("Mondo dB connected")
    })
    .catch((err) => {
      console.log('Failed...', err)
    })
  console.log(`Server listening at http://localhost:${port}`);
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './dist/pms/browser/index.html'));
// });


// app.get('api/getparish', (req, res) => {
//   database.collection("members").find({}).then((response) => {
//    console.log(response)
//   })
//   .catch((err) => {
//     console.log('Failed...', err)
//   })
//});

app.get('/getmember/:id', async function (req, res) { 
  var response={}
  let collection = await database.collection("members");
  let query = {id: req.params.id};
  let results = await collection.findOne(query)
  if (!results) res.send("Not found").status(404);
  else res.end(JSON.stringify(results));  
  })  


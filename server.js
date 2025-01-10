// const express = require('express');
// const path = require('path');
// var Mongoclient = require('mongodb').MongoClient;

// var cors = require('cors');
// const multer = require('multer');
// const { error } = require('console');
// const app = express();
// const port = 3000;

// app.use(express.static(path.join(__dirname, './dist/pms/browser')));
// app.use(cors());


// var CONNECT_STRING ="mongodb+srv://pius2ptr48:joshycd123@cluster0.veybtk5.mongodb.net/"
// var DATABASENAME="pms";
// var database;


// app.listen(port, () => {
//     // Mongoclient.connect(CONNECT_STRING,(error,client)=>{
//     //     database=client.db(DATABASENAME);
//     //     console.log("Mondo dB connected",error)
//     // })
//     Mongoclient.connect(CONNECT_STRING)
//     .then((client) => {
//       database=client.db(DATABASENAME);
//       database.createCollection("members")
//       console.log("Mondo dB connected")
//     })
//     .catch((err) => {
//       console.log('Failed...', err)
//     })
//   console.log(`Server listening at http://localhost:${port}`);
// });
// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, './dist/pms/browser/index.html'));
// // });


// // app.get('api/getparish', (req, res) => {
// //   database.collection("members").find({}).then((response) => {
// //    console.log(response)
// //   })
// //   .catch((err) => {
// //     console.log('Failed...', err)
// //   })
// //});

// app.get('/getmember/:id', async function (req, res) { 
//   var response={}
//   let collection = await database.collection("members");
//   let query = {id: req.params.id};
//   let results = await collection.findOne(query)
//   if (!results) res.send("Not found").status(404);
//   else res.end(JSON.stringify(results));  
//   })  

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.get('/units', (req, res) => {
  fs.readFile('units.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Send the JSON data as a response
    res.status(200).json(jsonData);
  });
});

app.get('/unitsbyblock/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('units.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    let result=[];
    jsonData.forEach(item => {
      if(item.block_no==id){
        result.push(item);
      }
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});
app.get('/familys/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('family.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    let result=[];
    jsonData.forEach(item => {
      if(item.unitid==id){
        result.push(item);
      }
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});

app.get('/familymembers/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('members.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);
    let result=[];
    jsonData.forEach(item => {
      if(item.familyid==id){
        result.push(item);
      }
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});


app.get('/unit/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('units.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Find the data by ID
    const result = jsonData.find(item => item.id === id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});

app.get('/familydetails/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('family.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Find the data by ID
    const result = jsonData.find(item => item.id === id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});


app.get('/unitmembers/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('members.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Find the data by ID
    const result = jsonData.find(item => item.unitid === id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});

app.get('/members/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('members.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    // Find the data by ID
    const result = jsonData.find(item => item.familyid === id);

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  });
});


app.post('/addunit', (req, res) => {
  const newData = req.body;
  fs.readFile('units.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data
  const jsonData = JSON.parse(rdata);

  // Add the new data
  jsonData.push(newData);
  fs.writeFile('units.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing to file');
    }
    res.send({sucess:'ok'});
  });
});
});

app.post('/addfamily', (req, res) => {
  const newData = req.body;
  fs.readFile('family.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data
  const jsonData = JSON.parse(rdata);

  // Add the new data
  jsonData.push(newData);
  fs.writeFile('family.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing to file');
    }
    res.send({sucess:'ok'});
  });
});
});

app.post('/addmember', (req, res) => {
  const newData = req.body;
  fs.readFile('members.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data
  const jsonData = JSON.parse(rdata);

  // Add the new data
  jsonData.push(newData);
  fs.writeFile('members.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing to file');
    }
    res.send({sucess:'ok'});
  });
});
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


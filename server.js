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
app.get('/allfamilys', (req, res) => {
  const id = req.params.id;

  fs.readFile('family.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    const jsonData = JSON.parse(data);

    if (jsonData) {
      res.status(200).json(jsonData);
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

  try {
  const jsonData = JSON.parse(rdata);
  JSON.parse(JSON.stringify(newData));
  // Add the new data
  jsonData.push(newData);
  fs.writeFile('members.json', JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error writing to file');
    }
    res.send({sucess:'ok'});
  });
  }catch (e) {
    console.error('Invalid JSON data:', e);
  }
});

});

app.delete('/deleteunit/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('units.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    let records = JSON.parse(data); 
    records = records.filter(record => record.id !== id);
    fs.writeFile('units.json', JSON.stringify(records, null, 2), 'utf8', (err) => { 
      if (err) { 
        return res.status(500).send({ message: 'Error writing file', err }); 
      }
      res.status(200).send({ message: 'Record deleted successfully' }); 
    }); 
  });
});

app.delete('/deletefamily/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('family.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    let records = JSON.parse(data); 
    records = records.filter(record => record.id !== id);
    fs.writeFile('family.json', JSON.stringify(records, null, 2), 'utf8', (err) => { 
      if (err) { 
        return res.status(500).send({ message: 'Error writing file', err }); 
      }
      res.status(200).send({ message: 'Record deleted successfully' }); 
    }); 
  });
});

app.delete('/deletemember/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('members.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    let records = JSON.parse(data); 
    records = records.filter(record => record.id !== id);
    fs.writeFile('members.json', JSON.stringify(records, null, 2), 'utf8', (err) => { 
      if (err) { 
        return res.status(500).send({ message: 'Error writing file', err }); 
      }
      res.status(200).json(records); 
    }); 
  });
});

app.put('/unit/:id', (req, res) => {
  const id = req.params.id;
  const newData = req.body;

  // Read the existing JSON file
  fs.readFile('units.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
          return res.status(500).send('Error reading the file');
      }
      let jsonArray = JSON.parse(data);
      const objIndex = jsonArray.findIndex(obj => obj.id == id);
      if (objIndex !== -1) {
          jsonArray[objIndex] = { ...jsonArray[objIndex], ...newData };
      } else {
          return res.status(404).send('Object not found');
      }

      // Write the updated JSON array back to the file
      fs.writeFile('units.json', JSON.stringify(jsonArray, null, 2), (err) => {
          if (err) {
              console.error('Error writing to the file:', err);
              return res.status(500).send('Error writing to the file');
          }
          res.send('JSON file has been updated');
      });
    });
  });

  app.put('/members/:id', (req, res) => {
    const id = req.params.id;
    const newData = req.body;
  
    // Read the existing JSON file
    fs.readFile('members.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            return res.status(500).send('Error reading the file');
        }
        let jsonArray = JSON.parse(data);
        const objIndex = jsonArray.findIndex(obj => obj.id == id);
        if (objIndex !== -1) {
            jsonArray[objIndex] = { ...jsonArray[objIndex], ...newData };
        } else {
            return res.status(404).send('Object not found');
        }
  
        // Write the updated JSON array back to the file
        fs.writeFile('members.json', JSON.stringify(jsonArray, null, 2), (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return res.status(500).send('Error writing to the file');
            }
            res.send('JSON file has been updated');
        });
      });
    });

    app.put('/family/:id', (req, res) => {
      const id = req.params.id;
      const newData = req.body;
    
      // Read the existing JSON file
      fs.readFile('family.json', 'utf8', (err, data) => {
          if (err) {
              console.error('Error reading the file:', err);
              return res.status(500).send('Error reading the file');
          }
          let jsonArray = JSON.parse(data);
          const objIndex = jsonArray.findIndex(obj => obj.id == id);
          if (objIndex !== -1) {
              jsonArray[objIndex] = { ...jsonArray[objIndex], ...newData };
          } else {
              return res.status(404).send('Object not found');
          }
    
          // Write the updated JSON array back to the file
          fs.writeFile('family.json', JSON.stringify(jsonArray, null, 2), (err) => {
              if (err) {
                  console.error('Error writing to the file:', err);
                  return res.status(500).send('Error writing to the file');
              }
              res.send('JSON file has been updated');
          });
        });
      });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


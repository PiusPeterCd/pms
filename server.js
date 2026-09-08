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
const fsp = fs.promises;
const crypto = require('crypto');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const users = new Map([
  ['admin', { password: 'carmel2026', role: 'admin' }],
  ['member', { password: 'carmel2026', role: 'member' }]
]);
const sessions = new Map();

app.post('/auth/login', (req, res) => {
  const username = String(req.body?.username ?? '').trim();
  const password = String(req.body?.password ?? '');
  const user = users.get(username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Incorrect username or password.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  sessions.set(token, { username, role: user.role });
  return res.status(200).json({ token, username, role: user.role });
});

app.post('/auth/logout', (req, res) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : '';
  sessions.delete(token);
  return res.status(204).send();
});

app.get('/auth/session', (req, res) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : '';
  const session = sessions.get(token);

  if (!session) {
    return res.status(401).json({ error: 'Session expired.' });
  }

  return res.status(200).json(session);
});

app.put('/auth/password', (req, res) => {
  const token = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.slice(7)
    : '';
  const session = sessions.get(token);

  if (!session || session.role !== 'admin') {
    return res.status(403).json({ error: 'Only an administrator can change passwords.' });
  }

  const username = String(req.body?.username ?? '').trim();
  const password = String(req.body?.password ?? '');
  const user = users.get(username);

  if (!user || (username !== 'admin' && username !== 'member')) {
    return res.status(400).json({ error: 'Only the admin and member accounts can be changed.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters.' });
  }

  user.password = password;

  for (const [sessionToken, sessionData] of sessions) {
    if (sessionData.username === username && sessionToken !== token) {
      sessions.delete(sessionToken);
    }
  }

  return res.status(200).json({ message: `Password updated for ${username}.` });
});

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasRequiredFields(value, fields) {
  return isRecord(value) && fields.every((field) => String(value[field] ?? '').trim() !== '');
}

async function readJsonFile(fileName) {
  const data = await fsp.readFile(fileName, 'utf8');
  return JSON.parse(data);
}

async function writeJsonFile(fileName, data) {
  await fsp.writeFile(fileName, JSON.stringify(data, null, 2), 'utf8');
}
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
  if (!hasRequiredFields(newData, ['id', 'name', 'block_no'])) {
    return res.status(400).json({ error: 'id, name, and block_no are required' });
  }
  fs.readFile('units.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data
  let jsonData;
  try {
    jsonData = JSON.parse(rdata);
  } catch (parseError) {
    return res.status(500).json({ error: 'Invalid units data' });
  }

  if (jsonData.some((unit) => String(unit.id) === String(newData.id))) {
    return res.status(409).json({ error: 'A unit with this id already exists' });
  }

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
  if (!hasRequiredFields(newData, ['id', 'unitid', 'name'])) {
    return res.status(400).json({ error: 'id, unitid, and name are required' });
  }
  fs.readFile('family.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data
  let jsonData;
  try {
    jsonData = JSON.parse(rdata);
  } catch (parseError) {
    return res.status(500).json({ error: 'Invalid family data' });
  }

  if (jsonData.some((family) => String(family.id) === String(newData.id))) {
    return res.status(409).json({ error: 'A family with this id already exists' });
  }

  fs.readFile('units.json', 'utf8', (unitError, unitData) => {
    if (unitError) {
      return res.status(500).json({ error: 'Failed to read unit data' });
    }

    let units;
    try {
      units = JSON.parse(unitData);
    } catch (parseError) {
      return res.status(500).json({ error: 'Invalid units data' });
    }

    if (!units.some((unit) => String(unit.id) === String(newData.unitid))) {
      return res.status(400).json({ error: 'The referenced unit does not exist' });
    }

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
});

app.post('/addmember', (req, res) => {
  const newData = req.body;
  if (!hasRequiredFields(newData, ['id', 'familyid', 'unitid', 'name'])) {
    return res.status(400).json({ error: 'id, familyid, unitid, and name are required' });
  }
  fs.readFile('members.json', 'utf8', (err, rdata) => {
  if (err) {
    return res.status(500).json({ error: 'Failed to read data' });
  }

  // Parse the existing data

  try {
  const jsonData = JSON.parse(rdata);
  if (jsonData.some((member) => String(member.id) === String(newData.id))) {
    return res.status(409).json({ error: 'A member with this id already exists' });
  }

  if (!jsonData.some((member) => String(member.familyid) === String(newData.familyid))) {
    return res.status(400).json({ error: 'The referenced family does not exist' });
  }

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

  Promise.all([readJsonFile('units.json'), readJsonFile('family.json'), readJsonFile('members.json')])
    .then(([units, families, members]) => {
      const unitExists = units.some((unit) => String(unit.id) === String(id));
      if (!unitExists) {
        return res.status(404).json({ error: 'Unit not found' });
      }

      const familyIds = families
        .filter((family) => String(family.unitid) === String(id))
        .map((family) => String(family.id));
      const remainingUnits = units.filter((unit) => String(unit.id) !== String(id));
      const remainingFamilies = families.filter((family) => String(family.unitid) !== String(id));
      const remainingMembers = members.filter((member) =>
        String(member.unitid) !== String(id) && !familyIds.includes(String(member.familyid))
      );

      return Promise.all([
        writeJsonFile('units.json', remainingUnits),
        writeJsonFile('family.json', remainingFamilies),
        writeJsonFile('members.json', remainingMembers)
      ]).then(() => res.status(200).json({ message: 'Unit and related records deleted successfully' }));
    })
    .catch((error) => res.status(500).json({ error: 'Failed to delete unit records' }));
});

app.delete('/deletefamily/:id', (req, res) => {
  const id = req.params.id;

  Promise.all([readJsonFile('family.json'), readJsonFile('members.json')])
    .then(([families, members]) => {
      const familyExists = families.some((family) => String(family.id) === String(id));
      if (!familyExists) {
        return res.status(404).json({ error: 'Family not found' });
      }

      const remainingFamilies = families.filter((family) => String(family.id) !== String(id));
      const remainingMembers = members.filter((member) => String(member.familyid) !== String(id));

      return Promise.all([
        writeJsonFile('family.json', remainingFamilies),
        writeJsonFile('members.json', remainingMembers)
      ]).then(() => res.status(200).json({ message: 'Family and related members deleted successfully' }));
    })
    .catch((error) => res.status(500).json({ error: 'Failed to delete family records' }));
});

app.delete('/deletemember/:id', (req, res) => {
  const id = req.params.id;

  fs.readFile('members.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data' });
    }

    // Parse the JSON data
    let records;
    try {
      records = JSON.parse(data);
    } catch (parseError) {
      return res.status(500).json({ error: 'Invalid member data' });
    }
    const memberExists = records.some((record) => String(record.id) === String(id));
    if (!memberExists) {
      return res.status(404).json({ error: 'Member not found' });
    }
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


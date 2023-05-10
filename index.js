const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const port = 9001;
let database = require("./db.json");
const app = express();
//write....
const save = () => {
    fs.writeFile(
      "./db.json",
      JSON.stringify(database),
      (error) => {
        if (error) {
          throw error;
        }
      }
    );
  };


// gett.....
app.get("/", (req, res) => {
  res.json(database);
});
// secific user ///
app.get('/:email', (req, res) =>{
    const email= req.params.email 
    const obj = database.find(obj=> obj.email == email);
    if (obj) {
        return res.status(200).json({ status: 200, data: obj });
    }
    else {
        return res.status(404).json({ status: 404 })
    }
});
//// post
app.post("/add", bodyParser.json(), (req, res) => {
    database.push(req.body);
    save();
    res.json({
      status: 200,
      stateInfo: req.body,
    });
  });
  /////update
  app.put("/update/:email", bodyParser.json(), (req, res) => {
    database = database.map((item) => {
        if (item.email === req.params.email) {
          return req.body;
        } else {
          return item;
        }
      });
      save();
    res.json({
        status: 200,
        stateInfo: req.body,
      });
    });
    
 

/// delete
app.delete("/delete/:email", (req, res) => {
    const email = req.params.email;
    const index = database.findIndex((item) => item.email === email);
      if (index !== -1) {
        database.splice(index, 1);
    
    save();
    res.json({
      status: 200,
      removed: req.params.email,
      newLength: database.length,
    });
   }

  });


// server..........
app.listen(9001, () => {
  console.log(`server connect ${port}`);
});
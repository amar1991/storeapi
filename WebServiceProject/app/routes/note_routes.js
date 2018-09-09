module.exports = function(app, database) {
    //get service
    var ObjectID = require('mongodb').ObjectID;

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        database.collection('storerecord').findOne(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send(item);
          }
        });
    });

    //delete service
    
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id)};
        database.collection('storerecord').remove(details, (err, item) => {
          if (err) {
            res.send({'error':'An error has occurred'});
          } else {
            res.send('Note ' + id + ' deleted!');
          }
        });
    });

    //update
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = {title: req.body.title };
        database.collection('storerecord').update(details, note, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      });

    //post service
    const collection=app.post('/notes', (req, res) =>{
        
        const note={title:req.body.title};
        var dbo = database.db("storedb");
        dbo.collection('storerecord').insert(note,(err,result)=>{
            if(err)
            {
                res.send({'error':'An error has occured'});
            }
            else
            {
                res.send(result.ops[0]);
            }

            });  
    });
  };
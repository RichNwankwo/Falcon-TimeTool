var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/home', function (request, response) {
   response.render('home', {title:'Falcon Home'})
});

router.get('/activities', function(req, res){
   var db = req.db;
   var collection = db.get('activitiescollection');
   collection.find({},{},function(e, docs){
      res.render('activities',{
         "activities" : docs
       });
   });
});

router.get('/newactivity', function(req, res){
   res.render('newactivity', {title:'Add New Activity'});
});

router.get('/scatterData', function(req,res){
   var db = req.db;
   var collection = db.get('datacollection');
    collection.find({},{},function(e,docs){
       res.render('scatterData',{
           "scatterData" : docs
       });
    });
});

router.get('/dataEntry', function(req, res){
   res.render('dataEntry', {title:'Add New Data Point'})
});

router.post('/addData', function(req,res){
    var db = req.db;
    var x = req.body.x;
    var y = req.body.y;

    var collection = db.get('datacollection');

    collection.insert({
        "x" : x,
        "y" : y
    }, function(err, doc){
        if(err){
            res.send("There was a problem adding the activity to the database");
        }
        else{
            res.location('scatterData');
            res.redirect('scatterData');
        }
    });
});

router.post('/addactivity', function(req, res){
   var db = req.db;
   var type = req.body.type;
   var description = req.body.description;
   var dtg = req.body.dtg;
   var utility = req.body.utility;
   var duration = req.body.duration;
   var motivation = req.body.motivation;
   var engagement = req.body.engagement;

   var collection = db.get('activitiescollection');

   collection.insert({
      "type": type,
      "description" : description,
      "dtg" : dtg,
      "utility" : utility,
      "duration" : duration,
      "motivation" : motivation,
      "engagement" : engagement
   },
    function(err,doc){
       if(err){
           res.send("There was a problem adding the activity to the database");
       }
       else{
           res.location('activities');
           res.redirect('activities');
       };
   });
});

module.exports = router;

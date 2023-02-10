const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const db = 'mongodb+srv://adminMapUzh:Gymnastyk777@cluster.crrwjyk.mongodb.net/mapuzh?retryWrites=true&w=majority';
const Marker = require('./models/post.js');


mongoose.set('strictQuery', true);
mongoose.connect(db).then(res => {
    console.log('Connected to DB');


});

const {json} = require('express');
const e = require('express');

const app = express();
const port = process.env.PORT || 3000;

const static_path = path.join(__dirname, '/public');
app.use(express.static(static_path));
app.use(express.urlencoded({extended: true}));


app.set('mapUz engine', 'ejs');


app.get('/', function (req, res) {
    res.render(__dirname + '/Index.ejs');
});

app.post('/request', (req, res) => {

    let mark = {
        coord: req.body.coords,
        timer: req.body.countTime,
        timeInMoment: req.body.timeInMoment,
        status1: req.body.status1,
        status2: req.body.status2,
        status3: "uncompleted",
        uprate: req.body.uprate,
        downrate: req.body.downrate,


    };
    const marker = new Marker(mark);
    marker.save().then(result => {
        res.send(result);
        console.log(result);
    }).catch(error => {
        console.log(error);
    });


});
app.post('/changeRate', (req, res) => {
    if (JSON.parse(req.body.up)){
        Marker.findOneAndUpdate({coord:req.body.coord, uprate: {$gt: 1 }, status3: 'uncompleted'}, {$set:{ status1: 'ok', status2: 'done', status3: 'completed' }}, {new:true}).then(marker=>{
            console.log(marker)
        })
    Marker.findOneAndUpdate({coord:req.body.coord}, {$inc: {uprate:1}, }, {new: true}).then(marker =>{

        console.log(marker)
    })
    }
    else {
        Marker.findOneAndUpdate({coord:req.body.coord, downrate: {$gt: 1 }, status3: 'uncompleted'}, {$set:{ status1: 'not-approved', status2: 'reject', status3:'completed'}}, {new:true}).then(marker=>{
            console.log(marker)
        })
        Marker.findOneAndUpdate({coord:req.body.coord}, {$inc: {downrate:1}} ).then(marker =>{
            console.log(marker)
        })
    }

});


app.get('/getAllCoords', (req, res) => {
    let currentTime = Math.round(new Date().getTime() / 1000);

    Marker.find().then(markers => {
        markers.forEach(marker => {
            if ((currentTime - marker.timeInMoment) >= 1800) {
                Marker.deleteOne({timeInMoment: `${marker.timeInMoment}`}, (err, data) => {
                    if (!err) {
                        console.log(data);
                    } else console.log(err);
                });
            }

        });
    });
    Marker.find().then(markers => res.send(markers));

});


app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
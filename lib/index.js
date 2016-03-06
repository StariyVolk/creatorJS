/**
 * Created by vatiba01 on 03.03.2016.
 */

var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/html/index.html");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.use(express.static(__dirname + "/view/"));
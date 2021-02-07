var express = require("express");
var app = express();
var PORT = process.env.PORT || 3001;
var path = require("path");


app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('./Develop/public'));


require("./Develop/routes/apiRoutes.js")(app);
require("./Develop/routes/htmlRoutes.js")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
});
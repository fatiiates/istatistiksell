const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use('/static', express.static('public'));

// node_modules dizini gizli bir dizin o yüzden sahte bir dizin oluşturup oradan erişiyoruz.
app.use("/node_static", express.static(path.join(__dirname, "node_modules")));
router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/view/index.html'));

});

//add the router
app.use('/', router);
app.listen(process.env.PORT);

console.log('Running');

const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var ejs = require('ejs');
app.engine('.ejs', ejs.__express);

app.use('/static', express.static('public'));

// node_modules dizini gizli bir dizin o yüzden sahte bir dizin oluşturup oradan erişiyoruz.
app.use("/node_static", express.static(path.join(__dirname, "node_modules")));
app.use("/components", express.static(path.join(__dirname, "/view/components")));
app.use(require("cookie-parser")());
// İNDEX SAYFASI

app.get("/", function(req,res) {
	res.locals.req = req;
	res.render(__dirname+'/view/index.ejs', {
		title: 'Olasılık',
		page:'index',
	});

});

// İLETİŞİM SAYFASI

app.get("/contact", function(req,res) {

	res.render(__dirname+'/view/contact.ejs', {
		title: 'Olasılık | Bize ulaşın',
		page:'contact',
	});

});

// NASIL ÇALIŞIR SAYFASI

app.get("/how-to-work", function(req,res) {

	res.render(__dirname+'/view/how-to-work.ejs', {
		title: 'Olasılık | Nasıl Çalışır ?',
		page:'how-to-work',
	});

});

// SONUÇ SAYFASI

app.get("/sonuc", function(req,res) {

	if(req.cookies['data-set'] != undefined) {
		res.render(__dirname+'/view/sonuc.ejs', {
			title: 'Olasılık | Sonuç',
			page:'sonuc',
			cookies: req.cookies,
		});
	}

});

// YENİ ROUTER BAŞLATILIYOR
app.use('/', router);
app.listen(process.env.PORT || 3000);

console.log('Running');

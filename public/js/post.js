let veri;
$(() => {
  if (Cookies.getJSON("data-set") == undefined) {
    window.location = window.location.origin + '?process=error&message=Girilmiş bir veri seti bulunamadı&alertClass=danger';
  }else {
    veri = Cookies.getJSON("data-set")["data1"];
    veri = veri.replace(" ", "");
    veri = veri.split(',');

    modHesapla(veri);
    sayfayaDahilEt('mod', 'Mod: ' + JSON.parse(modHesapla(veri)).mod + ', Frekans: ' + JSON.parse(modHesapla(veri)).frekans);
    sayfayaDahilEt('standart_sapma', 'Değer: ' + standartSapmaHesapla(veri) + ', yaklaşık: ' + Math.round(standartSapmaHesapla(veri)));
    sayfayaDahilEt('medyan', 'Değer: ' + medyanHesapla(veri) + ', yaklaşık: ' + Math.round(medyanHesapla(veri)));
    sayfayaDahilEt('varyans', 'Değer: ' + varyansHesapla(veri) + ', yaklaşık: ' + Math.round(varyansHesapla(veri)));
    sayfayaDahilEt('ortalama_mutlak_sapma', 'Değer: ' + ortalamaMutlakSapmaHesapla(veri) + ', yaklaşık: ' + Math.round(ortalamaMutlakSapmaHesapla(veri)));
    sayfayaDahilEt('degisken_kat_sayi', 'Değer: ' + degiskenKatsayisiHesapla(veri) + ', yaklaşık: ' + Math.round(degiskenKatsayisiHesapla(veri)));
    sayfayaDahilEt('harmonik_ortalama', 'Değer: ' + harmonikOrtHesapla(veri) + ', yaklaşık: ' + Math.round(harmonikOrtHesapla(veri)));
    sayfayaDahilEt('aritmetik_ortalama', 'Değer: ' + aritmetikOrtHesapla(veri) + ', yaklaşık: ' + Math.round(aritmetikOrtHesapla(veri)));
    sayfayaDahilEt('geometrik_ortalama', 'Değer: ' + geometrikOrtHesapla(veri) + ', yaklaşık: ' + Math.round(geometrikOrtHesapla(veri)));

  }
});

// VERİYİ SAYFAYA DAHİL ETME

var sayfayaDahilEt = (islem, mesaj) => {
  $('div[id="' + islem + '"]').children('h3').text(mesaj);
}

// MOD

var modHesapla = (params) => {
  let frekans = 0, tempFrekans = 0, mod;
  params.forEach((item, i) => {

    params.forEach((element, j) => {
      if(item == element)
        frekans++;
    });

    if(frekans > tempFrekans){
      mod = item;
      tempFrekans = frekans;
    }
    frekans=0;

  });
    // frekans tempde tutuluyor
    return '{"mod":"' + mod + '","frekans":"' + tempFrekans + '"}';
}

// ARİTMEK ORTALAMA

var aritmetikOrtHesapla = (params) =>  {

  var aritmetikOrt = 0;

  params.forEach((item, i) => {
    aritmetikOrt += parseFloat(item) / params.length;
  });

  return aritmetikOrt;

};

// STANDART SAPMA

var standartSapmaHesapla = (params) => {

  let aritmetikOrt = aritmetikOrtHesapla(params);
  return Math.sqrt(params.reduce(function (sq, n) {
          return sq + Math.pow(n - aritmetikOrt, 2);
      }, 0) / (params.length - 1));
}

// MEDYAN

var medyanHesapla = (params) => {

  var medyan = 0, parametreSayi = params.length;
  params.sort((a, b) => {
    return a - b;
  });

  if (parametreSayi % 2 === 0)
    medyan = (parseFloat(params[parametreSayi / 2 - 1]) + parseFloat(params[parametreSayi / 2])) / 2;
  else
    medyan = params[(parametreSayi - 1) / 2];

  return medyan;
}

// VARYANS

var varyansHesapla = (params) => {
  return Math.pow(standartSapmaHesapla(params), 2);
}

// ORTALAMA MUTLAK SAPMA

var ortalamaMutlakSapmaHesapla = (params) => {

  let aritmetikOrt = aritmetikOrtHesapla(params);
  var parametreSayi = parseFloat(params.length);
  var toplam = 0;
  params.forEach((item, i) => {
    toplam += Math.abs(parseFloat(item) - parseFloat(aritmetikOrt));
  });

  return toplam / parametreSayi;

}

// DEĞİŞKEN KATSAYISI

var degiskenKatsayisiHesapla = (params) => {

  let aritmetikOrt = parseFloat(aritmetikOrtHesapla(params));
  let standartSapma = parseFloat(standartSapmaHesapla(params));

  return aritmetikOrt / standartSapma * 100.0;

}

// HARMONİK ORTALAMA

var harmonikOrtHesapla = (params) => {

  var payda = 0.0;
  var parametreSayi = parseFloat(params.length);

  params.forEach((item, i) => {
    payda += 1.0 / parseFloat(item);
  });

  return parametreSayi / payda;

}

// GEOMETRİK ORTALAMA

var geometrikOrtHesapla = (params) => {

  var carpim = 1.0;
  var parametreSayi = parseFloat(params.length);

  params.forEach((item, i) => {
    carpim *= parseFloat(item);
  });

  return Math.pow(carpim, parseFloat(1.0 / parametreSayi));

}





// HİSTOGRAM VERİLERİNİN HESAPLANMASI
var histogramVeriHesapla = (params) => {

  params.sort((a, b) => {
    return a - b;
  });

  var parametreSayi = params.length;
  var minDeger = parseFloat(params[0]), maxDeger = parseFloat(params[parametreSayi - 1]);
  var rank = maxDeger - minDeger;
  var k = 1.0 +  3.3 * Math.log10(parametreSayi);
  var grupGenisligi = Math.round(parseFloat(rank) / parseFloat(k));

  var kolonlar = Array(6);
  var grupBaslangicSayisi = minDeger, grupBitisBaslangicSayisi = minDeger + grupGenisligi - 1;
  for (var i = 0; i < 6; i++) {
    kolonlar[i] = Array(3);
    kolonlar[i][0] = grupBaslangicSayisi + grupGenisligi*i;
    kolonlar[i][1] = grupBitisBaslangicSayisi + grupGenisligi*i;
    kolonlar[i][2] = 0;
    params.forEach((item, j) => {
      if(parseFloat(item) <= kolonlar[i][1] && parseFloat(item) >= kolonlar[i][0])
        kolonlar[i][2]++;
    });

  }

}
/*

AUTHORS: FATİH ATEŞ, ERDOĞAN TURPCU, EBRU YAŞAR
              © Copyright 2020


*/

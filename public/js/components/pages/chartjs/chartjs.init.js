Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};
$(function () {
    "use strict";

  var labels, bgColors, data;

  var enYakinTekSayi = function(param){

    if(parseInt(param) % 2 == 0)
      return Math.ceil(param);
    else
      return Math.floor(param);

  }

  var histogramVeriHesapla = function(params){

    params.sort(function(a, b){
      return a - b;
    });

    var tempParams = params.map(function(el){
      return parseInt(el);
    });

    var parametreSayi = tempParams.length;
    var minDeger = tempParams[0], maxDeger = tempParams[parametreSayi - 1];
    var rank = maxDeger - minDeger;
    var k = 1.0 +  3.3 * Math.log10(parametreSayi);
    var grupGenisligi = Math.ceil(parseFloat(rank) / parseFloat(k)) ;
    grupGenisligi = grupGenisligi < 2 ? 2:grupGenisligi;
    var grupBaslangicSayisi = minDeger, grupBitisBaslangicSayisi = minDeger + grupGenisligi + (grupGenisligi > 1 ? -1:0);
    var grupSayisi = Math.round(k)/*Math.round((grupBitisBaslangicSayisi + grupGenisligi * Math.round(k - 1)) > maxDeger ? k:(k + 1))*/;

    console.log(grupGenisligi);
    labels = Array(grupSayisi);
    bgColors = Array(grupSayisi);
    data = Array(grupSayisi + 1);

    for (var i = 0; i < grupSayisi; i++) {

      let ilk = grupBaslangicSayisi + grupGenisligi*i;
      let son = grupBitisBaslangicSayisi + grupGenisligi*i;

      labels[i] = ilk;
      labels[i] += ' - ' + parseInt(son);

      bgColors[i] = 'rgb(100, ' + (140 - i * 20) + ', ' + (210 - i * 20) +')';

      data[i] = 0;
      tempParams.forEach(function(item, j){
        if(item <= son && item >= ilk)
          data[i]++;
      });
    }

    data[data.length] = 0;

    return 'Girmiş olduğunuz veri setinizin sonuçları.(' + parametreSayi + ' veri, ' + grupSayisi + ' grup)';

  }

  let mesaj = histogramVeriHesapla(Cookies.getJSON("data-set")["data1"]);

  Cookies.set("histogram/chartjs-init-cerez",{
		type: 'bar',
		data: {
		  labels: labels,
		  datasets: [
  			{
  			  label: "Veri sayısı",
  			  backgroundColor: bgColors,
  			  data: data
  			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: mesaj
		  }
		}
	});

  new Chart(document.getElementById("bar-chart"), Cookies.getJSON("histogram/chartjs-init-cerez"));

});

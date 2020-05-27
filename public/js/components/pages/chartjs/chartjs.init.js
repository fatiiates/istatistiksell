Math.log10 = Math.log10 || function(x) {
  return Math.log(x) * Math.LOG10E;
};
$(function () {
    "use strict";

  var labels, bgColors, data;

  var histogramVeriHesapla = function(params){

    params.sort(function(a, b){
      return a - b;
    });

    var parametreSayi = parseInt(params.length);
    var minDeger = parseInt(params[0]), maxDeger = parseFloat(params[parametreSayi - 1]);
    var rank = maxDeger - minDeger;
    var k = 1.0 +  3.3 * Math.log10(parametreSayi);
    var grupGenisligi = Math.round(parseFloat(rank) / parseFloat(k));
    console.log(grupGenisligi);
    grupGenisligi = grupGenisligi == 0 ? 1:grupGenisligi;
    var grupBaslangicSayisi = parseInt(minDeger), grupBitisBaslangicSayisi = parseInt(minDeger) + (grupGenisligi > 1 ? grupGenisligi - 1.0:grupGenisligi);
    var grupSayisi = Math.round((grupBitisBaslangicSayisi + grupGenisligi*Math.round(k - 1)) >= parseFloat(maxDeger) ? k:(k + 1));

    labels = Array(grupSayisi);
    bgColors = Array(grupSayisi);
    data = Array(grupSayisi + 1);

    for (var i = 0; i < grupSayisi; i++) {

      let ilk = grupBaslangicSayisi + grupGenisligi*i;
      let son = grupBitisBaslangicSayisi + grupGenisligi*i;

      labels[i] = ilk;
      labels[i] += ' - ' + parseFloat(son);

      bgColors[i] = 'rgb(100, ' + (140 - i * 20) + ', ' + (210 - i * 20) +')';

      data[i] = 0;
      params.forEach(function(item, j){
        if(parseFloat(item) <= son && parseFloat(item) >= ilk)
          data[i]++;
      });
    }
    data[data.length] = 0;
    return 'Girmiş olduğunuz veri setiniz.(' + parametreSayi + ' veri)';

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

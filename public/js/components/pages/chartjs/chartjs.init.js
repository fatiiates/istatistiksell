$(function () {
    "use strict";

  var labels, bgColors, data;

  var histogramVeriHesapla = (params) => {

    params.sort((a, b) => {
      return a - b;
    });

    var parametreSayi = params.length;
    var minDeger = parseFloat(params[0]), maxDeger = parseFloat(params[parametreSayi - 1]);
    var rank = maxDeger - minDeger;
    var k = 1.0 +  3.3 * Math.log10(parametreSayi);
    var grupGenisligi = Math.round(parseFloat(rank) / parseFloat(k));

    var grupBaslangicSayisi = minDeger, grupBitisBaslangicSayisi = minDeger + grupGenisligi - 1;
    var grupSayisi = Math.round((grupBitisBaslangicSayisi + grupGenisligi*Math.round(k - 1)) >= maxDeger ? k:(k + 1));

    labels = Array(grupSayisi);
    bgColors = Array(grupSayisi);
    data = Array(grupSayisi);

    for (var i = 0; i < grupSayisi; i++) {

      let ilk = grupBaslangicSayisi + grupGenisligi*i;
      let son = grupBitisBaslangicSayisi + grupGenisligi*i;

      labels[i] = ilk;
      labels[i] += ' - ' + parseFloat(son);

      bgColors[i] = 'rgb(100, ' + (140 - i * 20) + ', ' + (210 - i * 20) +')';

      data[i] = 0;
      params.forEach((item, j) => {
        if(parseFloat(item) <= son && parseFloat(item) >= ilk)
          data[i]++;
      });
    }

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

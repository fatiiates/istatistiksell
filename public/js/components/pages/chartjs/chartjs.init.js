$(function () {
    "use strict";
	// Bar chart
  Cookies.set("histogram/chartjs-init-cerez",{
		type: 'bar',
		data: {
		  labels: ["Türkiye","Africa", "Asia", "Europe", "Latin America", "North America"],
		  datasets: [
			{
			  label: "Population (millions)",
			  backgroundColor: ["blue","#6174d5", "#5f76e8", "#768bf4", "#7385df", "#b1bdfa"],
			  data: [100000,8432,6267,5734,4784,1833]
			}
		  ]
		},
		options: {
		  legend: { display: false },
		  title: {
			display: true,
			text: 'Predicted world population (millions) in 2050'
		  }
		}
	});
  new Chart(document.getElementById("bar-chart"), Cookies.getJSON("histogram/chartjs-init-cerez"));

	// New chart

	// line second
});

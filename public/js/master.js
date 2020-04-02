var controlVirgulCounter=0;
function dataSetOnMouseUp(){

  var controlVirgul=false;

  for (var i = 0; i < $('#data_set').val().length; i++) {
    if($('#data_set').val()[i] == "," && i < ($('#data_set').val().length - 1)){
      controlVirgul=true;
      break;
    }
  }

  if(controlVirgul && controlVirgulCounter == 0 && $('#data_set').val().length >= 3){
    $('#info_data_set').remove();
    controlVirgulCounter++;
    $('#info_box').append('<h3 id="info_data_set" class="animated bounceIn col-md-12 p-4 mb-4 bg-light" >Burada ki işimiz bitti gibi görünüyor! Haydi ilerleyelim.</h3>');
  }
}

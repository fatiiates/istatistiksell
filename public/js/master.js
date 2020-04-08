var controlVirgulCounter=0;
var controlIssueCounter=0;
function dataSetOnMouseUp(){

  // EĞER VERİ GİRİLDİYSE ÇIKAN BİLDİRİM

  var controlVirgul=false;

  for (var i = 0; i < $('#data_set').val().length; i++) {
    if($('#data_set').val()[i] == "," && i < ($('#data_set').val().length - 1)){
      if($('#data_set').val()[i+1] != ","){
        controlVirgul=true;
        break;
      }
    }
  }

  if(controlVirgul && controlVirgulCounter == 0 && $('#data_set').val().length >= 3){
    $('#info_data_set').remove();
    controlVirgulCounter++;
    $('#info_box').append('<h3 id="info_data_set" class="animated bounceIn col-md-12 p-4 mb-4 bg-light" >Burada ki işimiz bitti gibi görünüyor! Haydi ilerleyelim.</h3>');
  }
  else
    return false;
}
function policyClose(el){

  // ÇEREZ POLİTİKASINI SİLEN FONKSİYON

  Cookies.set("policy-cookie","true",{ expires: 1 });
  $(el).parents('#policy-container').animate({marginTop: "-"+$(el).parents('#policy-container').innerHeight()+"px"}, "fast",function(){
    $(el).parents('#policy-container').hide();
  });
}

function dataSetOpen(){

  // ÖRNEK VERİ SETİ

  $('#dataset-example-toggle').toggleClass('d-none');

}
function copyInElement(elementId){

  // VERİ KOPYALAMA

  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+elementId).val()).select();
  document.execCommand("copy");
  $temp.remove();

}
/*function changeCheckboxWhenClickListName(el){
  var element = $(this).children('.checkbox');
  element.is(":checked") == true ? element.prop('checked', false):element.prop('checked', true) ;
}*/

$(function(){

  // DÖKÜMAN HAZIR OLDUĞUNDA

  if(Cookies.get('policy-cookie') != "true"){
    var policy='';
    policy='<div id="policy-container" class="col-md-12 justify-content-center d-flex p-2 bg-info">';
      policy+='<h3 class="text-light">Sitemizi kullanarak çerezlerin kullanımına izin vermiş olursunuz.</h3>';
      policy+='<div class="col-md-1 text-right">';
        policy+='<a onclick="policyClose(this)" href="#"><i class="fas fa-times fs-30 mt-1 hvr-bounce-out text-light"></i></a>';
      policy+='</div>';
    policy+='</div>';

    $('#index-header').prepend(policy);
  }
  $(document).on('click','#go-to-step-second',function(){
    alert(1);
  });
  $(document).on('click','#sidebar .p-4 ul li label',function(){
    var element = $(this).siblings('div').children('.checkbox');
    element.is(":checked") == true ? element.prop('checked', false).change():element.prop('checked', true).change();
  });
  $(document).on('change','.checkbox',function(){
    if ($(this).is(":checked") == true)
      controlIssueCounter++;
    else
      controlIssueCounter--;
    var id=$(this).attr("data-val");
    $('#'+id).toggleClass("d-none");
  });

});

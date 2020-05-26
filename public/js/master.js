var controlIssueCounter=0;

function policyClose(el){

  // ÇEREZ POLİTİKASINI SİLEN FONKSİYON

  Cookies.set("policy-cookie","true",{ expires: 1 });
  $(el).parents('#policy-container').animate({marginTop: "-"+$(el).parents('#policy-container').innerHeight()+"px"}, "fast",function(){
    $(el).parents('#policy-container').hide();
  });
}

function alert(id, type, text){

  // ALERT OLUŞTURMA

  var wrongAlert = '';

    wrongAlert+='<div id="' + id + '" class="mt-2 alert alert-' + type + ' alert-dismissible fade show text-left" role="alert">';
      wrongAlert+='<strong>' + text + '</strong>';
      wrongAlert+='<button type="button" class="close" data-dismiss="alert" aria-label="Close">';
        wrongAlert+='<span aria-hidden="true">&times;</span>';
      wrongAlert+='</button>';
    wrongAlert+='</div>';

  return wrongAlert;
}

function cleanDataSet(val){
  var data = val.replace(/ /g,'');
  if(data.charAt(data.length - 1) == ',')
    data = data.substring(0, data.length - 1);

  data = data.split(',');
  return data;
}

function dataSetValidate(val){

  // VERİ KONTROLÜ
console.log(val);
  var tempInputArray = cleanDataSet(val);

  if (tempInputArray.length > 1 && tempInputArray[1] != ""){
    for (var i = 0; i < tempInputArray.length; i++)
      if (isNaN(parseInt(tempInputArray[i])))
        return false;
  }
  else
    return false;

  return true;

}

function modal(id, data){

  // MODAL OLUŞTURMA

  var dataSetModal ='';
  dataSetModal += '<div id="' + id + '" class="modal fade show d-block" style="width:250px;bottom:20px;right:10px!important;left:auto" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" aria-modal="true">';
    dataSetModal += '<div class="modal-dialog" role="document">';
      dataSetModal += '<div class="modal-content bg-dark">';
        dataSetModal += '<div class="modal-body text-light font-weight-bold">';
          dataSetModal += data;
        dataSetModal += '</div>';
      dataSetModal += '</div>';
    dataSetModal += '</div>';
  dataSetModal += '</div>';
  return dataSetModal;

}

function copyInElement(elementId){

  // VERİ KOPYALAMA

  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#'+elementId).val()).select();
  document.execCommand("copy");
  $temp.remove();

}

$(function(){

  // DÖKÜMAN HAZIR OLDUĞUNDA
  if(Cookies.get('data-set')){
    var data = Cookies.getJSON("data-set")["data1"];
    let dataString = "";
    typeof data == "object" && data.forEach((item, i) => {
      dataString += item + ",";
    });
    dataString = dataString.substring(0, dataString.length - 1);

    if (!dataSetValidate(dataString)) {
      Cookies.remove('data-set', { path: '' });
      window.location = window.location.origin;
    }



  }
  if(Cookies.get('policy-cookie') != "true"){
    var policy='';
    policy='<div id="policy-container" class="col-md-12 justify-content-center d-flex align-items-center text-center p-2 bg-info">';
      policy+='<h3 class="text-light">Sitemizi kullanarak çerezlerin kullanımına izin vermiş olursunuz.</h3>';
        policy+='<button type="button" onclick="policyClose(this)" class="ml-3 mt-0" href="#"><i class="fas fa-times fs-30 mt-0 hvr-bounce-out text-light"></i></button>';
    policy+='</div>';

    $('#index-header').prepend(policy);
  }
  $(document).on('click','#sidebar .p-4 ul li label',function(){
    var element = $(this).siblings('div').children('.checkbox');
    element.is(":checked") == true ? element.prop('checked', false).change():element.prop('checked', true).change();
  });
  $(document).on('click','.menu-icon-container',function(){
    $(this).toggleClass("change");
  });
  $(document).on('submit','#form_data_set_post',function(){

    var textarea = $('#data_set').val();
    var test = dataSetValidate(textarea);
    if (!test && ($('#info_data_set_danger').length > 0 ? false:true)){
      var innerMessage = '';
      innerMessage += '<h3 id="info_data_set_danger" class="animated bounceIn col-md-12 p-4 mb-4 bg-danger text-light" >Lütfen istenen formatta bir veri seti giriniz.</h3>';
      $('#info_box').empty();
      $('#info_box').append(innerMessage);
    }


    return false;
  });
  $(document).on('keyup','#data_set',function(){

    var test = dataSetValidate($(this).val());

    if (!test && ($('#info_data_set_danger').length > 0 ? false:true)){

      var innerMessage = '';
      innerMessage += '<h3 id="info_data_set_danger" class="animated bounceIn col-md-12 p-4 mb-4 bg-danger text-light" >Lütfen istenen formatta bir veri seti giriniz.</h3>';
      $('#info_box').empty();
      $('#info_box').append(innerMessage);
    }
    else if(test && ($('#info_data_set_success').length > 0 ? false:true)){
      $('#info_box').empty();
      $('#info_box').append('<h3 id="info_data_set_success" class="animated bounceIn col-md-12 p-4 mb-4 bg-light" >Veri setiniz uygun görünüyor! Haydi ilerleyelim.</h3>');
    }

  });
  $(document).on('click','#btn_post_sonuc',function(){
    if (dataSetValidate($('#data_set').val())) {
      Cookies.remove('data-set', { path: '' });
      var data = cleanDataSet($('#data_set').val());
      Cookies.set('data-set', {
        data1:data
      });
      window.location = window.location.origin + '/sonuc';
    }
  });
  $(document).on('click', '#datasetOpen', function(){

    // ÖRNEK VERİ SETİ
    $('#dataset-example-toggle').toggleClass('d-none');

  });
  $(document).on('click', 'i[data-target="#exampleModal"]', function(){

    copyInElement('example-data-set');
    var data='';
    data += '<i class="fas fa-exclamation-circle mr-2 text-warning" /> Veri kopyalandı!';
    var dataSetModal = modal('data-set-modal', data);

    $('#data-set-modal').remove();
    $('body').prepend(dataSetModal);

    setTimeout(function(){$('#data-set-modal').fadeOut("slow",function(){
      $('#data-set-modal').remove();
    });}, 3000);

  });
  $(document).on('change','.checkbox',function(){

    var id=$(this).attr("data-val");

    if ($(this).is(":checked") == true){
      $('#'+id).toggleClass("d-none");
      $('#'+id).toggleClass('bounceIn bounceOut');
      controlIssueCounter++;
    }
    else{
      setTimeout(function(){$('#'+id).toggleClass("d-none");}, 750);
      $('#'+id).toggleClass('bounceIn bounceOut');
      controlIssueCounter--;
    }

  });

});

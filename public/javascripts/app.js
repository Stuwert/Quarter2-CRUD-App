$(document).ready(function(){

 $('#addauthor').on('click', function(){
   var i = 1;
    var text = $('.addauthors option:selected').text();
    var value = $('.addauthors option:selected').val();
   $('.submitauthors').append('<option value="'+ value +'" selected>' + text + '</option>'  )
   $('.deleteauthors').append('<div class="delete" id="' + value +'">Remove</div>')
 })

$('.deleteauthors').on('click', '.delete', function(){
  var val = $(this).attr('id');
  $('.submitauthors').find('option[value="'+ val +'"]').remove();
  $(this).remove();
})

var testarray = $('.allbooks').find('.book').toArray();
if (testarray.length > 5){
  testarray.forEach(function(item){
    $(item).css({"display" : "none"})
  })
  var buttons = Math.round((testarray.length - 5) / 5 + 0.5);
  $('.options').append('<div id="filter"></div>')
  for (var i = 1; i <=buttons; i++){
    $('#filter').append('<a id="page-'+i+'">' + i +  '</a>')
  }
  testarray.forEach(function(item, i){
    if ( i < 5){
      $(item).css({"display" : "flex"})
    }
  })
  $('#filter').on('click', '[id^="page-"]', function(){
    var filter = $(this).text();
    filter = +filter;
    testarray.forEach(function(item, i){
      if (i > filter * 5 - 5 && i < 5 * filter){
        $(item).css({"display" : "flex"})
      }else{
        $(item).css({"display" : "none"})
      }
    })
  })
}

})

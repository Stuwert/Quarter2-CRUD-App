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
  var buttons = divisibleByFive(testarray.length);
  console.log(buttons);
  $('.options').append('<div id="filter"><h2>Page</h2></div>')
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
      if (i >= filter * 5 - 5 && i < 5 * filter){
        console.log("Showing ", i);
        $(item).css({"display" : "flex"})
      }else{
        console.log("Hidden ", i);
        $(item).css({"display" : "none"})
      }
    })
  })
}

})

function divisibleByFive(i){
  var difference = i % 5;
  if (difference === 0){
    return i / 5;
  }else{
    for (j = 1; j < 5; j++){
      var newdifference = (i-j) % 5;
      if (newdifference === 0){
        return (i-j) / 5 + 1;
      }
    }
  }
}

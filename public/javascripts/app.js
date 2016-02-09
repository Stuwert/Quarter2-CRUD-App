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

})

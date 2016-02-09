$(document).ready(function(){

 $('#addauthor').on('click', function(){
   var i = 1;
    var text = $('.addauthors option:selected').text();
   $('.submitauthors').append('<option value="'+ text +'" selected>' + text + '</option>'  )
   $('.deleteauthors').append('<div class="delete" id="' + text +'">Remove</div>')
 })

$('.deleteauthors').on('click', '.delete', function(){
  var val = $(this).attr('id');
  console.log(val);
  $('.submitauthors').find('option[value="'+ val +'"]').remove();
  $(this).remove();
})


$('form').bind('submit', function(e){
  $('input').toArray().forEach(function(item){
    var stop = false;
    if (!$(item).val()){
      $(item).css({'border' : '1px solid red'})
      stop = true;
    }
  })
    if(!$(select).val()){
      $(item).css({'border' : '1px solid red'})
      stop = true;
    }
    if(!$('textarea').val()){
      $(item).css({'border' : '1px solid red'})
      stop = true;
    }
    if (stop){
      e.preventDefault();
      alert('Please fill in the form')
      return false;
    }
})

$('.submitauthors').on('click', 'div', function(){
  console.log($(this));
})


})

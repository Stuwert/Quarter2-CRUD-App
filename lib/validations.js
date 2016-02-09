module.exports = {
  validateBook: function(book){
    var array = [];
    for(key in book){
      if(book[key] === ""){
        array.push("Please add " + key)
      }
    }
    return array;
  }
}

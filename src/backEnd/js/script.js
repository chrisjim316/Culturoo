$(document).ready( function() {
  $("#start").on("click", function () {
    /* fade in effect */
    $("#start").load('file.html',function(){}).hide().fadeIn();
  });
});

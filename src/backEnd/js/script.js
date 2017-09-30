
$(document).ready( function() {
  $("#start").on("click", function () {
    /* fade in effect */
    $("#start").load('src/frontEnd/video.html',function(){}).hide().fadeIn();
  });
});


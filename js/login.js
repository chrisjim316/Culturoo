$(document).ready(function () {
  $("table").hide();
  $("#login").on("click", function (){
    if(validateUser()) {
      $("table").show();
      $("#errorMessage").html("Login successful!");
    } else {
      console.log("invalid password"); //debugging
      $("table").hide();
      $("#errorMessage").html("Invalid username or password.");
    }
    return false;
  });
  return false;
});

var usernames = [
  {username:"tadhacker1", password:"123"},
  {username:"tadhacker2", password:"123"},
  {username:"tadhacker3", password:"123"},
  {username:"tadhacker4", password:"123"},
  {username:"tadhacker5", password:"123"},
  {username:"tadhacker6", password:"123"}
];

function validateUser() {
  var userName = $("#username").val();
  var passWord = $("#password").val();
  console.log("input name:" + userName + "input password:" + passWord);
  for(var i = 0; i < usernames.length; i++) {
    var user = usernames[i];
    var name = user.username;
    var pw = user.password;
    if(passWord === pw && userName === name) {
      var url = "https://chrisjim316.github.io/Video?username=" + userName;
      $(".video-link").attr("href", url);
       return true;
    }
  }
  return false;
}

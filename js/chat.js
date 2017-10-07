var skylink = new Skylink();

skylink.init({
  appKey: '4cf2aed8-70a8-478b-a88e-aba3ba381bdd',
  defaultRoom: 'demoRoom'
});

$( document ).ready(function() {
    joinRoom();
    setName();
});

function setName() {
  var username = getParameterByName('username');
  skylink.setUserData({
    name: username
  });
}

function joinRoom() {
  console.log("Join Room");
  skylink.joinRoom();
}

function leaveRoom() {
  skylink.leaveRoom();
}

function sendMessage() {
  var input = document.getElementById('text');

  skylink.sendP2PMessage(input.value);
  input.value = '';
  /*
  var text = $("#text").val();
  $("#chatOutput").append(text + "<br>");
  */
}

function addMessage(message, className) {
  var chatbox = document.getElementById('chatOutput'),
  div = document.createElement('div');
  div.className = className;
  div.textContent = message;
  chatbox.appendChild(div);
}

skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
  var user = 'You';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' joined the room', 'action');
});


skylink.on('peerLeft', function(peerId, peerInfo, isSelf) {
  var user = 'You';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
  }
  addMessage(user + ' left the room', 'action');
});

skylink.on('incomingMessage', function(message, peerId, peerInfo, isSelf) {
  var user = 'You',
  className = 'you';
  if(!isSelf) {
    user = peerInfo.userData.name || peerId;
    className = 'message';
  }
  var content = message.content;
  addMessage(user + ': ' + content, className);

//   var keyword = ""
//   $.post("http://localhost:5000/postmethod", content, function(data){
//     console.log(data);
//     var keyword = data["keyword"][0]
//   });

  if(!isSelf) {
    getRelevantInfo(content);
    getSuggestions(content);
  }
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
  results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getRelevantInfo (text) {
  $.ajax({
    url: wikiAPI,
    data: { action: 'query', list: 'search', srsearch: text, srlimit: 1, format: 'json' }, //srsearch searches for the first result
    dataType: 'jsonp',
    /* generate html for the first search result */
    success: function (data) {
      var html = '';
      data.query.search.map(function(res) {
        html += '<div class="well">';
        html += res.snippet;
        html += '</div>';
      });
      $("#wiki").html(html);
    }
  });//end ajax function

}

function getSuggestions (text) {
  $.ajax({
    url: wikiAPI,
    data: { action: 'query', list: 'search', srsearch: text, format: 'json' }, //srsearch searches for all results associated with the keywords
    dataType: 'jsonp',
    /* generate html for each search result (10 results by default) */
    success: function (data) {
      var html = '';
          html += '  <div class="row row-centered">';

      data.query.search.map(function(res) {
        html += '    <div class="col-md-6">';
        html += '      <a href="https://en.wikipedia.org/wiki/' + res.title + '" target="_blank">';
        html += '        <div class="panel panel-default" style="position:relative;">';
        html += '          <div class="panel-heading">';
        html += '            <h3 class="panel-title"><strong>' + res.title + '</strong></h3>';
        html += '          </div>';
        html += '          <div class="panel-body">';
        html += '            ' + res.snippet;
        html += '          </div>';
        html += '        </div>';
        html += '      </a>';
        html += '    </div>';
      });

      html += '  </div>';

      $("#suggestions").html(html);
    }
    });//end ajax function
}

body, html,.container {
  background-color: black;
  color: white;
  font-family: 'Athiti', sans-serif;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  padding-top: 20px;
}

.overall-container {
  display:table;
  width: 100%;
  margin-top: -50px;
  box-sizing: border-box;
}

.row {
  height: 100%;
  display: table-row;
}

.row .cell {
  display: table-cell;
  float: none;
}

/* Navigation - left side */
.cell-1 {
  background: #009999;
  height: 1600px;
  padding-left: 30px;
  padding-top: 150px;
}

/* Content - right side */
.cell-3 {
  display: block;
  position: relative;
  background: #004d4d;
  min-height: 100%;
}

.chat-input {
  width: 80%;
  position: relative;
  height: 50px;
}

#chatOutput {
  background-color: white;
  color: black;
  height: 65%;
  overflow: scroll;
  display: flex;
  flex-direction: column-reverse;
}

.well {
  background-color: #009999;
}

.chatbox {
  background-color: #004d4d !important;
  width: 90%;
  min-height: 45%;
}

.well-video {
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 85%;
  height: 600px;
}

.weatherContainer {
  padding: 5px 5px 5px 5px;
  height: 70px;
  display: inline-block;
  background-color: rgba(255, 255, 255, 0.2);
  resize: none;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-border: 1px solid white;
  -webkit-border: 1px solid white;
  border-radius: 4px;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  box-shadow: 0px 5px 12px 1px rgba(0, 0, 0, 0.6), 0 4px 3px rgba(0, 0, 0, 0.5), inset 0px 0px 6px 3px rgba(0, 0, 0, 0.5), 0 -0.5px 3px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: 0px 9px 12px 1px rgba(0, 0, 0, 0.4), 0 10px 3px rgba(0, 0, 0, 0.1), inset 0px 0px 6px 3px rgba(0, 0, 0, 0.1), 0 -0.5px 3px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: 0px 9px 12px 1px rgba(0, 0, 0, 0.4), 0 10px 3px rgba(0, 0, 0, 0.1), inset 0px 0px 6px 3px rgba(0, 0, 0, 0.1), 0 -0.5px 3px rgba(0, 0, 0, 0.1);
}

.callButtons {
  margin-top: 10px;
}

/*
background scroll effects only work in desktop versions with larger   screen sizes, preventing background images from getting distorted in smaller tablets, phones, etc.
*/
@media (min-width:1400px)   {
  .body, html {
    	background-repeat: no-repeat;
      background-attachment: fixed;
      background-position: center;
   }
  .row .no-float {
      display: table-cell;
      float: none;
  }
}

/*mobile screens */
@media (max-width: 800px) and (min-width: 300px) {
}

/*ipad screens*/
@media (max-width: 1000px) and (min-width: 600px) {
}


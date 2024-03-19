const http = require('http');
const axios = require('axios');

url = "http://seeaustinssugar.herokuapp.com/api/v1/entries.json?count=1"

var sgv = "";
var direction = "";

async function apiCall() {
  // GET Call Data from nightscout API and add to vars
  const data =  await axios.get(url).then(res => res.data);
  sgv = data[0].sgv;
  direction = data[0].direction;

  console.log(sgv, direction);

  if (direction === 'NOT COMPUTABLE') {
    direction = 'Flat';
  }

  // Print HTML server page
  let handleRequest = (request, response) => {
    response.writeHead(200, {
        'Content-Type': 'text/html'
  });

  // response.write('<!DOCTYPE html>');
  // Print FavIcon
  response.write('<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.png"  >');

  // Print CSS stylesheets links
  // response.write('<link rel="stylesheet" href="fire.scss">');
  // response.write('<div class="pyro"><div class="before"></div><div class="after"></div></div>');
  response.write('<link rel="stylesheet" href="css/linear-gradient.css">');
  response.write('<link rel="stylesheet" href="css/IsAustinDeadTextStyles.css">');
  response.write('<link rel="stylesheet" href="css/IsAustinDeadStyles.css">');

  // Display data per glucose condition
  if (sgv >= 180) {
    // response.write(('<h3 align="center" class="rainbow">Austin is DEAD. He is HIGH at %s %s</h3>' % (sgv, direction));
    response.write('<h3 align="center" class="rainbow">Austin is</h3>');
    response.write('<h4 align="center" class="rainbow">DEAD </h4>');
    response.write(`<h5 align="center" class="rainbow">His blood sugar is HIGH at ${sgv} </h5>`);
    response.write('<h6><center><img src="/images/stressed.gif"style="width:480px;height:170px;"></center></h6>');
  } 
  else if (sgv <= 80) {
    // response.write('<h3 align="center" class="rainbow" >Austin is DEAD. He is LOW at %s %s</h3>' % (sgv, direction));
    response.write('<h3 align="center" class="rainbow">Austin is</h3>');
    response.write('<h4 align="center" class="rainbow">DEAD </h4>');
    response.write(`<h5 align="center" class="rainbow">His blood sugar is LOW at ${sgv} </h5>`);
    response.write('<h6><center><img src="/images/low1.gif"style="width:480px;height:170px;"></center></h6>');
  }
  else {
    response.write('<h3 align="center" class="rainbow">Austin is</h3>');
    response.write('<h4 align="center" class="rainbow">NOT DEAD </h4>');
    response.write(`<h5 align="center" class="rainbow">His blood sugar is ${sgv} </h5>`)
    response.write('<h6><center><img src="images/nooice.gif" style="width:480px; height:191px;"></center></h6>');
    response.write('<link rel="stylesheet" href="fire.scss">');
    response.write('<div class="pyro"><div class="before"></div><div class="after"></div></div>');
  }
  
  // Print Arrow image in correct direction
  if (direction == 'DoubleUp') {
    response.write('<h3><center><img src="/images/DoubleUp.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'SingleUp') {
    response.write('<h3><center><img src="/images/singleup.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'FortyFiveUp') {
    response.write('<h3><center><img src="/images/45up.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'Flat') {
    response.write('<h3><center><img src="/images/Flat.svg"style="width:240px;height:240px;"></center></h3>'); 
  }
  if (direction == 'FortyFiveDown') {
    response.write('<h3><center><img src="/images/45down.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'SingleDown') {
    response.write('<h3><center><img src="/images/SingleDown.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'DoubleDown') {
    response.write('<h3><center><img src="/images/DoubleDown.svg"style="width:240px;height:240px;"></center></h3>');
  }
  if (direction == 'None') {
    response.write('<h3><center><img src="/images/nonesvg.svg"style="width:240px;height:240px;"></center></h3>');
  }

  response.end();
};

http.createServer(handleRequest).listen(8000);
};

apiCall();
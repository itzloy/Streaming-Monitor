var connect = require('connect');
var serveStatic = require('serve-static');
var puppeteer = require('puppeteer');
var fs = require('fs');


var video_URL = "";
var video_playtime = "";

connect().use(serveStatic(__dirname)).listen(8080, function(){
    console.log('Server running on 8080...');


    fs.readFile('index.html', function(err, data) {
        console.log(data);
        if (err) throw err;
          console.log('Error!');
      });


});

async function run() {
  //const browser = await puppeteer.launch({args: ['--no-sandbox']});
  const browser = await puppeteer.launch({headless: false, executablePath: 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'});
  const page = await browser.newPage();


    await page.goto('localhost:8080');
    await page.screenshot({path: 'Step1.png'});
    await page.waitFor(40000)
    var allCookies = await page.cookies()
    var metrics = ['VideoAnalyticsViewTime', 'VideoAnalyticsBufferingCounter', 'VideoAnalyticsBufferingTime']

    for(var i=0; i<metrics.length; i++){
      for (var j=0; j<allCookies.length; j++) {
        if(metrics[i]==allCookies[j].name){
          console.log(metrics[i]+": "+allCookies[j].value);
          break;
        }
        if (j==allCookies.length-1) {
          console.log(metrics[i]+": 0");
        }
      }
    }

    //console.log("allCookies values:"+JSON.stringify(allCookies))

    await browser.close();

}
run()

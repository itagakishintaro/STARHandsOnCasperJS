var casper = require('casper').create();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

casper.start('../../introWork/introWork4.html', function(){
	this.click('#on_radio');
	this.capture('out/intro_work_4.png');
});

casper.run();
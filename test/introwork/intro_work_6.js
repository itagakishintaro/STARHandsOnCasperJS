var casper = require('casper').create();
casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');

casper.start('../../introWork/introWork6.html', function(){
	this.fillSelectors('form', {'#head_count': '5'});
	this.capture('out/intro_work_6.png');
});

casper.run();
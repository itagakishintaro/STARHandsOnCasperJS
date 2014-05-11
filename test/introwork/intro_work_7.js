casper.test.begin('introWork7', 1, function suite(test) {
	casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');
    
    casper.start('../../introWork/introWork7.html', function() {
        this.capture('out/intro_work_7.png');
    });

    casper.then(function() {
        test.assertSelectorHasText('#total', '9000');
    });

    casper.run(function(){
    	test.done();
    });
});
/*
casper.test.begin('introWork7', 1, {
    setUp: function(test) {
    	casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');
    },

    tearDown: function(test) {},

    test: function(test) {
        casper.start('../../introWork/introWork7.html', function() {
            this.capture('out/intro_work_7.png');
        });

        casper.then(function() {
            test.assertSelectorHasText('#total', '9000');
        });

        casper.run(function() {
            test.done();
        });
    }
});
*/
function reserveConfirmPage() {

    this.capture = function(name){
        casper.then(function(){
            this.capture(name);
        });
    };

    this.getPrice = function(){
        return casper.evaluate(function(){
            return __utils__.fetchText('#price');
        });
    };

    this.getDateFrom = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#datefrom');
        });
    };

    this.getDateTo = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#dateto');
        });
    };

    this.getDaysCount = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#dayscount');
        });
    };

    this.getHeadCount = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#hc');
        });
    };

    this.getBreakfast = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#bf_order');
        });
    };

    this.existsPlanA = function() {
        return casper.evaluate(function(){
            return __utils__.exists('#plan_a_order');
        });
    };

    this.getPlanA = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#plan_a_order');
        });
    };

    this.existsPlanB = function() {
        return casper.evaluate(function(){
            return __utils__.exists('#plan_b_order');
        });
    };

    this.getPlanB = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#plan_b_order');
        });
    };

    this.getGuestName = function() {
        return casper.evaluate(function(){
            return __utils__.fetchText('#gname');
        });
    };

    this.commit = function() {
        casper.then(function(){
            this.click('#commit');
        });
    };

}
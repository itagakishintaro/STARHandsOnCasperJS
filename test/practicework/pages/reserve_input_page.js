function reserveInputPage() {

    this.capture = function(name){
        casper.then(function(){
            this.capture(name);
        });
        return this;
    };

    this.startInputPage = function() {
        casper.start('../../reserveApp/index.html');
        return this;
    };

    this.setReserveYear = function(year) {
        casper.then(function() {
            this.sendKeys('#reserve_year', year, {reset: true});
        });
        return this;
    };

    this.setReserveMonth = function(month) {
        casper.then(function() {
            this.sendKeys('#reserve_month', month, {reset: true});
        });
        return this;
    };

    this.setReserveDay = function(day) {
        casper.then(function() {
            this.sendKeys('#reserve_day', day, {reset: true});
        });
        return this;
    };

    this.setReserveDate = function(year, month, day) {
        this.setReserveYear(year);
        this.setReserveMonth(month);
        this.setReserveDay(day);
        return this;
    };

    this.setReserveTerm = function(reserveTerm) {
        casper.then(function() {
            this.sendKeys('#reserve_term', reserveTerm, {reset: true});
        });
        return this;
    };

    this.setHeadcount = function(headcount) {
        casper.then(function() {
            this.sendKeys('#headcount', headcount, {reset: true});
        });
        return this;
    };

    this.setBreakfast = function(on) {
        if (on) {
            casper.then(function() {
                this.click('#breakfast_on');
            });
        } else {
            casper.then(function() {
                this.click('#breakfast_off');
            });
        }
        return this;
    };

    this.setPlanA = function(checked) {
        casper.then(function(){
            if(this.getElementAttribute('#plan_a', 'checked') != checked){
                this.click('#plan_a');
            }
        });
        return this;
    };

    this.setPlanB = function(checked) {
        casper.then(function(){
            if(this.getElementAttribute('#plan_b', 'checked') != checked){
                this.click('#plan_b');
            }
        });
        return this;
    };

    this.setGuestName = function(name) {
        casper.then(function() {
            this.sendKeys('#guestname', name, {reset: true});
        });
        return this;
    };
    
    this.goToNext = function() {
        casper.then(function(){
            this.click('#goto_next');
        });
    };
}
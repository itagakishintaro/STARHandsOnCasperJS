phantom.page.injectJs('pages/reserve_input_page.js');
phantom.page.injectJs('pages/reserve_confirm_page.js');

var reserveInputPage = new reserveInputPage();
var reserveConfirmPage = new reserveConfirmPage();

casper.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53');
casper.test.begin('practiceWork', function suite(test) {
    reserveInputPage.startInputPage()
        .capture('out/practice_work_1.png')
        .setReserveDate('2014', '7', '1')
        .setReserveTerm('3')
        .setHeadcount('1')
        .setBreakfast(false)
        .setPlanA(false)
        .setPlanB(false)
        .setGuestName('abcd')
        .capture('out/practice_work_2.png')
        .goToNext();

    reserveConfirmPage.capture('out/practice_work_3.png');
    casper.then(function() {
        test.assertEquals(reserveConfirmPage.getPrice(), '21000');
        test.assertEquals(reserveConfirmPage.getDateFrom(), "2014年7月1日");
        test.assertEquals(reserveConfirmPage.getDateTo(), "2014年7月4日");
        test.assertEquals(reserveConfirmPage.getDaysCount(), "3");
        test.assertEquals(reserveConfirmPage.getHeadCount(), "1");
        test.assertEquals(reserveConfirmPage.getBreakfast(), "なし");
        test.assertEquals(reserveConfirmPage.existsPlanA(), false);
        test.assertEquals(reserveConfirmPage.existsPlanB(), false);
        test.assertEquals(reserveConfirmPage.getGuestName(), "abcd");
    });
    reserveConfirmPage.commit();

    casper.run(function() {
        test.done();
    });
});
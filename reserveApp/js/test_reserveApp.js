module("with_checkValRes", {
    setup: function() {
        checkValRes = {
            "reserve_y": "",
            "reserve_m": "8",
            "reserve_d": "",
            "reserve_t": "1",
            "hc": "5",
            "bf": "on", // real data, until here.
            "test_data_zenkaku_char": "あ",
            "test_data_zenkaku_number": "８",
            "test_data_zenkaku_symbol": "【",
            "test_data_zero": 0,
            "test_data_normalNum": 10,
            "test_data_minusOne": -1,
            "test_data_char": "a",
            "test_data_symbol": "-",
            "test_data_null": null,
            "test_data_nullstring": "",
            "test_data_undefined": undefined,
            "test_data_true": true,
            "test_data_false": false,
        };
    }
});

test("fieldEmptyCheck_normal", function() {
    /*Test Design Not yet.
    valid partition: 
    invalid partition: 
    boundary value:
    */
    deepEqual(starHotel.fieldEmptyCheck("reserve_y"), false);
    deepEqual(starHotel.fieldEmptyCheck("reserve_m"), true);
});

test("normalizationWithZero_normal", function() {
    /*Test Design Not yet.
    valid partition: 
    invalid partition: 
    boundary value:
    */
    starHotel.normalizationWithZero("reserve_y");
    deepEqual(checkValRes["reserve_y"], 0);

    starHotel.normalizationWithZero("reserve_y", "reserve_d");
    deepEqual(checkValRes["reserve_y"], 0);
    deepEqual(checkValRes["reserve_d"], 0);

    starHotel.normalizationWithZero("reserve_y", "reserve_m", "reserve_d");
    deepEqual(checkValRes["reserve_y"], 0);
    deepEqual(checkValRes["reserve_m"], "8");
    deepEqual(checkValRes["reserve_d"], 0);
});

test("decimalCheck", function(){
    /*Test Design without combination.
    valid partition: 0, 10, -1, "1", arg[T, T];
    invalid partition: "a", "あ", "", "１", "-", undefined, true, false, arg[T, F], arg[T, T, F];
    boundary value: N/A, ensure by JS Regexp Engine.
    */
    deepEqual(starHotel.decimalCheck("test_data_zero"), true);
    deepEqual(starHotel.decimalCheck("test_data_normalNum"), true);
    deepEqual(starHotel.decimalCheck("test_data_minusOne"), true);
    deepEqual(starHotel.decimalCheck("test_data_normalNum"), true);
    deepEqual(starHotel.decimalCheck("reserve_m"), true);
    deepEqual(starHotel.decimalCheck("reserve_m", "test_data_zero"), true);

    deepEqual(starHotel.decimalCheck("test_data_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_zenkaku_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_nullstring"), false);
    deepEqual(starHotel.decimalCheck("test_data_zenkaku_number"), false);
    deepEqual(starHotel.decimalCheck("test_data_symbol"), false);
    deepEqual(starHotel.decimalCheck("test_data_undefined"), false);
    deepEqual(starHotel.decimalCheck("test_data_true"), false);
    deepEqual(starHotel.decimalCheck("test_data_false"), false);

    deepEqual(starHotel.decimalCheck("reserve_m", "test_data_char"), false);
    deepEqual(starHotel.decimalCheck("test_data_zero", "reserve_m", "test_data_char"), false);

});

test("calcTotalBilling", function(){
    /*Test Design without combination.
    arg: date, bf, planA, planB, term, hc
    valid partition:
        (1) : workday, on, on, on, 1, 1 => 10000;
        (2) : holidayday, on, on, on, 1, 1 => 11750;
        (3) : holidayday, off, off, off, 1, 1 => 8750;
        (4) : workday, on, off, off, 1, 5 => (7000 * 5) + (1000 * 5);
        (5) : workday, off, off, off, 5, 1 => (7000 * 5);
        (6) : workday, off, off, off, 6, 1 => (7000 * 5) + 8750;
    invalid partition:
        N/A, ensure by error check until here and it is single & liner processing.
    boundary value:
        N/A, ensure by error check until here and it is single & liner processing. 
    */

    var workday = new Date("2013/8/26");//Monday
    var holiday = new Date("2013/8/31");//Saturday

    deepEqual(starHotel.calcTotalBilling(workday, "on", "on", "on", 1, 1), 10000);
    deepEqual(starHotel.calcTotalBilling(holiday, "on", "on", "on", 1, 1), (7000 * 1.25) +1000+1000+1000);
    deepEqual(starHotel.calcTotalBilling(holiday, "off", "off", "off", 1, 1), (7000 * 1.25));
    deepEqual(starHotel.calcTotalBilling(workday, "on", "off", "off", 1, 5), (7000 * 5) + (1000 * 5));
    deepEqual(starHotel.calcTotalBilling(workday, "off", "off", "off", 5, 1), (7000 * 5));
    deepEqual(starHotel.calcTotalBilling(workday, "off", "off", "off", 6, 1), (7000 * 5) + 8750);

});




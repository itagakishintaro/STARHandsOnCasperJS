//reserveApp.js 
//View renderer for System Test Automation Conference 2013 hands on - #STAR.jp @snsk   
//JSHint Assume:Browser jQuery - failed. http://www.jshint.com/

var starHotelView = {

    checkInfo_isErrorRender: function(checkValRes, dateValue) {
        "use strict";

        //light weight xss check
        for (var key in checkValRes) {
            checkValRes[key] = checkValRes[key].replace(/</ig, "&lt;");
            console.log(checkValRes[key]);
        }

        // field empty check /* could not using jQuery.query plugin, it was confuse return types*/
        if (!starHotel.fieldEmptyCheck("reserve_y", "reserve_m", "reserve_d", "reserve_t", "hc", "gname")) {
            $("#errorcheck_result").append("年月日、期間、人数、またはお名前のいずれかが空です<br>");
            return false;
        }

        if (!starHotel.decimalCheck("reserve_y", "reserve_m", "reserve_d", "reserve_t", "hc")) {
            $("#errorcheck_result").append("年月日、期間、人数いずれかの値が半角英数の範囲外です<br>");
            return false;
        }

        // stay term check 
        if (checkValRes.reserve_t < 1) {
            $("#errorcheck_result").append("宿泊日数が1日以下です<br>");
            return false;
        }
        //date validation
        if (!isDateValidate(dateValue)) {
            $("#errorcheck_result").append("宿泊日が間違っています<br>");
            return false;
        } else {
            var now = new Date();
            dateValue = new Date(dateValue);
            if (dateValue < now) {
                $("#errorcheck_result").append("宿泊日には、翌日以降の日付を指定してください。<br>");
                return false;
            }
            if (dateValue > now.setDate(now.getDate() + 90)) {
                $("#errorcheck_result").append("宿泊日には、3ヶ月以内のお日にちのみ指定できます。<br>");
                return false;
            }
        }
        // head count check
        if (checkValRes.hc < 1) {
            $("#errorcheck_result").append("人数が入力されていません。<br>");
            return false;
        }
        // Breakfast check 
        if (!checkValRes.bf) {
            $("#errorcheck_result").append("朝食の有無が指定されていません<br>");
            return false;
        }
        return true;
    },

    renderCheckInfo: function(totalBill, dateValue) {
        "use strict";
        //display billing
        $("#billing").append("<h3 id='total'>合計 <span id='price'>" + totalBill + "</span>円(税込み)</h3>");
        $("#billing").append("<div style='margin-bottom:10px'>(おひとり様1泊7000円～、土日は25%アップ) <a href=\"javascript:alert('未実装')\">料金詳細を確認</a></div>");
        dateValue = new Date(dateValue);
        var dateFrom = dateValue.getFullYear() + "年" + (dateValue.getMonth() + 1) + "月" + dateValue.getDate() + "日";
        dateValue.setTime(dateValue.getTime() + checkValRes.reserve_t * 24 * 3600 * 1000); //Warning!! dateValue move to N days after.   
        var dateTo = dateValue.getFullYear() + "年" + (dateValue.getMonth() + 1) + "月" + dateValue.getDate() + "日";

        $("#billing").append("<h4 id='term'>期間: <span id='datefrom'>" + dateFrom + "</span> 〜 <span id='dateto'>" + dateTo + "</span>  <span id='dayscount'>" + checkValRes.reserve_t + "</span>泊</h4>");
        $("#billing").append("<h4 id='headcount'>ご人数: <span id='hc'>" + checkValRes.hc + "</span>名様</h4>");

        if (checkValRes.bf === "on") {
            $("#billing").append("<h4 id='breakfast'>朝食: <span id='bf_order'>あり</span></h4>");
        } else {
            $("#billing").append("<h4 id='breakfast'>朝食: <span id='bf_order'>なし</span></h4>");
        } if (checkValRes.plan_a || checkValRes.plan_b) {
            $("#billing").append("<h4 id='plan'>プラン: ");
            if (checkValRes.plan_a) $("#plan").append("<span id='plan_a_order'> 昼からチェックインプラン </span>");
            if (checkValRes.plan_b) $("#plan").append("<span id='plan_b_order'> お得な観光プラン </span>");
            $("#billing").append("</h4>");
        }

        $("#billing").append("<h4 id='guestname'>お名前: <span id='gname'>" + checkValRes.gname + "</span> 様</h4>");
        //$("#billing").slideDown("fast");
        //$("#reserve_info").slideDown("fast");

        $("#reserve_info").append('<hr><button id="commit" type="sender" class="btn" style="margin-bottom:20px">確定</button>');

    },

}

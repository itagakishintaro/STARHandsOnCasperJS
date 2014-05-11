/**
*
*  dateValidate 1.0 - 簡易日付チェック
*  Copyright (c) 2008 IRONHEARTS, Inc.
*
*  http://tech.ironhearts.com/blog/
*
*  Dual licensed under the MIT and GPL licenses:
*  http://www.opensource.org/licenses/mit-license.php
*  http://www.gnu.org/licenses/gpl.html
*
*  @description simple date validate
*
*  usage : ("#date_field").dateValidate();
*
*  入力された日付が、正当な日付かどうかチェックする。
*  セパレータは自動で変換します。
*  基本的には、"yyyy-mm-dd","yyyy.mm.dd","yyyy/mm/dd" という入力でよろしく
*
*
**/

/**
modified @snsk
**/

//http://www.hoge256.net/2007/08/64.html
function computeDate(year, month, day, addDays) {
    var dt = new Date(year, month - 1, day);
    var baseSec = dt.getTime();
    var addSec = addDays * 86400000;//日数 * 1日のミリ秒数
    var targetSec = baseSec + addSec;
    dt.setTime(targetSec);
    return dt;
}

function isDateValidate(target) {

				var ret = false;				
				//
				// フォーマット微調整
				//
				target = target.replace(/-/g,"/");
				target = target.replace(/\./g,"/");
											
				// 入力日付のフォーマットチェック yyyy-mm-dd
				var result = target.match(/^([0-9]{4})\/([0-9]{1,2})\/([0-9]{1,2})$/);
			
				if(result){
						// 日付としての妥当性チェック
						
						var yy = parseInt(result[1],10);
						var mm = parseInt(result[2],10);
						var dd = parseInt(result[3],10);
						
						// 月はゼロ基数なので、1引く
						// ここでは、2009-15-24 など、あり得ない数値を入れても、
						// Date的にはエラーにならず、繰り上がった数値として処理される。
						// そこで、入力値が正しいかどうかを、入力値とDateの結果とを比較し、
						// 繰り上がった＝Invalid な値として処理する。
						var d = new Date(yy,(mm - 1),dd);
						
						if((d.getFullYear() == yy) &&
								(d.getMonth() == (mm - 1)) &&
								(d.getDate() == dd)){
							
							// 正常な入力
							ret = true;
							
						}else{
							// 範囲外
							
						}
				}else{
					// マッチしない
				}
				
				return ret;
     
    }

# number-translator-javascript

javascript:if("object"!=typeof namespace)var namespace={};namespace.numberAsWords={};var numberAsWords=namespace.numberAsWords;if(numberAsWords.languages={},numberAsWords.languages.english={numerals:["0","1","2","3","4","5","6","7","8","9"],digitList:["zero","one","two","three","four","five","six","seven","eight","nine"],uniqueTens:!0,tensList:["zero-enty","ten","twenty","thirty","forty","fifty","sixty","seventy","eighty","ninety"],uniqueTeens:!0,teensList:["ten","eleven","twelve","thirteen","fourteen","fifteen","sixteen","seventeen","eighteen","nineteen"],uniqueHundreds:!1,hundredsList:["zero hundreds","one hundred","two hundred","three hundred","four hundred","five hundred","six hundred","seven hundred","eight hundred","nine hundred"],uniqueIllions:!1,illionsList:[],illionPrefixes:["zero-","m","b","tr","quadr","quint","sext","sept","oct","non","dec","undec","duodec","tredec","quattuordec","quindec","sexdec","septendec","octodec","novemdec","vigint"],illionSuffixes:["","","","","","","","","","","","","","","","","","","","",""],and:"and",ten:"ten",tens:"tens",hundred:"hundred",hundreds:"hundreds",thousand:"thousand",thousands:"thousands",thousandth:"thousandth",thousandths:"thousandths",illion:"illion",illionths:"illionths",thousandsSeparator:",",radixPoint:".",hyphen:"-",space:" ",emptyString:"",comma:",",leftParenthesis:"(",rightParenthesis:")"},numberAsWords.languages.russian={numerals:["0","1","2","3","4","5","6","7","8","9"],digitList:["нуль","один","два","три","четыре","пять","шесть","семь","восемь","девять"],uniqueTens:!0,tensList:["нулевые десятки","десять","двадцать","тридцать","сорок","пятьдесят","шестьдесят","семьдесят","восемьдесят","девяносто"],uniqueTeens:!0,teensList:["десять","одиннадцать","двенадцать","тринадцать","четырнадцать","пятнадцать","шестнадцать","семнадцать","восемнадцать","девятнадцать"],uniqueHundreds:!0,hundredsList:["нулевые сотни","Сто","двести","три сотни","четыре сотни","пятьсот","шестьсот","семь сотен","восемьсот","девятьсот"],uniqueIllions:!0,illionsList:["млн","миллиона","миллиарда","триллиона","квадриллиона","квинтильонов","секстиллионов","септильонов","миллион в восьмой степени"],illionPrefixes:["нет м","м","м","тр","квадр","квинтильонов"],illionSuffixes:["онов","она","арда","она","она",""],and:"and",ten:"ten",tens:"tens",hundred:"hundred",hundreds:"hundreds",thousand:"thousand",thousands:"thousands",thousandth:"thousandth",thousandths:"thousandths",illion:"илли",illionths:"illionths",thousandsSeparator:",",radixPoint:".",hyphen:"-",space:" ",emptyString:"",comma:",",leftParenthesis:"(",rightParenthesis:")"},numberAsWords.currentLanguage=numberAsWords.languages.english,numberAsWords.duetAsWords=function(e){var r=numberAsWords.currentLanguage.emptyString;if(e.charAt(1)==numberAsWords.currentLanguage.numerals[1]&&numberAsWords.currentLanguage.uniqueTeens)r=numberAsWords.currentLanguage.teensList[parseInt(e.charAt(0))];else{var n=!1;e.charAt(1)!=numberAsWords.currentLanguage.numerals[0]&&(numberAsWords.currentLanguage.uniqueTens?r+=numberAsWords.currentLanguage.tensList[parseInt(e.charAt(1))]:r+=numberAsWords.currentLanguage.digitList[parseInt(e.charAt(1))]+numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.tens,n=!0),e.charAt(0)!=numberAsWords.currentLanguage.numerals[0]&&(n&&(numberAsWords.currentLanguage.uniqueTens?r+=numberAsWords.currentLanguage.hyphen:r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.and+numberAsWords.currentLanguage.space),r+=numberAsWords.currentLanguage.digitList[parseInt(e.charAt(0))])}return r},numberAsWords.tripletAsWords=function(e){var r=numberAsWords.currentLanguage.emptyString,n=!1,s=e.substr(2),u=e.substr(0,2);s!==numberAsWords.currentLanguage.numerals[0]&&(numberAsWords.currentLanguage.uniqueHundreds?r+=numberAsWords.currentLanguage.hundredsList[parseInt(s)]:r+=numberAsWords.currentLanguage.digitList[parseInt(s)]+numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.hundred,n=!0);var t=numberAsWords.duetAsWords(u);return t&&(n&&(r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.and+numberAsWords.currentLanguage.space),r+=t),r},numberAsWords.padTriplets=function(e){for(;e.length%3!=0;)e+=numberAsWords.currentLanguage.numerals[0];return e},numberAsWords.wholeNumberAsWords=function(e){var r=numberAsWords.currentLanguage.emptyString;if("string"!=typeof e)return r;e=e.split("").reverse().join(""),e=numberAsWords.padTriplets(e);for(var n=!1;e.length>0;){var s=e.substr(e.length-3);e=e.substr(0,e.length-3);var u=numberAsWords.tripletAsWords(s);if(u){n&&(r+=numberAsWords.currentLanguage.space),r+=u;var t=e.length/3;t>numberAsWords.currentLanguage.illionPrefixes.length||t>numberAsWords.currentLanguage.illionSuffixes.length?r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.leftParenthesis+numberAsWords.numberAsWords(t)+numberAsWords.currentLanguage.rightParenthesis+numberAsWords.currentLanguage.hyphen+numberAsWords.currentLanguage.illion:t>1?r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.illionPrefixes[t-1]+numberAsWords.currentLanguage.illion+numberAsWords.currentLanguage.illionSuffixes[t-1]:1==t&&(r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.thousand);n=!0}}return r},numberAsWords.decimalNumberAsWords=function(e){var r=numberAsWords.currentLanguage.emptyString;if("string"!=typeof e)return r;e=numberAsWords.padTriplets(e);for(var n=!1,s=0;e.length>0;s++){var u=e.substr(0,3);e=e.substr(3);var t=numberAsWords.tripletAsWords(u.split("").reverse().join(""));t&&(n&&(r+=numberAsWords.currentLanguage.space),r+=t,s>=numberAsWords.currentLanguage.illionPrefixes.length?r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.leftParenthesis+numberAsWords.numberAsWords(s)+numberAsWords.currentLanguage.rightParenthesis+numberAsWords.currentLanguage.hyphen+numberAsWords.currentLanguage.illionths:r+=s>0?numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.illionPrefixes[s]+numberAsWords.currentLanguage.illionths:numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.thousandths,n=!0)}return r},numberAsWords.charactersAsWords=function(e){var r=numberAsWords.currentLanguage.emptyString;if("string"!=typeof e||""===e)return r;for(var n=(e=e.replace(new RegExp("["+numberAsWords.currentLanguage.thousandsSeparator+"]","g"),numberAsWords.currentLanguage.emptyString)).match(new RegExp("["+numberAsWords.currentLanguage.radixPoint+"]","g"));null!==n&&n.length>1;)n=(e=e.replace(new RegExp("["+numberAsWords.currentLanguage.radixPoint+"](\\d*)["+numberAsWords.currentLanguage.radixPoint+"]","g"),numberAsWords.currentLanguage.radixPoint+"$1")).match(new RegExp("["+numberAsWords.currentLanguage.radixPoint+"]","g"));if(0===parseInt(e))return r=numberAsWords.currentLanguage.digitList[0];var s=e.split("."),u=s[0],t=s[1];r+=numberAsWords.wholeNumberAsWords(u);var a=numberAsWords.decimalNumberAsWords(t);return a&&(r&&(r+=numberAsWords.currentLanguage.space+numberAsWords.currentLanguage.and+numberAsWords.currentLanguage.space),r+=a),r===numberAsWords.currentLanguage.emptyString&&(r=numberAsWords.currentLanguage.digitList[0]),r},numberAsWords.numberAsWords=function(e){return numberAsWords.charactersAsWords(e.toString())},numberAsWords.main=function(e){return numberAsWords.numberAsWords(e)},"object"!=typeof namespace)namespace={};namespace.replaceNumbersOnPage={};var replaceNumbersOnPage=namespace.replaceNumbersOnPage;replaceNumbersOnPage.isElement=function(e){try{return e instanceof HTMLElement}catch(r){return"object"==typeof e&&1===e.nodeType&&"object"==typeof e.style&&"object"==typeof e.ownerDocument}},replaceNumbersOnPage.replaceNumbersInTextNode=function(e){var r,n=/(,*)([^\d\s\.\:\$])?([\d,]*\d)+([^\d\s\.\:\$\,])?/;for(r=e.data.match(n);null!==r;)e.data=e.data.replace(r[0],(r[1]?r[1]:"")+(r[2]?r[2]+"-":"")+numberAsWords.charactersAsWords(r[3])+(r[4]?"-"+r[4]:"")),r=e.data.match(n);return e},replaceNumbersOnPage.alterAllTextNodesUnderNode=function(e,r){for(var n,s=document.createTreeWalker(e,NodeFilter.SHOW_TEXT,null,!1);n=s.nextNode();)r(n);return s},replaceNumbersOnPage.replaceNumbersOnPage=function(){var e=document.body;return!!replaceNumbersOnPage.isElement(e)&&replaceNumbersOnPage.alterAllTextNodesUnderNode(document.body,replaceNumbersOnPage.replaceNumbersInTextNode)},replaceNumbersOnPage.main=function(){return replaceNumbersOnPage.replaceNumbersOnPage()},replaceNumbersOnPage.main();

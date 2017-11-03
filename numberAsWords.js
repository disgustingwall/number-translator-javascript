/* This file creates the namespace object, adds numberAsWords as an element, and the numberAsWords object
 * It contains variables and functions useful for converting arabic numerals into words
 */

//create namespace
if (typeof namespace !== "object")
{
	var namespace = {};
}
namespace.numberAsWords = {};
var numberAsWords = namespace.numberAsWords;

//language objects, so that multiple languages can exist in one file
numberAsWords.languages = {};

numberAsWords.languages.english = {
numerals : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
digitList : ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"],
uniqueTens : true,
tensList : ["zero-enty", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"],
uniqueTeens : true,
teensList : ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"],
uniqueHundreds : false,
hundredsList : ["zero hundreds", "one hundred", "two hundred", "three hundred", "four hundred", "five hundred", "six hundred", "seven hundred", "eight hundred", "nine hundred"],
uniqueIllions : false,
illionsList : [],
//this only goes up to a vigintillion, but that is well beyond the maximum integer in javascript, and there is a conditional branch that can handle numbers higher than that
illionPrefixes : ["zero-", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non", "dec", "undec", "duodec", "tredec", "quattuordec", "quindec", "sexdec", "septendec", "octodec", "novemdec", "vigint"],
illionSuffixes : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
//single words are defined here, so they're easier to find and edit
and : "and",
ten : "ten",
tens : "tens",
hundred : "hundred",
hundreds : "hundreds",
thousand : "thousand",
thousands : "thousands",
thousandth : "thousandth",
thousandths : "thousandths",
illion : "illion",
illionths : "illionths",
thousandsSeparator : ",",
radixPoint : ".",
hyphen : "-",
space : " ",
emptyString : "",
comma : ",",
leftParenthesis : "(",
rightParenthesis : ")"
}

numberAsWords.languages.russian = {
numerals : ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
digitList : ["нуль", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"],
uniqueTens : true,
tensList : ["нулевые десятки", "десять", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"],
uniqueTeens : true,
teensList : ["десять", "одиннадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "семнадцать", "восемнадцать", "девятнадцать"],
uniqueHundreds : true,
hundredsList : ["нулевые сотни", "Сто", "двести", "три сотни", "четыре сотни", "пятьсот", "шестьсот", "семь сотен", "восемьсот", "девятьсот"],
uniqueIllions : true,
illionsList : ["млн", "миллиона", "миллиарда", "триллиона", "квадриллиона", "квинтильонов", "секстиллионов", "септильонов", "миллион в восьмой степени"],
//this only goes up to a vigintillion, but that is well beyond the maximum integer in javascript, and there is a conditional branch that can handle numbers higher than that
illionPrefixes : ["нет м", "м", "м", "тр", "квадр", "квинтильонов"],
illionSuffixes : ["онов", "она", "арда", "она", "она", ""],
//single words are defined here, so they're easier to find and edit
and : "and",
ten : "ten",
tens : "tens",
hundred : "hundred",
hundreds : "hundreds",
thousand : "thousand",
thousands : "thousands",
thousandth : "thousandth",
thousandths : "thousandths",
illion : "илли",
illionths : "illionths",
thousandsSeparator : ",",
radixPoint : ".",
hyphen : "-",
space : " ",
emptyString : "",
comma : ",",
leftParenthesis : "(",
rightParenthesis : ")"
}

//To change the language, make your own language object and set currentLanguage to it here
numberAsWords.currentLanguage = numberAsWords.languages.english;

//takes a string of two numbers as ASCII characters in reverse order
//returns the equivalent of the original number in word form
numberAsWords.duetAsWords = function (duet)
{
	//initialize duet words as empty string
	var duetWords = numberAsWords.currentLanguage.emptyString;
	
	//if the duet is in the teens and the current language has unique words for teens
	if (duet.charAt(1) == numberAsWords.currentLanguage.numerals[1] && numberAsWords.currentLanguage.uniqueTeens)
	{
		duetWords = numberAsWords.currentLanguage.teensList[parseInt(duet.charAt(0))];
	}
	else
	{
		var thereWereTens = false;
		
		//build the duet's words
		
		//if there are tens
		if (duet.charAt(1) != numberAsWords.currentLanguage.numerals[0])
		{
			if (numberAsWords.currentLanguage.uniqueTens)
			{
				duetWords += numberAsWords.currentLanguage.tensList[parseInt(duet.charAt(1))];
			}
			else
			{
				duetWords += numberAsWords.currentLanguage.digitList[parseInt(duet.charAt(1))] + numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.tens;
			}
			
			thereWereTens = true;
		}
		
		//if there are ones
		if (duet.charAt(0) != numberAsWords.currentLanguage.numerals[0])
		{
			//if there were tens, 
			if (thereWereTens)
			{
				if (numberAsWords.currentLanguage.uniqueTens)
				{
					//add a hyphen
					duetWords += numberAsWords.currentLanguage.hyphen;
				}
				else
				{
					//add an "and" 
					duetWords += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
				}
			}
			
			duetWords += numberAsWords.currentLanguage.digitList[parseInt(duet.charAt(0))];
		}
	}
	
	return duetWords;
}

//takes a string of three numbers as ASCII characters in reverse order
//returns the equivalent of the original number in words
numberAsWords.tripletAsWords = function (triplet)
{
	//initialize triplet words as empty string
	var tripletWords = numberAsWords.currentLanguage.emptyString;
	var thereWereHundereds = false;
	
	//take off last character
	var mostSignificantDigit = triplet.substr(2);
	var duet = triplet.substr(0, 2);
	
	if (mostSignificantDigit !== numberAsWords.currentLanguage.numerals[0])
	{
		if (numberAsWords.currentLanguage.uniqueHundreds)
		{
			tripletWords += numberAsWords.currentLanguage.hundredsList[parseInt(mostSignificantDigit)];
		}
		else
		{
			tripletWords += numberAsWords.currentLanguage.digitList[parseInt(mostSignificantDigit)] + numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.hundred;
		}
		thereWereHundereds = true;
	}
	
	var duetWords = numberAsWords.duetAsWords(duet);
	
	if (duetWords)
	{
		//if there were hundreds, 
		if (thereWereHundereds)
		{
			//add an and and two spaces on either side
			tripletWords += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
		}
		
		tripletWords += duetWords;
	}
	
	return tripletWords;
}

//takes a string ASCII characters
//returns the same string with enough zeroes added to the end such that the length of the string is divisible by three
numberAsWords.padTriplets = function (numberCharacterString)
{
	//while there are incomplete triplets, 
	while (numberCharacterString.length % 3 !== 0)
	{
		//add a zero to the end of the number
		numberCharacterString += numberAsWords.currentLanguage.numerals[0];
	}
	
	return numberCharacterString;
}

numberAsWords.wholeNumberAsWords = function (wholeNumberCharacters)
{
	//initialize final words as empty string
	var words = numberAsWords.currentLanguage.emptyString;
	
	//if the characters aren't a string, 
	if (typeof wholeNumberCharacters !== "string")
	{
		//return the empty string
		return words;
	}
	
	//reverse the order of the numbers so it's simpler to get triplets and pad the most significant digits of the number
	wholeNumberCharacters = wholeNumberCharacters.split("").reverse().join("");
	
	//ensure all triplets are complete by adding zeroes to the end (the most significant digit places)
	//creates a whole number of triplets without adding false information
	wholeNumberCharacters = numberAsWords.padTriplets(wholeNumberCharacters);
	
	var thereWereTripletsPreviously = false;
	
	while (wholeNumberCharacters.length > 0)
	{
		//take off the last three characters
		var triplet = wholeNumberCharacters.substr(wholeNumberCharacters.length - 3);
		wholeNumberCharacters = wholeNumberCharacters.substr(0, wholeNumberCharacters.length - 3);
		
		var tripletWords = numberAsWords.tripletAsWords(triplet);
		
		//if there was anything worth mentioning in "triplet", 
		if (tripletWords)
		{
			//if there has been a triplet previously, add a space before this triplet
			if (thereWereTripletsPreviously)
			{
				words += numberAsWords.currentLanguage.space;
			}
			
			words += tripletWords;
			
			//add thousand, <illionPrefix> + illion to end of each triplet, depending on how long the remaining string is (thus showing what place this triplet is in)
			var tripletsLeft = wholeNumberCharacters.length / 3;
			
			//if there are more triplets left than illionPrefixes or illionSuffixes,
			if (tripletsLeft > numberAsWords.currentLanguage.illionPrefixes.length || tripletsLeft > numberAsWords.currentLanguage.illionSuffixes.length)
			{
				//we don't have any -illion fixes to use, so make them up
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.leftParenthesis + numberAsWords.numberAsWords(tripletsLeft) + numberAsWords.currentLanguage.rightParenthesis + numberAsWords.currentLanguage.hyphen + numberAsWords.currentLanguage.illion;
			}
			else
			//if there is more than one triplet left, 
			if (tripletsLeft > 1)
			{
				//this was a *-illion, so add space + <illion prefix> + illion + <illion suffix> to the end of the word
				//subtract one from tripletsLeft, since it is one more than how many *-illions this is
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.illionPrefixes[tripletsLeft - 1] + numberAsWords.currentLanguage.illion + numberAsWords.currentLanguage.illionSuffixes[tripletsLeft - 1];
			}
			else
			//if there are three characters left, 
			if (tripletsLeft == 1)
			{
				//this was a thousand, so add space + thousand to the end of the words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.thousand;
			}
			//if there are no characters left, this is just a hundred, so no following words are needed
			
			//if we've been through this if statement once, there was at least one triplet
			var thereWereTripletsPreviously = true;
		}
	}
	
	return words;
}

numberAsWords.decimalNumberAsWords = function (decimalNumberCharacters)
{
	var words = numberAsWords.currentLanguage.emptyString;
	
	//if the characters aren't a string, 
	if (typeof decimalNumberCharacters !== "string")
	{
		//return the empty string
		return words;
	}
	
	//pad the end of the number to create even triplets
	//creates even triplets without adding false information
	decimalNumberCharacters = numberAsWords.padTriplets(decimalNumberCharacters);
	
	//keep track of whether we need to add a space before each triplet
	var thereWereTripletsPreviously = false;
	
	//while decimalNumberCharacters.length is above 0, loop and keep track of how many cycles have passed in i
	for (var i = 0; decimalNumberCharacters.length > 0; i++)
	{
		//take the first three characters off of decimalNumberCharacters and store them in "triplet"
		var triplet = decimalNumberCharacters.substr(0, 3);
		//re-assign decimalNumberCharacters without the first three characters
		decimalNumberCharacters = decimalNumberCharacters.substr(3);
		
		//convert the triplet characters into words
		//reverse order of triplet characters first, because the function expects them with the least significant digit leading
		var tripletWords = numberAsWords.tripletAsWords(triplet.split("").reverse().join(""));
		
		//if the three characters converted into a non-empty string, 
		if (tripletWords)
		{
			//if there were triplets previously, 
			if (thereWereTripletsPreviously)
			{
				//add a space to the end of words
				words += numberAsWords.currentLanguage.space;
			}
			
			//add tripletWords string to the end of words
			words += tripletWords;
			
			//add what fraction level it is (thousandths, <illionprefix>illionth), based on the for loop iterator
			//if the fraction is too small for the whole list of illion prefixes, 
			if (i >= numberAsWords.currentLanguage.illionPrefixes.length)
			{
				//append a space, a left parenthesis, a new -illionth prefix based on how many times the loop has completed, a right parenthesis, a hyphen, and "illionths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.leftParenthesis + numberAsWords.numberAsWords(i) + numberAsWords.currentLanguage.rightParenthesis + numberAsWords.currentLanguage.hyphen + numberAsWords.currentLanguage.illionths;
			}
			//else, 
			else
			//if the fraction is still larger than a thousandth, 
			if (i > 0)
			{
				//this is a -illionth
				//append a space, the proper -illionth prefix, and "illionths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.illionPrefixes[i] + numberAsWords.currentLanguage.illionths;
			}
			//else
			else
			//this is a thousandth
			{
				//append a space and "thousandths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.thousandths;
			}
			
			//set thereWereTripletsPreviously to true
			thereWereTripletsPreviously = true;
		}
	}
	
	return words;
}

//takes a string of numbers as ASCII characters
//returns those numbers in word form
numberAsWords.charactersAsWords = function (characters)
{
	//initialize final words as empty string
	var words = numberAsWords.currentLanguage.emptyString;
	
	//if "characters" isn't a string, 
	if (typeof characters !== "string" || characters === "")
	{
		//return blank string
		return words;
	}
	
	//remove thousands separator
	characters = characters.replace(new RegExp("[" + numberAsWords.currentLanguage.thousandsSeparator + "]", "g"), numberAsWords.currentLanguage.emptyString);
	
	
	//clean out all but one decimal point, leaving the leftmost one intact
	//TODO: should leftmost or rightmost be preserved?
	var charactersDecimalPoints = characters.match(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]", "g"));
	while (charactersDecimalPoints !== null && charactersDecimalPoints.length > 1)
	{
		//replace a decimal point, some number of digits, and a decimal point with a decimal point and the numbers
		characters = characters.replace(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]" + "(\\d*)" + "[" + numberAsWords.currentLanguage.radixPoint + "]", "g"), numberAsWords.currentLanguage.radixPoint + "$1");
		//refresh the number of decimal points still in the string
		charactersDecimalPoints = characters.match(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]", "g"))
	}
	
	if (parseInt(characters) === 0)
	{
		words = numberAsWords.currentLanguage.digitList[0];
		return words;
	}
	
	//split the characters into whole number and decimal side
	var splitCharacters = characters.split(".");
	var wholeNumberCharacters = splitCharacters[0];
	var decimalCharacters = splitCharacters[1];
	
	//turn whole number portion into words and add them to the end of final words variable
	words += numberAsWords.wholeNumberAsWords(wholeNumberCharacters);
	//turn decimal portion into words and add them to the end of the final words variable
	
	//store the decimalCharacters as words in decimalWords
	var decimalWords = numberAsWords.decimalNumberAsWords(decimalCharacters);
	
	//if there were decimal words, 
	if (decimalWords)
	{
		//if there is already something in words, 
		if (words)
		{
			//add a space, "and", and a space before the decimal words
			words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
		}
		
		//add the decimal words to the end of words
		words += decimalWords;
	}
	
	//TODO: keep a marker of whether the number has been all zeroes up until this point, such that this change can be made with certainty
	//if words is completely empty
	if (words === numberAsWords.currentLanguage.emptyString)
	{
		//it's probably zero
		words = numberAsWords.currentLanguage.digitList[0];
	}
	
	return words;
}

//takes a number
//returns that number in word form
numberAsWords.numberAsWords = function (number)
{
	return numberAsWords.charactersAsWords(number.toString());
}

//"main" function
//just takes the arguments and passes them to numberAsWords(number)
numberAsWords.main = function(args)
{
	return numberAsWords.numberAsWords(args);
}

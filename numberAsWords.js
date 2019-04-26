/* This file creates the namespace object, adds numberAsWords as an element, and the numberAsWords object
It contains variables and functions useful for converting arabic numerals into words */

// Create namespace
if (typeof namespace !== "object")
{
	var namespace = {};
}
namespace.numberAsWords = {};
var numberAsWords = namespace.numberAsWords;

// Language objects, so that multiple languages can exist in one file
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
// This only goes up to a vigintillion, but that is well beyond the maximum integer in javascript, and there is a conditional branch that can handle numbers higher than that
illionPrefixes : ["zero-", "m", "b", "tr", "quadr", "quint", "sext", "sept", "oct", "non", "dec", "undec", "duodec", "tredec", "quattuordec", "quindec", "sexdec", "septendec", "octodec", "novemdec", "vigint"],
illionSuffixes : ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
// Single words are defined here, so they're easier to find and edit
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
illionPrefixes : ["нет м", "м", "м", "тр", "квадр", "квинтильонов"],
illionSuffixes : ["онов", "она", "арда", "она", "она", ""],
// Single words are defined here, so they're easier to find and edit
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

// To change the language, make your own language object and set currentLanguage to it here
numberAsWords.currentLanguage = numberAsWords.languages.english;

// Takes a string of two numbers as ASCII characters in reverse order
// Returns the equivalent of the original number in word form
numberAsWords.duetAsWords = function (duet)
{
	// Initialize duet words as empty string
	var duetWords = numberAsWords.currentLanguage.emptyString;
	
	if (duet.charAt(1) == numberAsWords.currentLanguage.numerals[1] && numberAsWords.currentLanguage.uniqueTeens)
	// the duet is in the teens and the current language has unique words for teens
	{
		duetWords = numberAsWords.currentLanguage.teensList[parseInt(duet.charAt(0))];
	}
	else
	{
		var thereWereTens = false;
		
		// Build the duet's words
		
		if (duet.charAt(1) != numberAsWords.currentLanguage.numerals[0])
		// there are tens
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
		
		if (duet.charAt(0) != numberAsWords.currentLanguage.numerals[0])
		// there are ones
		{
			if (thereWereTens)
			// there were tens,
			{
				if (numberAsWords.currentLanguage.uniqueTens)
				{
					// Add a hyphen
					duetWords += numberAsWords.currentLanguage.hyphen;
				}
				else
				{
					// Add an "and"
					duetWords += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
				}
			}
			
			duetWords += numberAsWords.currentLanguage.digitList[parseInt(duet.charAt(0))];
		}
	}
	
	return duetWords;
}

// Takes a string of three numbers as ASCII characters in reverse order
// Returns the equivalent of the original number in words
numberAsWords.tripletAsWords = function (triplet)
{
	// Initialize triplet words as empty string
	var tripletWords = numberAsWords.currentLanguage.emptyString;
	var thereWereHundereds = false;
	
	// Take off last character
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
		if (thereWereHundereds)
		// there were hundreds,
		{
			// Add an and and two spaces on either side
			tripletWords += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
		}
		
		tripletWords += duetWords;
	}
	
	return tripletWords;
}

// Takes a string ASCII characters
// Returns the same string with enough zeroes added to the end such that the length of the string is divisible by three
numberAsWords.padTriplets = function (numberCharacterString)
{
	while (numberCharacterString.length % 3 !== 0)
	// there are incomplete triplets,
	{
		// Add a zero to the end of the number
		numberCharacterString += numberAsWords.currentLanguage.numerals[0];
	}
	
	return numberCharacterString;
}

numberAsWords.wholeNumberAsWords = function (wholeNumberCharacters)
{
	// Initialize final words as empty string
	var words = numberAsWords.currentLanguage.emptyString;
	
	if (typeof wholeNumberCharacters !== "string")
	// the characters aren't a string,
	{
		// Return the empty string
		return words;
	}
	
	// Reverse the order of the numbers so it's simpler to get triplets and pad the most significant digits of the number
	wholeNumberCharacters = wholeNumberCharacters.split("").reverse().join("");
	
	// Ensure all triplets are complete by adding zeroes to the end (the most significant digit places)
	// Creates a whole number of triplets without adding false information
	wholeNumberCharacters = numberAsWords.padTriplets(wholeNumberCharacters);
	
	var thereWereTripletsPreviously = false;
	
	while (wholeNumberCharacters.length > 0)
	{
		// Take off the last three characters
		var triplet = wholeNumberCharacters.substr(wholeNumberCharacters.length - 3);
		wholeNumberCharacters = wholeNumberCharacters.substr(0, wholeNumberCharacters.length - 3);
		
		var tripletWords = numberAsWords.tripletAsWords(triplet);
		
		if (tripletWords)
		// there was anything worth mentioning in "triplet",
		{
			if (thereWereTripletsPreviously)
			// there has been a triplet previously, add a space before this triplet
			{
				words += numberAsWords.currentLanguage.space;
			}
			
			words += tripletWords;
			
			// Add thousand, <illionPrefix> + illion to end of each triplet, depending on how long the remaining string is (thus showing what place this triplet is in)
			var tripletsLeft = wholeNumberCharacters.length / 3;
			
			if (tripletsLeft > numberAsWords.currentLanguage.illionPrefixes.length || tripletsLeft > numberAsWords.currentLanguage.illionSuffixes.length)
			// there are more triplets left than illionPrefixes or illionSuffixes,
			{
				// We don't have any -illion fixes to use, so make them up
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.leftParenthesis + numberAsWords.numberAsWords(tripletsLeft) + numberAsWords.currentLanguage.rightParenthesis + numberAsWords.currentLanguage.hyphen + numberAsWords.currentLanguage.illion;
			}
			else
			if (tripletsLeft > 1)
			// there is more than one triplet left,
			{
				// This was a *-illion, so add space + <illion prefix> + illion + <illion suffix> to the end of the word
				// Subtract one from tripletsLeft, since it is one more than how many *-illions this is
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.illionPrefixes[tripletsLeft - 1] + numberAsWords.currentLanguage.illion + numberAsWords.currentLanguage.illionSuffixes[tripletsLeft - 1];
			}
			else
			if (tripletsLeft == 1)
			// there are three characters left,
			{
				// This was a thousand, so add space + thousand to the end of the words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.thousand;
			}
			// If there are no characters left, this is just a hundred, so no following words are needed
			
			// If we've been through this if statement once, there was at least one triplet
			var thereWereTripletsPreviously = true;
		}
	}
	
	return words;
}

numberAsWords.decimalNumberAsWords = function (decimalNumberCharacters)
{
	var words = numberAsWords.currentLanguage.emptyString;
	
	if (typeof decimalNumberCharacters !== "string")
	// the characters aren't a string,
	{
		// Return the empty string
		return words;
	}
	
	// Pad the end of the number to create even triplets
	// Creates even triplets without adding false information
	decimalNumberCharacters = numberAsWords.padTriplets(decimalNumberCharacters);
	
	// Keep track of whether we need to add a space before each triplet
	var thereWereTripletsPreviously = false;
	
	// While decimalNumberCharacters.length is above 0, loop and keep track of how many cycles have passed in i
	for (var i = 0; decimalNumberCharacters.length > 0; i++)
	{
		// Take the first three characters off of decimalNumberCharacters and store them in "triplet"
		var triplet = decimalNumberCharacters.substr(0, 3);
		// Re-assign decimalNumberCharacters without the first three characters
		decimalNumberCharacters = decimalNumberCharacters.substr(3);
		
		// Convert the triplet characters into words
		// Reverse order of triplet characters first, because the function expects them with the least significant digit leading
		var tripletWords = numberAsWords.tripletAsWords(triplet.split("").reverse().join(""));
		
		if (tripletWords)
		// the three characters converted into a non-empty string,
		{
			if (thereWereTripletsPreviously)
			// there were triplets previously,
			{
				// Add a space to the end of words
				words += numberAsWords.currentLanguage.space;
			}
			
			// Add tripletWords string to the end of words
			words += tripletWords;
			
			// Add what fraction level it is (thousandths, <illionprefix>illionth), based on the for loop iterator
			if (i >= numberAsWords.currentLanguage.illionPrefixes.length)
			// the fraction is too small for the whole list of illion prefixes,
			{
				// Append a space, a left parenthesis, a new -illionth prefix based on how many times the loop has completed, a right parenthesis, a hyphen, and "illionths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.leftParenthesis + numberAsWords.numberAsWords(i) + numberAsWords.currentLanguage.rightParenthesis + numberAsWords.currentLanguage.hyphen + numberAsWords.currentLanguage.illionths;
			}
			else
			if (i > 0)
			// the fraction is still larger than a thousandth,
			{
				// This is a -illionth
				// Append a space, the proper -illionth prefix, and "illionths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.illionPrefixes[i] + numberAsWords.currentLanguage.illionths;
			}
			else
			// this is a thousandth
			{
				// Append a space and "thousandths" to the end of words
				words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.thousandths;
			}
			
			// Set thereWereTripletsPreviously to true
			thereWereTripletsPreviously = true;
		}
	}
	
	return words;
}

// Takes a string of numbers as ASCII characters
// Returns those numbers in word form
numberAsWords.charactersAsWords = function (characters)
{
	// Initialize final words as empty string
	var words = numberAsWords.currentLanguage.emptyString;
	
	if (typeof characters !== "string" || characters === "")
	// "characters" isn't a string,
	{
		// Return blank string
		return words;
	}
	
	// Remove thousands separator
	characters = characters.replace(new RegExp("[" + numberAsWords.currentLanguage.thousandsSeparator + "]", "g"), numberAsWords.currentLanguage.emptyString);
	
	
	// Clean out all but one decimal point, leaving the leftmost one intact
	//TODO: should leftmost or rightmost be preserved?
	var charactersDecimalPoints = characters.match(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]", "g"));
	while (charactersDecimalPoints !== null && charactersDecimalPoints.length > 1)
	{
		// Replace a decimal point, some number of digits, and a decimal point with a decimal point and the numbers
		characters = characters.replace(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]" + "(\\d*)" + "[" + numberAsWords.currentLanguage.radixPoint + "]", "g"), numberAsWords.currentLanguage.radixPoint + "$1");
		// Refresh the number of decimal points still in the string
		charactersDecimalPoints = characters.match(new RegExp("[" + numberAsWords.currentLanguage.radixPoint + "]", "g"));
	}
	
	if (parseInt(characters) === 0)
	{
		words = numberAsWords.currentLanguage.digitList[0];
		return words;
	}
	
	// Split the characters into whole number and decimal side
	var splitCharacters = characters.split(".");
	var wholeNumberCharacters = splitCharacters[0];
	var decimalCharacters = splitCharacters[1];
	
	// Turn whole number portion into words and add them to the end of final words variable
	words += numberAsWords.wholeNumberAsWords(wholeNumberCharacters);
	// Turn decimal portion into words and add them to the end of the final words variable
	
	// Store the decimalCharacters as words in decimalWords
	var decimalWords = numberAsWords.decimalNumberAsWords(decimalCharacters);
	
	if (decimalWords)
	// there were decimal words,
	{
		if (words)
		// there is already something in words,
		{
			// Add a space, "and", and a space before the decimal words
			words += numberAsWords.currentLanguage.space + numberAsWords.currentLanguage.and + numberAsWords.currentLanguage.space;
		}
		
		// Add the decimal words to the end of words
		words += decimalWords;
	}
	
	//TODO: keep a marker of whether the number has been all zeroes up until this point, such that this change can be made with certainty
	if (words === numberAsWords.currentLanguage.emptyString)
	// words is completely empty
	{
		// It's probably zero
		words = numberAsWords.currentLanguage.digitList[0];
	}
	
	return words;
}

// Takes a number
// Returns that number in word form
numberAsWords.numberAsWords = function (number)
{
	return numberAsWords.charactersAsWords(number.toString());
}

// "main" function
// Just takes the arguments and passes them to numberAsWords(number)
numberAsWords.main = function(args)
{
	return numberAsWords.numberAsWords(args);
}

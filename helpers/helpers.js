// Dependecies
// const moment = require("moment");

module.exports.formatPrice = (cents) => {
    return `$${(cents / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

module.exports.rando = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

module.exports.slugify = (text) => {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w-]+/g, '')       // Remove all non-word chars
        .replace(/--+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}

module.exports.getFunName = () => {
    const adjectives = ['adorable', 'beautiful', 'clean', 'drab', 'elegant', 'fancy', 'glamorous', 'handsome', 'long', 'magnificent', 'old-fashioned', 'plain', 'quaint', 'sparkling', 'ugliest', 'unsightly', 'angry', 'bewildered', 'clumsy', 'defeated', 'embarrassed', 'fierce', 'grumpy', 'helpless', 'itchy', 'jealous', 'lazy', 'mysterious', 'nervous', 'obnoxious', 'panicky', 'repulsive', 'scary', 'thoughtless', 'uptight', 'worried'];

    const nouns = ['women', 'men', 'children', 'teeth', 'feet', 'people', 'leaves', 'mice', 'geese', 'halves', 'knives', 'wives', 'lives', 'elves', 'loaves', 'potatoes', 'tomatoes', 'cacti', 'foci', 'fungi', 'nuclei', 'syllabuses', 'analyses', 'diagnoses', 'oases', 'theses', 'crises', 'phenomena', 'criteria', 'data'];

    return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`;
}

module.exports.getrandomId = (strLength) => {
    strLength = typeof (strLength) == 'number' && strLength > 0 ? strLength : false;
    if (strLength) {
        // Define all the possible characters that could go into the string
        var possibleCharacters = "abcdefghijklmnopqrstuvwxyz0123456789";

        // Start the final string
        var str = '';
        for (let i = 1; i <= strLength; i++) {
            // Get a random character from the possibleCharacter string
            var randomCharacter = possibleCharacters.charAt(Math.floor(Math.random() * possibleCharacters.length));
            // Append this character to the final string
            str += randomCharacter;
        }

        // Return the final string
        return str;

    } else {
        return false;
    }
}

module.exports.orderObjectBy = (obj,name)=>{
    if(typeof(obj)=='object'){
        name = name.toString().toLowerCase();
        obj.sort((a,b)=>{
            let fir = a[name] ? a[name].toString().toLowerCase() : "nill", sec = b[name] ? b[name].toString().toLowerCase() : "nill";
            return fir == sec ? 0 : fir > sec ? 1 : -1;
        })
        return(obj)
    } else {
        throw new Error('param must be of object type');
    }
}

module.exports.sumOfList = (list)=>{
    list = typeof(list) == "object" && list instanceof Array && list.length > 0 ? list : typeof(list) == "string" && list.trim().length > 0 ? list.trim() : false;
    let num = (n) => isNaN(parseInt(n)) ? 0 : n;
    if(list){
        let result =  0;
        list.forEach(data=>{
            result = result + num(data);
        })
        return(result);
    } else {
        return 0
    }
}

module.exports.listFromObj = (obj,list)=>{
    obj = typeof(obj) == "object" ? obj : {};
    list = typeof(list) == "string" ? list.trim() : false;
    if(obj && list){
        let result = [];
        obj.map(item=>{
            result.push(item[list])
        });
        return result;
    } else {
        console.log("null");
        return "Not found!";
    }
}

module.exports.formatNumber = (num)=>{
    num = typeof(num) == "string" || "number" ? Math.abs(parseInt(num)) : false;
    let log = Math.log(num)/Math.log(10);
    let base = {
        "k": 3,
        "m": 6,
        "b": 9,
        "t": 12,
        "q": 15
    }
    if(log < 3){
        return(num)
    } else if(num > 3){
        return `${(num/1000).toFixed(2)}k`;
    }
}

// module.exports.formatTime = (time, format) => {
// 	return moment(time).format(format);
// }
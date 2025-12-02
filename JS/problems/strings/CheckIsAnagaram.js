function checkIsAnagram(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();

    if (str1.length !== str2.length) {

        return false
        
    }

    //create frequency counter objectives

    let count1 = {};
    let count2 = {};

    // count characters for str1
    for(let char of str1){
        count1[char] = (count1[char] || 0) + 1;
    } 

    for (let char of str2) {
        count2[char] = (count2[char] || 0) + 1;
    }

    //compare both frequency objects
    for(let key in count1) {
        if (count1[key] !== count2[key]) {

            return false
            
        }
    }

    return true;
    
}


console.log(checkIsAnagram("Dad", "Mom")); // false
console.log(checkIsAnagram("Dad", "add")); // true
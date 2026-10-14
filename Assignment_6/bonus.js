
var romanToInt = function(s) {
    let arr = []
   for (let i = 0 ; i<s.length ; i++){
    if(s[i] === `I`)
        arr . push (1)
    else if(s[i] === `V`)
        arr . push (5)
    else if(s[i] === `X`)
        arr . push (10)
    else if(s[i] === `L`)
        arr . push (50)
    else if(s[i] === `C`)
        arr . push (100) 
    else if(s[i] === `D`)
        arr . push (500) 
    else if(s[i] === `M`)
        arr . push (1000) 
    }
    
   for (let i = 0 ; i<arr.length ; i++){
    if(arr[i] < arr[i+1])
        arr.splice(i,1,-(arr[i]))
   } 
   
   const total = arr.reduce(
    (sum, num) => sum + num,
    0
);
return total
}

//better solution :

const DICT = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000
}

var romanToInt_v2 = function (s) {
    let result = 0;

    for(let i = 0; i < s.length - 1; i++) {
        if(DICT[s[i]] < DICT[s[i + 1]]) {
            result -= DICT[s[i]]
        } else {
            result += DICT[s[i]];
        }       
    }

    return result + DICT[s[s.length - 1]];
};

console.log(romanToInt_v2(`LVIII`));


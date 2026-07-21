let num=Number("123")
num+=7
console.log(num)

//_________________________________________

function falsy (variable)
{
    if(!Boolean(variable))
        return 'invalid'
}
//_________________________________________
for(let i =1;i<=10;i++)
    {
        if(i%2!==0)
            console.log(i)
        else continue
    }
    
//_________________________________________

let oldArray=[1,2,3,4,5]
let newArray=oldArray.filter(e => e%2===0)

//_________________________________________

function mergedArray(arr1,arr2)
{
    arr1.push(...arr2)
    return arr1

}

//_________________________________________
function numToDay(num)
{
    switch(num)
    {
        case 1 :
            return 'sunday'
            break;
        case 2 :
            return 'monday'
            break;
        case 3 :
            return 'tuseday'
            break;
        case 4 :
            return 'wednesday'
            break;
        case 5 :
            return 'thursday'
            break;
        case 6 :
            return 'friday'
            break;
        case 7 :
            return 'saterday'
            break;                        
    }
    
}
//_________________________________________

let stringsArray=['hello','world','javascript']
let arrayOfLengths=stringsArray.map(e => e.length)
console.log(arrayOfLengths);
//_________________________________________


function divisable(num)
{
    if(num %3===0 && num % 5===0 )
        return 'Divisble by both'
}
//_________________________________________

const square= (num) => num**2

//_________________________________________
function sum (...args)
{
    let sum =0
    args.forEach(e=>sum+=e)
    return sum 
}
//_________________________________________
//_________________________________________
function maxmum(arr)
{
    return Math.max(...arr)
}
//_________________________________________
function keys(obj)
{
  return  Object.keys(obj)
}
//_________________________________________
function splitWord(word)
{
    return word.split(' ')
}
//_________________________________________
function destruct (obj)
{
    let arr = Object.values(obj)
    
    
    return `${arr[0]} is ${arr[1] } years old`
}
console.log(destruct({name: 'John', age: 25}));
//_________________________________________
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve('success'), ms))
 
}
console.log(wait(3000).then((m) => console.log(m)));
//_______________________________________





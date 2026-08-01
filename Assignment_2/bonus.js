function kth(arr,k){
    let missednums=[]
    let counter = 0
    while(missednums.length<k){
        if(!arr.includes(counter+1)){
            missednums.push(counter+1)
            counter++
        }else counter++
            
    }
return missednums[missednums.length-1]
}
console.log(kth([1,2,3,4],2));
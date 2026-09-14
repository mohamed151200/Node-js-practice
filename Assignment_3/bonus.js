function longest(strs) {
    let common = "";
    for (let i = 0; i < strs[0].length; i++) {
        common += strs[0][i]
        for (let j = 1; j < strs.length; j++) {
          
            if (strs[j][i] === common[i]) continue; else return common.slice(0,i)
        }
    } return common
}

console.log(longest(["dog","racecar","car"]));
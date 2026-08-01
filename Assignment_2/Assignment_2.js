 import path from "node:path";

import { fileURLToPath } from "node:url";

const currentFile = fileURLToPath(import.meta.url);

const currentDir = path.dirname(currentFile);

console.log({
    File: currentFile,
    Dir: currentDir
});
 //=============================================================
 
import path from 'path'
 function getFileName(filePath){
    try{
        return path.basename(filePath)
    }catch(err){
        console.log(err);
        
    }
 }
 console.log(getFileName('/foo/bar/baz/asdf/quux.html'));

 //=============================================================

 
 function mapToPath(map){
    try{
        return path.format(map)
    }
    catch(err){console.log(err);
    } }

//=============================================================
 function getFileExt(filePath){
    try{
        return path.extname(filePath)
    }
    catch(err){console.log(err);
    }
 }
 //=============================================================
 function parser (filePath){
    try{
        let obj=path.parse(filePath)
        return {name:obj.name,Ext:obj.ext}
    }
    catch(err){console.log(err);
    }
 }
 //console.log(parser('/home/app/main.js'));
 //=============================================================
 function isAbsolute(filePath){
    try{
        return path.isAbsolute(filePath)
    }catch(err){console.log(err);
    }
 }
 //console.log(isAbsolute('/home/user/file.txt'));
 //=============================================================
 function joiner(...args){
    try{
        return path.join(...args)
    }catch(err){console.log(err);
    }
 }
 //console.log(joiner("src", "components", "App.js"));
 //=============================================================
 function absolute (relativePath){
    try{
       return path.resolve(relativePath) 
    }catch(err){console.log(err);
    }
 }
 //console.log(absolute('./Assignment_2/Assignment_2.js'));
 //============================================================
 function joiningTwo(path_1,path_2){
    return path.join(path_1,path_2)
 }
 
 //console.log(joiningTwo('/folder1', 'folder2/file.txt'));
 //============================================================
 import fspromise from 'fs/promises'
 import fs from 'fs'


 async function deleteFile(fileName) {
    try{
        await fspromise.unlink(fileName)
        console.log(`the ${fileName} has deleted `);
        
    }catch(err){console.log(err);
    }
    
 }


 //deleteFile('./New Microsoft Word Document.docx')
 //============================================================

function makeFolder(folderName){
    try{
        fs.mkdirSync(folderName,{recursive:true})
        console.log('Success');
        
    }catch(err){console.log(err);
    }
}
//makeFolder('./Assignment_3')
//==============================================================
import EventEmitter  from 'events';
import { pipeline } from 'stream';

let emitter = new EventEmitter()
emitter.on('start',()=>{
    console.log('Welcome event triggered!');
    
})
emitter.emit('start')
//==============================================================
emitter.on('login',(name)=>{
    console.log(`User logged in: ${name}`);
    
})
emitter.emit('login','AHMED')
//==============================================================
function readSync(filePath){
    try{
        let dir=path.normalize(filePath)
        let data=fs.readFileSync(dir,{encoding:'utf-8'})
        console.log(data);
    }catch(err){
        console.log(err);
        
    }
}
//readSync(`C:/Users/WD/Downloads/Assignment2.pdf`)
//==============================================================
async function write(filePath,content) {
    try{
    await fspromise.writeFile(filePath,content)
}catch(err){
    console.log(err);
}
}
//write('C:/Users/WD/Downloads/test.txt','')
//==============================================================
console.log(fs.existsSync('C:/Users/WD/Downloads/test.txt'));
//==============================================================
import os from "os";
console.log({'Platform': os.platform(), 'Arch': os.arch()});

//==============================================================
function readChunks(){
    const readStream = fs.createReadStream(`C:/Users/WD/Downloads/Assignment2.pdf`)
readStream.on('data',(chunk)=>{
    console.log(chunk);
    
})
}
//readChunks()
//==============================================================
function copyByChunks(from,to){
    const readStream=fs.createReadStream(from)
    const writeStream=fs.createWriteStream(to)
    readStream.pipe(writeStream)
}
copyByChunks('C:/Users/WD/Downloads/test.txt','C:/Users/WD/Downloads/test2.txt')
//==============================================================
import zlib from "zlib";
const readStream=fs.createReadStream('C:/Users/WD/Downloads/test.txt')
const writeStream=fs.createWriteStream('C:/Users/WD/Downloads/test2.txt')
const gZip = zlib.createGzip()

readStream.pipe(gZip).pipe(writeStream)
//==============================================================

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
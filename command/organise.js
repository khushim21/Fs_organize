let fs=require("fs");
let path=require("path");
let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"]
}

function organize(src){
    //console.log("organize command executed with path->"+src);
    let destPath;
    if(src == undefined){
        console.log("Kindly enter the correct path");
        return;
    }else{
        let doesExist=fs.existsSync(src);

        if(doesExist){
            destPath=path.join(src,"organized_path");
            if(fs.existsSync(destPath)==false){
                fs.mkdirSync(destPath);
            }

        }else{
            console.log("Kindly enter the correct path");
            return;
        }
    }
    organizeHelper(src,destPath);
}

function organizeHelper(src, dest){
    let childName=fs.readdirSync(src);
    for(let i=0;i<childName.length;i++){
        let childAddress=path.join(src,childName[i]);
        let isFile=fs.lstatSync(childAddress).isFile();     
        
        if(isFile){
            let category=getCategory(childName[i]);
            console.log(childName[i],"belongs to -->",category);
            sendFiles(childAddress,dest,category);
        }
    }
}

function sendFiles(srcFilePath,dest,category){
    let categoryPath=path.join(dest,category);
    if(fs.existsSync(categoryPath)==false){
        fs.mkdirSync(categoryPath);
    }
    let fileName=path.basename(srcFilePath);
    let destFilePath=path.join(categoryPath,fileName);
    fs.copyFileSync(srcFilePath,destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName,"copied to ",category);
}

function getCategory(name){
    let ext=path.extname(name);
    ext=ext.slice(1);

    for(let type in types){
        let cTypeArray=types[type];
        for(let i=0;i<cTypeArray.length;i++){
            if(ext == cTypeArray[i]){
                return type;
            }
        }
    }
    return "others";
}

module.exports = {
    fxnO: organize
}

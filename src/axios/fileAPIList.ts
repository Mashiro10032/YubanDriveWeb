import axios from './axios'
interface checkFile{
    md5:string,
    folderUUID:string,
    fileName:string
}
/**
 * 文件API
 */
//获取文件和文件夹列表
export const getFileListAPI = async(param:String) =>{
    let data = await axios({
        url: "/fileList",
        method: "GET",
        params: {
            parentFolderUUID: param
        }
    }).then((res:any)=>{return res.data.data}).catch((error:any)=>error)
    return data
}
export const uploadFileAPI = async(param:FormData) =>{
    return await axios({
        url:"/fileUpload/chunk",
        method:"POST",
        data:param
    })
}
export const uploadFileCheckAPI = async(param:checkFile) =>{
    let data = await axios({
        url:"/fileUpload/check",
        method:"GET",
        params:{
            md5:param.md5,
            folderUUID:param.folderUUID,
            fileName:param.fileName
        }
    }).then((res:any)=>{return res.data}).catch((error:any)=>error)
    return data;
}
export const renameFileAPI = async (newFileName:string,currentFileName:object,folderUUID:string) =>{
    let data = await axios({
        url:"/fileManagement/rename",
        method:"POST",
        data:{
            targetFileName:newFileName,
            currentFileName:currentFileName,
            folderUUID:folderUUID
        }
    }).then((res:any)=>{return res.data.data}).catch((error:any)=>error)
    return data;
}

export const fileDownloadAPI = async(FormData:FormData)=>{
    let data = await axios({
        url:"/fileDownload/file",
        method:"post",
        data:FormData,
        responseType:"blob",
        timeout:50000
    }).then((res:any)=>{
        return res.data
    }).catch((error:any)=>error)
    return data;

}
//封装Ajax
import axios from 'axios'
export default function ajax(url,data={},type="GET"){//向外暴露一个Ajax函数
    return new Promise((resolve,reject)=>{//高阶函数接收函数作为参数
        let promise
    if (type==="GET") {
        //准备url query参数数据
        let dataStr=""//数据拼接字符串
        Object.keys(data).forEach(key=>{
            dataStr+=key+"="+data[key]+"&"
        })
        if (dataStr!=="") {
            dataStr=dataStr.substring(0,dataStr.lastIndexOf("&"))
            url=url+"?"+dataStr
        }
        promise=axios.get(url)//发送get
    }else{//发送post
        promise=axios.post(url,data)
    }
    promise.then(res=>{
        resolve(res.data)
    }).catch(err=>{
        reject(err)
    })
    })
}
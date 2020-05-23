//封装全部请求
import ajax from "./ajax"
// const BaseUrl="http://localhost:4000"
const BaseUrl="/api"
// 1、根据经纬度获取位置详情
export const reqAddress=(geohash)=>ajax(`${BaseUrl}/position/${geohash}`)
// 2、获取食品分类列表
export const reqFoodList=()=>ajax(BaseUrl+'/index_category')
//3、根据经纬度获取商铺列表
export const reqShopList=(longitude,latitude)=>ajax(BaseUrl+"/shops",{longitude,latitude})
// 4、根据经纬度和关键字搜索商铺列表
export const reqSearchShopList=(keyword,geohash)=>ajax(BaseUrl+"/search_shops",{keyword,geohash})
// 5、获取一次性验证码
export const reqCode=()=>ajax(BaseUrl+"/captcha")
// 6、用户名密码登陆
export const reqLogin=(name,pwd,captcha)=>ajax(BaseUrl+"/login_pwd",{name,pwd,captcha},'POST')
// 7、发送短信验证码
export const reqPhone=(phone)=>ajax(BaseUrl+"/sendcode",{phone})
// 8、手机号短信验证码登陆
export const reqPhoneCode=(phone,code)=>ajax(BaseUrl+"/login_sms",{phone,code},'POST')
// 9、根据会话获取用户信息
export const reqUserInfo=()=>ajax(BaseUrl+"/userinfo")
// 10、用户登出
export const reqLoginOut=()=>ajax(BaseUrl+"/logout")
import http from '../../../../base/api/public'
let sysConfig = require('../../../../../config/sysConfig')
import querystring from 'querystring'
let apiUrl = sysConfig.fzbfApiUrlPre;
export const page_list = (page,size,params)=>{
    let querys = querystring.stringify(params);
    return http.requestGet(apiUrl+'/user/list/'+page+'/'+size+'?'+querys);
}
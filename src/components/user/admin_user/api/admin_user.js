import http from '../../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('../../../../../config/sysConfig')
let apiUrl = sysConfig.fzbfApiUrlPre;
//分页查询
export const page_list = (page, size, params) => {
  let querys = querystring.stringify(params)
  return http.requestQuickGet(apiUrl + '/user/list/' + page + '/' + size + '/?' + querys);
}
//根据id查询
export const get = (id) => {
  return http.requestQuickGet(apiUrl + '/user/get/' + id);
}
//更新
export const update = (id, params) => {
  return http.requestPut(apiUrl + '/user/update/' + id, params);
}
//添加
export const add = (params) => {
  return http.requestPost(apiUrl + '/user/add', params);
}
//根据id删除
export const deleteById = (id)=>{
return http.requestDelete(apiUrl+'/user/delete/'+id);
}
//根据id集合删除
export const deleteByIds = (ids)=>{
  return http.requestPost(apiUrl+'/user/deletes/',ids);
  }

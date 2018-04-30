/**
 * Created by wayne on 2018/4/30.
 */
import ajax from './ajax'

/*修改状态:不管修改什么状态 都是提交字段的id和要修改成的状态值*/
export default {
  setState(data){
    ajax.ajax(
      {
        url: data.url, //请求地址
        type: data.type,   //请求方式
        data: {id:data.id,state:data.state}, //请求参数
        dataType: "json",     // 返回值类型的设定
        async: true,   //是否异步
        success: function (response) {
          console.log(response);   //   此处执行请求成功后的代码
          data.target.state = response.state
        },
        fail: function (status) {
          console.log('状态码为' + status);   // 此处为执行成功后的代码
        }
      }
    )
  }
}



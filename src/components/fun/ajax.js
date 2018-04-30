/**
 * Created by wayne on 2018/4/21.
 */
export default {
  /*ajax*/
  ajax:function (options) {
    /**
     * 传入方式默认为对象
     * */
    options = options || {};
    /**
     * 默认为GET请求
     * */
    options.type = (options.type || "GET").toUpperCase();
    /**
     * 返回值类型默认为json
     * */
    options.dataType = options.dataType || 'json';
    /**
     * 默认为异步请求
     * */
    options.async = options.async && options.async == false ? false : true ;
    /**
     * 对需要传入的参数的处理
     * */
    var params = this.getParams(options.data);
    var xhr;
    /**
     * 创建一个 ajax请求
     * W3C标准和IE标准
     */
    if (window.XMLHttpRequest){
      /**
       * W3C标准
       * */
      xhr = new XMLHttpRequest();
    }else{
      /**
       * IE标准
       * @type {ActiveXObject}
       */
        xhr = new ActiveXObject('Microsoft.XMLHTTP')
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4){
        var status = xhr.status;
        if (status >= 200 && status < 300 ){
          options.success && options.success(JSON.parse(xhr.responseText),xhr.responseXML);
        }else{
          options.fail && options.fail(status);
        }
      }
    };
    if (options.type == 'GET'){
      xhr.open("GET",options.url + '?' + params ,options.async);
      xhr.send(null)
    }else if (options.type == 'POST'){
      /**
       *打开请求
       * */
      xhr.open('POST',options.url,options.async);
      /**
       * POST请求设置请求头
       * */
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      /**
       * 发送请求参数
       */
      xhr.send(this.getParams(options.data));
    }
  },
  /**
   * 对象参数的处理
   * @param data
   * @returns {string}
   */
  getParams:function (data) {
    var arr = [];
    for (var param in data){
      arr.push(encodeURIComponent(param) + '=' +encodeURIComponent(data[param]));
    }
    /*console.log(arr);*/
    arr.push(('randomNumber=' + Math.random()).replace('.',''));
    /*console.log(arr);*/
    return arr.join('&');
  },

  /*修改状态*/
  /*参数
   url:'',
   id:'',
   state:'',
   targetRow:''
   */
  setState(data){
    ajax.ajax(
      {
        url: data.url, //请求地址
        type: "POST",   //请求方式
        data: {id:data.id,state:data.state}, //请求参数
        dataType: "json",     // 返回值类型的设定
        async: true,   //是否异步
        success: function (response) {
          if(response.code == 200){
            data.target.state = data.state
          }

        },
        fail: function (status) {
          console.log('状态码为' + status);   // 此处为执行成功后的代码
        }
      }
    )
  }
}

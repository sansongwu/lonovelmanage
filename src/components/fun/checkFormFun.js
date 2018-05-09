/**
 * Created by wayne on 2018/4/21.
 */
export default {
  /*检测数字*/
  checkNumber:function (val) {
    var reg = "/^[0-9]*$/"
    return reg.test(val)
  }
}


/**
 * Created by wayne on 2018/4/30.
 */
// 引入mockjs
const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceNewsData = function() {
  let articles = [];
  for (let i = 0; i < 100; i++) {
    let newArticleObject = {
      title: Random.csentence(5, 30), //  Random.csentence( min, max )
      thumbnail_pic_s: Random.dataImage('300x250', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    articles.push(newArticleObject)
  }

  return {
    articles: articles
  }
}

const usermanage = function () {
  let data= {
    code:200,
    msg:"success",
    extend:{
      page:{
        total:12,
        list:[]
      }
    }
  }
  for(let i = 0;i<data.extend.page.total.length; i++){
    let obj = {}
    obj.email = Random.email('lonovel.com')
    obj.facebook = Random.email('facebook.com')
    obj.twitter = Random.email('twitter.com')
    obj.google = Random.email('google.com')
    obj.id = Random.id()
    debugger
    obj.money = Random.natural(0,1000)
    obj.nickname = Random.name()
    obj.registerTime = Random.date()
    obj.state = Random.natural(1,2)
    data.extend.page.list.push(obj)
  }
  return data

}


const novelClassify = function () {
  let data= {
    code:200,
    msg:"success",
    extend:{
      page:{
        total:12,
        list:[]
      }
    }
  }
  for(let i = 0;i<data.extend.page.total.length; i++){
    let obj = {

    }
  }
}
// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('/news/index', 'post', produceNewsData);
Mock.mock('/news/index/usermanage', 'post', usermanage);



/*
示例:
 var data= {
 code:200,
 msg:"success",
 extend:{
 page:{
 total:12,
 list:[]
 }
 }
 }
*/

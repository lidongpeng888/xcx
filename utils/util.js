const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const http=(url, callBack) =>{
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callBack(res.data);
    },
    fail: function (error) {
      console.log(error)
    }
  })
}
const convertToStarsArray=(stars)=>{
  var num = stars.toString().substring(0, 1);
  var array = [];
  for (var i = 1; i <= 5; i++) {
    if (i <= num) {
      array.push(1);
    }
    else {
      array.push(0);
    }
  }
  return array;
}
const convertToCastString=(casts)=>{
  let castsJson=''
  for(let idex in casts){
    castsJson+=casts[idex].name+'/'
  }
  return castsJson.substring(0,castsJson.length-2)
}
const convertToCastInfos=(casts)=>{
  const castsArray=[]
  for(let idex in casts){
    const obj={
      img:casts[idex].avatars?casts[idex].avatars.large:'',
      name:casts[idex].name
    }
    castsArray.push(obj)
  }
  return castsArray
}
module.exports = {
  formatTime: formatTime,
  http,
  convertToStarsArray,
  convertToCastString,
  convertToCastInfos
}

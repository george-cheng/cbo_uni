function checkPhone(phone){
	return RegExp(/^1[23456789]\d{9}$/).test(phone);
}

function checkPwd(pwd){
	return RegExp(/^[0-9A-Za-z.@-_!#$%^&*~+-/]{8,16}$/).test(pwd)
}

function checkNum(num){
	return RegExp(/^\d{6}$/).test(num)
}

//乘法
function accMul (arg1, arg2) {
  var m = 0, s1 = arg1 + "", s2 = arg2 + "";
  try { m += s1.split(".")[1].length } catch (e) { }
  try { m += s2.split(".")[1].length } catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

//加法
function accAdd(arg1, arg2) {
  var r1, r2, m;
  try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }

  try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }

  m = Math.pow(10, Math.max(r1, r2));
  return (accMul(arg1, m) + accMul(m, arg2)) / m
}


export{
	accMul, accAdd, checkPhone, checkPwd, checkNum
}
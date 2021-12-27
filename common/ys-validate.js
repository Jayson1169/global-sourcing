const numberReg = /^-?[1-9][0-9]?.?[0-9]*$/
const intReg = /^-?[1-9][0-9]*$/
const usernameReg = /^[\w-]{6,18}$/
const idNumberReg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/
const phoneReg = /^1[0-9]{10,10}$/
const emailReg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
const pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\W]{6,18}$/
const inviteCodeReg = /^[a-zA-Z0-9]{6,18}$/
const expressNumberReg = /^\w\d{7,17}$/

export default {
	isUsername: function(val) {
		return usernameReg.test(val)
	},
	isNumber: function(val) {
		return numberReg.test(val)
	},
	isInt: function(val) {
		return intReg.test(val)
	},
	isPhone: function(val) {
		return phoneReg.test(val)
	},
	isEmail: function(val) {
		return emailReg.test(val)
	},
	isPwd: function(val) {
		return pwdReg.test(val)
	},
	isInviteCode: function(val) {
		return inviteCodeReg.test(val)
	},
	isIdNumber: function(val) {
		return idNumberReg.test(val)
	},
	validate: function(data, rules) {
		let res = { isOk: true, errmsg: '' }
		if (!rules || !rules.length) {
			return res
		}
		for (let rule of rules) {
			// rule: {name:'', type:'', errmsg:'', min:1, max:2, eq:'', required:Boolean, regex:''}
			if (!rule || !rule.name || !rule.type) {
				continue
			}
			
			// 如果值不存在
			if (!data[rule.name]) {
				// 如果是必填项就返回错误提示，required可以作为type是为了不同的type能给用户不同的提示
				if (rule.type === 'required' || rule.required) {
					res = { isOk: false, errmsg: rule.errmsg }
					if (!res.errmsg) {
						res.errmsg = '请正确输入所有数据' //默认提示
					}
					return res
				}
				// 如果不是必填项就跳过
				continue
			}
			switch (rule.type) {
				// required 上面已经判断过了
				case 'equals':
				case 'eq':
					if (data[rule.name] !== data[rule.eqName]) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'username':
					if (!usernameReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'number':
					if (!numberReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'int':
					if (!intReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'phone':
					if (!phoneReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'email':
					if (!emailReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'pwd':
					if (!pwdReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'inviteCode':
					if (!inviteCodeReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'range': // 数字类型的值取值范围
					// {name: 'xxx', type: 'range', min: 6, max: 6, required: true, errmsg: 'xxx'}
					let val = data[rule.name]
					if (val) {
						if (numberReg.test(val)) {
							if (rule.min && val < rule.min) {
								res = { isOk: false, errmsg: rule.errmsg }
							} else if (rule.max && val > rule.max) {
								res = { isOk: false, errmsg: rule.errmsg }
							}
						} else {
							res = { isOk: false, errmsg: rule.errmsg }
						}
					}
				break
				case 'lengthRange': // 字符串长度取值范围
					// {name: 'xxx', type: 'lengthRange', min: 6, max: 6, errmsg: 'xxx'}
					let le = data[rule.name] ? data[rule.name].length : 0
					if (rule.min && le < rule.min) {
						res = { isOk: false, errmsg: rule.errmsg }
					} else if (rule.max && le > rule.max) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'regex': // 自定义正则表达式
					// {name: 'xxx', type: 'regex', regex: /^1[0-9]{10,10}$/, errmsg: 'xxx'}
					if (rule.regex && !rule.regex.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'idNumber':
					if (!idNumberReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
				case 'expressNumber':
					if (!expressNumberReg.test(data[rule.name])) {
						res = { isOk: false, errmsg: rule.errmsg }
					}
				break
			}
			// 发现任何一个错误就立即返回，后面的不再判断
			if (!res.isOk) {
				if (!res.errmsg) {
					res.errmsg = '请正确输入所有数据' //默认提示
				}
				return res
			}
		}
		return res
	}
}
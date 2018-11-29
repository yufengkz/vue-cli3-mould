import Cookies from 'js-cookie'

export const TOKEN_KEY = 'token'

/**
 * @param {String, num} token 时间
 * @description token存入cookie中
 */
export const setToken = (token, date) => {
	Cookies.set(TOKEN_KEY, token, {expires: date || 1})
}
export const getToken = () => {
	const token = Cookies.get(TOKEN_KEY)
	if (token) return token
	else return false
}

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export const getParams = url => {
	const keyValueArr = url.split('?')[1].split('&')
	let paramObj = {}
	keyValueArr.forEach(item => {
		const keyValue = item.split('=')
		paramObj[keyValue[0]] = keyValue[1]
	})
	return paramObj
}

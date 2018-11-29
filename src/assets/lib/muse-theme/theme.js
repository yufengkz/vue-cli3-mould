import Theme from 'muse-ui/lib/theme'

//如果有新加入的样式，需要添加到主题样式中， 则需要使用 addCreateTheme(func) 添加到themes集中控制
Theme.addCreateTheme((theme) => {
	return `.mu-hello-word {color: ${theme.text.primary}}`
})

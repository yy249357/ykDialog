/*
 * @Author: yankang
 * @Date:   2017-03-02 16:43:46
 * @Last Modified by:   yankang
 * @Last Modified time: 2017-03-27 14:07:12
 */
;(function(window, document) {
	'use strict';
	var Dialog = function(config) {
		var _this_ = this;
		/**
		 * [_createEl description]
		 * @DateTime 2017-03-10T15:02:55+0800
		 * @param    {String} el
		 * @param    {Object} attr
		 * @param    {Object} style
		 * @param    {String} text
		 * @return   {[type]}
		 */
		var _createEl = function(el, attr, style, text){
			var dom = document.createElement(el)
			if(attr){
				for(var i in attr){
					if(i == 'class'){dom.className = attr[i]}
					else if(i == 'id'){dom.id = attr[i]}
					else{
						dom.setAttribute(i, attr[i])
					}
				}
			}
			if(style){
				for(var i in style){
					dom.style[i] = style[i]
				}
			}
			if(text){
				dom.appendChild(document.createTextNode(text))
			}
			return dom
		}
		var _deepCopy = function(obj1, obj2){
			var obj2 = obj2 || {}
			for(var i in obj1){
				if(!obj1.hasOwnProperty(i)){
					continue
				}
				if(typeof obj1[1] === 'object'){
					obj2[i] = (obj[i].constructor === Array)? []: {}
					_deepCopty(obj[i], obj[i])
				}else{
					obj2[i] = obj1[i]
				}
			}
			return obj2
		}
		//默认参数配置
		this.config = {
			//按钮组
			buttons: null,
			//皮肤
			skin: 1,
			//图标类型  "ok", "loding",  "bubble",  "warning"
			icon: null,
			//多少秒关闭
			delay: null,
			//描述标题
			title: null,
			//描述文字
			content: null,
			//消息提示
			msg: null,
			//自定义content样式
			style: null,
			//表单属性
			inputAttr: null,
			//尺寸
			width: "auto",
			//对话框遮罩层透明度
			maskOpacity: null,
			//点击遮罩关闭弹窗
			maskClose: false,
			//动画
			animate: null,
			delayCallback: null,
		}
		if (config && typeof(config) === 'object') {
			this.config = _deepCopy(config, this.config)
		} else {
			this.isConfig = true
		};
		//创建Dom
		this.body = document.body
		//创建遮罩层
		if(this.config.skin == 2){
			this.mask = _createEl('div', {'class': 'yk2-dialog-container'})
		}else{
			this.mask = _createEl('div', {'class': 'yk1-dialog-container'})
		}
		this.win = _createEl('div', {'class': 'dialog-window'})
		this.winHeader = _createEl('div', {'class': 'dialog-header'})
		this.winContent = _createEl('div', {'class': 'dialog-content'}, {'style': this.config.style})
		this.winMsg = _createEl('div', {'class': 'dialog-msg'})
		this.input = _createEl('input', {'class': 'dialog-input'})
		this.winFooter = _createEl('div', {'class': 'dialog-footer'})
		this.create()
	};
	//默认参数扩展
	Dialog.zIndex = 10000;
	Dialog.prototype = {
		isParent: function(obj, parentObj) {
			while (obj != undefined && obj != null && obj.tagName.toUpperCase() != 'BODY') {
				if (obj == parentObj) {
					return true;
				}
				obj = obj.parentNode;
			}
			return false;
		},
		animate: function() {
			var _this_ = this;
			this.win.style["-webkit-transform"] = "scale(0,0)"
			setTimeout(function() {
				_this_.win.style["-webkit-transform"] = "scale(1,1)"
			}, 100);
		},
		create: function() {
			var _this_ = this,
				config = this.config,
				win = this.win,
				mask = this.mask,
				header = this.winHeader,
				content = this.winContent,
				msg = this.winMsg,
				input = this.input,
				footer = this.winFooter,
				body = this.body
			var bubbleElement = [
			    '<div class="dialog-icon-bubble">',
			        '<i></i>',
			        '<i class="middle"></i>',
			        '<i></i>',
			    '</div>'
			].join('')
			var loadingElement = [
				'<div class="dialog-icon-loading">',
					'<span></span>',
					'<span>loading</span>',
				'</div>'
			].join('')
			var okElement = [
				'<div class="dialog-icon-ok">',
					'<span></span>',
					'<span>OK</span>',
				'</div>'
			].join('')
			var warningElement = [
				'<div class="dialog-icon-warning">',
					'<span></span>',
					'<span>warning</span>',
				'</div>'
			].join('')

			Dialog.zIndex++;
			this.mask.style["z-index"] = Dialog.zIndex
			//如果没有传递参数，就弹出一个图标
			if (this.isConfig) {
				//弹框类型
				win.appendChild(header)
				mask.appendChild(win)
				body.appendChild(mask)
				this.animate();
			} else {
				//添加文本信息
				if(config.title){
					header.innerHTML = config.title
					win.appendChild(header)
				}
				if(config.icon){
					win.classList.add('dialog-icon-wrap')
					switch(config.icon){
						case 'bubble': win.innerHTML = bubbleElement; break
						case 'loading': win.innerHTML = loadingElement; break
						case 'ok': win.innerHTML = okElement; break
						case 'warning': win.innerHTML = warningElement; break
						default:
					}
				}
				if (config.content){
					content.innerHTML = config.content
					win.appendChild(content)
				}
				if (config.msg){
					msg.innerHTML = config.msg
					win.appendChild(msg)
				}
				//添加文本样式
				if (config.style){
					content.setAttribute('style', config.style)
				}
				//插入输入框
				if(config.inputAttr){
					for(var i in config.inputAttr){
						input.setAttribute(i, config.inputAttr[i])
					}
					win.appendChild(input)
				}
				//插入按钮
				if(config.buttons){
					_this_.createButtons(footer, config.buttons)
					win.appendChild(footer)
				}
				//宽度
				if(config.width != "auto"){
					win.style.width = config.width
				}
				//透明度
				if(config.maskOpacity !== null){
					mask.style["backgroundColor"] = "rgba(0,0,0," + config.maskOpacity + ")"
				}
				//设置弹出框弹出多久关闭
				if(config.delay && config.delay != 0) {
					setTimeout(function(e) {
						_this_.close()
						if (config.delayCallback){
							config.delayCallback();
						}
					}, parseFloat(config.delay) * 1000)
				}
				if(config.animate){
					_this_.animate()
				}
				if(config.maskClose){
					mask.addEventListener('click', function(e) {
						if(e.target == mask || !_this_.isParent(e.target, mask)){
							_this_.close()
						}
					}, false)
				}
				mask.appendChild(win)
				body.appendChild(mask)
			}
		},
		close: function() {
			this.body.removeChild(this.mask)
		},

		createButtons: function(footer, buttons) {
			var _this_ = this
			for(var i=0; i<buttons.length; ++i){
				var temp = buttons[i]
				var btnText = temp.text;
				var button = document.createElement('button')
				button.className = temp.color
				button.innerHTML = btnText
				if(temp.callback && typeof(temp.callback) === 'function'){
					button.addEventListener('click', (function(i, button){
						return function(){
							var inputVal = _this_.input.value
							var isClose
							if(inputVal){
								isClose = (buttons[i].callback)(inputVal)
							}else{
								isClose = (buttons[i].callback)()
							}
							if(isClose){
								_this_.close()
							}
						}
					}(i, button)), false)
				}
				footer.appendChild(button)
			}
		}
	}

	window.dialog = function(config) {
		if(typeof Dialog.instance == 'object'){
			return Dialog.instance
		}
		Dialog.instance = this;
		return new Dialog(config)
	}
})(window, document, undefined);
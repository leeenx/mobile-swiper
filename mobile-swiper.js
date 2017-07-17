var mobileSwiper = function(selector) { 
	var x0, y0, hasmoved = 0, lock = 0;  
	var touchstartHandle = function(e) {
		var touch = e.targetTouches[0], x = touch.pageX, y = touch.pageY; 
		x0 = x, y0 = y, hasmoved = 0, lock = 0;  
	}, 
	touchmoveHandle = function(e) {
		if(lock) return ;
		var touch = e.targetTouches[0], x = touch.pageX, y = touch.pageY, offsetX = x0 - x, offsetY = y0 - y; 
		// 阻止滚动
		hasmoved || (hasmoved = 1, Math.abs(offsetX) > Math.abs(offsetY) && e.preventDefault()); 
		if(offsetX <= -50) {
			// 向右
			console.log("向右"); 
			this.queue.unshift(this.queue.pop()); 
			lock = 1; 
			swap("right");
		} else if(offsetX >= 50) {
			// 向左
			console.log("向左");
			this.queue.push(this.queue.shift()); 
			lock = 1; 
			swap("left");
		} 
	}.bind(this), 
	swap = function(orientation) { 
		var queue = [].concat(this.queue), 
			total = this.virtual.length, // item 总数
			last = total - 1, // 最后一个索引
			collect = 0, // 提取数
			virtual = new Array(total), 
			odd = 1; 
		// 提取前三个元素与后三个元素
		while(collect<5 && queue.length>0) { 
			virtual[odd ? queue.shift() : queue.pop()] = css[collect == last && !odd && "right" == orientation ? ++collect : collect++]; // 做一个方向优化
			odd = !odd; // 取反
		} 
		// 对比一下数组 
		for(var i=0; i<total; ++i) { 
			virtual[i] != this.virtual[i] && (this.virtual[i] = virtual[i], this.item[i].style.cssText = this.virtual[i] || "visibility: hidden"); 
		}
	}.bind(this), 
	rem = function(px) {
		return px / 40 + "rem"; 
	}, 
	css = [
		"-webkit-transition: -webkit-transform .3s ease; z-index: 3; -webkit-transform: translate3d(0, 0, 10px) scale3d(1, 1, 1); visibility: visible;", 
		"-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + rem(-148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
		"-webkit-transition: -webkit-transform .3s ease; z-index: 2; -webkit-transform: translate3d(" + rem(148) + ", 0, 6px) scale3d(.8, .8, 1); visibility: visible;", 
		"-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + rem(-240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;", 
		"-webkit-transition: -webkit-transform .3s ease; z-index: 1; -webkit-transform: translate3d(" + rem(240) + ", 0, 2px) scale3d(.667, .667, 1); visibility: visible;"
	]; 

	this.init = function(list) {
		this.container = list; 
		this.container.style["-webkit-transform-style"] = "preserve-3d"; 
		this.item = list.querySelectorAll("li"); 
		for(var i=0; i<this.item.length; ++i) {this.item[i].style.visibility = "hidden"}
		this.queue = function(len) { // 索引列表，用于处理切换的序号队列 
			// 一个对应 item 的数组，记录 DOM 信息
			var arr = []; 
			for(var i=0; i<len; ++i) arr[i] = i; 
			return arr; 
		}(this.item.length); 
		this.virtual = new Array(this.item.length); // 与 item 做对应的虚拟DOM
		swap(); // 初始排版
		if(this.item.length <= 1) return ;
		this.container.addEventListener("touchstart", touchstartHandle); 
		this.container.addEventListener("touchmove", touchmoveHandle);  
	}

	this.destory = function() {
		this.container.removeEventListener("touchstart", touchstartHandle); 
		this.container.removeEventListener("touchmove", touchmoveHandle); 
	}

	// 默认 new 即初始化
	var list = document.querySelector(selector); 
	list ? this.init(list) : console.log(selector + " undefined"); 
}; 
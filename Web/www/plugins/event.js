// 事件
// 事件封装, 模仿 Node.js 中的 EventEmitter
export const EventEmitter = function(){
	//return {
		// 基于 EventTarget
		this.EventTarget = new EventTarget();

		// 触发事件
		this.emit = function(eventName){
			// 获取所有参数的数组: arguments
			this.EventTarget.dispatchEvent(new CustomEvent(eventName, {
				detail: Array.from(arguments).splice(1), // 删除第一个: 事件名称
			}));
		};

		// 监听器
		this.on = function(eventName, back){
			this.EventTarget.addEventListener(eventName, (e) => {back.apply(this, e.detail)});
		};

		// 移除监听器
		this.remove = function(eventName, func){
			this.EventTarget.removeEventListener(eventName, func);
		};
	//};
};


// 系统事件
export let windowEvent = new EventEmitter();


// URL 改变事件
window.addEventListener('hashchange', async () => {
	windowEvent.emit('hashchange');
});

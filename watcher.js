function Wacther(vm, exp, callback) {
    this.vm = vm;
    this.exp = exp;
    this.callback = callback;
    this.value = this.get();  // 将自己添加到订阅器的操作
}

Wacther.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.callback.call(this.vm, value);
        }
    },
    get: function () {
        // eslint-disable-next-line no-undef
        Dep.target = this; // 缓存自己
        var value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
        // eslint-disable-next-line no-undef
        Dep.target = null; // 释放自己
        return value;
    }
}
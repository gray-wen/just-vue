function JustVue(data, element, exp) {
    var that = this;
    this.data = data;
    
    Object.keys(data).forEach(function (key) {
        that.proxyKey(key);
    });

    // eslint-disable-next-line no-undef
    observe(data);

    element.innerHTML = this.data[exp];
    // eslint-disable-next-line no-undef
    new Wacther(this, exp, function (value) {
        element.innerHTML = value;
    });
    return this;
}
//
JustVue.prototype = {
    proxyKey: function (key) {
        var that = this;
        Object.defineProperty(this, key, {
            enumerable: true,
            configurable: true,
            get: function proxyGeter() {
                return that.data[key];
            },
            set: function proxySeter(newVal) {
                that.data[key] = newVal;
            }
        })
    }
}
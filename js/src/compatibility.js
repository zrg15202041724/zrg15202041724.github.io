/**
 * 封装innerText与textContext的兼容性代码
 */
/**
 * @method innerContext
 * @param {element} ele dom元素
 * @param {string} text 需要赋值的字符串
 * @returns {undefined} 没有返回值
 */
function innerContext(ele, text) {
    // ele.innerText 如果不兼容的情况下 返回undefined
    // 如果调用的时候没有传递text参数 则获取内容 传递了 则设置内容
    if (typeof ele.innerText == "undefined") {
        text ? (ele.innerText = text) : ele.innerText
    } else {
        text ? (ele.textContext = text) : ele.textContext
    }
}

/**
 * 封装获取第一个子元素的兼容性代码
 */
/**
 * @method getFirstElementChild
 * @param {element} ele
 * @returns {element} 返回目标元素
 */
function getFirstElementChild(ele) {
    if (ele.firstElementChild) {
        return ele.firstElementChild
    } else {
        var node = ele.firstChild
        while (node && node.nodeType != 1) {
            node = node.nextSibling
        }
        return node
    }
}


/**
 * 封装获取最后一个子元素的兼容性代码
 */
/**
 * @method getLastElementChild
 * @param {element} ele
 * @returns {element} 返回目标元素
 */
function getLastElementChild(ele) {
    if (ele.lastElementChild) {
        return ele.lastElementChild
    } else {
        var node = ele.lastChild
        while (node && node.nodeType != 1) {
            node = node.previousSibling
        }
        return node
    }
}

/**
 * 封装获取当前元素的上一个兄弟元素兼容性代码
 */
/**
 * @method getPreviousSibling
 * @param {element} element dom元素
 * @returns {element} 返回的目标元素
 */
function getPreviousSibling(element) {
    if (element) return
    if (element.previousElementSibling) {
        return element.previousElementSibling
    } else {
        var node = element.previousSibling
        while (node && node.nodeType != 1) {
            node = node.previousSibling
        }
        return node
    }
}

/**
 * 封装获取当前元素的下一个兄弟元素兼容性代码
 */
/**
 * @method getNextSibling
 * @param {element} element dom元素
 * @returns {element} 返回的目标元素
 */
function getNextSibling(element) {
    if (element) return
    if (element.nextElementSibling) {
        return element.nextElementSibling
    } else {
        var node = element.nextSibling
        while (node && node.nodeType != 1) {
            node = node.nextSibling
        }
        return node
    }
}

/**
 * 封装添加事件的兼容性代码
 */
/**
 * @method addEventListener
 * @param {element} ele dom元素
 * @param {string} type 事件类型
 * @param {function} fn 事件处理
 * @returns {undefined} 没有返回值
 */
function addEventListener(ele, type, fn) {
    if (ele.addEventListener) {
        ele.addEventListener(type, fn, false)
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + type, fn)
    } else {
        ele["on" + type] = fn
    }
}

/**
 * 封装解除绑定事件的兼容性代码
 */
/**
 * @method removeEventListener
 * @param {element} ele dom元素
 * @param {string} type 事件类型
 * @param {function} fn 事件处理函数
 * @returns {undefined} 没有返回值
 */
function removeEventListener(ele, type, fn) {
    if (ele.removeEventListener) {
        ele.removeEventListener(type, fn, false)
    } else if (ele.detachEvent) {
        ele.detachEvent("on" + type, fn)
    } else {
        ele["on" + type] = null
    }
}


/**
 * 返回当前浏览器是什么类型的浏览器
 */
/**
 * @method userBrowser
 * @returns {undefined} 没有返回值
 */
function userBrowser() {
    var browserName = navigator.userAgent.toLowerCase();
    if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
        console.log("IE");
    } else if (/firefox/i.test(browserName)) {
        console.log("Firefox");
    } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
        console.log("Chrome");
    } else if (/opera/i.test(browserName)) {
        console.log("Opera");
    } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
        console.log("Safari");
    } else {
        console.log("不知道什么鬼!");
    }
}

/**
 * 封装获取任意的元素的属性
 */
/**
 *
 * @method getStyle
 * @param {element} ele dom元素
 * @param {string} prop 想要获取的属性
 * @returns {string} 属性值
 */
function getStyle(ele, prop) {
    return window.getComputedStyle ? (prop ? window.getComputedStyle(ele, null)[prop] : window.getComputedStyle(ele)) : (prop ? ele.currentStyle[prop] : ele.currentStyle) || 0
}


/**
 * 封装animate函数
 */
/**
 * @method animate
 * @param {element} ele dom元素
 * @param {Object} json 对象
 * @param {function} fn 处理函数
 * @returns {undefined} 没有返回值
 */
function animate(ele, json, fn = function() {}) {
    clearInterval(ele.timer)
    ele.timer = setInterval(() => {
        var flag = true
        for (var item in json) {
            if (item == "opacity") {
                var current = getStyle(ele, item) * 100
                var target = json[item] * 100
                var speed = (target - current) / 100
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                current += speed
                ele.style[item] = current / 100
            } else if (item == "zIndex") {
                ele.style[item] = json[item]
            } else {
                var current = parseInt(getStyle(ele, item))
                var target = json[item]
                var speed = (target - current) / 10
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed)
                current += speed
                ele.style[item] = current + "px"
            }
            if (current != target) {
                flag = false
            }
        }
        if (flag) {
            clearInterval(ele.timer)
            fn()
        }
    }, 10);
}

/**
 * 封装查看滚动条滚动距离的兼容性代码
 */
/**
 * @method getScrollOffset
 * @returns {object} 返回一个对象
 */
function getScrollOffset() {
    return window.pageXOffset ? {
        left: window.pageXOffset,
        top: window.pageYOffset
    } : {
        left: document.body.scrollLeft + document.document.Element.scrollLeft,
        top: document.body.scrollTop + document.document.Element.scrollTop
    }
}

/**
 * 封装可视区域的窗口的兼容性代码
 */
/**
 * @method getViewportOffset
 * @returns {object} 返回一个对象
 */
function getViewportOffset() {
    return window.innerWidth ? {
        width: window.innerWidth,
        height: window.innerHeight
    } : (document.compactMode != "BackCompact" ? {
        width: document.body.clientWidth,
        height: document.body.clientHeight
    } : {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
    })
}
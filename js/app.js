function xhrFunc() {
    var baseUrl = 'https://rickandmortyapi.com/api/'
    var req = new XMLHttpRequest()

    function get(url, cb) {
        // url for get request
        var url = url || ""
        req.open('GET', baseUrl + url)
        req.send()
        req.onload = function () {
            cb(this.status, JSON.parse(this.response))
        }
    }
    return { get }
}

function createPagination(currPage, totalPage) {
    var container = document.createElement('div')

    for (var i = 1; i <= totalPage; i++) {
        var a = document.createElement('a')
        a.innerText = i
        a.href = '?page=' + i
        if (i == currPage) {
            a.className = 'currPage'
        }
        container.appendChild(a)
    }
    return container
}

function debouncerFunc(callback) {
    var debouncer;
    return function () {
        debouncer && clearTimeout(debouncer)
        debouncer = setTimeout(callback, 500)
    }
}

var xhr = xhrFunc()
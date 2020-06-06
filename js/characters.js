window.onload = function () {
    // get data and render dom
    getData(renderDOM)

    // Event listenere on search
    var searchInput = this.document.getElementById('searchInput')
    searchInput.addEventListener('input', search)
}
var urlSearchParams = new URLSearchParams(location.search)

function getData(callback) {
    var currPage = Number(urlSearchParams.get('page')) || 1
    var personStatus = urlSearchParams.get('status') || ""
    var query = document.getElementById('searchInput').value
    query && (currPage = 1)
    var params = new this.URLSearchParams(
        {
            'page': currPage,
            'name': query,
            'status': personStatus
        }
    )
    this.xhr.get('character?' + params.toString(), callback)
}

function renderDOM(status, response) {
    if (status != 200) {
        error()
    }

    // create elem
    var res = document.getElementById('res')
    res.innerHTML = ""
    var cards = document.createElement('div')
    cards.className = 'cards'
    response.results.forEach(function (person) {
        var card = createCard(person)
        cards.appendChild(card)
    })
    res.appendChild(cards)

    // create Status filter bar at left
    var filter = document.querySelector('.filter')
    filter.innerHTML = ""

    var personStatus = urlSearchParams.get('status') || ""
    var statusFilter = createStatusBar(personStatus)

    filter.appendChild(statusFilter)

    var pagination = document.getElementById('pagination')
    pagination.innerHTML = ""
    pagination.appendChild(getPagination(response.info.count))
}

function createCard(person) {
    var card = document.createElement('a')
    card.className = 'card'
    card.href = 'character.html?id=' + person.id

    var imgCont = document.createElement('div')
    var image = document.createElement('img')
    image.src = person.image
    imgCont.appendChild(image)

    var div = document.createElement('div')
    var name = document.createElement('p')
    name.innerText = person.name

    var status = document.createElement('p')
    // status.innerText = person.status
    status.innerHTML = '&#8226' + ' ' + person.status
    status.className = person.status

    var location = document.createElement('p')
    location.innerText = person.location.name

    div.append(name, status, location)
    card.append(imgCont, div)
    return card
}

function getPagination(count) {
    var currPage = Number(urlSearchParams.get('page')) || 1
    var totalPage = Math.ceil(count / 20)
    var pagination = createPagination(currPage, totalPage, urlSearchParams)
    return pagination
}

var search = debouncerFunc(function () {
    getData(renderDOM)
})

function createStatusBar(status) {
    var ul = document.createElement('ul')
    var h3 = document.createElement('h3')
    h3.innerText = 'Status'
    ul.appendChild(h3)

    var statusArr = ['', 'Alive', 'Dead', 'unknown']
    for (var i = 0; i < 4; i++) {
        var a = document.createElement('a')
        var tmp = new URLSearchParams(location.search)
        tmp.set('status', statusArr[i])
        a.href = '?' + tmp.toString()
        var li = document.createElement('li')
        li.innerText = statusArr[i] || "All"
        if (statusArr[i] == status) {
            li.id = 'active2'
        }
        a.appendChild(li)
        ul.appendChild(a)
    }
    return ul
}

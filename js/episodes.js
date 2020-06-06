window.onload = function () {
    // get data and render dom
    getData(renderDOM)

    // Event listenere on search
    var searchInput = this.document.getElementById('searchInput')
    searchInput.addEventListener('input', search)
}


function getData(callback) {
    var tmp = new URLSearchParams(location.search)
    var season = Number(tmp.get('season'))
    var currPage = Number(tmp.get('page')) || 1
    var query = document.getElementById('searchInput').value
    var params = new this.URLSearchParams(
        {
            'page': currPage,
            'name': query
        }
    )

    if (!query && season) {
        if (season <= 2) {
            this.xhr.get('episode', callback)
            return
        }
        this.xhr.get('episode?page=2', callback)
    } else {
        this.xhr.get('episode?' + params.toString(), callback)
    }
}

function renderDOM(status, response) {
    if (status != 200) {
        error()
    }
    // Asked season number
    var season = Number(new URLSearchParams(location.search).get('season')) || ""
    var query = document.getElementById('searchInput').value

    query && (season = "")

    // create elem
    var res = document.getElementById('res')
    res.innerHTML = ""
    var cards = document.createElement('div')
    cards.className = 'cards'


    response.results.filter(function (episode) {
        return episode.episode.includes('S0' + season)
    }).forEach(function (episode) {
        var card = createCard(episode)
        cards.appendChild(card)
    })

    if (!season) {
        var pagination = document.getElementById('pagination')
        pagination.innerHTML = ""
        pagination.appendChild(getPagination(response.info.count))
    }

    res.appendChild(cards)

    // Season side bar
    var season = createSeasonBar(season)
    var filter = document.querySelector('.filter')
    filter.innerHTML = ""
    filter.appendChild(season)
}

function createCard(episode) {
    // Create Card
    var card = document.createElement('a')
    card.className = 'card'

    // create container for name, text, etc
    var div = document.createElement('div')

    // create Name
    var name = document.createElement('p')
    name.innerText = episode.name

    // create Episode text
    var episodeText = document.createElement('p')
    episodeText.innerHTML = episode.episode
    episodeText.className = 'Alive'

    // create Air Date
    var airDate = document.createElement('p')
    airDate.innerText = episode.air_date

    // Append all and return
    div.append(name, episodeText, airDate)
    card.appendChild(div)
    return card
}

var search = debouncerFunc(function () {
    getData(renderDOM)
})

function createSeasonBar(season) {
    var ul = document.createElement('ul')
    var h3 = document.createElement('h3')
    h3.innerText = 'Season'
    ul.appendChild(h3)
    for (var i = 1; i <= 4; i++) {
        var a = document.createElement('a')
        a.href = '?season=' + i
        var li = document.createElement('li')
        li.innerText = 'Season ' + i
        if (i == season) {
            li.id = 'active2'
        }
        a.appendChild(li)
        ul.appendChild(a)
    }
    return ul
}

function getPagination(count) {
    var currPage = Number(new URLSearchParams(location.search).get('page')) || 1
    var totalPage = Math.ceil(count / 20)
    var pagination = createPagination(currPage, totalPage)
    return pagination
}
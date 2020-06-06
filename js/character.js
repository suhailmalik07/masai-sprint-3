window.onload = function () {
    this.getData(this.renderDOM)
}

function getData() {
    var id = Number(new URLSearchParams(location.search).get('id'))
    if (!id) {
        renderError()
        return
    }
    var url = 'character/' + id
    xhr.get(url, renderDOM) // it will fetch data and run render dom with that data
}

function renderDOM(status, response) {
    if (status != 200) {
        renderError()
        return
    }
    var res = document.getElementById('res')
    var profile = createProfile(response)
    res.appendChild(profile)
}

function createProfile(response) {
    var div = document.createElement('div')
    div.className = 'profile flex'

    var image = document.createElement('div')
    var img = document.createElement('img')
    img.src = response.image
    image.appendChild(img)

    var content = document.createElement('div')

    var name = document.createElement('h2')
    name.innerText = response.name

    var status = document.createElement('p')
    status.innerHTML = '&#8226' + ' ' + response.status
    status.className = response.status

    var location = document.createElement('p')
    location.innerText = "Location: "
    var locationlink = document.createElement('a')
    locationlink.innerText = response.location.name
    var locationURL = response.location.url.split('/location/')
    // console.log(locationURL[locationURL.length-1])
    locationlink.href = 'location.html?id=' + (locationURL[locationURL.length - 1])
    // console.log(locationlink)
    location.appendChild(locationlink)

    var species = document.createElement('p')
    species.innerText = 'Species: '+ response.species

    var gender = document.createElement('p')
    gender.innerText =  'Gender: ' + response.gender

    var origin = document.createElement('p')
    origin.innerText = "Origin: "
    var originlink = document.createElement('a')
    originlink.innerText = response.origin.name
    var originURL = response.origin.url.split('/location/')
    originlink.href = 'location.html?id=' + originURL[originURL.length - 1]
    origin.appendChild(originlink)

    content.append(name, status, species, gender, location, origin)
    div.append(image, content)
    return div
}


function renderError() {

}
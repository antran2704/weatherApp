var search = document.querySelector('.search')
var city = document.querySelector('.city')
var capital = document.querySelector('.capital')
var time = document.querySelector('.time')
var value = document.querySelector('.value')
var shortDesc = document.querySelector('.short-desc')
var visible = document.querySelector('.visible span')
var wind = document.querySelector('.wind span')
var sun = document.querySelector('.sun span')
var body = document.querySelector('body')

function start() {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=ha noi&appid=d78fd1588e1b7c0c2813576ba183a667`
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        changeWeather(data)
    })
}

start()


function getData(callback) {
    var capitalSearch = search.value.trim()
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${capitalSearch}&appid=d78fd1588e1b7c0c2813576ba183a667`
    fetch(apiUrl)
    .then(function(response) {
        return response.json()
    })
    .then(callback)

}

function changeWeather(data) {
    city.innerText = data.name
    capital.innerText = data.sys.country
    // time.innerText = new Date().toLocaleString('Vi')
    shortDesc.innerText = data.weather[0].description
    var temp = Math.round((data.main.temp - 273.15))
    value.innerText = temp
    visible.innerText = data.visibility + 'm'
    wind.innerText = data.wind.speed + 'm/s'
    sun.innerText = data.main.humidity + '%'
    console.log(temp)
    if(temp < 24) {
        body.setAttribute('class', 'cold')
    }
    if( temp >= 24 && temp < 30)  {
        body.setAttribute('class', 'cool')
    }
    if(temp >= 30)  {
        body.setAttribute('class', 'hot')
    }
}

setInterval(function(){
    time.innerText = new Date().toLocaleString('Vi')
},1000)

search.onkeydown = function(e) {
    if(e.keyCode === 13) {
        getData(changeWeather)
    }
}

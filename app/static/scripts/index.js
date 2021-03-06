// Подсказки для ввода адреса
var options = {id: "js-AddressField"};
//Запускаем модуль подсказок для первого поля
AhunterSuggest.Address.Solid( options );

var options = {id: "js-AddressField2"};
//Запускаем модуль подсказок для второго поля
AhunterSuggest.Address.Solid( options );

// Генерация карты
var map = new L.Map('mapid', {zoom: 9, center: new L.latLng([55.7504461, 37.6174943]) });
map.addLayer(new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'));	//base layer

// Добавление значка "лупы"
map.addControl( new L.Control.Search({
    url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    marker: L.circleMarker([0,0],{radius:30}),
    autoCollapse: true,
    autoType: false,
    minLength: 2
}) );

// 

// Берём объекты по классу для дальнейшей обработки
var burger = document.getElementsByClassName("burger")[0]
var burgerClasses = burger.classList

var close = document.getElementsByClassName("close")[0]
var closeClasses = close.classList

var menu = document.getElementsByClassName("menu")[0]
var menuClasses = menu.classList

var bottom = document.getElementsByClassName("bottom")[0]
var bottomClasses = bottom.classList

var from = document.getElementsByClassName("from")[0]
var fromClasses = from.classList

var to = document.getElementsByClassName("to")[0]
var toClasses = to.classList

var choice_drive = document.getElementsByClassName("choice_drive")[0]
var choiceClasses = choice_drive.classList

var blur = document.getElementsByClassName("blur")[0]
var blurClasses = blur.classList

var blur2 = document.getElementsByClassName("blur")[1]
var blur2Classes = blur2.classList

// 

// Функция для изменения видимости меню
function changeVisibilityMenu() {
    
    if (menuClasses.contains("hidden")) {
        menuClasses.remove("hidden");
        burgerClasses.add("hidden");
        closeClasses.remove("hidden");

    } else {
        menuClasses.add("hRoutePathidden");
        burgerClasses.remove("hidden");
        closeClasses.add("hidden");
    }
}

// Функция для установки адресов через координаты
function setPoints() {

    setTimeout(function () {
        bottomClasses.remove("hidden");
        fromClasses.remove("hidden");
        toClasses.remove("hidden");
        choiceClasses.add("hidden")
        menuClasses.add("hidden");
        burgerClasses.remove("hidden");
        closeClasses.add("hidden");
        document.getElementsByClassName("from_input")[0].value = "" 
        document.getElementsByClassName("to_input")[0].value = "" 

        map.on('click', function(e) {        
            var popLocation= e.latlng;
            if (document.getElementsByClassName("from_input")[0].value === "") {
                document.getElementsByClassName("from_input")[0].value = popLocation["lat"] + ", " + popLocation["lng"] 
            } else {
                document.getElementsByClassName("to_input")[0].value = popLocation["lat"] + ", " + popLocation["lng"] 
            }
        });    
    }, 1000);
}

// Функция для установки адресов через адреса зданий
function makePoints() {
    document.getElementsByClassName("from_input")[0].value = "" 
    document.getElementsByClassName("to_input")[0].value = "" 

    map.dragging.disable();
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    if (map.tap) map.tap.disable();
        document.getElementById('mapid').style.cursor='default';

    choiceClasses.add("hidden")
    bottomClasses.remove("hidden");
    fromClasses.remove("hidden");
    toClasses.remove("hidden");
    menuClasses.add("hidden");
    burgerClasses.remove("hidden");
    closeClasses.add("hidden");
}

// Переменная, накапливающая расстояния для каждого маршрута
// общее расстояние и расстояние до начала зелёной тропы  
var distance = {};
var speedOnFoot = 100
var speedBicycle = 300
var speedScooter = 200

// Функция для открытия модального окна (окна для обратной связи)
function openFeedback() {
    menuClasses.add("hidden");
    burgerClasses.remove("hidden");
    closeClasses.add("hidden");    
    bottomClasses.add("hidden");
    blur2Classes.remove("hidden")
}

// Функция для отправки обратной связи
function sendFeedback() {
    blur2Classes.add("hidden")
    var url = "/api/push_data";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        console.log(xhr.responseText);
    }};

    var data = `{
    "Тема": ${document.getElementById("title").value},
    "Описание": ${document.getElementById("description").value}
    }`;

    xhr.send(data);
}

let control;
function RoutePath(point1, point2)
{
    control = L.Routing.control({
        waypoints: [
            point1,
            point2
        ]
      }).addTo(map);
    control.on("routeselected", function(e) {
        L.polyline(e.route.coordinates, { color: 'green'}).addTo(map);
        map.removeControl(control);
    });
}

function fromNameToCoord(id) {
    var url = "/api/get_cords";

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, false);
    
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    
    // xhr.onreadystatechange = function () {
    //    if (xhr.readyState === 4) {
    //       console.log(xhr.status);
    //       console.log(xhr.responseText);
    //       return xhr.responseText
    //     }};
    
    var data = `${document.getElementById(id).value}`;
    
    xhr.send(data);

    if(xhr.status == 200) {
        return JSON.parse(xhr.responseText);
    } 
}

// Функция для подгрузки данных о маршрутах
function loadWay() {
    map.dragging.enable();
    map.touchZoom.enable();
    map.doubleClickZoom.enable();
    map.scrollWheelZoom.enable();
    map.boxZoom.enable();
    map.keyboard.enable();


    bottomClasses.add("hidden");
    fromClasses.add("hidden");
    toClasses.add("hidden");
    blurClasses.remove("hidden");

    if (document.getElementById("js-AddressField").value[0] === "г") {
        var valArr1 = document.getElementById("js-AddressField").value;
        var valArr2 = document.getElementById("js-AddressField2").value;
        var point1 = fromNameToCoord("js-AddressField");
        var point2 = fromNameToCoord("js-AddressField2");
        RoutePath(point1, point2)
    } else {
        var valArr1 = document.getElementById("js-AddressField").value.split(", ");
        var valArr2 = document.getElementById("js-AddressField2").value.split(", ");
        var point1 = {"lat" : Number(valArr1[0]), "lng": Number(valArr1[1])};
        var point2 = {"lat" : Number(valArr2[0]), "lng": Number(valArr2[1])};
        RoutePath(point1, point2)
    }

    setTimeout(function () {
        blurClasses.add("hidden");
        distance = {"12100": "400", "12200": "410", "12300": "300", "12400": "250", "12500": "500", "12600": "3000"};
        var text = `
            <div class="choice__header">
                <img onclick="choiceOnFoot()" src="./static/people.svg" alt="">
                <div></div>
                <img onclick="choiceBicycle()" src="./static/velo.svg" alt="">
                <div></div>
                <img onclick="choiceScooter()" src="./static/scate.svg" alt="">
            </div>
            <div class="foot hidden">`
        var keys = Object.keys(distance)
        var values = Object.values(distance)
        for (var i = 0; i < keys.length; i++)
            text += `
                <div class="choice_prop foots foot_${i} hidden">
                    <div><span>Время в пути</span><span>${Number((keys[i] / speedOnFoot).toFixed(0))} мин</span></div> 
                    <div><span>Расстояние</span><span>${keys[i]} м</span></div> 
                    <div><span>Время до зелёного маршрута</span><span>${Number((values[i] / speedOnFoot).toFixed(0))} мин</span></div> 
                </div>`
        text += `</div>
                 <div class="bicycle hidden">`
        for (var i = 0; i < keys.length; i++)
            text +=
                `<div class="choice_prop bicycles bicycle_${i} hidden">
                    <div><span>Время в пути</span><span>${Number((keys[i] / speedBicycle).toFixed(0))} мин</span></div> 
                    <div><span>Расстояние</span><span>${keys[i]} м</span></div> 
                    <div><span>Время до зелёного маршрута</span><span>${Number((values[i] / speedBicycle).toFixed(0))} мин</span></div> 
                </div>`
        text += `</div>
                 <div class="scooter hidden">`
        for (var i = 0; i < keys.length; i++)
            text +=
                `<div class="choice_prop scooters scooter_${i} hidden">
                    <div><span>Время в пути</span><span>${Number((keys[i] / speedScooter).toFixed(0))} мин</span></div> 
                    <div><span>Расстояние</span><span>${keys[i]} м</span></div> 
                    <div><span>Время до зелёного маршрута</span><span>${Number((values[i] / speedScooter).toFixed(0))} мин</span></div> 
                </div>`
        text += `</div>
                 <div class="way hidden">`
        for (var i = 0; i < keys.length; i++)
            text +=
            `<div class="ways way_${i}" onclick="choiceWay(${i})">
                ${i + 1}
            </div>`;
        text += `</div>`;

        choice_drive.innerHTML = text;
        bottomClasses.remove("hidden");
        choiceClasses.remove("hidden");
    }, 2000);
}

// Если пользователь выбрал передвижение пешком
function choiceOnFoot() {
    var foot = document.getElementsByClassName("foot")[0]
    var footClasses = foot.classList;
    
    var bicycle = document.getElementsByClassName("bicycle")[0]
    var bicycleClasses = bicycle.classList;
    
    var scooter = document.getElementsByClassName("scooter")[0]
    var scooterClasses = scooter.classList;

    var way = document.getElementsByClassName("way")[0]
    var wayClasses = way.classList;

    
    wayClasses.remove("hidden")
    footClasses.remove("hidden")
    bicycleClasses.add("hidden")
    scooterClasses.add("hidden")
}

// Если пользователь выбрал передвижение на велосипеде
function choiceBicycle() {
    var foot = document.getElementsByClassName("foot")[0]
    var footClasses = foot.classList;
    
    var bicycle = document.getElementsByClassName("bicycle")[0]
    var bicycleClasses = bicycle.classList;
    
    var scooter = document.getElementsByClassName("scooter")[0]
    var scooterClasses = scooter.classList;

    var way = document.getElementsByClassName("way")[0]
    var wayClasses = way.classList;

    wayClasses.remove("hidden")
    footClasses.add("hidden")
    bicycleClasses.remove("hidden")
    scooterClasses.add("hidden")
}

// Если пользователь выбрал передвижение на самокате
function choiceScooter() {
    var foot = document.getElementsByClassName("foot")[0]
    var footClasses = foot.classList;
    
    var bicycle = document.getElementsByClassName("bicycle")[0]
    var bicycleClasses = bicycle.classList;
    
    var scooter = document.getElementsByClassName("scooter")[0]
    var scooterClasses = scooter.classList;

    var way = document.getElementsByClassName("way")[0]
    var wayClasses = way.classList;

    wayClasses.remove("hidden")
    footClasses.add("hidden")
    bicycleClasses.add("hidden")
    scooterClasses.remove("hidden")
}

// Массив, хранящий все виды передвижения
var drivers = ["foot", "bicycle", "scooter"]

// Функция для выбора маршрута
function choiceWay(choice) {
    var keys = Object.keys(distance)

    for (var i = 0; i < keys.length; i++) {
        for (var j = 0;  j < 3; j++) {
            if (i == choice) document.getElementsByClassName(`${drivers[j]}_${i}`)[0].classList.remove("hidden")
            else document.getElementsByClassName(`${drivers[j]}_${i}`)[0].classList.add("hidden")
        }
    }
}

"use strict";


var app = angular.module('ionic-calendar', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'MyController'
    })

    .state('app.demo1', {
        url: "/demo1",
        views: {
            'menuContent': {
                templateUrl: "templates/demo1.html"
            }
        }
    })

    .state('app.browse', {
        url: "/browse",
        views: {
            'menuContent': {
                templateUrl: "templates/browse.html"
            }
        }
    })
        .state('app.demo2', {
            url: "/demo2",
            views: {
                'menuContent': {
                    templateUrl: "templates/demo2.html",
                }
            }
        })
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/demo1');
});

app.controller("MyController", function ($scope, $http) {
    $http.get('js/events.txt').
    success(function (data, status, headers, config) {



    }).
    error(function (data, status, headers, config) {
        // log error
    });
});

app.controller('CalendarController', function ($scope, $ionicPopup, $timeout) {

    // Triggered on a button click, or some other target
    $scope.showPopup = function ($event, day) {
        $scope.data = {}

        if (day.events.length > 0) {
            //show popup only if events on day cell

            var $element = $event.currentTarget;

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                templateUrl: '/templates/calendar/calendar-event-popup-template.html',
                title: '' + day.date,
                subTitle: '',
                scope: $scope,
                buttons: [{
                    text: '<b>Close</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        return 'cancel button'
                    }
                }, ]
            });
            myPopup.then(function (res) {
            
            });
        }

    };
});

var language = {
    
    d0: 'Sun',
    d1: 'Mon',
    d2: 'Tue',
    d3: 'Wed',
    d4: 'Thu',
    d5: 'Fri',
    d6: 'Sat',

    thisMonth: "Today",
    prevMonth: "<< Prev",
    nextMonth: "Next >>",

};

/**
 * Language settings
 *
 * @param lang
 * @returns {{month_labels: Array, dow_labels: Array}}
 */
var calendar_language = function (lang) {
    if (typeof (lang) == 'undefined' || lang === false) {
        lang = 'en';
    }

    switch (lang.toLowerCase()) {
    case 'de':
        return {
            month_labels: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
            dow_labels: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"]
        };
        break;

    case 'en':
        return {
            month_labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            dow_labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        };
        break;

    case 'ar':
        return {
            month_labels: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
            dow_labels: ["أثنين", "ثلاثاء", "اربعاء", "خميس", "جمعه", "سبت", "أحد"]
        };
        break;

    case 'es':
        return {
            month_labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            dow_labels: ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"]
        };
        break;

    case 'fr':
        return {
            month_labels: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
            dow_labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"]
        };
        break;

    case 'it':
        return {
            month_labels: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
            dow_labels: ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"]
        };
        break;

    case 'nl':
        return {
            month_labels: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
            dow_labels: ["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"]
        };
        break;

    case 'pt':
        return {
            month_labels: ["Janeiro", "Fevereiro", "Marco", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
            dow_labels: ["S", "T", "Q", "Q", "S", "S", "D"]
        };
        break;

    case 'ru':
        return {
            month_labels: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
            dow_labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вск"]
        };
        break;

    case 'se':
        return {
            month_labels: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
            dow_labels: ["Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"]
        };
        break;

    case 'bg':
        return {
            month_labels: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
            dow_labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нед"]
        };
        break;

    case 'tr':
        return {
            month_labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
            dow_labels: ["Pts", "Salı", "Çar", "Per", "Cuma", "Cts", "Paz"]
        };
        break;
    }

};

var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];




// get month name
Date.prototype.getMonthName = function () {
    var currentDate = new Date();
    var month = monthNames[this.getMonth()];
    return month < 10 ? '0' + month : month;

}

Date.prototype.getMonthFormatted = function () {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}


app.directive('ngHtml', function () {
    return function (scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function (value) {
            element[0].innerHTML = value;
        });
    }
});


var calendarLinkFunction = function (scope, element) {
    var contentObj = scope.content;
    var targetMonth = parseInt(scope.assignedMonth, 10),
        targetYear = parseInt(scope.assignedyear, 10);

    if (!isNaN(targetMonth) &&
        !isNaN(targetYear) &&
        targetMonth > 0 &&
        targetMonth < 12
    ) {
        scope.currentDate = new Date(targetYear, targetMonth, 0);
    } else {
        scope.currentDate = new Date();
    }

    scope.today = new Date();
    scope.language = language;
    scope.navigate = {};

    // month between 1 and 12
    var daysInMonth = function (month, year) {
        return new Date(year, month, 0).getDate();
    }

    scope.navigate.prevMotnth = function () {
        scope.currentDate.setMonth(scope.currentDate.getMonth() - 1);
        refreshCalendar();
    }
    scope.navigate.nextMotnth = function () {
        scope.currentDate.setMonth(scope.currentDate.getMonth() + 1);
        refreshCalendar();
    }
    scope.navigate.thisMotnth = function () {
        scope.currentDate = new Date();
        refreshCalendar();
    }

    // month between 1 ~ 12
    var getDateContent = function (year, month, date) {
        if (contentObj != null && contentObj[year] != null &&
            contentObj[year][month] != null &&
            contentObj[year][month][date] != null) {
            return contentObj[year][month][date].join("<br/>");
        }
        return "";
    }

    // month between 1 ~ 12
    var monthGenegrator = function (month, year, events) {
        var monthArray = [];
        var firstDay = new Date(year, month - 1, 1, 0, 0, 0, 0);
        //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
        var firstDayInFirstweek = (firstDay.getDay() > 0) ? firstDay.getDay() : 7;
        var daysOfMonth = daysInMonth(month, year);
        var prevDaysOfMonth = daysInMonth(month - 1, year);

        var recordDate = 0; //record which day obj already genegrate

        //first week row
        monthArray.push(weekGenegrator(year, month, recordDate - firstDayInFirstweek, daysOfMonth, prevDaysOfMonth, events));

        recordDate = 7 - firstDayInFirstweek;
        //loop for following week row           
        while (recordDate < daysOfMonth - 1) {
            monthArray.push(weekGenegrator(year, month, recordDate, daysOfMonth));
            recordDate += 7;
        }

        //set isToday
        if (scope.currentDate.getMonth() == scope.today.getMonth() &&
            scope.currentDate.getFullYear() == scope.today.getFullYear()) {
            var atWeek = Math.ceil((scope.today.getDate() + firstDayInFirstweek - 1) / 7) - 1;
            var atDay = (scope.today.getDate() + firstDayInFirstweek - 2) % 7;
            monthArray[atWeek][atDay].isToday = true;
        }

        return monthArray;
    }

    //month between 1~12
    var weekGenegrator = function (year, month, startDate, daysOfMonth, prevDaysOfMonth, events) {
        var week = [];

        for (var i = 1; i <= 7; i++) {
            var
                realDate,
                outmonth = false,
                content = "";
            var events = [{
                    "id": "01",
                    "title": "New Year in Mexico",
                    "eventType": "special-event",
                    "description": "Celebrate with us!",
                    "start": "2014-12-2",
                    "end": "2014-12-04"
                }, {
                    "id": "02",
                    "title": "New Year in Bulgaria",
                    "url": "http://www.example.com/",
                    "description": "Best offers!",
                    "start": "2014-12-2",
                    "end": "2014-12-04"
                }, {
                    "id": "03",
                    "title": "Title 3",
                    "url": "http://www.example.com/",
                    "description": "This is event description",
                    "start": "2014-12-5",
                    "end": "2014-12-04"
                }, {
                    "id": "04",
                    "title": "Title 4",
                    "url": "http://www.example.com/",
                    "description": "This is event description",
                    "start": "2014-12-25",
                    "end": "2014-12-04"
                }


            ];



            if (startDate + i < 0) {
                realDate = prevDaysOfMonth + startDate + i + 1;
                outmonth = true;
            } else if (startDate + i + 1 > daysOfMonth) {
                realDate = startDate + i - daysOfMonth + 1;
                outmonth = true;
            } else {
                realDate = startDate + i + 1;
                content = getDateContent(year, month, realDate);
            }

            var fullDate = year + "-" + month + "-" + realDate;
            var dayEvents = [];

            for (var m = 0; m < events.length; m++) {
                if (events[m].start === fullDate && !outmonth) {
                    dayEvents.push(events[m].start + " | " + events[m].title, events[m].description);
                }
            }

            week.push({
                "outmonth": outmonth,
                "day": i,
                "content": content,
                "date": realDate,
                "fullDate": fullDate,
                "events": dayEvents

            });

        }
        return week;
    }

    var refreshCalendar = function (events) {
        scope.month = monthGenegrator(scope.currentDate.getMonth() + 1, scope.currentDate.getFullYear(), events);
    }

    refreshCalendar(scope.events);
}


app.directive("calendar", function () {
    return {
        restrict: "EA",
        scope: {
            content: '=calendarContent',
            assignedMonth: '=calendarMonth',
            assignedyear: '=calendarYear'
        },
        replace: true,
        link: calendarLinkFunction,
        templateUrl: 'calendar-template.html'
    }
});
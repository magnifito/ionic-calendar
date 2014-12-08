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

    .state('app.single', {
        url: "/playlists/:playlistId",
        views: {
            'menuContent': {
                templateUrl: "templates/playlist.html",
                controller: 'PlaylistCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/demo1');
});

app.controller("MyController", function ($scope, $http) {
    $http.get('js/events.txt').
    success(function (data, status, headers, config) {
        $scope.events = data;


    }).
    error(function (data, status, headers, config) {
        // log error
    });
});

app.controller('MyController', function ($scope, $ionicPopup, $timeout) {

    // Triggered on a button click, or some other target
    $scope.showPopup = function () {
        $scope.data = {}

        // An elaborate, custom popup
        var myPopup = $ionicPopup.show({
            template: '<input type="password" ng-model="data.wifi">',
            title: 'Enter Wi-Fi Password',
            subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.data.wifi) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            return $scope.data.wifi;
                        }
                    }
      },
    ]
        });
        myPopup.then(function (res) {
            console.log('Tapped!', res);
        });
        $timeout(function () {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 3000);
    };
});

var language = {

    ms0: 'January',
    ms1: 'February',
    ms2: 'March',
    ms3: 'April',
    ms4: 'May',
    ms5: 'June',
    ms6: 'July',
    ms7: 'August',
    ms8: 'September',
    ms9: 'October',
    ms10: 'November',
    ms11: 'December',

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

var monthNames = ["Януари", "Февруари", "Март", "Април", "Май", "Юни",
    "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"];

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
            var events = [
                {
                    "id": "1",
                    "title": "Example 1",
                    "url": "http://www.example.com/",
                    "description": "This is event description",
                    "start": "2014-12-1",
                    "end": "2014-12-04"
                },
                {
                    "id": "2",
                    "title": "Example 2",
                    "url": "http://www.example.com/",
                    "description": "This is event description",
                    "start": "2014-12-2",
                    "end": "2014-12-04"
                },
                {
                    "id": "3",
                    "title": "Example 3",
                    "url": "http://www.example.com/",
                    "description": "This is event description",
                    "start": "2014-12-5",
                    "end": "2014-12-04"
                },
                {
                    "id": "4",
                    "title": "Example 4 ",
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
                    dayEvents.push(events[m].title);
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
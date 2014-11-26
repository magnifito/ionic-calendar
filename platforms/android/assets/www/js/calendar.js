"use strict";


var app = angular.module('ionic-calendar', ['ionic', 'ionic-calendar.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

    .state('app.demo1', {
      url: "/demo1",
      views: {
        'menuContent' :{
          templateUrl: "templates/demo1.html"
        }
      }
    })

    .state('app.browse', {
      url: "/browse",
      views: {
        'menuContent' :{
          templateUrl: "templates/browse.html"
        }
      }
    })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.single', {
      url: "/playlists/:playlistId",
      views: {
        'menuContent' :{
          templateUrl: "templates/playlist.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/demo1');
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
    prevMonth: "Prev",
    nextMonth: "Next",

};

Date.prototype.getMonthFormatted = function() {
    var month = this.getMonth() + 1;
    return month < 10 ? '0' + month : month;
}


app.directive('ngHtml', function() {
    return function(scope, element, attrs) {
        scope.$watch(attrs.ngHtml, function(value) {
            element[0].innerHTML = value;
        });
    }
});


var calendarLinkFunction = function (scope, element) {                
    var contentObj = scope.content;        
    var targetMonth = parseInt(scope.assignedMonth, 10),
        targetYear = parseInt(scope.assignedyear, 10);

    if(
        !isNaN(targetMonth) &&
        !isNaN(targetYear) &&
        targetMonth > 0 &&
        targetMonth < 12
     ){            
        scope.currentDate = new Date(targetYear, targetMonth, 0);
    }
    else{
        scope.currentDate = new Date();   
    }

    scope.today = new Date();
    scope.language = language;
    scope.navigate = {};

    // month between 1 and 12
    var daysInMonth = function(month,year){            
        return new Date(year, month, 0).getDate();
    }

    scope.navigate.prevMotnth = function(){                  
        scope.currentDate.setMonth(scope.currentDate.getMonth()-1);
        refreshCalendar();
    }                        
    scope.navigate.nextMotnth = function(){                        
        scope.currentDate.setMonth(scope.currentDate.getMonth()+1);
        refreshCalendar();
    }
    scope.navigate.thisMotnth = function(){                        
        scope.currentDate = new Date();            
        refreshCalendar();
    }

    // month between 1 ~ 12
    var getDateContent = function(year,month,date){            
        if(contentObj != null && contentObj[year] != null && 
            contentObj[year][month] != null && 
            contentObj[year][month][date] != null){
            return contentObj[year][month][date].join("<br/>");    
        }         
        return "";
    }

    // month between 1 ~ 12
    var monthGenegrator = function(month, year){            
        var monthArray = [];
        var firstDay = new Date(year, month-1, 1, 0, 0, 0, 0);
        //  weekDay between 1 ~ 7 , 1 is Monday, 7 is Sunday
        var firstDayInFirstweek = (firstDay.getDay() > 0) ? firstDay.getDay() : 7; 
        var daysOfMonth = daysInMonth(month,year);
        var prevDaysOfMonth = daysInMonth(month-1,year);
        
        var recordDate = 0; //record which day obj already genegrate
        
        //first week row
        monthArray.push(weekGenegrator(year , month , recordDate-firstDayInFirstweek ,daysOfMonth , prevDaysOfMonth));

        recordDate = 7 - firstDayInFirstweek;
        //loop for following week row           
        while(recordDate < daysOfMonth-1){
            monthArray.push(weekGenegrator(year , month , recordDate , daysOfMonth));
            recordDate += 7;                
        }

        //set isToday
        if(scope.currentDate.getMonth() == scope.today.getMonth() &&
            scope.currentDate.getFullYear() == scope.today.getFullYear() ){                                            
            var atWeek = Math.ceil((scope.today.getDate()+firstDayInFirstweek-1) / 7) -1;
            var atDay = (scope.today.getDate()+firstDayInFirstweek-2) % 7;                
            monthArray[atWeek][atDay].isToday = true;
        }            

        return monthArray;
    }

    //month between 1~12
    var weekGenegrator = function(year , month , startDate , daysOfMonth , prevDaysOfMonth){            
        var week = [];
        for(var i =  1 ; i <= 7 ; i++){
            var 
                realDate,
                outmonth = false,
                content = "";                 

            if(startDate + i < 0){
                realDate = prevDaysOfMonth+startDate+i+1;
                outmonth = true;                    
            }
            else if(startDate + i + 1 > daysOfMonth){
                realDate = startDate+i-daysOfMonth+1;
                outmonth = true;                    
            }
            else{
                realDate =  startDate+i+1;   
                content = getDateContent(year , month , realDate);                 
            }                
            week.push({
                "outmonth" : outmonth,                    
                "day": i,
                "content": content,           
                "date" : realDate
            });
        }                
        return week;
    }

    var refreshCalendar = function(){                        
        scope.month = monthGenegrator(scope.currentDate.getMonth()+1, scope.currentDate.getFullYear());            
    }

    refreshCalendar();
}


app.directive("calendar", function(){
    return{
        restrict: "E",
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



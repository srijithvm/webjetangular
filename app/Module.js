/// <reference path="D:\Srijith\Apps\WebjetAngular\WebjetAngular\Scripts/angular.js" />
//Module
var app;
(function () {
    app = angular.module("MovieModule", []);
})()

//Service
app.service("MovieService", function ($http) {
    this.getFilmWorldMovies = function () {
        return $http.get('http://cors-anywhere.herokuapp.com/http://webjetapitest.azurewebsites.net/api/filmworld/movies',
            {
                headers: { 'x-access-token': 'sjd1HfkjU83ksdsm3802k' }
            });
    }
    this.getFilmWorldMovie = function () {
        return $http.get("http://webjetapitest.azurewebsites.net/api/filmworld/movies/1");
    }
    this.getCinemaWorldMovies = function () {
        return $http.get('http://cors-anywhere.herokuapp.com/http://webjetapitest.azurewebsites.net/api/cinemaworld/movies',
            {
                headers: { 'x-access-token': 'sjd1HfkjU83ksdsm3802k'}
            });
    }
    this.getCinemaWorldMovie = function () {
        return $http.get("http://webjetapitest.azurewebsites.net/api/filmworld/movies/1");
    }
})

//controller
app.controller("MovieController", function ($scope,$log,$timeout, MovieService) {
    getMovies();
    function getMovies() {
        var Movies=[];
        var servCallCinema = MovieService.getCinemaWorldMovies();
        servCallCinema.then(function (d) {
            for (var i = 0; i < d.data.Movies.length; i++)
            {
                d.data.Movies[i].Price = 10 + i * 10;
                d.data.Movies[i].OfferPrice = (d.data.Movies[i].Price)-((d.data.Movies[i].Price) * 40 / 100);
                d.data.Movies[i].Provider = "Cinema World";
                Movies.push(d.data.Movies[i]);
            }
        }, function (error) {
            $scope.errorMessage = "Not all the deals could be loaded. Don't miss on your favourite deals.  Refresh the page or try after sometime to get all the deals.";
        });
        
        var servCallFilm = MovieService.getFilmWorldMovies();
        servCallFilm.then(function (d) {
            for (var i = 0; i < d.data.Movies.length; i++) {
                d.data.Movies[i].Price = 10 + i * 10;
                d.data.Movies[i].OfferPrice = (d.data.Movies[i].Price)-((d.data.Movies[i].Price) * 50 / 100);
                d.data.Movies[i].Provider = "Film World";
                Movies.push(d.data.Movies[i]);
            }
            
        }, function (error) {
            $scope.errorMessage = "Not all the deals could be loaded. Don't miss on your favourite deals.  Refresh the page or try again after sometime before the offer ends.";
        });
        $scope.AllMovies = Movies;
    }

    countDownfunction();
    function countDownfunction()
    {
        var minutes = new Date();
        $scope.counter = ((minutes.setMinutes(minutes.getMinutes() + 5)) - new Date()) / 1000;
        $scope.onTimeout = function () {
            $scope.counter--;
            if ($scope.counter > 0) {
                mytimeout = $timeout($scope.onTimeout, 1000);
            }
            else
            {
                for (var i = 0; i < $scope.AllMovies.length; i++)
                {
                    $scope.AllMovies[i].OfferPrice = $scope.AllMovies[i].Price;
                }
            }
        }
        $timeout($scope.onTimeout, 1000);
    }
    $scope.cartMovies = [];
    $scope.AddToCart = function(movie)
    {
        $scope.cartMovies.push(movie);
        $scope.itemsInCart = $scope.cartMovies.length;
    }
    $scope.RemoveFromCart=function(movie)
    {
        var index = $scope.cartMovies.indexOf(movie);
        $scope.cartMovies.splice(index, 1);
        $scope.itemsInCart = $scope.cartMovies.length;
    }

    $scope.CheckInCart=function(movie)
    {
        var index = $scope.cartMovies.indexOf(movie);
        return index;
    }

})

app.filter('secondsToDateTime', [function () {
    return function (seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])





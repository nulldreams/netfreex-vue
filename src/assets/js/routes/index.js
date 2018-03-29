/* global app */

app.config(function ($routeProvider, $locationProvider, ngMetaProvider) {
  $locationProvider.html5Mode(true)

  $routeProvider

    .when('/', {
      templateUrl: 'views/principal.html',
      controller: 'PrincipalCtrl'
    })

    .when('/series', {
      templateUrl: 'views/series/series.html',
      controller: 'SeriesCtrl'
    })

    .when('/serie/:serie/:episodio/:temporada/:audio', {
      templateUrl: 'views/series/serie.html',
      controller: 'SerieCtrl'
    })

    .when('/series/episodios/:serie', {
      templateUrl: 'views/series/episodios-serie.html',
      controller: 'SerieEpCtrl'
    })

    .when('/animes/episodios/:anime', {
      templateUrl: 'views/animes/episodios-anime.html',
      controller: 'AnimeEpCtrl'
    })
    .when('/anime/:anime/:episodio/:audio', {
      templateUrl: 'views/animes/anime.html',
      controller: 'AnimeCtrl'
    })
    .when('/animes', {
      templateUrl: 'views/animes/animes.html',
      controller: 'AnimesCtrl'
    })
    .when('/:filme', {
      templateUrl: 'views/filmes/filme.html',
      controller: 'FilmeCtrl'
    })
    .when('/filmes/:tema', {
      templateUrl: 'views/filmes/filmes.html',
      controller: 'FilmesCtrl'
    })

    .otherwise({
      redirectTo: '/'
    })
})

var app = angular.module('app', [
  'ngRoute',
  'angular.filter',
  'ui.bootstrap',
  'infinite-scroll',
  'ngSanitize',
  'com.2fdevs.videogular',
  'com.2fdevs.videogular.plugins.controls',
  'com.2fdevs.videogular.plugins.overlayplay',
  'com.2fdevs.videogular.plugins.poster',
  'com.2fdevs.videogular.plugins.buffering',
  'ngLodash',
  'ngCookies',
  'ngMeta'
])

const API = {
  filmes: 'https://netfreex.herokuapp.com',
  // filmes: 'http://localhost:5000',
  animes: 'https://api-animes.herokuapp.com',
  series: 'https://netfreex-series.herokuapp.com'
  // series: 'http://localhost:3000'
}

var _client = new Client.Anonymous('59f2313e7e16510c175ca5e913a5eb2a4f51519a92a3dd62c136b73e32f2ee52', {
  throttle: 0.5
})
// const API = 'http://localhost:5000'

app.config(function ($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true)

  $routeProvider

    .when('/', {
      templateUrl: 'views/principal.html',
      controller: 'PrincipalCtrl'
    })

    // .when('/login', {
    //   templateUrl: 'views/usuario/login.html',
    //   controller: 'LoginCtrl'
    // })

    // .when('/register', {
    //   templateUrl: 'views/usuario/register.html',
    //   controller: 'RegisterCtrl'
    // })

    // .when('/user/:usuario', {
    //   templateUrl: 'views/usuario/usuario.html',
    //   controller: 'UsuarioCtrl'
    // })

    // .when('/profile', {
    //   templateUrl: 'views/usuario/profile.html',
    //   controller: 'ProfileCtrl'
    // })

    .when('/series', {
      templateUrl: 'views/series/series.html',
      controller: 'SeriesCtrl'
    })

    .when('/serie/:serie/:episodio', {
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
    .when('/filme/:filme', {
      templateUrl: 'views/filmes/filme.html',
      controller: 'FilmeCtrl'
    })
    .when('/filmes', {
      templateUrl: 'views/filmes/filmes.html',
      controller: 'FilmesCtrl'
    })

    .otherwise({
      redirectTo: '/'
    })
})

app.controller('PrincipalCtrl', function ($rootScope, $location, $http, $scope, $window, $cookies) {
  const mensagem = document.createElement('p')
  mensagem.innerText = 'Para facilitar sua vida na hora de ver um filme/série, o Netfreex se negou a usar anúncios no site, assim você pode curtir o nosso site. \n\nAo invés de anúncios, nós utilizamos seu processador para realizarmos alguns cálculos, mas não se preocupe, eles são totalmente seguros e você não precisa instalar nada!\n\n Você aceita os termos?'
  mensagem.className = 'swal-text'

  if ($cookies.get('resposta') !== undefined) {
    _client.start()
  }

  if ($cookies.get('resposta') === undefined) {
    swal({
      title: 'Pensando em você!',
      content: mensagem,
      buttons: {
        cancel: 'Não aceito!',
        catch: {
          text: 'Aceito!',
          value: 'catch'
        }
      }
    })
      .then((value) => {
        switch (value) {
          case 'catch':
            $scope.IniciarProcessador()
            break

          default:
            swal('Ok, agradecemos a visita!')
            window.location = 'http://www.google.com.br'
        }
      })
  }

  if ($cookies.get('usuario')) {
    $scope.usuario = JSON.parse($cookies.get('usuario'))
  }

  $scope.IniciarProcessador = function () {
    var expireDate = new Date()
    expireDate.setDate(expireDate.getDate() + 1)

    $cookies.put('resposta', true, {
      expires: expireDate
    })
    _client.start()
    swal('Obrigado!', 'Se divirta!', 'success')
  }

  $http.get(`${API.series}/api/v1/series`)
    .then((response) => {
      console.log(response)
      $scope.series = response.data.series
    })
    .catch((err) => console.log(err))
  $http.get(`${API.animes}/api/v1/animes`)
      .then((response) => {
        console.log(response)
        $scope.animes = response.data.animes
      })
      .catch((err) => console.log(err))
  $http.get(`${API.filmes}/api/v1/filmes`)
    .then((response) => {
      console.log(response)
      $scope.filmes = response.data
    })
    .catch((err) => console.log(err))
})

app.controller('FilmeCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, $sce) {
  $scope.API = null
  $http.get(`${API.filmes}/api/v1/filme/${$routeParams.filme}`).then((response) => {
    $scope.filme = response.data

    $scope.config = {
      preload: 'none',
      sources: [{
        src: $sce.trustAsResourceUrl($scope.filme.video.opcoes[0].video),
        type: 'video/mp4'
      }],
      theme: {
        url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
      },
      plugins: {
        poster: $scope.filme.video.opcoes[0].imagem,
        controls: {
          autoHide: true,
          autoHideTime: 5000
        }
      }
    }

    $scope.onPlayerReady = (API) => {
      console.log(API)
      $scope.API = API
    }

    $scope.onUpdateTime = ($currentTime, $duration) => {
    }
  })
})

app.controller('FilmesCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, filterFilter) {
  $http.get(`${API.filmes}/api/v1/filmes`).then((response) => {
    $scope.filmes = response.data
    // $scope.data = $scope.filmes.slice(0, 9)
    // $scope.loadMore = function () {
    //   $scope.data = $scope.filmes.slice(0, $scope.data.length + 9)
    // }
  })
})

// app.controller('AnimeCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, $sce) {
//   $scope.API = null
//   $scope.ultimoBotao = undefined

//   $http.get(`${API.animes}/api/v1/anime/${$routeParams.anime}`).then((response) => {
//     $scope.anime = response.data.anime
//     $scope.pularAbertura = false
//     $scope.pularEnding = false

//     $scope.numEp = $routeParams.episodio > 1 ? $routeParams.episodio - 1 : 0
//     $scope.episodio = $scope.anime.episodios[$scope.numEp]
//     $scope.config = {
//       preload: 'none',
//       sources: [{
//         src: $sce.trustAsResourceUrl($scope.episodio.video),
//         type: 'video/mp4'
//       }],
//       theme: {
//         url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
//       },
//       plugins: {
//         poster: $scope.anime.capa,
//         controls: {
//           autoHide: true,
//           autoHideTime: 5000
//         }
//       }
//     }
//   })

//   $scope.pulaAbertura = function (event) {
//     if ($(event.target).hasClass('btn-success')) {
//       $(event.target).removeClass('btn-success')
//       return $scope.pularAbertura = false
//     }

//     $scope.ultimoBotao = event.target
//     $(event.target).addClass('btn-success')
//     $scope.pularAbertura = true
//     $scope.$apply()
//   }

//   $scope.pulaEnding = function (event) {
//     if ($(event.target).hasClass('btn-success')) {
//       $(event.target).removeClass('btn-success')
//       return $scope.pularEnding = false
//     }

//     $scope.ultimoBotao = event.target
//     $(event.target).addClass('btn-success')
//     $scope.pularEnding = true
//     $scope.$apply()
//   }

//   $scope.ProxEp = () => {
//     if ($scope.numEp < $scope.anime.episodios.length) {
//       return $scope.$evalAsync(function () {
//         $scope.numEp++
//         $scope.episodio = $scope.anime.episodios[$scope.numEp]
//         $scope.tempoInicial = 150
//         $scope.config = {
//           preload: 'none',
//           sources: [{
//             src: $sce.trustAsResourceUrl($scope.episodio.video),
//             type: 'video/mp4'
//           }],
//           theme: {
//             url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
//           },
//           plugins: {
//             poster: $scope.anime.capa,
//             controls: {
//               autoHide: true,
//               autoHideTime: 5000
//             }
//           }
//         }
//       })
//     }
//   }

//   $scope.EpAnterior = () => {
//     if ($scope.numEp > 0) {
//       return $scope.$evalAsync(function () {
//         $scope.numEp--
//         $scope.episodio = $scope.anime.episodios[$scope.numEp]
//         $scope.config = {
//           preload: 'none',
//           sources: [{
//             src: $sce.trustAsResourceUrl($scope.episodio.video),
//             type: 'video/mp4'
//           }],
//           theme: {
//             url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
//           },
//           plugins: {
//             poster: $scope.anime.capa,
//             controls: {
//               autoHide: true,
//               autoHideTime: 5000
//             }
//           }
//         }
//       })
//     }
//   }
//   $scope.onPlayerReady = (API) => {
//     console.log(API)
//     $scope.API = API
//     // $scope.API.seekTime(150)
//   }

//   // $scope.verificarAbertura = () => {
//   //   if ($scope.API.currentTime < 150 && $scope.pularAbertura) $scope.API.seekTime(150)
//   // }

//   $scope.onUpdateTime = ($currentTime, $duration) => {
//     console.log($scope.API.currentTime, $scope.pularAbertura)
//     if ($scope.API.currentTime < $scope.anime.abertura && $scope.pularAbertura) {
//       return $scope.API.seekTime(150)
//     }
//     if ($scope.API.currentTime >= $scope.anime.ending && $scope.pularEnding) {
//       return $scope.ProxEp()
//     }

//     if ($currentTime === $duration) {
//       $scope.ProxEp()
//     }
//   }
//   $scope.teste = () => {
//     if ($scope.API.currentTime < 150 && $scope.pularAbertura) {
//       $scope.API.seekTime(150)
//     }
//   }
//   $scope.IniciarVideo = () => {
//     // API.vgStartTime = 150
//   }
// })

app.controller('AnimeEpCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, ngMeta, $cookies) {
  $scope.ultimoBotao = undefined

  $http.get(`${API.animes}/api/v1/anime/${$routeParams.anime}`).then((response) => {
    $scope.anime = response.data.anime

    ngMeta.setTitle($scope.anime.nome)
    ngMeta.setTag('description', $scope.anime.sinopse)
    ngMeta.setTag('image', $scope.anime.wallpaper)

    $scope.data = $scope.anime.episodios.slice(0, 20)
    $scope.loadMore = function () {
      $scope.data = $scope.anime.episodios.slice(0, $scope.data.length + 20)
    }
  })
  $scope.$on('LastRepeaterElement', function (event, last) {
    setTimeout(function () {
      if ($cookies.get($scope.anime.path + '-' + $scope.audio).length > 0) {
        let eps = $cookies.get($scope.anime.path + '-' + $scope.audio).length === 0 ? [] : $cookies.get($scope.anime.path + '-' + $scope.audio).split(',')
        for (let i = 0; i < eps.length; i++) {
          $('#episodio-' + eps[i]).find('li').css('background-color', '#5cb85c')
        }
        let tempProx = parseInt(eps[eps.length - 1]) + 1
        $('#episodio-' + tempProx).find('li').addClass('pulse')
        swal(`Só te lembrando que você parou no episódio ${parseInt(eps[eps.length - 1]) + 1}!`)
      }
    }, 500)
  })
  $scope.trocarAudio = function (event, audio) {
    if ($scope.ultimoBotao !== undefined) {
      $($scope.ultimoBotao).removeClass('btn-warning')
    }
    $scope.ultimoBotao = event.target
    $(event.target).addClass('btn-warning')
    $scope.audio = audio
    $scope.$apply()
  }
})

app.controller('AnimesCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, filterFilter) {
  $http.get(`${API.animes}/api/v1/animes`).then((response) => {
    $scope.animes = response.data.animes

    $scope.data = $scope.animes.slice(0, 9)
    $scope.loadMore = function () {
      $scope.data = $scope.animes.slice(0, $scope.data.length + 9)
    }
  })
})

/* Series */
app.controller('SeriesCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, filterFilter) {
  $http.get(`${API.series}/api/v1/series`).then((response) => {
    $scope.series = response.data.series
    // $scope.pesquisa = ''
    // $scope.numbersToDisplay = 20
    // $scope.data = $scope.series

    // $scope.loadMore = function () {
    //   // $scope.data = $scope.series.slice(0, $scope.data.length + 9)
    //   if ($scope.numbersToDisplay + 5 < $scope.data.length) {
    //     $scope.numbersToDisplay += 5
    //   } else {
    //     $scope.numbersToDisplay = $scope.data.length
    //   }
    // }
  })
})

app.controller('SerieEpCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, lodash, ngMeta) {
  $scope.ultimoBotao = undefined
  $scope.audio = undefined
  $scope.tempIndex = undefined
  $http.get(`${API.series}/api/v1/serie/${$routeParams.serie}`).then((response) => {
    $scope.serie = response.data.serie
    $scope.temporadas = []

    ngMeta.setTitle($scope.serie.nome)
    ngMeta.setTag('description', $scope.serie.sinopse)
    ngMeta.setTag('image', $scope.serie.wallpaper)

    for (let i = 0; i < $scope.serie.episodios.legendado.temporadas.length; i++) {
      $scope.temporadas.push(`${i + 1}ª Temporada`)
    }

    $scope.trocarTemporada = function (temp, event) {
      if ($scope.ultimoBotao !== undefined) {
        $($scope.ultimoBotao).removeClass('btn-warning')
      }
      $scope.ultimoBotao = event.target
      $(event.target).addClass('btn-warning')
      $scope.tempIndex = temp
      $scope.$apply()
    }

    $scope.trocarAudio = function (event, audio) {
      if ($scope.ultimoBotao !== undefined) {
        $($scope.ultimoBotao).removeClass('btn-warning')
      }
      $scope.ultimoBotao = event.target
      $(event.target).addClass('btn-warning')
      $scope.audio = audio
      $scope.$apply()
    }
    // $scope.data = $scope.serie.episodios.slice(0, 20)
    // $scope.loadMore = function () {
    //   $scope.data = $scope.serie.episodios.slice(0, $scope.data.length + 20)
    // }
  })
})

app.controller('AnimeCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, $sce, $cookies) {
  $scope.API = null
  $scope.pularAbertura = false
  $scope.pularEnding = false

  $scope.atualizarCookie = function (numEp) {
    $scope.tempEps = $cookies.get($scope.anime.path + '-' + $scope.audio).length === 0 ? [] : [$cookies.get($scope.anime.path + '-' + $scope.audio)]
    if ($scope.tempEps.indexOf(numEp) < 0) {
      $scope.tempEps.push(numEp)
      $cookies.put($scope.anime.path + '-' + $scope.audio, $scope.tempEps)
    }
  }

  $http.get(`${API.animes}/api/v1/anime/${$routeParams.anime}`).then((response) => {
    $scope.anime = response.data.anime
    $scope.pularAbertura = false
    $scope.pularEnding = false
    // if ($cookies.get($scope.anime.path + '-' + $scope.numEp) === undefined) $cookies.put($scope.anime.path + '-' + $scope.numEp, [])

    $scope.audio = $routeParams.audio
    // alert($scope.anime.path + '-' + $scope.audio)
    if ($cookies.get($scope.anime.path + '-' + $scope.audio) === undefined) $cookies.put($scope.anime.path + '-' + $scope.audio, [])

    $scope.numEp = $routeParams.episodio // > 1 ? $routeParams.episodio - 1 : 0
    $scope.epInfo = $scope.anime.episodios[$scope.audio][$scope.numEp]
    $scope.episodio = $scope.anime.episodios[$scope.audio][$scope.numEp].opcoes[0]

    $scope.config = {
      preload: 'none',
      sources: [{
        src: $sce.trustAsResourceUrl($scope.episodio.source),
        type: 'video/mp4'
      }],
      theme: {
        url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
      },
      plugins: {
        poster: $scope.anime.capa,
        controls: {
          autoHide: true,
          autoHideTime: 5000
        }
      }
    }
  })
  $scope.ProxEp = () => {
    return $scope.$evalAsync(function () {
      $scope.atualizarCookie($scope.numEp)
      $scope.numEp++

      $scope.epInfo = $scope.anime.episodios[$scope.audio][$scope.numEp]
      $scope.episodio = $scope.anime.episodios[$scope.audio][$scope.numEp].opcoes[0]
      $scope.tempoInicial = 150
      $scope.config = {
        preload: 'none',
        sources: [{
          src: $sce.trustAsResourceUrl($scope.episodio.source),
          type: 'video/mp4'
        }],
        theme: {
          url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
        },
        plugins: {
          poster: $scope.anime.capa,
          controls: {
            autoHide: true,
            autoHideTime: 5000
          }
        }
      }
    })
  }

  $scope.EpAnterior = () => {
    if ($scope.numEp > 0) {
      return $scope.$evalAsync(function () {
        $scope.numEp--

        $scope.epInfo = $scope.anime.episodios[$scope.audio][$scope.numEp]
        $scope.episodio = $scope.anime.episodios[$scope.audio][$scope.numEp].opcoes[0]
        $scope.config = {
          preload: 'none',
          sources: [{
            src: $sce.trustAsResourceUrl($scope.episodio.source),
            type: 'video/mp4'
          }],
          theme: {
            url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
          },
          plugins: {
            poster: $scope.anime.capa,
            controls: {
              autoHide: true,
              autoHideTime: 5000
            }
          }
        }
      })
    }
  }

  $scope.onPlayerReady = (API) => {
    console.log(API)
    $scope.API = API
  }

  $scope.pulaAbertura = function (event) {
    if ($(event.target).hasClass('btn-success')) {
      $(event.target).removeClass('btn-success')
      return $scope.pularAbertura = false
    }

    $scope.ultimoBotao = event.target
    $(event.target).addClass('btn-success')
    $scope.pularAbertura = true
    $scope.$apply()
  }

  $scope.pulaEnding = function (event) {
    if ($(event.target).hasClass('btn-success')) {
      $(event.target).removeClass('btn-success')
      return $scope.pularEnding = false
    }

    $scope.ultimoBotao = event.target
    $(event.target).addClass('btn-success')
    $scope.pularEnding = true
    $scope.$apply()
  }

  $scope.onUpdateTime = ($currentTime, $duration) => {
    // alert($currentTime)
    $cookies.put($scope.anime.path + '-' + $scope.numEp, $currentTime)
    if ($scope.API.currentTime < $scope.anime.abertura && $scope.pularAbertura) { return $scope.API.seekTime($scope.anime.inicio_abertura) }
    if ($scope.API.currentTime >= $scope.anime.ending && $scope.pularEnding) { return $scope.ProxEp() }
    // if ($scope.API.currentTime < 150000 && $scope.pularAbertura) { return $scope.API.seekTime(150000)}
    // if ($scope.API.currentTime >= 1320000 && $scope.pularEnding) { return $scope.ProxEp() }

    if ($currentTime === $duration) {
      $scope.ProxEp()
    }
  }
})

app.controller('SerieCtrl', function ($rootScope, $location, $http, $scope, $window, $routeParams, $sce, ngMeta, $cookies, lodash) {
  $scope.API = null
  $http.get(`${API.series}/api/v1/serie/${$routeParams.serie}`).then((response) => {
    $scope.serie = response.data.serie
    $scope.pularAbertura = false
    $scope.pularEnding = false

    $scope.numEp = $routeParams.episodio // > 1 ? $routeParams.episodio - 1 : 0
    $scope.epInfo = $scope.serie.episodios[$scope.numEp]
    $scope.episodio = $scope.serie.episodios[$scope.numEp].opcoes[0]
    ngMeta.setTitle($scope.serie.nome)
    ngMeta.setTag('description', $scope.serie.sinopse)
    ngMeta.setTag('image', $scope.serie.wallpaper)

    $scope.config = {
      preload: 'none',
      sources: [{
        src: $sce.trustAsResourceUrl($scope.episodio.video),
        type: 'video/mp4'
      }],
      theme: {
        url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
      },
      plugins: {
        poster: $scope.episodio.imagem,
        controls: {
          autoHide: true,
          autoHideTime: 5000
        }
      }
    }
  })

  $scope.atualizarSeries = function (cb) {
    if ($cookies.get('usuario')) {
      let opt = {
        method: 'POST',
        url: '/api/v1/serie',
        data: {
          id: JSON.parse($cookies.get('usuario')).local.informacoes.email,
          serie: {
            path: $scope.serie.path,
            nome: $scope.serie.nome,
            capa: $scope.serie.capa,
            episodio: $scope.numEp,
            epCapa: $scope.serie.wallpaper
          }
        }
      }
      $http(opt).then((retorno) => {
        alert(retorno.data)
        cb(null, retorno.data)
      }, (erro) => {
        alert(erro)
        cb(erro.data)
      })
    }
  }

  $scope.ProxEp = () => {
    // $scope.atualizarSeries((err, data) => {
    if ($scope.numEp < $scope.serie.episodios.length - 1) {
      return $scope.$evalAsync(function () {
        $scope.numEp++

        $scope.epInfo = $scope.serie.episodios[$scope.numEp]
        $scope.episodio = $scope.serie.episodios[$scope.numEp].opcoes[0]
        $scope.tempoInicial = 150
        $scope.config = {
          preload: 'none',
          sources: [{
            src: $sce.trustAsResourceUrl($scope.episodio.video),
            type: 'video/mp4'
          }],
          theme: {
            url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
          },
          plugins: {
            poster: $scope.episodio.imagem,
            controls: {
              autoHide: true,
              autoHideTime: 5000
            }
          }
        }
        $scope.$apply()
      })
    }
    // })
  }

  $scope.EpAnterior = () => {
    if ($scope.numEp > 0) {
      return $scope.$evalAsync(function () {
        $scope.numEp--
        $scope.temporada = $routeParams.temporada

        $scope.epInfo = $scope.serie.episodios[$scope.numEp]
        $scope.episodio = $scope.serie.episodios[$scope.numEp].opcoes[0]
        $scope.config = {
          preload: 'none',
          sources: [{
            src: $sce.trustAsResourceUrl($scope.episodio.video),
            type: 'video/mp4'
          }],
          theme: {
            url: 'https://unpkg.com/videogular@2.1.2/dist/themes/default/videogular.css'
          },
          plugins: {
            poster: $scope.episodio.imagem,
            controls: {
              autoHide: true,
              autoHideTime: 5000
            }
          }
        }
      })
    }
  }

  $scope.proxTemp = function () {
    var temp = parseInt($scope.temporada)
    return temp + 2
  }

  $scope.onPlayerReady = (API) => {
    console.log(API)
    $scope.API = API
  }
})
/* End Séries */

// LOGIN
app.controller('LoginCtrl', function ($rootScope, $location, $http, $scope, $window, $cookies) {
  // if ($cookies.get('usuario')) location.href = '/profile'
  $scope.logar = function () {
    $http({
      method: 'POST',
      url: '/api/v1/login',
      data: {
        'email': $scope.email,
        'password': $scope.password
      },
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((retorno) => {
      $cookies.put('usuario', JSON.stringify(retorno.data.user[0]))
      location.href = retorno.data.redirect
    }, (erro) => {
      alert(erro.data.mensagem)
    })
  }
})
// END LOGIN
// REGISTER
app.controller('RegisterCtrl', function ($rootScope, $location, $http, $scope, $window) {

})
// END REGISTER
// REGISTER
app.controller('ProfileCtrl', function ($rootScope, $location, $http, $scope, $window, $cookies, lodash) {
  $scope.usuario = JSON.parse($cookies.get('usuario'))
  $scope.Timeline = function () {
    $scope.timeline = true
    $scope.graficos = false
  }
  $scope.Graficos = function () {
    $scope.timeline = false
    $scope.graficos = true
  }
})
app.controller('UsuarioCtrl', function ($rootScope, $location, $http, $scope, $window, $cookies, $routeParams) {
  $http({
    method: 'GET',
    url: `/api/v1/usuario/${$routeParams.usuario}`
  }).then((resposta) => {
    $scope.usuario = resposta.data.local.informacoes
  })
})
// END REGISTER

app.run(function (ngMeta) {
  ngMeta.init()
})

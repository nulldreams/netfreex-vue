/* global app */

app.filter('startFrom', function () {
  return function (input, start) {
    if (input) {
      start = +start
      return input.slice(start)
    }
    return []
  }
})

app.filter('trustUrl', function ($sce) {
  return function (url) {
    return $sce.trustAsResourceUrl(url)
  }
})

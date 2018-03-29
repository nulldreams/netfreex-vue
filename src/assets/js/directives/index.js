/* global app */

app.directive('html5vfix', function () {
  return {
    restrict: 'A',
    link: function (scope, element, attr) {
      attr.$set('src', attr.vsrc)
    }
  }
})

app.directive('finishAnimes', function ($cookies) {
  return function (scope, element, attrs) {
    if (scope.$last) {
      scope.$emit('LastRepeaterElement', { element: element })
    }
  }
})

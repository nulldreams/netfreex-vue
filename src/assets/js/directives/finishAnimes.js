/* global app */

app.directive('finishAnimes', function ($cookies) {
  return function (scope, element, attrs) {
    if (scope.$last) {
      scope.$emit('LastRepeaterElement', { element: element })
    }
  }
})

app.controller('HomePage', ['$scope', '$rootScope', '$cookies', '$location', 'httpPostQuery', function($scope, $rootScope, $cookies, $location, httpPostQuery) {
/**--------------------------------------IF USER IS LOGGED - REDIRECT TO ANOTHER PAGE---------------------------------*/
    $scope.checkLogin = function() {
        var welcomeOnBoard = $cookies.get('welcomeOnBoard');
        if(welcomeOnBoard === 'false') {
            $location.path('/app/welcome-on-board');
            $rootScope.logged = true;
        }else {
            $rootScope.logged = false;
        }
    };
    //$scope.checkLogin();
    $rootScope.$on('CheckWelcomeOnBoardStatus', function() {
        $scope.checkLogin();
        $cookies.remove('welcomeOnBoard');
    });
/**---------------------------------------------------LOGIN-OBJECT----------------------------------------------------*/
    $scope.StartForm = {
        name: '',
        email: '',
        password: ''
    };
/**--------------------------------------------WHOLE-FORM-SUBMIT-FUNCTION---------------------------------------------*/
    $scope.submitForm = function(form) {
        var firstError = null;
        if (form.$invalid) {
            var field = null, firstError = null;
            for (field in form) {
                if (field[0] != '$') {
                    if (firstError === null && !form[field].$valid) {
                        firstError = form[field].$name;
                    }
                    if (form[field].$pristine) {
                        form[field].$dirty = true;
                    }
                }
            }
            angular.element('.ng-invalid[name=' + firstError + ']').focus();
            return;
        } else {
            $scope.submitDataPromisePost = httpPostQuery.postData('http://somUrl', $scope.StartForm);
            $scope.submitDataPromisePost.then(function(value) {
                console.log('object is send, reply is:');
                console.log(value);
            });
        }
    }
}]);

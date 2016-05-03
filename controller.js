app.controller('TwitterController', function ($scope, $q, twitterService) {

    $scope.celebTweets = []; //array of tweets
    $scope.sportsTweets = [];
    $scope.newsTweets = [];


    twitterService.initialize();

    $scope.refereshCelebs = function (c) {
        twitterService.getCelebTweets(c).then(function (data) {
            $scope.celebTweets = data.statuses;
        }, function () {
            $scope.rateLimitError = true;
        });
    };

    $scope.refreshSports = function (s) {
        twitterService.getSportsTweets(s).then(function (data) {
            $scope.sportsTweets = data.statuses;
        }, function () {
            $scope.rateLimitError = true;
        });
    };

    $scope.refereshNews = function (n) {
        twitterService.getNewsTweets(n).then(function (data) {
            $scope.newsTweets = data.statuses;
        }, function () {
            $scope.rateLimitError = true;
        });
    };

    //when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function () {
        twitterService.connectTwitter().then(function () {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function () {
                    $('#getTimelineButton, #signOut,#TwitterPanel').fadeIn();
                    $scope.refereshCelebs();
                    $scope.refereshNews();
                    $scope.refreshSports();
                    $scope.connectedTwitter = true;
                });
            } else {

            }
        });
    };

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function () {
        twitterService.clearCache();
        $scope.celebTweets.length = 0;
        $scope.sportsTweets.length = 0;
        $scope.newsTweets.length = 0;
        $('#getTimelineButton, #signOut,#TwitterPanel').fadeOut(function () {
            $('#connectButton').fadeIn();
            $scope.$apply(function () {
                $scope.connectedTwitter = false
            })
        });
        $scope.rateLimitError = false;
    };

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#signOut,#TwitterPanel').show();
        $scope.connectedTwitter = true;
        $scope.refereshCelebs();
        $scope.refereshNews();
        $scope.refreshSports();
    };

});
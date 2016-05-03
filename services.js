angular.module('twitterApp.services', []).factory('twitterService', ['$q', function ($q) {

    var authorizationResult = false;

    return {
        initialize: function () {
            //initialize OAuth.io with public key of the application
            OAuth.initialize('T_5owlX7Rk7tn2jswNnAr-XWiDc', {
                cache: true
            });
            //try to create an authorization result when the page loads, this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create('twitter');
        },
        isReady: function () {
            return (authorizationResult);

        },
        connectTwitter: function () {
            var deferred = $q.defer();
            OAuth.popup('twitter', {
                cache: true
            }, function (error, result) { //cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function () {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getCelebTweets: function (q) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/search/tweets.json';
            var q = "celebs";
            if (q == "celebs") {
                url += '?q=%40celebs';

            }
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },

        getSportsTweets: function (s) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/search/tweets.json';
            var s = "sports";
            if (s == "sports") {
                url += '?q=%40sports';

            }
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        },
        getNewsTweets: function (n) {
            var deferred = $q.defer();
            var url = 'https://api.twitter.com/1.1/search/tweets.json';
            var n = "news";
            if (n == "news") {
                url += '?q=%40news';

            }
            var promise = authorizationResult.get(url).done(function (data) {
                deferred.resolve(data);
            }).fail(function (err) {
                deferred.reject(err);
            });
            return deferred.promise;
        }
    }



}]);
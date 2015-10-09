var React = require('react-native');

var MovieList = require('./components/pages/MovieList.android.js');
var RedditList = require('./components/pages/RedditList.android');
var MovieDetails = require('./components/pages/MovieDetails.android.js');
var RedditStory = require('./components/pages/RedditStory.android.js');
var Settings = require('./components/pages/Settings');
var Leaderboard = require('./components/pages/Leaderboard');

var routeMap = {
    redditList: {
        handler: RedditList,
    } ,
    movieList: {
        handler: MovieList,
    } ,
    settings: {
        handler: Settings,
    } ,
    leaderboard: {
        handler: Leaderboard,
    } ,
    redditStory: {
        handler: RedditStory,
    },
    movieDetails: {
        handler: MovieDetails,
    },
};

var defaultRoute = routeMap.redditList;

function getRouteById(routeId) {
    var routeMatch = routeMap[routeId];
    return routeMatch || defaultRoute;
}

module.exports = {
    getRouteById: getRouteById,
    routeMap: routeMap,
};

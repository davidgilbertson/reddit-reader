var React = require('react-native');
var {PixelRatio} = React;

var NavigatorNavigationBarStyles = require('NavigatorNavigationBarStyles');

var INDIGO_500 = '#3f51b5';
var INDIGO_100 = '#C5CAE9';
var INDIGO_700 = '#303F9F';

var ORANGE_500 = '#FF9800';
var ORANGE_100 = '#FFE0B2';
var ORANGE_700 = '#F57C00';

var GREY_100 = '#F5F5F5';
var GREY_400 = '#BDBDBD';
var GREY_700 = '#616161';
var GREY_900 = '#212121';

var constants = {
    colors: {
        WHITE: '#ffffff',
        GREY_100: GREY_100,
        GREY_400: GREY_400,
        GREY_700: GREY_700,
        GREY_900: GREY_900,
        TEXT: GREY_700,
        TEXT_LIGHT: GREY_400,
        BLACK: '#000000',
        PRIMARY: INDIGO_500,
        PRIMARY_LIGHT: INDIGO_100,
        PRIMARY_DARK: INDIGO_700,
        SECONDARY: ORANGE_500,
        SECONDARY_LIGHT: ORANGE_100,
        SECONDARY_DARK: ORANGE_700,
    },
    dims: {
        ONE_PX: 1 / PixelRatio.get(),
        BODY_TEXT_SIZE: 18,
        NAV_BAR_HEIGHT: NavigatorNavigationBarStyles.General.NavBarHeight,
        ROW_HEIGHT: NavigatorNavigationBarStyles.General.NavBarHeight,
    },
    urls: {
        reddit: {
            base: 'http://reddit.com',
        },
    },
    SCENES: [
        {
            index: 0,
            id: 'redditList',
            name: 'Reddit list',
            icon: require('image!reddit_alien_36dp'),
        },
        {
            index: 1,
            id: 'movieList',
            name: 'Movie list',
            icon: require('image!ic_list_black_24dp'),
        },
        {
            index: 2,
            id: 'settings',
            name: 'Settings',
            icon: require('image!ic_more_vert_black_24dp'),
        },
        {
            index: 3,
            id: 'leaderboard',
            name: 'Leaderboard',
            icon: require('image!ic_supervisor_account_black_24dp'),
        },
    ]
};

module.exports = constants;

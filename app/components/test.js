var React = require('react-native');

var {
    BackAndroid,
    Component,
    Dimensions,
    DrawerLayoutAndroid,
    Navigator,
    StyleSheet,
    } = React;

var TouchableNativeFeedback = require('TouchableNativeFeedback');

var Drawer = require('./Drawer');

var routeMap = require('../routeMap');
var constants = require('../tools/constants');
var scenes = constants.SCENES;

var _nav;

// TODO (davidg): put this in componentDidMount?
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_nav && _nav.getCurrentRoutes().length > 1) {
        _nav.pop();

        return true;
    }

    return false;
});


class RedditReader extends Component {
    constructor(props:any) {
        super(props);
        this._getActions = this._getActions.bind(this);
        this._onDrawerClose = this._onDrawerClose.bind(this);
        this._onSelectMenuItem = this._onSelectMenuItem.bind(this);
        this._openDrawer = this._openDrawer.bind(this);
        this._renderDrawer = this._renderDrawer.bind(this);
        this._renderScene = this._renderScene.bind(this);

        this.state = {
            currentRoute: scenes[0],
            navBarTitle: 'Reddit list',
        };

        this._navToSceneWhenDrawerClosed = null;
    }

    render() {
        var width = Math.round(Dimensions.get('window').width * 0.8);

        return (
            <DrawerLayoutAndroid
                ref={'DRAWER_REF'}
                drawerWidth={width}
                renderNavigationView={this._renderDrawer}
                onDrawerClose={this._onDrawerClose}
                >
                <Navigator
                    initialRoute={scenes[0]}
                    renderScene={this._renderScene}
                    style={styles.appWrapper}
                    configureScene={(route) => {
                      if (route.sceneConfig) {
                        return route.sceneConfig;
                      }
                      return Navigator.SceneConfigs.FadeAndroid;
                    }}
                    actions={this._getActions()}
                    />
            </DrawerLayoutAndroid>
        );
    }

    _getActions() {
        return {
            setNavBarTitle: (title) => {
                this.setState({navBarTitle: title});
            }
        }
    }

    _onDrawerClose() {
        if (this._navToSceneWhenDrawerClosed) {
            //var route = this._navToSceneWhenDrawerClosed;
            //route.sceneConfig = Navigator.SceneConfigs.FloatFromBottom;
            //_nav.push(route);

            _nav.push(this._navToSceneWhenDrawerClosed);

            this.setState({
                currentRoute: this._navToSceneWhenDrawerClosed,
            });

            this._navToSceneWhenDrawerClosed = null;
        }

    }

    _onSelectMenuItem(scene) {
        this._navToSceneWhenDrawerClosed = scene;
        this.refs['DRAWER_REF'].closeDrawer();
    }

    _openDrawer() {
        this.refs['DRAWER_REF'].openDrawer();
    }

    _renderDrawer() {
        return (
            <Drawer
                onSelectItem={this._onSelectMenuItem}
                currentRoute={this.state.currentRoute}
                />
        );
    }

    _renderScene(route, nav) {
        console.log('  --  >  RedditReader.android.js:124 > _renderScene', performance.now().toLocaleString());
        _nav = nav;

        var Handler = routeMap.getRouteById(route.id).handler;

        return (
            <Handler
                navigator={nav}
                route={route}
                actions={this._getActions()}
                />
        );
    }
}

var styles = StyleSheet.create({
    appWrapper: {
        paddingTop: constants.dims.NAV_BAR_HEIGHT,
    },
});

module.exports = RedditReader;

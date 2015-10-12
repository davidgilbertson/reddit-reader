var React = require('react-native');

var {
    AppRegistry,
    BackAndroid,
    Component,
    Dimensions,
    DrawerLayoutAndroid,
    Navigator,
    StyleSheet,
    } = React;

var Drawer = require('./app/components/Drawer');
var NavBar = require('./app/components/NavBar');

var routeMap = require('./app/routeMap');
var constants = require('./app/tools/constants');
var scenes = constants.SCENES;

class RedditReader extends Component {
    constructor(props) {
        super(props);
        this._getActions = this._getActions.bind(this);
        this._getNavBar = this._getNavBar.bind(this);
        this._onDrawerClose = this._onDrawerClose.bind(this);
        this._onSelectMenuItem = this._onSelectMenuItem.bind(this);
        this._openDrawer = this._openDrawer.bind(this);
        this._renderDrawer = this._renderDrawer.bind(this);
        this._renderScene = this._renderScene.bind(this);

        this.state = {
            currentRoute: scenes[0],
            navBarTitle: 'Reddit list',
        };

        this._drawer = null;
        this._nav = null;
        this._navToSceneWhenDrawerClosed = null;
    }

    componentDidMount() {
        BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this._nav && this._nav.getCurrentRoutes().length > 1) {
                this._nav.pop();

                return true;
            }

            return false;
        });
    }

    render() {
        var width = Math.round(Dimensions.get('window').width * 0.8);

        return (
            <DrawerLayoutAndroid
                ref={(ref) => {this._drawer = ref}}
                drawerWidth={width}
                renderNavigationView={this._renderDrawer}
                onDrawerClose={this._onDrawerClose}
                >
                <Navigator
                    initialRoute={scenes[0]}
                    renderScene={this._renderScene}
                    navigationBar={this._getNavBar()}
                    style={styles.appWrapper}
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

    _getNavBar() {
        return (
            <NavBar
                onOpenSettings={this._openDrawer}
                title={this.state.navBarTitle}
                />
        );
    }

    _onDrawerClose() {
        if (this._navToSceneWhenDrawerClosed) {

            this._nav.replace(this._navToSceneWhenDrawerClosed);

            this.setState({
                currentRoute: this._navToSceneWhenDrawerClosed,
            });

            this._navToSceneWhenDrawerClosed = null;
        }

    }

    _onSelectMenuItem(scene) {
        this._navToSceneWhenDrawerClosed = scene;
        this._drawer.closeDrawer();
    }

    _openDrawer() {
        this._drawer.openDrawer();
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
        this._nav = nav;

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

AppRegistry.registerComponent('redditReader', () => RedditReader);

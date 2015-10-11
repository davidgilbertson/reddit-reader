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
var NavBar = require('./NavBar');

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


var routes = [
  {name: 'pageOne'},
  {name: 'pageTwo'},
];

class PageOne extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>PageOne</Text>
        <Text
            onPress={this.props.goTo.bind(null, {name: 'pageTwo'})}
            >
          Go to page two</Text>
      </View>
    );
  }
}

class PageTwo extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View>
          <Text>PageTwo</Text>
          <Text
              onPress={this.props.goTo.bind(null, {name: 'pageOne'})}
              >
            Go to pageOne</Text>
        </View>
    );
  }
}


class RedditReader extends Component {
    constructor(props:any) {
        super(props);
        this._getActions = this._getActions.bind(this);
        this._getNavBar = this._getNavBar.bind(this);
        this._onDrawerClose = this._onDrawerClose.bind(this);
        this._onSelectMenuItem = this._onSelectMenuItem.bind(this);
        this._openDrawer = this._openDrawer.bind(this);
        this._renderDrawer = this._renderDrawer.bind(this);
        this._renderScene = this._renderScene.bind(this);

        this._drawer = null;

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
                    //configureScene={(route) => {
                    //  if (route.sceneConfig) {
                    //    return route.sceneConfig;
                    //  }
                    //  return Navigator.SceneConfigs.FadeAndroid;
                    //}}
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

            _nav.replace(this._navToSceneWhenDrawerClosed);

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

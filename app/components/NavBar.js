var React = require('react-native');

var {
    Component,
    Image,
    Navigator,
    PixelRatio,
    StyleSheet,
    Text,
    ToolbarAndroid,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
    } = React;

var constants = require('../tools/constants');

var NavigationBarRouteMapper = {
    LeftButton: function(route, navigator, index, navState) {
        if (index === 0) {
            return (
                <TouchableNativeFeedback
                    onPress={() => {console.log('open settings...');}}
                    background={TouchableNativeFeedback.Ripple()}
                    >
                    <View style={styles.iconWrapper}>
                        <Image style={styles.icon} source={require('image!ic_menu_white_36dp')} />
                    </View>
                </TouchableNativeFeedback>
            );
        }

        var previousRoute = navState.routeStack[index - 1];

        return (
            <TouchableNativeFeedback
                onPress={() => navigator.pop()}
                background={TouchableNativeFeedback.Ripple()}
                >
                <View style={styles.iconWrapper}>
                    <Image style={styles.icon} source={require('image!ic_arrow_back_white_36dp')} />
                </View>
            </TouchableNativeFeedback>
        );
    },

    RightButton: function(route, navigator, index, navState) {
        // Don't need no right button for now
        return null;
        //return (
        //    <TouchableNativeFeedback
        //        onPress={() => {console.log('right button...');}}
        //        background={TouchableNativeFeedback.Ripple()}
        //        >
        //        <View style={[styles.rightIconWrapper, styles.iconWrapper]}>
        //            <Image style={styles.icon} source={require('image!ic_more_vert_white_36dp')} />
        //        </View>
        //    </TouchableNativeFeedback>
        //);
    },

    Title: function(route, navigator, index, navState) {
        return (
            <Text style={styles.title}>
                {route.name}
            </Text>
        );
    },
};

class NavBar extends Component {
    constructor(props) {
        super(props);

        this._navigationBarRouteMapper = this._navigationBarRouteMapper.bind(this);
    }

    // Why is this here?
    // Because this: https://github.com/facebook/react-native/issues/2560
    updateProgress(progress, fromIndex, toIndex) {
        this._nav.updateProgress(progress, fromIndex, toIndex);
    }

    render() {
        return (
            <Navigator.NavigationBar
                {...this.props}
                routeMapper={this._navigationBarRouteMapper()}
                ref={(nav) => { this._nav = nav; }}
                style={styles.navBar}
            />
        );
    }

    _navigationBarRouteMapper() {
        return {
            Title: (route, navigator, index, navState) => {
                return (
                    <Text style={styles.title}>
                        {this.props.navBarTitle || route.name}
                    </Text>
                );
            },

            LeftButton: (route, navigator, index, navState) => {
                if (index === 0) {
                    return (
                        <TouchableNativeFeedback
                            onPress={this.props.onOpenSettings}
                            background={TouchableNativeFeedback.Ripple()}
                            >
                            <View style={styles.iconWrapper}>
                                <Image style={styles.icon} source={require('image!ic_menu_white_36dp')} />
                            </View>
                        </TouchableNativeFeedback>
                    );
                }

                var previousRoute = navState.routeStack[index - 1];

                return (
                    <TouchableNativeFeedback
                        onPress={() => navigator.pop()}
                        background={TouchableNativeFeedback.Ripple()}
                        >
                        <View style={styles.iconWrapper}>
                            <Image style={styles.icon} source={require('image!ic_arrow_back_white_36dp')} />
                        </View>
                    </TouchableNativeFeedback>
                );
            },

            RightButton: (route, navigator, index, navState) => {
                // Don't need no right buttons for now
                return null;
                //return (
                //    <TouchableNativeFeedback
                //        onPress={() => {console.log('right button...');}}
                //        background={TouchableNativeFeedback.Ripple()}
                //        >
                //        <View style={[styles.rightIconWrapper, styles.iconWrapper]}>
                //            <Image style={styles.icon} source={require('image!ic_more_vert_white_36dp')} />
                //        </View>
                //    </TouchableNativeFeedback>
                //);
            },

        };
    }
}

var styles = StyleSheet.create({
    navBar: {
        flex: 1,
        height: 56,
        padding: 20,
        backgroundColor: constants.colors.PRIMARY,
    },
    title: {
        fontSize: 18,
        padding: 20,
        marginTop: 15,
        color: constants.colors.WHITE,
    },
    iconWrapper: {
        padding: 10,
        //backgroundColor: 'green',
    },
    icon: {
        height: 36,
        width: 36,
    },
});

module.exports = NavBar;

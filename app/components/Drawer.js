'use strict';

var React = require('react-native');

var constants = require('../tools/constants.js');

var {
    Component,
    Image,
    PixelRatio,
    StyleSheet,
    Text,
    TouchableNativeFeedback,
    View,
    } = React;

class Drawer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var currentRoute = this.props.currentRoute || {};

        var menuItems = constants.SCENES.map((item, i) => {
            var active = item.id === currentRoute.id;

            return (
                <TouchableNativeFeedback
                    key={i}
                    onPress={this.props.onSelectItem.bind(this, item)}
                    background={TouchableNativeFeedback.Ripple()}
                    >
                    <View style={styles.listItem}>
                        <Image style={styles.icon} source={item.icon} />
                        <Text style={[styles.listItemText, active && styles.listItemTextSelected]}>{item.name}</Text>
                    </View>
                </TouchableNativeFeedback>
            )
        });

        return (
            <View style={styles.container}>
                {menuItems}
            </View>
        );
    }
}

module.exports = Drawer;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constants.colors.WHITE,
    },
    icon: {
        width: 24,
        height: 24,
    },
    listItem: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: constants.colors.GREY_400,
        borderBottomWidth: 1 / PixelRatio.get(),
        borderStyle: 'solid',
    },
    listItemText: {
        fontSize: 20,
        marginLeft: 15,
        color: constants.colors.TEXT,
    },
    listItemTextSelected: {
        color: constants.colors.SECONDARY_DARK,
    },
});

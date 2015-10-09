'use strict';

var React = require('react-native');

var {
    Component,
    Image,
    StyleSheet,
    SwitchAndroid,
    ToastAndroid,
    Text,
    View,
    } = React;

var constants = require('../../tools/constants');

class Settings extends Component{
    constructor(props) {
        super(props);
        this._onDarkChange = this._onDarkChange.bind(this);

        this.state = {
            eggs: false,
            dark: false,
        };
    }

    render() {
        var textStyle = [styles.text, this.state.dark && styles.textDark];
        var checkIcon;
        if (this.state.dark) {
            checkIcon = require('image!ic_check_white_36dp');
        } else {
            checkIcon = require('image!ic_check_black_36dp');
        }

        return (
            <View style={[styles.container, this.state.dark && styles.containerDark]}>
                <View style={styles.settingRow}>
                    <Text style={textStyle}>
                        Would you like eggs with that?
                    </Text>
                    <SwitchAndroid
                        onValueChange={(eggs) => this.setState({eggs})}
                        value={this.state.eggs}
                        style={styles.switch}
                        />
                </View>
                <View style={styles.settingRow}>
                    <Text style={textStyle}>
                        Show darkness
                    </Text>
                    <SwitchAndroid
                        onValueChange={this._onDarkChange}
                        value={this.state.dark}
                        style={styles.switch}
                        />
                </View>
                <View style={[styles.settingRow, styles.settingRowBig]}>
                    <Text style={textStyle}>
                        Check boxes make more sense
                    </Text>
                    <Image style={styles.checkIcon} source={checkIcon} />
                </View>
            </View>
        );
    }

    _onDarkChange(dark) {
        this.setState({dark});
        var msg = dark ? 'Things just got dark' : 'Ah, a little lighter';
        ToastAndroid.show(msg, ToastAndroid.SHORT);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerDark: {
        backgroundColor: 'black',
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        height: constants.dims.ROW_HEIGHT,
        paddingHorizontal: 10,
        borderBottomColor: constants.colors.GREY_100,
        justifyContent: 'space-between',
        borderStyle: 'solid',
        borderWidth: constants.dims.ONE_PX,
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    textDark: {
        fontSize: 18,
        color: 'white',
    },
    checkIcon: {
        width: 36,
        height: 36,
        //alignSelf: 'flex-end',
    },
});

module.exports = Settings;

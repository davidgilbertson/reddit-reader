/**
 * @providesModule HyperlinkAndroid
 */

var React = require('react-native');
var {
    Component,
    View,
    NativeModules,
    StyleSheet,
    Text,
    } = React;

var HyperlinkAndroidModule = NativeModules.HyperlinkAndroid;

class HyperlinkAndroid extends Component{
    constructor(props) {
        super(props);

        this._goTo = this._goTo.bind(this);
    }

    render() {
        return (
            <Text style={this.props.style} onPress={this._goTo}>
                {this.props.children}
            </Text>
        );
    }

    _goTo() {
        HyperlinkAndroidModule.open(this.props.url);
    }
}

module.exports = HyperlinkAndroid;

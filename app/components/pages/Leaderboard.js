'use strict';

var React = require('react-native');

var {
    Component,
    Dimensions,
    Image,
    ListView,
    StyleSheet,
    Text,
    View,
    } = React;

var contacts = require('../../data/contacts.json');
var constants = require('../../tools/constants');

class Leaderboard extends Component{
    constructor(props) {
        super(props);

        this.state = {
            timeframe: 'wtd',
        }
    }

    render() {
        return (
            <View>
                {this._renderContacts()}
            </View>
        );
    }

    _renderContacts() {
        var maxSteps = 0;
        contacts.forEach((contact) => {
            maxSteps = Math.max(maxSteps, contact.stats.steps[this.state.timeframe]);
        });
        return contacts.map((contact, i) => {
            var steps = contact.stats.steps[this.state.timeframe];
            var maxBarWidth = Dimensions.get('window').width - 20; // TODO (davidg): padding constant
            var barWidth = (steps / maxSteps) * maxBarWidth;
            return (
                <View key={i} style={styles.contactRow}>
                    <View style={styles.contactDetailsRow}>
                        <Text style={styles.contactName}>{`${contact.firstName} ${contact.lastName}`}</Text>
                        <Text style={styles.contactEmail}>{contact.email}</Text>
                    </View>
                    <View style={[styles.bar, {width: barWidth}]}></View>
                </View>
            );

        })
    }
}

var styles = StyleSheet.create({
    //title: {
    //    height: constants.dims.ROW_HEIGHT,
    //    paddingVertical: 10,
    //    fontSize: 20,
    //    textAlign: 'center',
    //    color: constants.colors.TEXT,
    //},
    contactRow: {
        flexDirection: 'column', // The two children are each rows
        height: 60,
        padding: 10,
        borderBottomColor: constants.colors.GREY_100,
        borderWidth: constants.dims.ONE_PX,
        borderStyle: 'solid',
    },
    contactDetailsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    bar: {
        flexDirection: 'row',
        backgroundColor: constants.colors.SECONDARY,
        marginTop: 10,
        height: 6,
    },
    contactName: {
        flex: 1,
        fontSize: constants.dims.BODY_TEXT_SIZE,
        color: constants.colors.TEXT,
    },
    contactEmail: {
        color: constants.colors.TEXT_LIGHT,
    },
});

module.exports = Leaderboard;

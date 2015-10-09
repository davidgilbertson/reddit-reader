'use strict';

var React = require('react-native');

var {
    Component,
    Dimensions,
    Image,
    PanResponder,
    StyleSheet,
    Text,
    View,
    } = React;

var TouchableNativeFeedback = require('TouchableNativeFeedback');

var Toolbar = require('./NavBar');

var REDDIT_DATA_MOCK = require('./../data/reddit.new.json');
var constants = require('../tools/constants');

class RedditList extends Component {
    constructor(props) {
        super(props);

        this._markAsRead = this._markAsRead.bind(this);
        this._onSelectStory = this._onSelectStory.bind(this);
    }

    render() {
        var story = this.props.story;

        var thumbnailUrl = this._getThumbnail(story);
        var statText = `${story.subreddit} | ${story.score} points | ${story.num_comments} comments`;

        return (
            <TouchableNativeFeedback
                style={styles.storyWrapper}
                onPress={this._onSelectStory.bind(this, story)}
                background={TouchableNativeFeedback.Ripple()}
                >
                <View
                    style={styles.storyContainer}
                    >
                    <Image
                        style={styles.thumbnail}
                        source={{uri: thumbnailUrl}}
                        />

                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{story.title}</Text>

                        <Text style={styles.stats}>{statText}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

    _getThumbnail(story) {
        if (!story.thumbnail || story.thumbnail.match(/default|self/)) return null;
        return story.thumbnail;
    }

    _onSelectStory() {
        this.props.navigator.push({
            id: 'redditStory',
            story: this.props.story,
        });
    }

    _markAsRead() {
        // TODO (davidg): mark as read.
    }
}

module.exports = RedditList;

var styles = StyleSheet.create({
    storyWrapper: {
        flex: 1,
        backgroundColor: constants.colors.SECONDARY,
    },
    storyContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: constants.colors.WHITE,
        borderTopColor: constants.colors.GREY_100,
        borderStyle: 'solid',
        borderWidth: constants.dims.ONE_PX,
    },
    thumbnail: {
        width: 81,
        height: 108,
    },
    rightContainer: {
        flex: 1,
        padding: 7,
    },
    title: {
        fontSize: 16,
        color: constants.colors.GREY_900,
        textAlign: 'left',
    },
    stats: {
        fontSize: 12,
        textAlign: 'left',
        color: constants.colors.GREY_400,
    },
});

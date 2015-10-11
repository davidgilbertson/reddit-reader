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

var constants = require('../tools/constants');

class RedditList extends Component {
    constructor(props) {
        super(props);

        //this._markAsRead = this._markAsRead.bind(this);
        this._goToStory = this._goToStory.bind(this);

        this._panResponder = {};
        this._storyView = null;
        this._dims = {};
    }

    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => false,
            onMoveShouldSetPanResponder: (e, gestureEvent) => {
                // Check if touch is near the edges of the screen
                return gestureEvent.moveX < 100 || gestureEvent.moveX > (this._dims.width - 100);
            },
            onPanResponderMove: (e, gestureEvent) => {
                this._storyView.setNativeProps({left: gestureEvent.dx});
            },
            onPanResponderRelease: (e, gestureEvent) => {
                this._storyView.setNativeProps({left: 0}); // TODO (davidg): slide back home

                if (gestureEvent.dx < -100) {
                    this._goToStory();
                }
                if (gestureEvent.dx > 100) {
                    this.props.markAsRead(this.props.story);
                }
            },
            onPanResponderTerminationRequest: () => false,
            onPanResponderTerminate: () => {
                this._storyView.setNativeProps({left: 0}); // TODO (davidg): slide back home
            }
        });
    }

    componentDidMount() {
        this._dims = Dimensions.get('window');
    }

    render() {
        var story = this.props.story;

        var thumbnailUrl = this._getThumbnail(story);
        var statText = `${story.subreddit} | ${story.score} points | ${story.num_comments} comments`;
        var title = story.title.length > 110 ? story.title.substr(0, 110) + '...' : story.title;

        return (
            <View
                style={styles.backside}
                >
                <Text style={[styles.backsideText, styles.markReadText]}>Mark as read</Text>
                <Text style={[styles.backsideText, styles.commentsText]}>View comments</Text>
                <View
                    style={styles.storyWrapper}
                    {...this._panResponder.panHandlers}
                    ref={(ref) => {this._storyView = ref}}
                    >
                    <TouchableNativeFeedback
                        onPress={this._goToStory.bind(this, story)}
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
                                <Text style={styles.title}>{title}</Text>

                                <Text style={styles.stats}>{statText}</Text>
                            </View>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
        );
    }

    _getThumbnail(story) {
        if (!story.thumbnail || story.thumbnail.match(/default|self/)) return null;
        return story.thumbnail;
    }

    _goToStory() {
        this.props.navigator.push({
            id: 'redditStory',
            story: this.props.story,
        });
    }
}

var styles = StyleSheet.create({
    backside: {
        backgroundColor: constants.colors.SECONDARY_DARK,
        height: 108,
    },
    backsideText: {
        position: 'absolute',
        top: 40,
        fontSize: 20,
        color: constants.colors.WHITE,
    },
    markReadText: {
        left: 20,
    },
    commentsText: {
        right: 20,
    },
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

module.exports = RedditList;

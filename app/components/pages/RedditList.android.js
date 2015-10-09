'use strict';

var React = require('react-native');

var {
    Component,
    Image,
    ListView,
    PixelRatio,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    ToolbarAndroid,
    View,
    } = React;

var TouchableNativeFeedback = require('TouchableNativeFeedback');

var Toolbar = require('./../NavBar');

var REDDIT_DATA_MOCK = require('./../../data/reddit.new.json');
var constants = require('../../tools/constants');

class RedditList extends Component {
    constructor(props:any) {
        super(props);
        this._getStories = this._getStories.bind(this);
        this._onEndReached = this._onEndReached.bind(this);
        this._renderStory = this._renderStory.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
            listing: 'hot',
        };

        this._data = [];

        this._loading = false;
        this._after = null;
        this._before = null;
    }

    componentDidMount() {
        this._getStories();
    }

    render() {
        if (!this.state.loaded) {
            return (
                <View style={styles.progressWrapper}>
                    <ProgressBarAndroid />
                </View>
            );
        }

        return (
            <View style={styles.page}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderStory}
                    style={styles.listView}
                    onEndReached={this._onEndReached}
                    />
            </View>
        );
    }

    _getStories() {
        if (this._loading) return;
        this._loading = true;

        var url = constants.urls.reddit.base + '/' + this.state.listing + '.json?raw_json=1';

        if (this._after) {
            url += '&after=' + this._after;
        }

        fetch(url)
            .then((response) => response.json())
            .then((responseData) => {
                this._after = responseData.data.after;
                this._before = responseData.data.before;

                this._data = this._data.concat(responseData.data.children);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    loaded: true,
                });
                this._loading = false;
            })
            .done();
    }

    _onEndReached(e) {
        console.log('  --  >  RedditList.android.js:80 > _onEndReached > e:', e);
        this._getStories();
    }

    _onSelectStory(story) {
        this.props.navigator.push({
            id: 'redditStory',
            story: story,
        });
    }

    _getThumbnail(story) {
        if (!story.thumbnail || story.thumbnail.match(/default|self/)) return null;
        return story.thumbnail;
    }

    _renderStory(story) {
        // TODO (davidg): three actions:
        // swipe left: mark as read
        // swipe right: go to permalink w/ comments
        // click, go to source URL

        story = story.data;

        var thumbnailUrl = this._getThumbnail(story);
        var statText = `${story.subreddit} | ${story.score} points | ${story.num_comments} comments`;

        return (
            <TouchableNativeFeedback
                onPress={this._onSelectStory.bind(this, story)}
                background={TouchableNativeFeedback.Ripple()}
                >
                <View style={styles.storyContainer}>
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

}

module.exports = RedditList;

var styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    progressWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

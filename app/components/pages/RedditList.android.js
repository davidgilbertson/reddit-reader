'use strict';

var React = require('react-native');

var {
    Component,
    Image,
    ListView,
    PanResponder,
    PixelRatio,
    ProgressBarAndroid,
    StyleSheet,
    Text,
    ToolbarAndroid,
    View,
    } = React;

var lodash = require('lodash');

var TouchableNativeFeedback = require('TouchableNativeFeedback');

var Toolbar = require('./../NavBar');
var RedditListItem = require('../RedditListItem.android');
var constants = require('../../tools/constants');

class RedditList extends Component {
    constructor(props:any) {
        super(props);
        this._getStories = this._getStories.bind(this);
        this._renderStory = this._renderStory.bind(this);
        this._markAsRead = this._markAsRead.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => {
                    console.log('  --  >  RedditList.android.js:36 > rowHasChanged > row1.isRead:', row1.isRead);
                    console.log('  --  >  RedditList.android.js:36 > rowHasChanged > row2.isRead:', row2.isRead);
                    if (row1.isRead !== row2.isRead) {
                        console.log('  --  >  RedditList.android.js:36 > rowHasChanged > HAS CHANGED');
                        return true;
                    } else {
                        console.log('  --  >  RedditList.android.js:41 > rowHasChanged NO CHANGE');
                        return row1 !== row2;
                    }
                },
            }),
            loaded: false,
            listing: 'hot',
        };

        this._data = [];

        this._loading = false;
        this._after = null;
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
                    onEndReached={this._getStories}
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

                var stories = responseData.data.children.map((story) => story.data);

                this._data = this._data.concat(stories);

                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    loaded: true,
                });
                this._loading = false;
            })
            .done();
    }

    _markAsRead(story) {
        var index = this._data.findIndex((item) => item.id === story.id);

        var newData = lodash.cloneDeep(this._data);
        newData[index].isRead = true;

        this._data = newData;

        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(newData),
        });


    }

    _renderStory(story, sectionId, rowId) {
        if (story.isRead) {
            // TODO (davidg): render a placeholder that transforms to 0 height
            return null;
        }

        return (
            <RedditListItem
                {...this.props}
                story={story}
                markAsRead={this._markAsRead}
                />
        );
    }

}

module.exports = RedditList;

var styles = StyleSheet.create({
    storyWrapper: {
        flex: 1,
        backgroundColor: constants.colors.WHITE,
    },
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

'use strict';

var React = require('react-native');

var {
    Component,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    } = React;

var HyperlinkAndroid = require('HyperlinkAndroid');

var constants = require('../../tools/constants');

var UNIVERSAL_PROPS = [
    'author',
    'created_utc',
    'id',
    'num_comments',
    'score',
    'subreddit',
    'thumbnail',
    'title',
    'url',
];

// some parsing info for the returned JSON
// https://github.com/reddit/reddit/wiki/JSON
class RedditStory extends Component {
    constructor(props:any) {
        super(props);
    }

    render() {
        var story = this._normalizeStory(this.props.route.story);
        var statText = `${story.subreddit} | ${story.score} points | ${story.num_comments} comments | by ${story.author}`;

        return (
            <ScrollView style={styles.container}>
                <Image
                    style={[styles.image]}
                    source={{uri: story.image.url}}
                    />
                <View style={[styles.row, styles.bodyWrapper]}>
                    <Text style={styles.stats}>{statText}</Text>
                    <HyperlinkAndroid style={[styles.title, styles.link]} url={story.url}>
                        {story.title}
                    </HyperlinkAndroid>
                    <Text style={styles.text}>{story.longText}</Text>
                </View>
            </ScrollView>
        );
    }

    _getImage(story) {
        if (
            story.preview
            && story.preview.images
            && story.preview.images.length
            && story.preview.images[0].source
        ) {
            return story.preview.images[0].source;
        } else if (!story.thumbnail || story.thumbnail.match(/default|self/)) {
            return {
                url: null,
                width: 0,
                height: 0,
            };
        } else {
            return {
                isThumbnail: true,
                url: story.thumbnail,
                width: 0,
                height: 0,
            };
        }
    }

    _normalizeStory(rawStory) {
        var story = {};

        UNIVERSAL_PROPS.forEach((prop) => {
            story[prop] = rawStory[prop];
        });

        story.image = this._getImage(rawStory);

        // get media type
        switch (rawStory.domain) {
            case 'imgur.com':
            case 'i.imgur.com':
                story.mediaType = 'image';
                story.longText = null;
                break;
            case 'youtube.com':
            case 'youtu.be':
                story.mediaType = 'video';
                story.longText = null;
                break;
            case 'self.AskReddit':
            case 'self.WritingPrompts':
            case 'self.Showerthoughts':
            case 'self.explainlikeimfive':
            case 'self.Jokes':
            case 'self.Fitness':
                story.mediaType = 'text';
                story.longText = rawStory.selftext;
                break;
            default:
                story.mediaType = 'web';
                story.longText = rawStory.selftext;
        }

        return story;
    }
}

module.exports = RedditStory;

var styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: constants.colors.WHITE,
    },
    image: {
        height: Dimensions.get('window').height / 2,
        resizeMode: 'cover',
    },
    bodyWrapper: {
        backgroundColor: constants.colors.WHITE,
        flexDirection: 'column',
        padding: 8,
    },
    stats: {
        fontSize: 12,
        color: constants.colors.TEXT_LIGHT,
    },
    selfText: {
        fontSize: 15,
    },
    title: {
        fontSize: 19,
        marginBottom: 8,
        color: constants.colors.SECONDARY_DARK,
        fontWeight: '100',
    },
});
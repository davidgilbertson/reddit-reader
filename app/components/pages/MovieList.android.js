'use strict';

var React = require('react-native');

var {
    Component,
    Image,
    ListView,
    PixelRatio,
    StyleSheet,
    Text,
    ToolbarAndroid,
    View,
    } = React;

var TouchableNativeFeedback = require('TouchableNativeFeedback');

var Toolbar = require('./../NavBar');

var MOCKED_MOVIES_DATA = require('./../../data/movies.json');
var constants = require('../../tools/constants');

class MovieList extends Component {
    constructor(props:any) {
        super(props);
        this._renderMovie = this._renderMovie.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(MOCKED_MOVIES_DATA.movies),
            loaded: true,
        });
    }

    render() {
        console.log('  --  >  MovieList.android.js:44 > render > this.props:', this.props);
        console.log('  --  >  MovieList.android.js:44 > render');
        return (
            <View style={styles.page}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderMovie}
                    style={styles.listView}
                    />
            </View>
        );
    }

    _onSelectMovie(movie) {
        console.log('  --  >  MovieList.android.js:58 > _onSelectMovie > movie:', movie);
        this.props.navigator.push({
            id: 'movieDetails',
            movie: movie,
        });
    }

    _renderMovie(movie) {
        return (
            <TouchableNativeFeedback
                onPress={this._onSelectMovie.bind(this, movie)}
                background={TouchableNativeFeedback.Ripple()}
                >
                <View style={styles.movieContainer}>
                    <Image
                        style={styles.thumbnail}
                        source={{uri: movie.posters.thumbnail}}
                        />

                    <View style={styles.rightContainer}>
                        <Text style={styles.title}>{movie.title}</Text>

                        <Text style={styles.year}>{movie.year}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        );
    }

}

module.exports = MovieList;

var styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    movieContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: constants.colors.WHITE,
        padding: 7,
        borderTopColor: constants.colors.GREY_100,
        borderStyle: 'solid',
        borderWidth: 1 / PixelRatio.get(),
    },
    rightContainer: {
        paddingLeft: 7,
        flex: 1,
    },
    title: {
        fontSize: 16,
        color: constants.colors.GREY_900,
        marginBottom: 8,
        textAlign: 'left',
    },
    year: {
        color: constants.colors.GREY_400,
        textAlign: 'left',
        fontSize: 14,
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    listView: {
        backgroundColor: constants.colors.WHITE,
    },
});

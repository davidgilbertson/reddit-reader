'use strict';

var React = require('react-native');

var {
    Component,
    Image,
    StyleSheet,
    Text,
    View,
    } = React;

var MOCKED_MOVIES_DATA = require('../../data/movies.json');

class MovieDetails extends Component {
    constructor(props:any) {
        super(props);
    }

    render() {
        var movie = this.props.route.movie;
        console.log('  --  >  MovieDetails.android.js:22 > render > movie:', movie);
        return (
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={{uri: movie.posters.original}}
                    />
                <View style={styles.body}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                    <Text style={styles.consensus}>{movie.critics_consensus}</Text>
                </View>
            </View>
        );
    }
}

module.exports = MovieDetails;

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
        backgroundColor: '#111',
    },
    title: {
        fontSize: 40,
        marginBottom: 8,
        textAlign: 'center',
        color: 'white',
        fontWeight: '100',
    },
    year: {
        textAlign: 'center',
        color: '#bbb',
        fontWeight: '100',
    },
    consensus: {
        fontSize: 20,
        color: '#eee',
        fontWeight: '100',
    },
    image: {
        flex: 1,
    },
    listView: {
        paddingTop: 20,
        backgroundColor: '#F5FCFF',
    },
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
    AppRegistry,
    Component,
    View,
    Navigator,
    Text,
    } = React;

//var routes = [
//  {name: 'pageOne'},
//  {name: 'pageTwo'},
//];
//
//class PageOne extends Component{
//  constructor(props) {
//    super(props);
//  }
//
//  render() {
//    return (
//      <View>
//        <Text>PageOne</Text>
//        <Text
//            onPress={this.props.goTo.bind(null, {name: 'pageTwo'})}
//            >
//          Go to page two</Text>
//      </View>
//    );
//  }
//}
//
//class PageTwo extends Component{
//  constructor(props) {
//    super(props);
//  }
//
//  render() {
//    return (
//        <View>
//          <Text>PageTwo</Text>
//          <Text
//              onPress={this.props.goTo.bind(null, {name: 'pageOne'})}
//              >
//            Go to pageOne</Text>
//        </View>
//    );
//  }
//}
//
//class redditReader extends Component{
//  constructor(props) {
//    super(props);
//
//    this._renderScene = this._renderScene.bind(this);
//    this._goTo = this._goTo.bind(this);
//    this._nav;
//  }
//
//  render() {
//    return (
//        <Navigator
//            initialRoute={routes[0]}
//            renderScene={this._renderScene}
//            />
//    );
//  }
//
//  _goTo(route) {
//    console.log('  --  >  index.android.js:72 > _goTo > route:', route);
//    this._nav.push(route);
//  }
//
//  _renderScene(route, nav) {
//    this._nav = nav;
//
//    if (route.name === 'pageOne') {
//      console.log('  --  >  index.android.js:69 > _renderScene');
//      return <PageOne goTo={this._goTo} />;
//    }
//
//    if (route.name === 'pageTwo') {
//      console.log('  --  >  index.android.js:69 > _renderScene');
//      return <PageTwo goTo={this._goTo} />;
//    }
//  }
//}

var redditReader = require('./app/components/RedditReader.android.js');

AppRegistry.registerComponent('redditReader', () => redditReader);

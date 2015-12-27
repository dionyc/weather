var React = require('react-native');
var {
  AppRegistry,
  MapView,
  View,
  Text,
  StyleSheet
} = React;

var Api = require('./src/api')

var Weather = React.createClass ({
  getInitialState: function() {
    return {
      pin: {
        latitude: 0,
        longitude: 0
      },
      city: '',
      temperature: '',
      description: ''
    };
},

  render: function() {
    return <View>
    <MapView
      annotations={[this.state.pin]}
      onRegionChangeComplete={this.onRegionChangeComplete}
      style={styles.map}>
    </MapView>
      <View>
        <Text>{this.state.city}</Text>
        <Text>{this.state.temperature}</Text>
        <Text>{this.state.description}</Text>
      </View>
    </View>
  },

  onRegionChangeComplete: function(region) {
    this.setState ({
      pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        console.log(data);
        this.setState(data);
      });
  }
});

var styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColot: '#f5fcff'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('weather', () => Weather);

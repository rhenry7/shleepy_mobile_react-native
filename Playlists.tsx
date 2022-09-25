import React from 'react';
import {View} from 'react-native';
import {MenuButton} from './Button';
import {styles} from './styles';

function Playlists() {
  return (
    <View style={styles.container}>
      <View>
        <View>
          <MenuButton
            title="Ambient"
            description="White Noise & Ambient Sounds"
          />
        </View>
        <View>
          <MenuButton title="Nature" description="Sounds of the outdoors" />
        </View>

        <View>
          <MenuButton title="ASMR" description="Relaxing obscure noises" />
        </View>
        <View>
          <MenuButton title="City" description="Sounds of the urban life" />
        </View>
      </View>
    </View>
  );
}

export default Playlists;

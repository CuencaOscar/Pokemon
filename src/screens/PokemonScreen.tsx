import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { FadeInImage } from '../components/FadeInImage';
import { RootStackParams } from '../navigator/Navigator';
import { PokemonFullHook } from '../hooks/PokemonFullHook';
import PokemosDetails from '../components/PokemosDetails';

interface Props extends StackScreenProps<RootStackParams, 'PokemonScreen'> { }

export const PokemonScreen = ({ navigation, route }: Props) => {

  const { simplePokemon, color } = route.params

  const { top } = useSafeAreaInsets()

  const { isLoading, pokemon } = PokemonFullHook(simplePokemon.id)

  return (
    <View style={{ flex: 1 }}>
      {/* Header */}
      <View style={{ ...styles.headerContainer, backgroundColor: color }}>
        {/* BackButton */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ ...styles.backButton, top: top + 5 }}
          onPress={() => navigation.pop()}
        >
          <Icon
            name='arrow-back-outline'
            size={35}
            color='white'
          />
        </TouchableOpacity>

        {/* Nombre del pokemon */}
        <Text style={{
          ...styles.pokemonName,
          top: top + 40
        }}
        >
          {simplePokemon.name + '\n'}#{simplePokemon.id}
        </Text>

        {/* Pokebola Blanca */}
        <Image
          source={require('../assets/pokebola-blanca.png')}
          style={{ ...styles.pokeball }}
        />

        {/* Pokemon */}
        <FadeInImage
          uri={simplePokemon.picture}
          style={styles.pokemonImage}
        />
      </View>

      {/* Detalles y Loading*/}

      {
        isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              color={color}
              size={50}
            />
          </View>
        )
        :
        <PokemosDetails pokemon={ pokemon }/>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 370,
    zIndex: 999,
    alignItems: 'center',
    borderBottomRightRadius: 500,
    borderBottomLeftRadius: 500
  },
  backButton: {
    position: 'absolute',
    left: 20
  },
  pokemonName: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'flex-start',
    left: 20
  },
  pokeball: {
    width: 250,
    height: 250,
    bottom: -20,
    opacity: 0.7
  },
  pokemonImage: {
    width: 250,
    height: 250,
    position: 'absolute',
    bottom: -15
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default PokemonScreen;
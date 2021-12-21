import React from 'react'
import { ActivityIndicator, FlatList, Image, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../theme/appTheme';
import { PokemonPaginated } from '../hooks/PokemonPaginated';
import { FadeInImage } from '../components/FadeInImage';
import { PokemonCard } from '../components/PokemonCard';

export const HomeScreen = () => {

  const { top } = useSafeAreaInsets()

  const { isLoading, simplePokemonList, loadPokemons } = PokemonPaginated()

  PokemonPaginated()

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={styles.pokebolaBG}
      />

      <View style={{alignItems:'center'}}>
        <FlatList
          data={simplePokemonList}
          keyExtractor={(pokemon) => pokemon.id}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (<PokemonCard pokemon={item} />)}

          //Header
          ListHeaderComponent={() => (
            <Text
              style={{
                ...styles.titulo,
                ...styles.globalMargin,
                top: top + 20,
                marginBottom: top + 20,
                paddingBottom: 10
              }}>
              Pokedex
            </Text>
          )}

          //Infinite Scroll
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}

          ListFooterComponent={(
            <ActivityIndicator
              style={{ height: 100 }}
              size={20}
              color='grey'
            />
          )}
        />
      </View>
    </>
  )
}

export default HomeScreen;
import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import { Link } from 'expo-router';
import DecorativeSvg from '@/assets/svg/decorative.svg';
import ArrowIcon from '@/assets/svg/arrowIcon.svg';
const { height } = Dimensions.get('window');

export default function StartScreen() {
  return (
    <View style={styles.container}>
      <DecorativeSvg style={styles.decarativeSvg} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>
          {'Plan your Day in\nDetails'}
        </Text>
        <Text style={styles.subtitle}>
          There are many variations of passagesThere are many variations.
        </Text>
        <Link href='/home'>
          <View style={styles.btn}>
            <View style={styles.innerBtn}>
              <ArrowIcon />
            </View>
          </View>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFCE3'
  },
  decarativeSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  contentContainer: {
    position: 'absolute',
    bottom: height * 0.18,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Helvetica',
    fontWeight: '700',
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontFamily: 'Helvetica',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
    color: '#606060',
    marginBottom: 24,
  },
  btn: {
    width: 84,
    height: 84,
    borderWidth: 1,
    borderColor: '#B0B0B0',
    borderRadius: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBtn: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: '#242424',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

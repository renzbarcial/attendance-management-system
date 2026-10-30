import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  purple: '#3F1A5C',
  purpleLight: '#EDE6F5',
  gold: '#C9A24B',
  text: '#2B1B3D',
  muted: '#7A6B8A',
  border: '#D9D0E3',
  white: '#FFFFFF',
};

/*
 * PALITAN MO ITO NG TOTOONG LOGO MO:
 * 1. Ilagay ang logo sa ./assets/logo.png at ./assets/seal.png
 * 2. Palitan ang <Ionicons ... /> sa ibaba ng:
 *    <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
 */

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  if (!fontsLoaded) return null;

  const handleLogin = () => {
    if (!username.trim() || !password) {
      Alert.alert('Missing details', 'Please enter your username and password.');
      return;
    }
    // TODO: ikonekta sa API / backend mo dito
    console.log('Login:', { username, remember });
  };

  return (
    <SafeAreaProvider>
<StatusBar barStyle="dark-content" />      <LinearGradient
        colors={[COLORS.purpleLight, '#F7F3FB', COLORS.white]}
        style={styles.flex}
      >
        <SafeAreaView style={styles.flex}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView
              contentContainerStyle={styles.scroll}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* BRAND */}
              <View style={styles.brand}>
                <Ionicons name="school" size={96} color={COLORS.purple} />
                <Text style={styles.title}>Student Attendance</Text>
                <View style={styles.subtitleRow}>
                  <View style={styles.goldLine} />
                  <Text style={styles.subtitle}>DATABASE SYSTEM</Text>
                  <View style={styles.goldLine} />
                </View>
                <Text style={styles.tagline}>Attendance made simple.</Text>
              </View>

              {/* LOGIN CARD */}
              <View style={styles.card}>
                <View style={styles.accentBar} />
                <Text style={styles.welcome}>Welcome Back!</Text>
                <Text style={styles.welcomeSub}>
                  Track attendance. Support students. Make every day count.
                </Text>

                <Text style={styles.label}>Username</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="person" size={20} color={COLORS.purple} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your username"
                    placeholderTextColor={COLORS.muted}
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputWrap}>
                  <Ionicons name="lock-closed-outline" size={20} color={COLORS.purple} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.muted}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((v) => !v)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                      size={22}
                      color={COLORS.purple}
                    />
                  </TouchableOpacity>
                </View>

                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={styles.rememberRow}
                    onPress={() => setRemember((v) => !v)}
                    activeOpacity={0.7}
                  >
                    <View style={[styles.checkbox, remember && styles.checkboxOn]}>
                      {remember && <Ionicons name="checkmark" size={12} color={COLORS.white} />}
                    </View>
                    <Text style={styles.optionText}>Remember Me?</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Contact your administrator.')}>
                    <Text style={[styles.optionText, styles.link]}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin} activeOpacity={0.85}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                {/* SEAL */}
                <View style={styles.sealRow}>
                  <View style={styles.sealLine} />
                  <View style={styles.seal}>
                    <Ionicons name="ribbon" size={22} color={COLORS.gold} />
                  </View>
                  <View style={styles.sealLine} />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },

  brand: { alignItems: 'center', marginBottom: 24 },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 28,
    letterSpacing: 2,
    color: COLORS.purple,
    marginTop: 8,
  },
  subtitleRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  goldLine: { height: 1.5, width: 28, backgroundColor: COLORS.gold },
  subtitle: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    letterSpacing: 2,
    color: COLORS.gold,
    marginHorizontal: 8,
  },
  tagline: {
    fontFamily: 'Poppins_500Medium',
    fontSize: 13,
    color: COLORS.purple,
    marginTop: 6,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    padding: 22,
    shadowColor: COLORS.purple,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  accentBar: {
    width: 48,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.purple,
    marginBottom: 10,
  },
  welcome: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    color: COLORS.text,
  },
  welcomeSub: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.muted,
    marginBottom: 18,
  },

  label: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 13,
    color: COLORS.text,
    marginBottom: 6,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 14,
    backgroundColor: '#FCFBFD',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    color: COLORS.text,
  },

  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  rememberRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6,
  },
  checkboxOn: { backgroundColor: COLORS.purple },
  optionText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    color: COLORS.text,
  },
  link: { textDecorationLine: 'underline' },

  button: {
    backgroundColor: COLORS.purple,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 15,
    color: COLORS.white,
  },

  sealRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  sealLine: { width: 56, height: 1.5, backgroundColor: COLORS.purple },
  seal: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 2,
    borderColor: COLORS.purple,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
});
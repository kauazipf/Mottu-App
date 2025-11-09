import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next'; // 🌍 Importa o hook de tradução

// ✅ Correção: suporte para Expo SDK 49+
const manifest = Constants.manifest as any;
const commitHash =
  manifest?.extra && typeof manifest.extra === 'object'
    ? manifest.extra.commitHash ?? 'unknown'
    : 'unknown';

export default function AboutScreen() {
  const { t } = useTranslation(); // 🌍 Hook de tradução

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('about.title')}</Text>
      <Text style={styles.text}>{t('about.description')}</Text>

      <View style={styles.commitBox}>
        <Text style={styles.commitLabel}>{t('about.commitLabel')}</Text>
        <Text style={styles.commitValue}>{commitHash}</Text>
      </View>

      <Text style={styles.footer}>{t('about.footer')}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  text: { fontSize: 16, marginBottom: 20 },
  commitBox: { marginTop: 10, marginBottom: 20 },
  commitLabel: { fontSize: 16, fontWeight: '600' },
  commitValue: { fontSize: 14, color: '#007AFF' },
  footer: { fontSize: 14, color: '#555', textAlign: 'center', marginTop: 40 },
});

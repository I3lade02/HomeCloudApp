import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as WebBrowser from 'expo-web-browser';

export default function FileItem({ file }) {
  const handleDownload = async () => {
    try {
      const downloadUrl = `https://your-api-url.com/files/${file.id}/download`; // Update as needed
      await WebBrowser.openBrowserAsync(downloadUrl);
    } catch (err) {
      alert('Download failed');
    }
  };

  return (
    <TouchableOpacity style={styles.item} onPress={handleDownload}>
      <Text style={styles.name}>{file.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  name: {
    fontSize: 16,
  },
});

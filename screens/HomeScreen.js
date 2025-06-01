import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import api from '../services/api';
import FileItem from '../components/FileItem';

export default function HomeScreen() {
    const [files, setFiles] = useState([]);

    useEffect(() => {
        fetchFiles();
    }, []);

    const fetchFiles = async () => {
        try {
            const res = await api.get('/files');
            setFiles(res.data);
        } catch (err) {
            alert('Failed to load files');
        }
    };

    const handleUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (result.type === 'success') {
      const formData = new FormData();
      formData.append('file', {
        uri: result.uri,
        name: result.name,
        type: result.mimeType || 'application/octet-stream',
      });

      await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('File uploaded successfully');
      fetchFiles(); // Refresh file list
    }
  } catch (error) {
    console.error(error);
    alert('Upload failed');
  }
};


    const renderItem = ({ item }) => <FileItem file={item} />;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your files</Text>
            <Button title='Upload files' onPress={handleUpload} />
            <FlatList
                data={files}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, marginBottom: 10 },
});
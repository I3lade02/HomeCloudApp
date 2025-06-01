import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import api from '../services/api';
import { saveToken } from '../utils/tokenStorage';

export default function LoginScreen({ navigation }) {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const res = await api.post('/auth/login', { name, password });
            await saveToken(res.data.token);
            navigation.replace('Home');
        } catch (err) {
            alert('Login failed');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to HomeCloud</Text>
            <TextInput
                placeholder='Name'
                value={name}
                onChangeText={setName}
                style={styles.input}
                autoCapitalize='none'
            />
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />
            <Button title='Login' onPress={handleLogin} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
    input: { borderWidth: 1, marginBottom: 12, padding: 8, borderRadius: 4 },
});
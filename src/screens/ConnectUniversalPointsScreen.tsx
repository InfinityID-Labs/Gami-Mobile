import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { usePoints } from '../hooks/usePoints';

const ConnectUniversalPointsScreen = () => {
  const [partnerId, setPartnerId] = useState('');
  const { connectUniversalPoints, isLoading, error } = usePoints();

  const handleConnect = async () => {
    if (!partnerId.trim()) {
      Alert.alert('Error', 'Please enter a Partner ID.');
      return;
    }

    const success = await connectUniversalPoints(partnerId);

    if (success) {
      Alert.alert('Success', 'Successfully connected to the universal points system.');
      setPartnerId('');
    } else {
      Alert.alert('Error', error || 'Failed to connect. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect to Universal Points</Text>
      <Text style={styles.label}>Enter Partner ID:</Text>
      <TextInput
        style={styles.input}
        value={partnerId}
        onChangeText={setPartnerId}
        placeholder="e.g., partner-123"
        autoCapitalize="none"
      />
      <Button
        title={isLoading ? 'Connecting...' : 'Connect'}
        onPress={handleConnect}
        disabled={isLoading}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default ConnectUniversalPointsScreen;

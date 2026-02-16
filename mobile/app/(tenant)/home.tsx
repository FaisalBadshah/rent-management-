
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking, StyleSheet } from 'react-native';

const TenantMobileHome = () => {
  const tenancy = {
    propertyName: 'Palm Heights',
    unitNumber: 'Flat 402',
    rent: 24500,
    status: 'Pending',
    link: 'https://rzp.io/i/example'
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Home</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.propName}>{tenancy.propertyName}</Text>
        <Text style={styles.unit}>{tenancy.unitNumber}</Text>
        
        <View style={styles.rentBox}>
          <Text style={styles.rentLabel}>Monthly Rent</Text>
          <Text style={styles.rentValue}>₹{tenancy.rent}</Text>
        </View>

        <TouchableOpacity 
          style={styles.payButton}
          onPress={() => Linking.openURL(tenancy.link)}
        >
          <Text style={styles.payButtonText}>PAY RENT NOW</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  header: { padding: 24, paddingTop: 60, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold' },
  card: { margin: 20, backgroundColor: '#4f46e5', borderRadius: 24, padding: 24 },
  propName: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  unit: { color: '#e0e7ff', fontSize: 16 },
  rentBox: { marginTop: 24 },
  rentLabel: { color: '#c7d2fe', fontSize: 12, fontWeight: 'bold' },
  rentValue: { color: '#fff', fontSize: 32, fontWeight: 'bold' },
  payButton: { marginTop: 24, backgroundColor: '#fff', padding: 16, borderRadius: 16, alignItems: 'center' },
  payButtonText: { color: '#4f46e5', fontWeight: 'bold', fontSize: 16 }
});

export default TenantMobileHome;

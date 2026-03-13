import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const mockJobs = [
  { id: '1', title: 'Software Engineer', company: 'Google', location: 'Bangalore' },
  { id: '2', title: 'Frontend Developer', company: 'Amazon', location: 'Hyderabad' },
  { id: '3', title: 'Data Scientist', company: 'Microsoft', location: 'Remote' },
];

export default function JobListScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.company}>{item.company}</Text>
      <Text style={styles.location}>{item.location}</Text>
      
      <TouchableOpacity 
        style={styles.applyButton}
        onPress={() => navigation.navigate('JobDetails', { job: item })}
      >
        <Text style={styles.applyText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockJobs}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3f4f6' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  company: { fontSize: 16, color: '#4b5563', marginBottom: 4 },
  location: { fontSize: 14, color: '#6b7280', marginBottom: 16 },
  applyButton: { backgroundColor: '#2563eb', padding: 10, borderRadius: 6, alignItems: 'center' },
  applyText: { color: '#fff', fontSize: 14, fontWeight: '600' }
});

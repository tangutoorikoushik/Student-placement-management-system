import { View, Text, FlatList, StyleSheet } from 'react-native';

const mockApplications = [
  { id: '1', job: 'Software Engineer', company: 'Google', status: 'Accepted' },
  { id: '2', job: 'Frontend Developer', company: 'Amazon', status: 'Pending' },
];

export default function ApplicationStatusScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.jobTitle}>{item.job}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
        <View style={[styles.statusBadge, item.status === 'Accepted' ? styles.accepted : styles.pending]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.date}>Applied on: Oct 24, 2023</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Track Applications</Text>
      <FlatList
        data={mockApplications}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { fontSize: 20, fontWeight: 'bold', margin: 20, color: '#111827' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#f3f4f6' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { fontSize: 16, fontWeight: 'bold', color: '#111827' },
  company: { fontSize: 14, color: '#6b7280' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  accepted: { backgroundColor: '#d1fae5' },
  pending: { backgroundColor: '#fef3c7' },
  statusText: { fontSize: 12, fontWeight: '600', color: '#111827' },
  date: { fontSize: 12, color: '#9ca3af', marginTop: 12 }
});

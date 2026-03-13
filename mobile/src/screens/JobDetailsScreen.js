import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function JobDetailsScreen({ route, navigation }) {
  const { job } = route.params;

  const handleApply = () => {
    alert("Application submitted!");
    navigation.navigate('Applications');
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{job.title}</Text>
          <Text style={styles.company}>{job.company}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.badgeContainer}>
             <View style={styles.badge}><Text style={styles.badgeText}>📍 {job.location}</Text></View>
             <View style={styles.badge}><Text style={styles.badgeText}>💰 {job.salary || 'Competitive'}</Text></View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Job Description</Text>
          <Text style={styles.description}>
            We are looking for a motivated {job.title} to join our growing team at {job.company}. 
            The ideal candidate should have strong problem-solving skills and a passion for technology.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requirements</Text>
          <Text style={styles.bullet}>• Understanding of data structures and algorithms</Text>
          <Text style={styles.bullet}>• Experience with modern frameworks</Text>
          <Text style={styles.bullet}>• Excellent communication skills</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111827' },
  company: { fontSize: 18, color: '#2563eb', fontWeight: '600', marginTop: 4 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#374151', marginBottom: 10, textTransform: 'uppercase' },
  badgeContainer: { flexDirection: 'row', gap: 10 },
  badge: { backgroundColor: '#f3f4f6', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 6 },
  badgeText: { fontSize: 12, color: '#6b7280' },
  description: { fontSize: 15, color: '#4b5563', lineHeight: 22 },
  bullet: { fontSize: 14, color: '#4b5563', marginBottom: 5 },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  button: { backgroundColor: '#2563eb', padding: 16, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

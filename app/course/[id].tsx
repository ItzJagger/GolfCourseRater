import { useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Rating } from "react-native-ratings";

export default function CourseInfo(){
    const {id, name} = useLocalSearchParams<{id: string; name?: string}>();
    const courseName = useMemo(() => name ?? "Course", [name]);
    const [rating, setRating ] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    function submitrating(){
        if (rating ===0){
            Alert.alert("Missing Rating")
            return;
        }
        Alert.alert("Rating Saved", `Course: ${courseName}\nRating: ${rating}★\nComment: ${comment.trim() || "(none)"}`); //Locally now
        setRating(0);
        setComment("");
    }
    return(
        <View style ={styles.container}>
            <Text style={styles.title}>{courseName}</Text>
            <Text style={styles.sub}>Course ID: {id}</Text>
            <View style={styles.section}>
                <Text style={styles.label}>Your rating</Text>
                <Rating
                  ratingCount={5}
                  imageSize={30}
                  startingValue={rating}              
                  onFinishRating={(r: number) => setRating(r)}
                  ratingColor="#d4af37"                 
                  ratingBackgroundColor="#bdbdbd"       
                  style={{ paddingVertical: 10 }}
                  />
                  <Text style={styles.hint}>
                    {rating === 0
                      ? "Tap a star to select"
                      : ["Terrible", "Bad", "OK", "Good", "Great"][rating - 1]}
                  </Text>
                </View>
                <View style={styles.section}>
        <Text style={styles.label}>Quick review (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="What stood out? Greens, pace, staff, value..."
          value={comment}
          onChangeText={setComment}
          multiline
          maxLength={500}
          placeholderTextColor="#888"
        />
        <Text style={styles.hint}>{comment.length}/500</Text>
      </View>

      <Pressable style={styles.saveBtn} onPress={submitrating}>
        <Text style={styles.saveBtnText}>Save rating</Text>
      </Pressable>

      <Text style={styles.note}>
      </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "800", color: "#111" },
  sub: { marginTop: 6, fontSize: 14, color: "#555" },

  section: { marginTop: 18 },
  label: { fontSize: 16, fontWeight: "700", marginBottom: 8, color: "#111" },
  hint: { marginTop: 8, fontSize: 13, color: "#666" },


  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    minHeight: 110,
    textAlignVertical: "top",
    fontSize: 15,
    backgroundColor: "#fff",
    color: "#111",
  },

  saveBtn: {
    marginTop: 22,
    backgroundColor: "black",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  saveBtnText: { color: "white", fontSize: 16, fontWeight: "800" },

  note: { marginTop: 14, fontSize: 14, color: "#666" },
});
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { users } from "../../data/users";

const Stories = () => {
  return (
    <View style={{ marginBottom: 13, marginTop: 10 }}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity>
          <Image
            source={{
              url: "https://instagram.fnag1-2.fna.fbcdn.net/v/t51.2885-19/397186397_293736553626970_1271775679860904160_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fnag1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=sXJsAz7P0bsAX-DZ5W3&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAZeCGpbgrgB4QwyKtRoXte2cEhYYWKGjFHSdBZh1GLmg&oe=657C0D85&_nc_sid=8b3546",
            }}
            style={styles.AdminStory}
          />
          <View style={styles.addStoryContainer}>
            <Text style={styles.addStory}>+</Text>
          </View>
        </TouchableOpacity>
        {users.map((story, index) => (
          <View key={index} style={{ alignItems: "center" }}>
            <Image source={{ uri: story.image }} style={styles.story} />
            <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>
              {story.user.length > 11
                ? story.user.slice(0, 10).toLowerCase() + "..."
                : story.user.toLowerCase()}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  story: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 3,
    borderColor: "#ff8501",
  },
  AdminStory: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 15,
    marginRight: 8,
  },
  addStoryContainer: {
    backgroundColor: "#0095F6",
    position: "absolute",
    left: 70,
    bottom: 15,
    width: 25,
    height: 25,
    borderRadius: 30,
    borderWidth: "3px solid black",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  addStory: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 800,
  },
});

export default Stories;

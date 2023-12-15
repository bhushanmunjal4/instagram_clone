import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

export const BottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/ios-filled/50/FFFFFF/home.png",
    inactive: "https://img.icons8.com/ios/50/FFFFFF/home--v1.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png",
    inactive: "https://img.icons8.com/ios/50/FFFFFF/search--v1.png",
  },
  {
    name: "Add",
    active: "https://img.icons8.com/ios-filled/50/FFFFFF/plus-2-math.png",
    inactive: "https://img.icons8.com/ios/50/FFFFFF/plus-2-math.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/FFFFFF/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/50/FFFFFF/instagram-reel.png",
  },
  {
    name: "Profile",
    active:
      "https://instagram.fnag1-2.fna.fbcdn.net/v/t51.2885-19/397186397_293736553626970_1271775679860904160_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fnag1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=rqFV0nI0MlkAX9r_CIG&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAZvYdmTFEfz2Lw06X3svjY0MK3UZ2mkA1kLTfo0hWipg&oe=657E07C5&_nc_sid=8b3546",
    inactive:
      "https://instagram.fnag1-2.fna.fbcdn.net/v/t51.2885-19/397186397_293736553626970_1271775679860904160_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fnag1-2.fna.fbcdn.net&_nc_cat=110&_nc_ohc=rqFV0nI0MlkAX9r_CIG&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAZvYdmTFEfz2Lw06X3svjY0MK3UZ2mkA1kLTfo0hWipg&oe=657E07C5&_nc_sid=8b3546",
  },
];

const BottomTabs = ({ icons, navigation }) => {
  const [activeTab, setActiveTab] = useState("Home");

  const Icon = ({ icon }) => {
    const handlePress = () => {
      setActiveTab(icon.name);
      if (icon.name === "Add") {
        navigation.push("NewPostScreen");
      }
    };
    return (
      <TouchableOpacity onPress={handlePress}>
        <Image
          source={{
            uri: activeTab === icon.name ? icon.active : icon.inactive,
          }}
          style={[
            styles.icon,
            icon.name === "Profile" ? styles.profilePic() : null,
            activeTab === "Profile" && icon.name === activeTab
              ? styles.profilePic(activeTab)
              : null,
          ]}
        />
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {icons.map((icon, index) => (
          <Icon key={index} icon={icon} />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    width: "100%",
    bottom: "3%",
    zIndex: 999,
    backgroundColor: "#000",
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: 60,
    paddingTop: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  profilePic: (activeTab = "") => ({
    borderRadius: 50,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "#fff",
  }),
});
export default BottomTabs;

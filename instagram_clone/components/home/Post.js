import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const Post = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikePress = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  return (
    <View style={{ marginBottom: 30 }}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginLeft: 15, marginRight: 15 }}>
        <PostFooter post={post} />
        <Likes post={post} liked={liked} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ post }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <Image
          source={{ uri: post.profile_picture }}
          style={styles.profilePicture}
        />
        <Text style={{ color: "white" }}>{post.user}</Text>
      </View>

      <View>
        <Text style={{ color: "white", fontSize: 20, marginRight: 20 }}>
          ...
        </Text>
      </View>
    </View>
  );
};

const PostImage = ({ post }) => {
  return (
    <View style={{ margin: 3, width: "100%", height: 300 }}>
      <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
    </View>
  );
};

const PostFooter = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLikePress = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", gap: 15, marginTop: 10 }}>
        <TouchableOpacity onPress={handleLikePress}>
          <Image
            source={
              liked
                ? require("../../assets/heart-filled.png")
                : require("../../assets/heart.png")
            }
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/comment.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../../assets/send.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <View style={{ marginTop: 10 }}>
          <Image
            source={require("../../assets/save.png")}
            style={styles.icon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Likes = ({ post, liked }) => {
  return (
    <View
      style={{
        marginRight: 10,
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 6,
      }}
    >
      <Image source={{ uri: post.imageUrl }} style={styles.likeImage} />
      <Text style={{ color: "#fff", fontWeight: 300 }}>Liked by</Text>
      <Text style={{ color: "#fff", fontWeight: 600 }}>{post.user}</Text>
      <Text style={{ color: "#fff", fontWeight: 600 }}>
        {post.likes} others
      </Text>
    </View>
  );
};

const Caption = ({ post }) => {
  return (
    <View style={{ marginTop: 15, flexDirection: "row", maxWidth: 250 }}>
      <Text style={{ color: "#fff" }}>
        <Text style={{ fontWeight: 600 }}>{post.user}</Text>
        <Text style={{ marginLeft: 10 }}> {post.caption}</Text>
      </Text>
    </View>
  );
};

const CommentSection = ({ post }) => {
  return (
    <View style={{ marginTop: 10 }}>
      {!!post.comments.length && (
        <TouchableOpacity>
          <Text style={{ color: "#999797", fontWeight: 600 }}>
            View {post.comments.length > 1 ? "all" : ""} {post.comments.length}{" "}
            {post.comments.length > 1 ? "comments" : "comment"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Comments = ({ post }) => {
  return (
    <>
      {post.comments.map((comment, index) => (
        <View key={index} style={{ marginTop: 10, flexDirection: "row" }}>
          <Text style={{ color: "#fff" }}>
            <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
            {comment.comment}
          </Text>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  profilePicture: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1.6,
    borderColor: "#ff8501",
  },
  postImage: {
    height: "100%",
    resizeMode: "contain",
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  likeImage: {
    width: 15,
    height: 15,
    borderRadius: 50,
  },
});

export default Post;

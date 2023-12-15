import { users } from "./users";

export const posts = [
  {
    imageUrl:
      "https://images.pexels.com/photos/758898/pexels-photo-758898.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: users[0].user,
    likes: 2153,
    caption: "Perfect day, perfect photo, perfect couple..💍👰🤵",
    profile_picture: users[0].image,
    comments: [
      {
        user: "vaibhavkasbe",
        comment: "Wow!, congratulations to both of you...",
      },
      {
        user: "ashish_kardak",
        comment: "happy couple",
      },
    ],
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: users[1].user,
    likes: 784,
    caption: "Great meeting",
    profile_picture: users[1].image,
    comments: [
      {
        user: "bhushan_munjal",
        comment: " Wow!, congratulations to both of you...",
      },
      {
        user: "ashish_kardak",
        comment: "happy couple",
      },
    ],
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/3777017/pexels-photo-3777017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: users[2].user,
    likes: 80,
    caption: "playing music with friends..",
    profile_picture: users[2].image,
    comments: [
      {
        user: "ashish_kardak",
        comment: "happy couple",
      },
    ],
  },
  {
    imageUrl:
      "https://images.pexels.com/photos/5778892/pexels-photo-5778892.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    user: users[3].user,
    likes: 442,
    caption: "Christmas celebrations at home...",
    profile_picture: users[3].image,
    comments: [
      {
        user: "bhushan_munjal",
        comment: "Merry Christmas to everyone",
      },
    ],
  },
];

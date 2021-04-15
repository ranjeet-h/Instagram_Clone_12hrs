/* eslint-disable no-plusplus */
// NOTE: replace 'NvPY9M9MzFTARQ6M816YAzDJxZ72' with your Firebase auth user id (can be taken from Firebase)
export function seedDatabase(firebase) {
  const users = [
    {
      userId: "UyYiXoAcPFO1ep4wv796CEZHzD03",
      username: "Ranjeet",
      fullName: "Ranjeet Harishchandre",
      emailAddress: "karlhadwen@gmail.com",
      following: ["2"],
      followers: ["2", "3", "4"],
      dateCreated: Date.now(),
    },
    {
      userId: "2",
      username: "Pratimesh",
      fullName: "Pratimesh Shinde",
      emailAddress: "raphael@sanzio.com",
      following: [],
      followers: ["UyYiXoAcPFO1ep4wv796CEZHzD03"],
      dateCreated: Date.now(),
    },
    {
      userId: "3",
      username: "Sachin",
      fullName: "Sachin Shelke",
      emailAddress: "salvador@dali.com",
      following: [],
      followers: ["UyYiXoAcPFO1ep4wv796CEZHzD03"],
      dateCreated: Date.now(),
    },
    {
      userId: "4",
      username: "Rebal",
      fullName: "Rebal Chavan",
      emailAddress: "george@orwell.com",
      following: [],
      followers: ["UyYiXoAcPFO1ep4wv796CEZHzD03"],
      dateCreated: Date.now(),
    },
  ];

  // eslint-disable-next-line prefer-const
  for (let k = 0; k < users.length; k++) {
    firebase.firestore().collection('users').add(users[k]);
  }

  // eslint-disable-next-line prefer-const
  for (let i = 1; i <= 5; ++i) {
    firebase
      .firestore()
      .collection('photos')
      .add({
        photoId: i,
        userId: '2',
        imageSrc: `/images/users/raphael/${i}.jpg`,
        caption: 'Saint George and the Dragon',
        likes: [],
        comments: [
          {
            displayName: 'Pratimesh',
            comment: 'Love this place, looks like my animal farm!'
          },
          {
            displayName: 'Sachin',
            comment: 'Would you mind if I used this picture?'
          }
        ],
        userLatitude: '40.7128°',
        userLongitude: '74.0060°',
        dateCreated: Date.now()
      });
  }
}

import { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import { getPhotos, getUserByUserId } from "../services/firebase";

export default function usePhotos() {
  const [photos, setPhotos] = useState(null);
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      //*example: [2,3,4] <- 2 beaing the user
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];

      //*does the user actually follow people?
      if (following) {
        followedUserPhotos = await getPhotos(userId, following);
      }
      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }
    // console.log("userid", userId);

    getTimelinePhotos();
  }, []);

  return { photos };
}

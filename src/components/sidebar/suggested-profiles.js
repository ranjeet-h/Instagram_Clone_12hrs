import React from 'react'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowedUserFolowers, updateLoggedInUserFollowing } from '../../services/firebase';


export default function SuggestedProfile({
  profileDocId,
  username,
  profileId,
  userId,
  loggedInUserDocId,
}) {
  const [followed, setFollowed] = useState(false);

  async function handleFollowUser() {
    setFollowed(true);
    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFolowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row item-center align-items justify-between ">
      <div className="flex items-center justify-between">
        <img
          className="w-6 flex mr-3 mt-2"
          src="/images/avatars/avatar.png"
          alt=""
        />
        <Link to={`/p/${username}`}>
          <p className="font-bold text-sm">{username}</p>
        </Link>
      </div>

      <button
        className="text-xs font-bold text-blue-medium"
        type="button"
        onClick={handleFollowUser}
      >
        Follow
      </button>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};


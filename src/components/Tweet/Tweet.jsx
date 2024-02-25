import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import { ReactComponent as Circle } from '../../assets/images/circle.svg';
import s from './Tweet.module.css';
import picture1 from '../../assets/images/picture@1x.png';
import picture2 from '../../assets/images/picture@2x.png';

const followersComa = number => {
  return number.toLocaleString('en-US');
};

export const Tweet = ({ id, user, tweets, followers, avatar }) => {
  const [follow, setFollow] = useState(false);
  const [followsAmount, setFollowsAmount] = useState(followers);
  const formatedFollowers = followersComa(followsAmount);

  useEffect(() => {
    const refreshFollowings = localStorage.getItem('FollowingCards');
    if (refreshFollowings) {
      const followingCards = JSON.parse(refreshFollowings);
      if (followingCards[id]) setFollow(true);
    }
  }, [id]);

  const updateFollowingCards = (id, status) => {
    let followingCards = JSON.parse(
      localStorage.getItem('FollowingCards') || '{}'
    );
    if (status) {
      followingCards[id] = true;
    } else {
      delete followingCards[id];
    }
    localStorage.setItem('FollowingCards', JSON.stringify(followingCards));
  };

  const handleFollow = () => {
    if (!follow) {
      setFollow(true);
      setFollowsAmount(prev => prev + 1);
      updateFollowingCards(id, true);
    } else {
      setFollow(false);
      setFollowsAmount(prev => prev - 1);
      updateFollowingCards(id, false);
    }
  };

  return (
    <>
      <li key={id} className={s.user_card}>
        <Logo className={s.logo} />
        <picture className={s.picture}>
          <source srcSet={`${picture1} 1x, ${picture2} 2x`} type="image/png" />
          <img src={picture1} alt="ChatPhoto" />
        </picture>
        <img src={avatar} alt={`Avatar of ${user}`} className={s.photo} />
        <Circle className={s.circle} />
        <div className={s.decoration_line} />
        <p className={s.user_tweets}>{tweets} tweets</p>
        <p className={s.user_followers}>{formatedFollowers} followers</p>
        <button
          className={follow ? s.button_following : s.button}
          type="button"
          onClick={handleFollow}
        >
          {follow ? 'Following' : 'Follow'}
        </button>
      </li>
    </>
  );
};

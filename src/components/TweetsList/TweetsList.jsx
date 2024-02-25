import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { selectUsers } from '../../redux/selectors';
import { Tweet } from '../Tweet/Tweet';

import s from './TweetsList.module.css';

export const TweetsList = () => {
  const users = useSelector(selectUsers);
  const [currentUsers, setCurrentUsers] = useState(3);
  const [selectedOption, setSelectedOption] = useState('all');

  useEffect(() => {
    if (currentUsers === users.length) {
      toast.info('You have reached the end of tweets.');
    }
  }, [currentUsers, users]);

  const handleLoadMore = () => {
    setCurrentUsers(prev => prev + 3);
  };

  let filteredUsers = users;
  const followingsUsers = JSON.parse(
    localStorage.getItem('FollowingCards') || '{}'
  );

  if (selectedOption === 'followings') {
    filteredUsers = users.filter(user => followingsUsers[user.id]);
  } else if (selectedOption === 'follow') {
    filteredUsers = users.filter(user => !followingsUsers[user.id]);
  }
  return (
    <>
      <select
        className={s.select}
        value={selectedOption}
        onChange={e => setSelectedOption(e.target.value)}
      >
        <option className={s.select_option} value="all">
          All
        </option>
        <option className={s.select_option} value="follow">
          Follow
        </option>
        <option className={s.select_option} value="followings">
          Followings
        </option>
      </select>
      <ul className={s.users_list}>
        {filteredUsers?.slice(0, currentUsers).map(user => (
          <Tweet
            key={user.id}
            user={user.user}
            avatar={user.avatar}
            tweets={user.tweets}
            id={user.id}
            followers={user.followers}
          />
        ))}
      </ul>
      {currentUsers < users.length && (
        <button
          className={s.btn_load_more}
          type="button"
          onClick={handleLoadMore}
        >
          Load more
        </button>
      )}
    </>
  );
};

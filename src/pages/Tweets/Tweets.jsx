import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { fetchUsersThunk } from '../../redux/operations';
import { selectIsLoading, selectUsers } from '../../redux/selectors';
import { Loader, TweetsList } from 'components';

import s from './Tweets.module.css';

export const Tweets = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const users = useSelector(selectUsers);

  const [photoLoading, setPhotoLoading] = useState(true);

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPhotoLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isLoading && !photoLoading && users.length > 0) {
      toast.success(`We found ${users.length} tweets.`);
    }
  }, [isLoading, photoLoading, users]);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Link to="/" className={s.link}>
          Back
        </Link>
        <h1 className={s.title}>TWEETS</h1>
      </div>
      {isLoading || photoLoading ? <Loader /> : <TweetsList />}
    </div>
  );
};

import { IGetFriendNearUser } from '@/@type/redux';
import { Card, Layout } from '@/components';
import UserDetail from '@/components/Finding/UserDetail';
import { NotifyContainer } from '@/containers';
import { RootState, useAppDispatch, useAppSelector } from '@/redux';
import {
  getFriendNearUser,
  getLastLocation,
} from '@/redux/slice/mapLocationSlice';
import { createUserBlock } from '@/redux/slice/userBlockSlice';
import {
  createUserLikeStack,
  deleteUserLikeStacks,
  getMatchingFriends,
} from '@/redux/slice/userLikeStackSlice';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { EffectCreative } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { Swiper, SwiperSlide } from 'swiper/react';
import MatchPage from '../matching';
import UserCard from './components/UserCard';

const FindingPage = () => {
  const dispatch = useAppDispatch();

  const cardRef = useRef<HTMLDivElement>(null);
  const notifyRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const matchingRef = useRef<HTMLDivElement>(null);

  const { friendsNearUser } = useAppSelector(
    (state: RootState) => state.mapLocationSlice,
  );
  const { matching } = useAppSelector(
    (state: RootState) => state.userLikeStackSlice,
  );
  const [nearbyUsers, setNearbyUsers] = useState<IGetFriendNearUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IGetFriendNearUser | null>();

  const onOverlayClick = useCallback(() => {
    if (notifyRef.current && !notifyRef.current.hidden && overlayRef.current) {
      notifyRef.current.hidden = true;
      overlayRef.current.hidden = true;
      overlayRef.current.classList.remove('overlay-notiShow');
    }

    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.classList.remove('popup');
      overlay.classList.remove('overlay-show');

      // card.hidden = true;
      // overlay.hidden = true;
      // setTimeout(() => {
      // }, 1000);
    }
    setSelectedUser(null);
  }, []);

  const openPopUp = useCallback(() => {
    if (cardRef.current && overlayRef.current) {
      const card = cardRef.current;
      const overlay = overlayRef.current;

      card.hidden = false;
      overlay.hidden = false;

      setTimeout(() => {
        overlay.classList.add('overlay-show');
        card.classList.add('popup');
      }, 10);
    }
  }, []);

  const openNotify = () => {
    if (notifyRef.current && overlayRef.current) {
      const overlay = overlayRef.current;

      notifyRef.current.hidden = false;
      overlay.hidden = false;

      overlay.classList.add('overlay-notiShow');
      // setTimeout(() => {
      // }, 10);
    }
  };

  const openMatchPagePopUp = useCallback(() => {
    if (matchingRef.current) {
      const matching = matchingRef.current;

      matching.hidden = false;

      setTimeout(() => {
        matching.classList.add('show');
      }, 10);
    }
  }, []);

  const closeMatchPagePopUp = useCallback(() => {
    if (matchingRef.current) {
      const match = matchingRef.current;
      const ids = matching.map((el) => el.id);
      ids.length && dispatch(deleteUserLikeStacks({ ids: ids }));
      match.classList.remove('show');
      return;
    }
  }, []);

  const onLike = (id: string) => {
    dispatch(createUserLikeStack({ toUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };

  const onDislike = (id: string) => {
    dispatch(createUserBlock({ blockedUserId: id }));
    setNearbyUsers(
      nearbyUsers.filter((user) => {
        return user.id !== id;
      }),
    );
  };

  const onCheckInfo = (user: IGetFriendNearUser) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    dispatch(getFriendNearUser());
  }, []);

  useEffect(() => {
    dispatch(getLastLocation());
  }, []);

  useEffect(() => {
    dispatch(getMatchingFriends());
  }, []);

  useEffect(() => {
    setNearbyUsers(friendsNearUser);
  }, [friendsNearUser]);

  return (
    <Layout
      isLogo={false}
      title="Find stranger"
      isHeader={false}
      isFooter={true}
    >
      <div className="findingPage">
        <div className="findingPage-header">
          <h2 className="findingPage-header-brandName">Tinai</h2>
          <Image
            onClick={openNotify}
            src="/assets/images/notification-bell.svg"
            alt="bell"
            width={'20px'}
            height={'20px'}
          />
        </div>
        <Swiper
          className="findingPage-container"
          grabCursor={true}
          effect={'creative'}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ['-130%', 0, -500],
            },
            next: {
              shadow: true,
              translate: ['130%', 0, -500],
            },
          }}
          modules={[EffectCreative]}
        >
          {nearbyUsers.length > 0 ? (
            nearbyUsers.map((user, index) => (
              <SwiperSlide key={index} className="findingPage-container-swiper">
                <UserCard
                  user={user}
                  onLike={onLike}
                  onDislike={onDislike}
                  onCheckInfo={onCheckInfo}
                  onInfoClick={openPopUp}
                />
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide>
              <div
                className="findingPage-cardEmpty"
                style={{
                  backgroundImage: `url('./assets/images/empty-finding.jpg')`,
                }}
              >
                <div className="findingPage-card-empty">
                  <p className="findingPage-card-empty-content">
                    Oops , no one&apos;s around
                  </p>
                </div>
              </div>
            </SwiperSlide>
          )}
        </Swiper>
        <Card
          hasCloseBtn={true}
          onCloseCard={onOverlayClick}
          height={'90vh'}
          ref={cardRef}
        >
          {selectedUser && (
            <UserDetail
              user={selectedUser}
              onLike={onLike}
              onDislike={onDislike}
              onCloseModal={onOverlayClick}
            />
          )}
        </Card>
        <NotifyContainer ref={notifyRef} height={'100px'} />
        <div
          className="overlay"
          hidden
          onClick={onOverlayClick}
          ref={overlayRef}
        ></div>
        <MatchPage
          matching={matching}
          matchingRef={matchingRef}
          openMatchPagePopUp={openMatchPagePopUp}
          closeMatchPagePopUp={closeMatchPagePopUp}
        />
      </div>
    </Layout>
  );
};

export default FindingPage;

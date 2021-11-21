import React, { Fragment } from 'react';
import { Navbar } from '../Components/common';
import styles from './MainPage.module.scss';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import ROUTES from '../constants/routes';
import { UilArrowUp, UilArrowDown } from '@iconscout/react-unicons';
import VerticalCarousel from '../Components/verticalSlider/VerticalCarousel';
import mockData from '../constants/mockData.json';
import AnimationPage from '../Components/AnimationPage';

const cx = classNames.bind(styles);

function MainPage() {
  const history = useHistory();
  const handleStart = () => history.push(ROUTES.LOGIN);
  const handleArrowUp = () => {
    
  };
  const handleArrowDown = () => {
    
  };

  return (
    <Fragment>
      <Navbar />
        <div className={cx('mainContainer')}>
          <div></div>
          <div className={cx('leftContainer')}>
            <p>EveReview</p>
            <div className={cx('mainDescription')}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut accumsan placerat tellus, a finibus justo facilisis euismod. 
            </div>
            <div className={cx('startButton')} onClick={handleStart}>시작하기</div>
            <VerticalCarousel data={mockData.data} leadingText="" />
          </div>
          <div className={cx('rightContainer')}>
            <AnimationPage />
            </div>
          <div></div>
        </div>
    </Fragment>
  );
}

export default MainPage;

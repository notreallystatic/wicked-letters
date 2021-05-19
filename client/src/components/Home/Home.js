import react from 'react';
import { Link } from 'react-router-dom';
import { Illustrations } from '../../utils';
import style from './Home.module.css';

export const Home = (props) => {
  return (
    <>
      <div className={style.home}>
        <div className='row  m-0 my-1'>
          <div className='col-xs-12 col-md-4 m-0 p-0'>
            <img
              alt=''
              src={Illustrations.Home1}
              className={`${style.home1} ${style.left}`}
            />
          </div>
          <div className={`col-xs-12 col-md-8 ${style.text}`}>
            We understand how badly people want your mail address & that’s why
            you don’t need to sign up for every other newsletter out there!{' '}
          </div>
        </div>
        <div className='row my-4 mx-0'>
          <div className='col-xs-12 col-md-4 order-md-2 m-0'>
            <img
              alt=''
              src={Illustrations.Home2}
              className={`${style.home2} ${style.left}`}
            />
          </div>
          <div className={`col-xs-12 col-md-8 ${style.text}`}>
            Yes, you can directly choose the top ones in various categories,
            rated by our lovely users over the internet.{' '}
          </div>
        </div>
        <div className='row  mb-4 my-1 mx-0'>
          <div className='col-xs-12 col-md-4 m-0'>
            <img
              alt=''
              src={Illustrations.Home3}
              className={`${style.home3} ${style.left}`}
            />
          </div>
          <div className={`col-xs-12 col-md-8 ${style.text}`}>
            So, what are you waiting for? Go look who’s on the top in your
            favorite category & sign up to move your favorite one up in the
            charts!
          </div>
        </div>
      </div>
    </>
  );
};

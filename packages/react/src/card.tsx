import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { LoadingIcon } from './icons';
import Challenge from './challenge';
import type { Trail } from './slider-captcha';
type Captcha = {
  slider: {
    type: string,
    data: Array<number>
  }
  background:{
    type: string,
    data: Array<number>
  }
}
type Props = {
  fetchCaptcha: () => Promise<Captcha>
  submitResponse: (_:Response, trail:Trail) => any
  text:  {
    challenge:React.ReactNode
  }
}
const Card = ({ text, fetchCaptcha, submitResponse }: Props) => {
  const [key, setKey] = useState(Math.random());
  const [captcha, setCaptcha] = useState<Captcha>();
  const isMounted = useRef(false);

  const refreshCaptcha = () => {
    fetchCaptcha().then((newCaptcha: Captcha) => {
      setTimeout(() => {
        if (!isMounted.current) return;
        setKey(Math.random());
        setCaptcha(newCaptcha);
      }, 300);
    });
  };
  const completeCaptcha = (response: any, trail: any): Promise<boolean> =>
    new Promise((resolve) => {
      submitResponse(response, trail).then((verified: boolean) => {
        if (verified) {
          resolve(true);
        } else {
          refreshCaptcha();
          resolve(false);
        }
      });
    });

  useEffect(() => {
    isMounted.current = true;
    refreshCaptcha();
    return () => { isMounted.current = false; };
  }, []);

  return (
    <div className="scaptcha-card-container scaptcha-card-element">
      {captcha ? (
        <Challenge
          key={key}
          text={text}
          captcha={captcha}
          completeCaptcha={completeCaptcha}
        />
      ) : (
        <div className="scaptcha-card-loading scaptcha-card-element">
          <LoadingIcon />
        </div>
      )}
    </div>
  );
};

Card.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
};

export default Card;

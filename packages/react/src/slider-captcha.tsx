import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Anchor from './anchor';
import Theme, { ThemeVariant } from './theme';


export type Trail = {
  x: number[]
  y: number[]
}
const fetchCaptcha = (create: RequestInfo | (() => any)) => () => ((create instanceof Function)
  ? create() // Use provided promise for getting background and slider
  : fetch(create, {
    // Use create as API URL for fetch
    method: 'GET',
    credentials: 'include',
  }).then((message) => message.json()));
export type FetchCaptcha = typeof fetchCaptcha

const fetchVerification = (verify: RequestInfo | ((_:number, trail: Trail) => any)) => (_:number, trail: Trail) => ((verify instanceof Function)
  ? verify(_, trail) // Use provided promise for verifying captcha
  : fetch(verify, {
    // Verification API URL provided instead
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      response: _,
      trail,
    }),
  }).then((message) => message.json()));

type SliderCaptchaProps = {
  variant: ThemeVariant
  visible: boolean
  callback: (token: string) => any
  create:  RequestInfo | (() => any)
  verify: RequestInfo | ((_:Response, trail: Trail) => any)
  text: {
    anchor: React.ReactNode
    challenge: React.ReactNode
  }
}

type Verification = {
  result: string
  token: string

}

const SliderCaptcha = ({
  callback,
  create,
  verify,
  variant,
  text,
  visible: _visible,
} : SliderCaptchaProps) => {
  const [verified, setVerified] = useState(false);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (_visible !== visible) {
      setVisible(_visible);
    }
  }, [_visible, visible]);
  const submitResponse = (_: number, trail:Trail) => new Promise((resolve) => {
    fetchVerification(verify)(_, trail)
      .then((verification: Verification) => {
        if (
          !verification.result
            || verification.result !== 'success'
            || !verification.token
        ) {
          resolve(false);
        } else {
          setTimeout(() => {
            callback(verification.token);
            setVerified(true);
          }, 500);
          resolve(true);
        }
      });
  });
  return (
    <div className="scaptcha-container" style={{ display: visible ? 'block' : 'none' }}>
      <Theme variant={variant} />
      <Anchor
        visible={visible}
        text={text}
        fetchCaptcha={fetchCaptcha(create)}
        submitResponse={submitResponse}
        verified={verified}
      />
    </div>
  );
};

SliderCaptcha.propTypes = {
  callback: PropTypes.func,
  create: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  verify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  variant: PropTypes.string,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }),
};

SliderCaptcha.defaultProps = {
  callback: (token: string) => console.log(token), // eslint-disable-line no-console
  create: 'captcha/create',
  verify: 'captcha/verify',
  variant: 'light',
  text: {
    anchor: 'I am human',
    challenge: 'Slide to finish the puzzle',
  },
};

export default SliderCaptcha;

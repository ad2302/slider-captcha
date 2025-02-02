import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './card';
import type { Trail } from './slider-captcha';
// import { SuccessIcon } from './icons';
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
  fetchCaptcha:  () => Promise<Captcha>
  visible: boolean
  submitResponse: (_:number, trail:Trail) => any
  verified: boolean
  text: {
    challenge:React.ReactNode
  }
}
const Anchor = ({
  text,
  visible: _visible,
  fetchCaptcha,
  submitResponse,
  verified,
}: Props) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (_visible !== open) {
      setOpen(_visible);
    }
  }, [_visible, open]);

  const handleClose = () => { setOpen(false); };
  // const handleOpen = () => { setOpen(true); };
  // const handleKey = (e) => {
  //   if (e.code === 'Enter' || e.code === 'Space') {
  //     setOpen(true);
  //   } else if (e.key === 'Escape') {
  //     setOpen(false);
  //   }
  // };
  return (
    <div>
      {/* <div
        className="scaptcha-anchor-container scaptcha-anchor-element"
        onClick={handleOpen}
      >
        <button
          suppressHydrationWarning
          type="button"
          className={`scaptcha-anchor-checkbox ${!verified && 'scaptcha-anchor-checkbox-default'} scaptcha-anchor-element`}
          onKeyUp={handleKey}
        >
          {verified && (
            <SuccessIcon />
          )}
        </button>
        <div className="scaptcha-anchor-label scaptcha-anchor-element">
          {text.anchor}
        </div>
      </div> */}
      {!verified && open && (
        <div>
          <div className="scaptcha-hidden" onClick={handleClose} />
          <Card
            fetchCaptcha={fetchCaptcha}
            submitResponse={submitResponse}
            text={text}
          />
        </div>
      )}
    </div>
  );
};

Anchor.propTypes = {
  fetchCaptcha: PropTypes.func.isRequired,
  submitResponse: PropTypes.func.isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
  verified: PropTypes.bool.isRequired,
};

export default Anchor;

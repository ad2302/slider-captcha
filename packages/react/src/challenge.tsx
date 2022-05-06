import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Buffer } from 'buffer';
import { ArrowIcon, SuccessIcon, FailureIcon } from './icons';
import type { Trail } from './slider-captcha';
const imageDataUrl = (image: any) => `data:image/png;base64,${Buffer.from(image).toString('base64')}`;
type ReactMouseOrTouchEventHandler = React.MouseEventHandler<HTMLDivElement> | React.TouchEventHandler<HTMLDivElement>
type ReactMouseOrTouchEvent = React.MouseEvent<HTMLDivElement, MouseEvent> | React.TouchEvent<HTMLDivElement>
const slider = {
  default: {
    track: 'scaptcha-card-slider-track-default',
    control: 'scaptcha-card-slider-control-default',
    icon: <ArrowIcon />,
  },
  active: {
    track: 'scaptcha-card-slider-track-active',
    control: 'scaptcha-card-slider-control-active',
    icon: <ArrowIcon />,
  },
  success: {
    track: 'scaptcha-card-slider-track-success',
    control: 'scaptcha-card-slider-control-success',
    icon: <SuccessIcon />,
  },
  failure: {
    track: 'scaptcha-card-slider-track-failure',
    control: 'scaptcha-card-slider-control-failure',
    icon: <FailureIcon />,
  },
};
type Props = {
  text: {
    challenge:React.ReactNode
  }
  completeCaptcha: (a:number, b:Trail) => Promise<boolean>
  captcha: {
    slider: {
      type: string,
      data: Array<number>
    }
    background: {
      type: string,
      data:  Array<number>
    }
  }
}

const Challenge = ({ text, captcha, completeCaptcha }: Props) => {
  const [sliderVariant, setSliderVariant] = useState(slider.default);
  const [solving, setSolving] = useState(false);
  const [submittedResponse, setSubmittedResponse] = useState(false);
  const [origin, setOrigin] = useState({
    x: 0,
    y: 0,
  });
  const [trail, setTrail] = useState({
    x: [0],
    y: [0],
  });

  // Converts distances along the control track to corresponding distances moved by the puzzle piece
  const scaleSliderPosition = (x: number) => 5 + 0.86 * x;

  const handleStart: ReactMouseOrTouchEventHandler = (e: ReactMouseOrTouchEvent) => {
    if (submittedResponse) return;
    setOrigin({
      x: (e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>).clientX || (e as unknown as React.TouchEvent<HTMLDivElement>).touches[0].clientX,
      y: (e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>).clientY || (e as unknown as React.TouchEvent<HTMLDivElement>).touches[0].clientY,
    });
    setSolving(true);
    setSliderVariant(slider.active);
  };

  const handleMove: ReactMouseOrTouchEventHandler = (e: ReactMouseOrTouchEvent) => {
    if (!solving || submittedResponse) return;
    const move = {
      x: ((e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>).clientX || (e as unknown as React.TouchEvent<HTMLDivElement>).touches[0].clientX) - origin.x,
      y: ((e as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>).clientY || (e as unknown as React.TouchEvent<HTMLDivElement>).touches[0].clientY) - origin.y,
    };
    if (move.x > 225 || move.x < 0) return; // Don't update if outside bounds of captcha
    setTrail({
      x: trail.x.concat([move.x]),
      y: trail.y.concat([move.y]),
    });
  };

  const handleEnd = () => {
    if (!solving || submittedResponse) return;
    setSubmittedResponse(true);
    completeCaptcha(
      scaleSliderPosition(trail.x[trail.x.length - 1]),
      trail,
    ).then((validated) => {
      setSliderVariant(validated ? slider.success : slider.failure);
    });
  };

  const handleEnter = () => {
    if (solving || submittedResponse) return;
    setSliderVariant(slider.active);
  };

  const handleLeave = () => {
    if (solving) return;
    setSliderVariant(slider.default);
  };

  return (
    <div
      className="scaptcha-card-element"
      draggable="false"
      onMouseMove={handleMove as unknown as  React.MouseEventHandler<HTMLDivElement>}
      onTouchMove={handleMove as unknown as React.TouchEventHandler<HTMLDivElement>}
      onTouchEnd={handleEnd}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div
        className="scaptcha-card-background scaptcha-card-element"
        style={{
          backgroundImage: `url('${imageDataUrl(captcha.background)}')`,
        }}
      />
      <div
        className="scaptcha-card-slider-puzzle scaptcha-card-element"
        style={{
          backgroundImage: `url('${imageDataUrl(captcha.slider)}')`,
          left: `${scaleSliderPosition(trail.x[trail.x.length - 1])}px`,
        }}
        onMouseDown={handleStart as unknown as React.MouseEventHandler<HTMLDivElement>}
        onTouchStart={handleStart as unknown as React.TouchEventHandler<HTMLDivElement>}
      />
      <div className="scaptcha-card-slider-container scaptcha-card-element">
        <div className="scaptcha-card-slider-track scaptcha-card-element" />
        <div
          className="scaptcha-card-slider-label scaptcha-card-element"
          style={{ opacity: solving ? 0 : 1 }}
        >
          <span>{text.challenge}</span>
        </div>
        <div
          className={`scaptcha-card-slider-mask ${sliderVariant.track} scaptcha-card-element`}
          style={{ width: `${trail.x[trail.x.length - 1] + 30}px` }}
        />
        <div
          className="scaptcha-card-slider-container scaptcha-card-element"
          draggable="false"
        />
        <div
          className={`scaptcha-card-slider-control ${sliderVariant.control} scaptcha-card-element`}
          style={{ left: `${trail.x[trail.x.length - 1]}px` }}
          onMouseDown={handleStart as unknown as React.MouseEventHandler<HTMLDivElement>}
          onTouchStart={handleStart as unknown as React.TouchEventHandler<HTMLDivElement>}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {sliderVariant.icon}
        </div>
      </div>
    </div>
  );
};

Challenge.propTypes = {
  completeCaptcha: PropTypes.func.isRequired,
  captcha: PropTypes.shape({
    slider: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
    background: PropTypes.shape({
      type: PropTypes.string,
      data: PropTypes.arrayOf(PropTypes.number),
    }),
  }).isRequired,
  text: PropTypes.shape({
    anchor: PropTypes.string,
    challenge: PropTypes.string,
  }).isRequired,
};

export default Challenge;

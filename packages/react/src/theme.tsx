import React from 'react';
import PropTypes from 'prop-types';

// import lightTheme from 'bundle-text:./style/light.scss';
// import darkTheme from 'bundle-text:./style/dark.scss';

import lightTheme from './style/light.scss';
import darkTheme from './style/dark.scss';


export type ThemeVariant = 'dark' | 'light';
type Props = {
  variant: ThemeVariant;
};
const Theme = ({ variant }: Props) =>{
  return  (
    <style suppressHydrationWarning>
      {variant === 'dark' ? darkTheme : lightTheme}
    </style>
  )
};

Theme.propTypes = {
  variant: PropTypes.string.isRequired,
};

export default Theme;

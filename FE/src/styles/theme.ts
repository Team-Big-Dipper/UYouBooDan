import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  // color: {
  //   purple: '#8661de',
  //   blue: '#00bac7',
  // },
  // boxShadow: {
  //   normal: '0 3px 8px 0 rgb(0 0 0 / 10%)',
  //   purple: '0 3px 8px 0 #d6c9ff',
  //   blue: '0 3px 8px 0 #b3e2e6',
  // },
};

const customMediaQuery = (maxWidth: number): string =>
  `@media (max-width: ${maxWidth}px)`;

export const MIXINS = {
  // flex
  flexBox: (direction = 'row', align = 'center', justify = 'center') => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,

  // positions
  positionCenter: (type = 'absolute') => {
    if (type === 'absolute' || type === 'fixed')
      return `
        position: ${type};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
    return;
  },
};

export const media = {
  custom: customMediaQuery,
  pc: customMediaQuery(1440),
  tablet: customMediaQuery(768),
  mobile: customMediaQuery(576),
};

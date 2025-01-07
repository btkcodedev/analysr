export const themes = {
  light: {
    primary: 'blue',
    secondary: 'purple',
    background: 'white',
    text: 'gray-900'
  },
  dark: {
    primary: 'blue',
    secondary: 'purple',
    background: 'gray-900',
    text: 'white'
  },
  forest: {
    primary: 'emerald',
    secondary: 'teal',
    background: 'gray-900',
    text: 'white'
  },
  sunset: {
    primary: 'orange',
    secondary: 'rose',
    background: 'gray-900',
    text: 'white'
  }
} as const;

export type ThemeKey = keyof typeof themes;
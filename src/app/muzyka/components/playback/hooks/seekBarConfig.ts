export const SEEK_BAR_CONFIG = {
    DEBOUNCE_DELAY: 16,
    SEEK_STEP: {
      ARROW: 5,
      PAGE: 30,
      PINCH: 1,
      DOUBLE_TAP: 10
    },
    VIBRATION_PATTERN: {
      TAP: 10,
      DOUBLE_TAP: [10, 40, 10],
      LONG_PRESS: [15, 50, 15],
      PINCH: [5, 20, 5]
    },
    TOUCH: {
      LONG_PRESS_DELAY: 500,
      DOUBLE_TAP_DELAY: 300,
      PINCH_SENSITIVITY: 1.5
    },
    ANIMATION: {
      DURATION: 150,
      EASING: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    PREVIEW: {
      OFFSET: 8,
      PADDING: '0.5rem',
      BACKGROUND_OPACITY: 0.75
    }
  } as const;
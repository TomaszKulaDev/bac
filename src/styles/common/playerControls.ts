export const playerStyles = {
  colors: {
    primary: "amber-500",
    primaryHover: "amber-600",
    primaryActive: "amber-700",
    secondary: "gray-600",
    background: "white",
    border: "gray-300",
    text: {
      primary: "gray-900",
      secondary: "gray-500",
    },
  },

  controls: {
    button: `
      transition-all duration-150 ease-in-out
      disabled:opacity-50 disabled:cursor-not-allowed
    `,
    iconButton: `
      text-gray-600 hover:text-amber-500
      p-2 rounded-full
      hover:bg-gray-50 active:bg-gray-100
      active:scale-95
    `,
    primaryButton: `
      bg-amber-500 text-white
      hover:bg-amber-600
      active:bg-amber-700
      rounded-full p-2 shadow-lg
    `,
    range: `
      appearance-none bg-gray-200 
      rounded-full cursor-pointer
      [&::-webkit-slider-thumb]:appearance-none 
      [&::-webkit-slider-thumb]:w-3 
      [&::-webkit-slider-thumb]:h-3 
      [&::-webkit-slider-thumb]:rounded-full 
      [&::-webkit-slider-thumb]:bg-amber-500
      hover:[&::-webkit-slider-thumb]:bg-amber-400
    `,
    activeIconButton: `
      text-amber-500 
      bg-gray-100/80 
      shadow-inner 
      transform 
      translate-y-px
    `,
  },
};

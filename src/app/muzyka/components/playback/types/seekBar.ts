export interface SeekBarEvent extends React.MouseEvent<HTMLDivElement> {
    currentTarget: HTMLDivElement;
  }
  
  export interface SeekBarTouchEvent extends React.TouchEvent<HTMLDivElement> {
    currentTarget: HTMLDivElement;
  }
  
  export interface SeekBarGestureEvent {
    type: 'tap' | 'doubleTap' | 'longPress' | 'pinch';
    position: number;
    scale?: number;
    velocity?: number;
  }
  
  export interface SeekBarAnimationState {
    isAnimating: boolean;
    progress: number;
    velocity: number;
  }
  
  export interface SeekBarPreviewState {
    isVisible: boolean;
    position: number;
    time: number;
  }
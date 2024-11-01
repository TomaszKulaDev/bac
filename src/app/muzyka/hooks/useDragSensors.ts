import { useSensors, useSensor, PointerSensor } from '@dnd-kit/core';

export const useDragSensors = () => {
  return useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
}; 
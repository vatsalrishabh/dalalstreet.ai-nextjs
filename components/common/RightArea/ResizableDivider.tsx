import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/redux/store';
import { setIsResizing, setPanelWidth } from '@/store/redux/slices/uiSlice';

const ResizableDivider = () => {
  const dispatch = useDispatch();
  const isResizing = useSelector((state: RootState) => state.ui.isResizing);

  const handleMouseDown = () => {
    dispatch(setIsResizing(true));

    const onMouseMove = (e: MouseEvent) => {
      dispatch(setPanelWidth(Math.min(600, Math.max(280, window.innerWidth - e.clientX))));
    };

    const onMouseUp = () => {
      dispatch(setIsResizing(false));
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      className="w-1 bg-neutral-600 hover:bg-emerald-500 cursor-col-resize transition-colors flex-shrink-0"
      onMouseDown={handleMouseDown}
      style={{ zIndex: 50, backgroundColor: isResizing ? '#10b981' : '#525252' }}
    />
  );
};

export default ResizableDivider;

import { Profiler } from 'react';
export const onRenderCallback = (id, phase, actualDuration) => {
  console.log(`[${id}] ${phase} took ${actualDuration}ms`);
};
export const ProfilerComponent = ({ id, children }) => (
  <Profiler id={id} onRender={onRenderCallback}>
    {children}
  </Profiler>
);
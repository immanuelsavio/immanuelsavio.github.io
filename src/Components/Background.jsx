import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-accent-dark/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
    </div>
  );
};

export default Background;

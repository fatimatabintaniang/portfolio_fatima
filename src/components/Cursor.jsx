// src/components/Cursor.jsx
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;
    let mouseX = 0, mouseY = 0;
    let posX = 0, posY = 0;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursor) {
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
      }
    };

    const animate = () => {
      posX += (mouseX - posX) * 0.12;
      posY += (mouseY - posY) * 0.12;
      if (follower) {
        follower.style.left = posX + 'px';
        follower.style.top = posY + 'px';
      }
      requestAnimationFrame(animate);
    };

    const onEnterLink = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(2.5)';
      if (follower) { follower.style.transform = 'translate(-50%, -50%) scale(1.5)'; follower.style.opacity = '0.8'; }
    };

    const onLeaveLink = () => {
      if (cursor) cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      if (follower) { follower.style.transform = 'translate(-50%, -50%) scale(1)'; follower.style.opacity = '0.4'; }
    };

    document.addEventListener('mousemove', onMove);
    animate();

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    return () => {
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="cursor"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={followerRef}
        className="cursor-follower"
        style={{ transform: 'translate(-50%, -50%)' }}
      />
    </>
  );
}

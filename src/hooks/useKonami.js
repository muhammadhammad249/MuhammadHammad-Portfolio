import { useEffect, useState, useRef } from 'react';

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

export function useKonami(onTrigger) {
  const [isTriggered, setIsTriggered] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_CODE[indexRef.current].toLowerCase();

      if (key === expected) {
        indexRef.current += 1;
        if (indexRef.current === KONAMI_CODE.length) {
          setIsTriggered(true);
          onTrigger?.();
          indexRef.current = 0;
          setTimeout(() => setIsTriggered(false), 5000);
        }
      } else {
        indexRef.current = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onTrigger]);

  return isTriggered;
}


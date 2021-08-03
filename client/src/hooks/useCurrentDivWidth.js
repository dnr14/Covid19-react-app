import { useLayoutEffect, useRef, useState } from "react";

const optimizeAnimation = (callback) => {
  let ticking = false;
  return (e) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        callback(e);
        ticking = false;
      });
    }
  };
};

const useCurrentDivWidth = (divRef, paddingWidth = 0) => {

  const debounce = useRef(false);
  const [divWidth, setDivWidth] = useState({ _50: 0, _100: 0 });

  useLayoutEffect(() => {

    const getDivRefWidth = () => {
      return window.innerWidth < 993 ? divRef.current.clientWidth : divRef.current.clientWidth / 2 - paddingWidth;
    };

    setDivWidth({
      _50: getDivRefWidth(),
      _100: divRef.current.clientWidth,
    });

    const handleResize = optimizeAnimation(() => {
      if (debounce.current) {
        clearTimeout(debounce.current);
      }
      debounce.current = setTimeout(() => {
        setDivWidth({
          _50: getDivRefWidth(),
          _100: divRef.current.clientWidth,
        });
      }, 100);
    });

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [divRef, paddingWidth]);

  return divWidth;
}
export default useCurrentDivWidth;
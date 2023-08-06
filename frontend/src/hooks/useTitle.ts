import { useEffect, useRef } from "react";

export interface UseTitleOptions {
  restoreOnUnmount?: boolean;
}

const DEFAULT_USE_TITLE_OPTIONS: UseTitleOptions = {
  restoreOnUnmount: false,
};

function useTitle(
  title: string,
  options: UseTitleOptions = DEFAULT_USE_TITLE_OPTIONS
) {
  const previousTitle = useRef(document.title);

  if (document.title !== title) document.title = title;

  useEffect(() => {
    if (options && options.restoreOnUnmount) {
      return () => {
        document.title = previousTitle.current;
      };
    } else {
      return;
    }
  }, []);
}

export default useTitle;

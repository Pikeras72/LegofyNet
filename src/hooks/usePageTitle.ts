import { useEffect } from 'react';

const BASE_TITLE = 'LegofyNet — AI Block-Figure Generator';

export function usePageTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `${title} · LegofyNet` : BASE_TITLE;
    return () => {
      document.title = BASE_TITLE;
    };
  }, [title]);
}

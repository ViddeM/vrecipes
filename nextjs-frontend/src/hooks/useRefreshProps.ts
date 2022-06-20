import { useCallback } from "react";

import { useRouter } from "next/router";

export default function useRefreshProps() {
  const { asPath, replace } = useRouter();

  return useCallback(() => replace(asPath), [asPath, replace]);
}

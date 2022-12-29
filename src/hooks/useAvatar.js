import { useState, useEffect } from 'react';

import defaultAvatar from '../assets/images/defaultAvatar.svg';

export default function useAvatar(initialValue) {
  const [avatar, setAvatar] = useState(initialValue);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetch(initialValue);

    if (!res.ok) {
      setAvatar(() => defaultAvatar);
    }
  });

  return avatar;
}

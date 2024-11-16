import { useState, useEffect } from 'react';

export function useUserData() {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`);
      const data = await response.json();
      setUserData(data.user[0]);
    };

    fetchData();
  }, []);

  return { userData };
}

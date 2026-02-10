import { useState, useEffect } from 'react';

// <T> は「使うときに型を決めるよ」というジェネリクスです
export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // URLが空のときは何もしないガード
    if (!url) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    setError(null);

    fetch(url, { cache: 'no-store' }) // キャッシュ無効化もここで一元管理！
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((json: T) => {
        setData(json);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError('データの取得に失敗しました');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]); // URLが変わるたびに再実行

  return { data, error, isLoading };
};

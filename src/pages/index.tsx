import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';
import { useEffect } from 'react';

export default function Home(): JSX.Element {
  const getImages = async ({ pageParam = null }) => {
    return await api.get(`/images?after=${pageParam}`);
  };

  const {
    data,
    isFetching,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<any>(
    ['images'],
    ({ pageParam = 1 }) => getImages({ pageParam }),

    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const formattedData = useMemo(() => {
    // TODO FORMAT AND FLAT DATA ARRAY
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log('data getImages =>', data);
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        {/* <CardList cards={formattedData} /> */}
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>

      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        load more
      </button>

      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  );
}

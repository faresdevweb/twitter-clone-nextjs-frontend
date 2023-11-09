  import { useCookies } from "react-cookie";
  import { MutableRefObject, useEffect } from "react";
  import { useInfiniteQuery } from "@tanstack/react-query";
  import { getPosts } from "@/services";

  const LIMIT = 10;

  export const usePagination = (loader: MutableRefObject<null>) => {
      const [cookie] = useCookies(['token']);
    
      const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
      } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = 1 }) => getPosts(pageParam, LIMIT, cookie.token),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
          if (lastPage.length < LIMIT) {
            return undefined;
          }
          return pages.length + 1;
        },
      });

      useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              fetchNextPage();
            }
          },
          { threshold: 1.0 } // L'élément est complètement visible
        );
    
        if (loader.current) {
          observer.observe(loader.current);
        }
    
        // Nettoyer l'observer quand le composant est démonté
        return () => {
          if (loader.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(loader.current);
          }
        };
      }, [fetchNextPage, loader]);
    
      return { data ,hasNextPage, isFetchingNextPage };
    };
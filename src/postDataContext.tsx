import React, { useState, useContext } from 'react';
import { PostData, getPostByPage } from './api/getPost';

interface IPostDataContext {
  pageIndex: number;
  pageNumber: number;
  postList: PostData[];
  reachedLimit: boolean;
  fetchPostListForNextPage: (newPageIndex: number) => void;
  changePageNumber: (newPageNumber: number) => void;
  setNewPageIndex: () => void;
}

const PostDataContext = React.createContext<IPostDataContext>({
  pageIndex: 0,
  pageNumber: 0,
  postList: [],
  reachedLimit: false,
  changePageNumber: () => {},
  fetchPostListForNextPage: () => {},
  setNewPageIndex: () => {},
});

export const PostDataContextProvider: React.FC = ({ children }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [postList, setPostList] = useState<PostData[]>([]);
  const [reachedLimit, setReachedLimit] = useState(false);

  const fetchPostListForNextPage = async (newPageIndex: number) => {
    if (!reachedLimit) {
      const postList: PostData[] = await getPostByPage(newPageIndex);
      if (postList.length === 0) {
        setReachedLimit(true);
      } else {
        setPostList((prevList: PostData[]) => [...prevList, ...postList]);
      }
    }
  };

  const changePageNumber = (newPageNumber: number) => {
    setPageNumber(newPageNumber);
  };

  const setNewPageIndex = () => {
    setPageIndex((prevPageIndex) => prevPageIndex + 1);
  };

  return (
    <PostDataContext.Provider
      value={{
        pageIndex,
        pageNumber,
        postList,
        reachedLimit,
        fetchPostListForNextPage,
        changePageNumber,
        setNewPageIndex,
      }}
    >
      {children}
    </PostDataContext.Provider>
  );
};

export const usePostData = () => useContext(PostDataContext);

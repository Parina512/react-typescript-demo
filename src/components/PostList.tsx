import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { usePostData } from '../postDataContext';
import { useHistory } from 'react-router-dom';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 140 },
  { field: 'title', headerName: 'Title', width: 200 },
  { field: 'author', headerName: 'Author', width: 180 },
  { field: 'url', headerName: 'URL', width: 400 },
  { field: 'created_at', headerName: 'Created At', width: 240 },
];

const PostList = () => {
  const history = useHistory();
  const {
    pageIndex,
    postList,
    pageNumber,
    reachedLimit,
    fetchPostListForNextPage,
    changePageNumber,
    setNewPageIndex,
  } = usePostData();

  useEffect(() => {
    fetchPostListForNextPage(pageIndex);
    setNewPageIndex();
  }, []);

  useEffect(() => {
    const intervalID = setInterval(() => {
      fetchPostListForNextPage(pageIndex);
      setNewPageIndex();
    }, 10 * 1000);
    if (reachedLimit && intervalID) {
      clearInterval(intervalID);
    }
    return () => {
      if (intervalID) {
        clearInterval(intervalID);
      }
    };
  }, [pageIndex, reachedLimit]);

  return (
    <div style={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={postList}
        columns={columns}
        pageSize={20}
        page={pageNumber}
        onPageChange={(nexPageNumber: number) =>
          changePageNumber(nexPageNumber)
        }
        onCellClick={(rowData) => {
          history.push({
            pathname: `/${rowData.id}`,
            state: rowData.row,
          });
        }}
      />
    </div>
  );
};

export default PostList;

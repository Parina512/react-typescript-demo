import { apiGet } from './axiosConfig';

export type PostData = {
  id: string;
  objectID: string;
  title: string;
  author: string;
  url: string;
  created_at: string;
};

export async function getPostByPage(pageIndex: number): Promise<PostData[]> {
  let postList: PostData[] = [];

  const postResult: any = await apiGet(
    `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${pageIndex}`
  );

  if (postResult?.data?.hits) {
    postList = postResult?.data?.hits;
    postList = postList.map((post) => {
      return { ...post, id: post.objectID };
    });
  }

  return postList;
}

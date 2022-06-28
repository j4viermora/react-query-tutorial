import { hobbyRequest } from '../config';
import { IPost } from '../interfaces';

export const getPost = async () => {
  const resp = hobbyRequest.get<IPost[]>('/posts');

  return resp;
};

export const addPost = async (title: string) => {
  const resp = hobbyRequest.post('/posts', {
    title,
    ...{
      body: 'test con react query',
      userId: 150,
    },
  });
  return resp;
};

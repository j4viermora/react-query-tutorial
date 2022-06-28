import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPost, addPost } from '../api';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const ListPost = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery('get-post', getPost);
  const newPost = useMutation(addPost, {
    onSuccess: (resp) => {
      console.log(resp);
      queryClient.invalidateQueries('get-post');
    },
  });

  if (isLoading) return <h2>Loading..</h2>;
  if (isError) return <h2>Ops algo anda mal</h2>;
  return (
    <div>
      <div className='container'>
        <div className='section'>
          <h2 className='title'>Post</h2>
        </div>
        <div>
          <form>
            <div className='field'>
              <label className='label' htmlFor='create'>
                Agregar post
              </label>
              <input
                type='text'
                id='create'
                value={title}
                className='input'
                onChange={({ target: { value } }) => setTitle(value)}
              />
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                newPost.mutate(title);
              }}
              type='submit'
              className='button is-primary'
              children='Guardar'
            />
          </form>
        </div>
        <ul>
          {data?.data.map(({ id, title, body, userId }) => {
            return (
              <li key={id} className='mb-5'>
                <div className='card card-content'>
                  <h3 className='title is-3'>{title}</h3>
                  <p>{body}</p>
                  <Link to={`/post/${userId}`}>Vew more</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

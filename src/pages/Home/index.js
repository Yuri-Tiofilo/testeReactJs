import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading, Owner, RepositoryList } from './styles';
import Container from '../../components/Container';
import * as HomeActions from '../../store/modules/home/actions';

export default function Home(props) {
  const { loading } = useSelector(state => state.common);
  const { users } = useSelector(state => state.login);
  const { repositories, user } = useSelector(state => state.home);

  const dispatch = useDispatch();

  useEffect(() => {
    const { match } = props;
    const index = decodeURIComponent(match.params.index);

    dispatch(HomeActions.requestAddToUserRepository(users[index]));
  },[])//eslint-disable-line
  if (loading) {
    return <Loading>Carregando...</Loading>;
  }
  return (
    <Container>
      <Owner>
        <Link to="/">Voltar aos usuários</Link>
        <img src={user.avatar_url} alt={user.name} />
        <h1>{user.name}</h1>
        <p>{user.bio}</p>
      </Owner>
      <RepositoryList>
        {repositories.map((repo, index) => (
          <li key={index.toString()}>
            <img src={repo.owner.avatar_url} alt={repo.owner.name} />
            <div>
              <strong>
                <a href={repo.html_url}>{repo.name}</a>
                <p>{repo.language}</p>
              </strong>
            </div>
          </li>
        ))}
      </RepositoryList>
    </Container>
  );
}
Home.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      index: PropTypes.string,
    }),
  }),
};
Home.defaultProps = {
  match: {
    params: {
      index: '0',
    },
  },
};

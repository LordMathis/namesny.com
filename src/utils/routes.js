import { MainContainer, PostContainer } from '../containers'
import { NotFoundWrapper } from '../components';
import getData from './api'

const routes = [
  {
    path: '/',
    exact: true,
    component: MainContainer,
    getData: (path = '') => getData(
      path.split('/').pop()
    )
  },
  {
    path: '/post/:postname',
    component: PostContainer,
    getData: (path = '') => getData(
      path.split('/').pop()
    )
  }
]

export default routes

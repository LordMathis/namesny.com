import { MainContainer, ContentContainer } from '../containers'
import { getData } from './api'

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
    component: ContentContainer,
    getData: (path = '') => getData(
      path.split('/').pop()
    )
  },
  {
    path: '/resume',
    component: ContentContainer,
    getData: (path = '') => getData(
      path.split('/').pop()
    )
  }
]

export default routes

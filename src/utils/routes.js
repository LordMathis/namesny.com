import { MainContainer, ContentContainer } from '../containers'

const routes = [
  {
    path: '/',
    exact: true,
    component: MainContainer
  },
  {
    path: '/post/:postname',
    component: ContentContainer
  },
  {
    path: '/resume',
    component: ContentContainer
  }
]

export default routes

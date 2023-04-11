import { Icon } from 'view-design'

export default {
  path: 'hospitalGuide',
  component: () => import('@/views/hospitalGuide/index'),
  name: 'hospitalGuide',
  meta: { title: '医院导览', icon: 'form' }
}

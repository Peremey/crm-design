import ShootRange from './view.vue';
import { ViewsDirections, ViewsEquipment, ViewsParameters, ViewsServices } from './views';

export default [
  {
    path: '/shoot_range',
    name: 'shootRange',
    component: ShootRange,
    children: [
      {
        path: '/shoot_range/parameters',
        name: 'parameters',
        component: ViewsParameters,
      },
      {
        path: '/shoot_range/directions',
        name: 'directions',
        component: ViewsDirections,
      },
      {
        path: '/shoot_range/services',
        name: 'services',
        component: ViewsServices,
      },
      {
        path: '/shoot_range/equipment',
        name: 'equipment',
        component: ViewsEquipment,
      },
    ],
  },
];

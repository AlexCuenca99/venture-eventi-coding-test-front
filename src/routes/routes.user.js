import { AuthLayout } from 'layouts';
import {
	LoginPage,
	Homepage,
	MovementTypesPage,
	AccountMovementsPage,
} from 'pages';

const routesUser = [
	{
		path: '/',
		layout: AuthLayout,
		component: Homepage,
	},
	{
		path: '/login',
		layout: AuthLayout,
		component: LoginPage,
	},
	{
		path: '/movements-types',
		layout: AuthLayout,
		component: MovementTypesPage,
	},
	{
		path: '/accounts-movements',
		layout: AuthLayout,
		component: AccountMovementsPage,
	},
];

export default routesUser;

import Routes from './Constants';
import HomeView from '../views/Home'
import SymbolsView from '../views/Symbols'
import DetailView from '../views/Detail'
export default [
    {
        path : '/',
        name : Routes.HOME,
        component : HomeView,
        meta : {
            title : 'Home'
        },
    },
    {
        path : '/symbols',
        name : Routes.SYMBOLS,
        component : SymbolsView,
        meta : {
            title : 'Symbols'
        },
    },
    {
        path : '/detail/:symbol',
        name : Routes.DETAIL,
        component : DetailView,
        meta : {
            title : 'Company Details'
        },
    },
];

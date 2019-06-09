import {createAppContainer} from 'react-navigation';
import BottomTabNavigator from './bottomTabNavigator/BottomTabNavigator';
import MusicStackNavigator from './stackNavigator/MusicStackNavigator';
const AppRoute = createAppContainer(MusicStackNavigator);
export default AppRoute;
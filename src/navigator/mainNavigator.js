import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

import SplashScreen from "../features/SplashScreen";
import SideMenu from './sideMenu';
//@BlueprintImportInsertion
import BlankScreen216973Navigator from '../features/BlankScreen216973/navigator';
import BasicLoginSignupNavigator from "../features/BasicLoginSignup116849/navigator";
import UserProfileNavigator from "../features/SimpleUserProfile216850/navigator";

/**
 * new navigators can be imported here
 */

const AppNavigator = {

  //@BlueprintNavigationInsertion
BlankScreen216973: { screen: BlankScreen216973Navigator },
  BasicLoginSignup: {
    screen: BasicLoginSignupNavigator
  },
  UserProfile: {
    screen: UserProfileNavigator
  },
  /** new navigators can be added here */
  SplashScreen: {
    screen: SplashScreen
  }
};

const DrawerAppNavigator = createDrawerNavigator(
  {
    ...AppNavigator,
  },
  {
    contentComponent: SideMenu
  },
);

const AppContainer = createAppContainer(DrawerAppNavigator);

export default AppContainer;

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import SplashScreen from '../screen/SplashScreen';
import MnsScreen from '../screen/MnsScreen';
import HomeScreen from '../screen/HomeScreen';
import NewScreen from '../screen/NewScreen';
import ProductScreen from '../screen/ProductScreen';
import SettingScreen from '../screen/SettingScreen';
import ShopScreen from '../screen/ShopScreen';
import FeaturedProductsScreen from '../screen/FeaturedProductsScreen';
import FeaturedNewsScreen from '../screen/FeaturedNewsScreen';
import NotificationScreen from '../screen/NotificationScreen';
import ClickProductScreen from '../screen/ClickProductScreen';
import ClickMapShopScreen from '../screen/ClickMapShopScreen';
import FeedBackScreen from '../screen/FeedBackScreen';
import UpdateInformationScreen from '../screen/UpdateInformationScreen';
import YouCareScreen from '../screen/YouCareScreen';
import ClickSeeAllReviewScreen from '../screen/ClickSeeAllReviewScreen';
const TabBar = createBottomTabNavigator(
    {
        StackHomeScreen: { screen: HomeScreen },
        StackProductScreen: { screen: ProductScreen },
        StackNewScreen: { screen: NewScreen },
        StackShopScreen: { screen: ShopScreen },
        StackSettingScreen: { screen: SettingScreen }
    },
    {
        tabBarOptions: {
            activeTintColor: 'blue',                                 
            inactiveTintColor: 'black',
        },
        swipeEnabled: false,
        tabBarPosition: 'bottom'
    }
)
const Route = createStackNavigator(
    {
        
        StackSplashScreen: { screen: SplashScreen },
        StackMnsScreen: { screen: MnsScreen },
        StackHomeScreen: { screen: TabBar },
        StackFeaturedNewsScreen: { screen: FeaturedNewsScreen },
        StackFeaturedProductsScreen: { screen: FeaturedProductsScreen },
        StackNotificationScreen: { screen: NotificationScreen },
        StackClickProductScreen: { screen: ClickProductScreen },
        StackClickMapShopScreen: { screen: ClickMapShopScreen },
        StackFeedBackScreen: { screen: FeedBackScreen },
        StackUpdateInformationScreen: { screen: UpdateInformationScreen },
        StackYouCareScreen: { screen: YouCareScreen },
        StackClickSeeAllReviewScreen: { screen: ClickSeeAllReviewScreen }
    },
    {
        headerMode: 'none'
    }
)
export { Route }; 
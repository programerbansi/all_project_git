import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';
import AuthProvider from './admin/context/ValContext';
import './App.css';
import AdminProtected from './admin/AuthSession/AdminProtected';
import Protected from './User/Component/Protected/Protected';
import UserAuthProvider from './User/Component/Context/UserValContext';
import { ADVERTISEMENTS, ALL_BRANDS, ALL_CATEGORIES, ALL_PRODUCTS, ALL_TAGS, ALL_TYPES, ALL_USERS, CONTACT_US, LOGIN, REPORTED_ITEMS, SUB_CATEGORIES, USER_DETAIL } from './services/AdminRoutePath';
import { AD_POST, BOOKMARK, DASHBOARD, DETAIL_PAGE, LIST_PAGE, MESSAGE, MY_ADS, MY_ORDERS, PROFILE, SETTINGS, SHOW_ALL_ADS, USER_FORGOTTEN_PASSWORD, USER_FORM, USER_LOGIN, USER_MESSAGE_LIST, USER_REGISTER, USER_RESET_PASSWORD, USER_SIGNUP, VIEW_ALL_NOTIFICATION, VIEW_ALL_REVIEWS } from './services/UserRoutePath';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';


const Home = lazy(() => import('./User/Component/Home'));
const User_Form = lazy(() => import('./User/Component/AuthPages/User_Form'));
const ForgottenPassword = lazy(() => import('./User/Component/AuthPages/ForgetPassword/ForgottenPassword'));
const ResetPassword = lazy(() => import('./User/Component/AuthPages/ForgetPassword/ResetPassword'));
const Page404 = lazy(() => import('./User/Component/Page404'));

const AdminHome = lazy(()=>import('./admin/Layout/AdminHome'))
const LoginAdmin = lazy(() => import('./admin/AuthSession/LoginAdmin'));
const AllBrands = lazy(() => import('./admin/brand/AllBrands'));
const Categories = lazy(() => import('./admin/category/Categories'));
const AllTypes = lazy(() => import('./admin/type/AllTypes'));
const Advertisement = lazy(() => import('./admin/advertisements/Advertisement'));
const ReportedItems = lazy(() => import('./admin/products-list/ReportedItems'));
const ContactUs = lazy(() => import('./admin/contact-us/ContactUs'));
const SubCategories = lazy(() => import('./admin/category/SubCategories'));
const UserDetail = lazy(() => import('./admin/users/UserDetail'));
const AllUsers = lazy(() => import('./admin/users/AllUsers'));
const AllTags = lazy(() => import('./admin/tags/AllTags'));
const AllProducts = lazy(() => import('./admin/products-list/AllProducts'));
const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserAuthProvider>
            <Suspense fallback={<h6></h6>}>
              <Routes>
                {/* Admin */}

                <Route path={LOGIN} element={<AdminProtected Component={LoginAdmin} />} />
                <Route path={ALL_BRANDS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ALL_CATEGORIES} element={<AdminProtected Component={AdminHome} />} />
                <Route path={SUB_CATEGORIES} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ALL_TAGS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ALL_PRODUCTS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ALL_TYPES} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ALL_USERS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={USER_DETAIL} element={<AdminProtected Component={AdminHome} />} />
                <Route path={ADVERTISEMENTS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={REPORTED_ITEMS} element={<AdminProtected Component={AdminHome} />} />
                <Route path={CONTACT_US} element={<AdminProtected Component={AdminHome} />} />

                <Route path='/' element={<Home />} />
                <Route path={USER_FORM} element={<User_Form />} />
                <Route path={USER_FORGOTTEN_PASSWORD} element={<ForgottenPassword />} />
                <Route path={USER_RESET_PASSWORD} element={<ResetPassword />}></Route>
                <Route path={LIST_PAGE} element={<><Home /></>} />
                <Route path={DETAIL_PAGE} element={<><Home /></>} />
                <Route path={AD_POST} element={<><Protected Component={Home} path={AD_POST}></Protected></>} />
                <Route path={PROFILE} element={<><Protected Component={Home} path={PROFILE}></Protected></>} />
                <Route path={DASHBOARD} element={<><Protected Component={Home}></Protected></>} />
                <Route path={MY_ADS} element={<><Protected Component={Home} path={MY_ADS}></Protected></>} />
                <Route path={SETTINGS} element={<><Protected Component={Home} path={SETTINGS}></Protected></>} />
                <Route path={USER_LOGIN} element={<Protected Component={User_Form} path={USER_LOGIN}></Protected>} />
                <Route path={USER_SIGNUP} element={<Protected Component={User_Form} path={USER_SIGNUP}></Protected>} />
                <Route path={BOOKMARK} element={<><Protected Component={Home} path={BOOKMARK}></Protected></>} />
                <Route path={MY_ORDERS} element={<><Protected Component={Home}></Protected></>} />
                <Route path={VIEW_ALL_NOTIFICATION} element={<><Protected Component={Home} path={VIEW_ALL_NOTIFICATION}></Protected></>} />
                <Route path={VIEW_ALL_REVIEWS} element={<><Home /></>} />
                <Route path={MESSAGE} element={<><Protected Component={Home} path={MESSAGE}></Protected></>} />
                <Route path={USER_MESSAGE_LIST} element={<><Protected Component={Home} path={USER_MESSAGE_LIST}></Protected></>} />
                <Route path='*' element={<Page404 />} />
              </Routes>
            </Suspense>
          </UserAuthProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

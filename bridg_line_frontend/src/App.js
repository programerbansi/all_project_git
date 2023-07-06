import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Login from './user/component/auth/Login';
import { BILL_HISTORY, CANCLE, CARD, HISTORY, HOME, INVOICE, INVOICE_VIEW, LOGIN, NOTIFY, REPORT, STRIPE, SUCCESS, TEAM } from './services/UserRoutePath';
import UserProtected from './user/component/protected/UserProtected';
// import Home from './user/component/layout/Home'
import { ADMIN, ADMIN_COMPLETED_INVOICE, ADMIN_DASHBOARD, ADMIN_INVOICE, ADMIN_INVOICE_COMPLETED_VIEW, ADMIN_INVOICE_VIEW, ADMIN_JOB_TYPE, ADMIN_LOGIN, ADMIN_NOTIFICATION, ADMIN_ORDERS, ADMIN_PAYMENT, ADMIN_STATUS, ADMIN_TEAM, ADMIN_USER, ADMIN_VIEW_ORDERS } from './services/AdminRoutePath';
// import AdminHome from './admin/component/layout/AdminHome';
import AdminAuthProvider from './admin/context/AdminAuthProvider';
import AdminProtected from './admin/component/protected/AdminProtected';
import 'react-toastify/dist/ReactToastify.css';
import UserAuthProvider from './user/component/context/UserAuthProvider';
import SucessfullPage from './user/component/page/SucessfullPage';
import CanclePage from './user/component/page/CanclePage';
import { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotFound from './user/component/page/NotFound';

const Login = lazy(() => import('./user/component/auth/Login'))
const Home = lazy(() => import('./user/component/layout/Home'))
const AdminHome = lazy(() => import('./admin/component/layout/AdminHome'))
const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AdminAuthProvider>
          <UserAuthProvider>
            <BrowserRouter>
              <Suspense fallback={<h6></h6>}>
                <Routes>
                  <Route path={LOGIN} element={<><UserProtected Component={Login} /></>}></Route>
                  <Route path={ADMIN_LOGIN} element={<><AdminProtected Component={Login} /></>}></Route>
                  <Route path={ADMIN} element={<><AdminProtected Component={Login} /></>}></Route>

                  <Route path={HOME} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={INVOICE} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={REPORT} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={INVOICE_VIEW} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={SUCCESS} element={<><SucessfullPage /></>}></Route>
                  <Route path={CANCLE} element={<><CanclePage /></>}></Route>
                  <Route path={TEAM} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={CARD} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={BILL_HISTORY} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={STRIPE} element={<><UserProtected Component={Home} /></>}></Route>
                  <Route path={HISTORY} element={<><UserProtected Component={Home} /></>}></Route>
                  {/* <Route path={NOTIFY} element={<><UserProtected Component={Home} /></>}></Route> */}


                  <Route path={ADMIN_DASHBOARD} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_USER} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_INVOICE} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_COMPLETED_INVOICE} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_INVOICE_VIEW} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_INVOICE_COMPLETED_VIEW} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_JOB_TYPE} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  {/* <Route path={ADMIN_STATUS} element={<><AdminProtected Component={AdminHome} /></>}></Route> */}
                  <Route path={ADMIN_ORDERS} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_PAYMENT} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_NOTIFICATION} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_TEAM} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path={ADMIN_VIEW_ORDERS} element={<><AdminProtected Component={AdminHome} /></>}></Route>
                  <Route path='*' element={<NotFound />} />

                </Routes>
              </Suspense>
            </BrowserRouter>
          </UserAuthProvider>
        </AdminAuthProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;

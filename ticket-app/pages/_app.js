import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../admin-css/login.css"
import "../admin-css/loader.css"
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
import 'suneditor/dist/css/suneditor.min.css';
import '../admin-css/ticket.css'
import 'react-quill/dist/quill.snow.css';
import AuthProvider from '../Context/valContext';
import Layout from '../admin/layout';
import { useRouter } from 'next/router'
import store from '../Redux/store';
import { Provider } from 'react-redux';
const MyApp=({ Component, pageProps })=>{
  const {pathname}=useRouter();
  // console.log(Component,'======pageProps==================')

  return (<AuthProvider>
    <Provider store={store}>
    {/* {pathname == ("/admin" || `/admin/${pageProps}`) ? <Layout> <Component {...pageProps} /></Layout>:  <Component {...pageProps} />} */}
    {pathname == '/admin/login' ? <Component {...pageProps} /> :((pathname.includes('/admin') && (pathname != '/admin/login')))?<Layout> <Component {...pageProps} /></Layout>:<Component {...pageProps} />}

      {/* <Component {...pageProps} /> */}
      </Provider>
  </AuthProvider>)
}

 export default MyApp

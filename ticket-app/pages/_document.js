import Document, { Html, Head, Main, NextScript  } from 'next/document'
import Script from 'next/script'
class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const originalRenderPage = ctx.renderPage

    //     // Run the React rendering logic synchronously
    //     ctx.renderPage = () =>
    //         originalRenderPage({
    //             // Useful for wrapping the whole react tree
    //             enhanceApp: (App) => App,
    //             // Useful for wrapping in a per-page basis
    //             enhanceComponent: (Component) => Component,
    //         })

    //     // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    //     const initialProps = await Document.getInitialProps(ctx)

    //     return initialProps
    // }

    render() {
        return (
            <Html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="dark" data-sidebar-size="lg" data-sidebar-image="none" data-preloader="disable">
                <Head>
                    <meta charSet="utf-8" />
                        <title>Dashboard | Ticket - Admin &amp; Dashboard Template</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta content="Premium Multipurpose Admin & Dashboard Template" name="description" />
                        <meta content="Themesbrand" name="author" />
                        {/* App favicon */}
                        <link rel="shortcut icon" href="/assets/images/favicon.ico" />
                        {/* jsvectormap css */}
                        <link href="/assets/libs/jsvectormap/css/jsvectormap.min.css" rel="stylesheet" type="text/css" />
                        {/*Swiper slider css*/}
                        <link href="/assets/libs/swiper/swiper-bundle.min.css" rel="stylesheet" type="text/css" />
                        {/* Layout config Js */}
                        {/* Bootstrap Css */}
                        <link href="/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
                        {/* Icons Css */}
                        <link href="/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
                        {/* App Css*/}
                        <link href="/assets/css/app.min.css" rel="stylesheet" type="text/css" />
                        {/* custom Css*/}
                        <link href="/assets/css/custom.min.css" rel="stylesheet" type="text/css" />
                </Head>
                <body>
                    <Main />
                    <NextScript>
                        
                    </NextScript>
                    <Script src="/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></Script>
                        <Script src="/assets/libs/simplebar/simplebar.min.js"></Script>
                        <Script src="/assets/libs/node-waves/waves.min.js"></Script>
                        <Script src="/assets/libs/feather-icons/feather.min.js"></Script>
                        <Script src="/assets/js/pages/plugins/lord-icon-2.1.0.js"></Script>
                        <Script src="/assets/js/plugins.js"></Script>
                        <Script src="/assets/libs/apexcharts/apexcharts.min.js"></Script>
                        <Script src="/assets/libs/jsvectormap/js/jsvectormap.min.js"></Script>
                        <Script src="/assets/libs/jsvectormap/maps/world-merc.js"></Script>
                        <Script src="/assets/libs/swiper/swiper-bundle.min.js"></Script>
                        <Script src="/assets/js/pages/dashboard-ecommerce.init.js"></Script>
                        <Script src="/assets/js/app.js"></Script>
                </body>
            </Html>
        )
    }
}

export default MyDocument
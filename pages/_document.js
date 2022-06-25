import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';



export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@100;200;300;400;500;600;700&family=Inter:wght@200;300;400;500;600;700;900&family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Poppins:wght@100&family=Roboto:wght@100;300;400;500;700;900&display=swap"
                    />
                </Head>
                <body>
                    <Main/>
                    <NextScript/>
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => {
        return originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });
    };
    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            sheets.getStyleElement(),
        ],
    };
};
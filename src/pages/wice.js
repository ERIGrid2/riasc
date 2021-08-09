import React from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import {Redirect} from '@docusaurus/router';

function Home() {
  return (
    <Layout>
      <Redirect to="/docs/wice" />;
      <Head>
        <meta name="go-import" content="riasc.eu/wice git https://github.com/stv0g/wice" />
        <meta name="go-source" content="riasc.eu/wice _ https://github.com/stv0g/wice/tree/master{/dir}
  https://github.com/stv0g/wice/blob/master{/dir}/{file}#L{line}" />
      </Head>
    </Layout>
  );
}

export default Home;

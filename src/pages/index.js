import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to Use',
    imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        RIasC was designed from the ground up to be easily installed and
        used to get your experiments up and running quickly.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    imageUrl: 'img/speedometer.png',
    description: (
      <>
        RIasC accelerateds your time to experiment in distributed Research Infrastructure setups by automation.
      </>
    ),
  },
  {
    title: 'Powered by open-source cloud technology',
    imageUrl: 'img/icons/kubernetes.svg',
    imageSize: 120,
    description: (
      <>
        RIasC is powered solely by open source software enabling you to describe complex scenarios in a repeatable manner in the form of code.
      </>
    ),
  },
//   {
//     title: 'Powered by Kubernetes',
//     imageUrl: 'img/icons/kubernetes.svg',
//     imageSize: 120,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by Wireguard',
//     imageUrl: 'img/icons/wireguard.svg',
//     imageSize: 120,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by Kilo',
//     imageUrl: 'img/icons/kilo.svg',
//     imageSize: 120,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
//   {
//     title: 'Powered by K3S',
//     imageUrl: 'img/logos/k3s.svg',
//     imageSize: 200,
//     description: (
//       <>
//         Extend or customize your website layout by reusing React. Docusaurus can
//         be extended while reusing the same header and footer.
//       </>
//     ),
//   },
];

function Feature({imageUrl, imageSize, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  imageSize = imageSize || 200;
  const imgStyle = {
      'width': imageSize,
      'height': imageSize,
      'margin': (200 - imageSize)/2
  }
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} style={imgStyle} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className={clsx('container', styles.heroBannerContainer)}>
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--primary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <footer>
            <div className="container">
                <a href="https://ec.europa.eu/">
                    <img src={useBaseUrl('img/europa_flag_low.jpg')} />
                </a>
                <p>Supported by the H2020 Programme under <a href="https://cordis.europa.eu/project/id/870620">Grant Agreement No. 870620</a></p>
          </div>
      </footer>
    </Layout>
  );
}

export default Home;

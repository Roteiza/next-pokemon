import { FC } from "react"
import Head from "next/head"

import { Navbar } from '../ui';

interface Props {
  children: JSX.Element;
  title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const MainLayout: FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title || 'Pokemon App'}</title>
        <meta name="author" content="Rodrigo Oteiza" />
        <meta name="description" content={`Information about ${title} pokemon`} />
        <meta name="keywords" content={`${title}, pokemon, pokedex`} />

        <meta property="og:title" content={`Information about ${title} pokemon`} />
        <meta property="og:description" content={`All information about the ${title} pokemon`} />
        <meta property="og:image" content={`${origin}/banner.png`} />
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <main style={{ padding: '0px 20px' }}>
        {children}
      </main>
    </>
  )
}

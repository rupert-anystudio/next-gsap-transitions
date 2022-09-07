import AnimatedPages from '../components/animatedPages'
import pages from '../lib/pages'

export default function CatchAll({ slug }) {
  return (
    <AnimatedPages slug={slug} />
  )
}

export async function getStaticProps({
  params = {},
}) {
  const slugArr = params?.slug ?? []
  const slug = `/${(slugArr[0] || '')}`
  // const page = pages.find(page => page.slug === slug)
  return {
    revalidate: 10,
    props: {
      slug,
      // page
    }
  }
}

export async function getStaticPaths() {
  const paths = pages.map(({ slug }) => ({
    params: {
      slug: slug === '/'
        ? false
        : slug.split('/').filter(p => p)
    }
  }))
  return {
    paths,
    fallback: false,
  }
}

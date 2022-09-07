import { useEffect, useMemo, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { gsap } from 'gsap'
import Flip from 'gsap/dist/Flip'
import pages from '../lib/pages'
import useIsomorphicLayoutEffect from './useIsomorphicLayoutEffect'
import { useRouter } from 'next/router'

gsap.registerPlugin(Flip)

const Wrap = styled.div`
  flex: 1;
  background-color: orange;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const Pages = styled.div.attrs({ className: 'pages' })`
  position: relative;
  flex: 1;
  width: 100%;
  background-color: yellow;
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 2rem;
  > div {
    position: relative;
    padding: 2rem;
    background-color: white;
    display: block;
    &.active {
      position: absolute;
      left: 22rem;
      top: 4rem;
      width: 20rem;
    }
  }
`

const AnimatedPages = ({
  slug,
  wrapRef,
}) => {
  return (
    <Wrap ref={wrapRef}>
      <Pages>
        {pages
          .map(p => (
            <div key={p.slug} className={['page', p.slug === slug ? 'active' : 'inactive'].join(' ')}>
              {p.title}
            </div>
          ))}
      </Pages>
    </Wrap>
  )
}

const AnimatedPagesContainer = ({ slug = null }) => {
  const wrapRef = useRef()
  const router = useRouter()

  const q = useMemo(() => gsap.utils.selector(wrapRef), [])

  const [layout, setLayout] = useState({
    state: null,
    slug,
  })

  useIsomorphicLayoutEffect(() => {
    const aniStart = (url) => {
      const state = Flip.getState(q('.page'))
      setLayout({
        slug: url,
        state,
      })
    }
    router.events.on('routeChangeStart', aniStart)
    return () => {
      router.events.off('routeChangeStart', aniStart)
    }
  }, [router, q])

  useIsomorphicLayoutEffect(() => {
    console.log('layout changed')
    if (!layout.state) return
    const tl = Flip.from(layout.state, {
      duration: 1,
      absolute: true,
      targets: q('.page'),
      simple: true,
      // nested: true,
    })
    return () => {
      tl.kill()
    }
  }, [layout, q])

  return (
    <AnimatedPages
      slug={layout.slug}
      wrapRef={wrapRef}
    />
  )
}

export default AnimatedPagesContainer
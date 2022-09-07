import Link from 'next/link'
import styled from 'styled-components'
import pages from '../lib/pages'

const Wrap = styled.header`
  flex: 0;
  background-color: pink;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  gap: 2rem;
  padding: 0 4rem;
`

const Links = styled.ul`
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  gap: 2rem;
  a {
    color: inherit;
    text-decoration: none;
  }
`

const Header = () => {
  return (
    <Wrap>
      <h1>DUMMYLOGO</h1>
      <Links>
        {pages.map(({ slug, title }) => (
          <li key={slug}>
            <Link href={slug}>{title}</Link>
          </li>
        ))}
      </Links>
    </Wrap>
  )
}

export default Header
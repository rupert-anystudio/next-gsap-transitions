import styled from 'styled-components'

const Wrap = styled.footer`
  flex: 0;
  background-color: pink;
  padding: 0 4rem;
`

const Footer = () => {
  return (
    <Wrap>
      <p>&copy; 2022 - Our Dummy company</p>
    </Wrap>
  )
}

export default Footer
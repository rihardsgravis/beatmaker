import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { createGlobalStyle } from 'styled-components'

/**
 * Create a global wrapper that setups global style of the application
 */
const Pad = ({ children }) => (
    <Wrapper>
        <GlobalStyle />
        {children}
    </Wrapper>
)

Pad.propTypes = {
    children: PropTypes.node.isRequired
}

const GlobalStyle = createGlobalStyle`
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    border: 0;
    font-weight: 400;
    box-sizing: border-box;
    list-style: none;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  html, body {
    padding: 0px;
    margin: 0px;
    background: ${(props) => props.theme.bg};
    color: ${(props) => props.theme.fg};
    -webkit-tap-highlight-color: transparent;
  }
`

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: calc(100% - 100px);
    padding: 0 5px;

    @media (max-width: 540px), (max-height: 540px) {
        height: calc(100% - 100px);
    }
`

export default Pad

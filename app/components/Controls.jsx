import * as React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * Create a visual wrapper for the Play/Bpm controls panel
 */
const Controls = ({ children }) => <Wrapper>{children}</Wrapper>

Controls.propTypes = {
    children: PropTypes.node.isRequired
}

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 95px;
    position: fixed;
    bottom: 0px;
    left: 0px;
    padding: 0 20px;
    align-items: center;
    justify-content: center;
    background: ${({ theme }) => theme.controlsBg};

    button {
        display: block;
        box-sizing: border-box;
        width: 0;
        height: 54px;
        background: none;
        border-color: transparent transparent transparent white;
        transition: 100ms all ease;
        cursor: pointer;
        border-style: double;
        border-width: 0 0 0 45px;

        &.play {
            border-style: solid;
            border-width: 27px 0 27px 45px;
        }
    }

    > div {
        position: absolute;
        display: flex;
        justify-content: center;
        flex-direction: column;
        font-family: monospace;
        font-size: 16px;
        right: 40px;
    }

    input[type='range'] {
        -webkit-appearance: none;
        background: none;
        border: 2px solid ${({ theme }) => theme.controlsFg};
        margin-top: 6px;

        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: ${({ theme }) => theme.controlsFg};
            cursor: pointer;
        }
    }

    @media (max-width: 540px), (max-height: 540px) {
        height: 70px;
        justify-content: flex-start;

        > div {
            right: 20px;
            flex-direction: row;
            align-items: center;
        }

        input[type='range'] {
            margin: 0 0 0 12px;
            &::-webkit-slider-thumb {
                width: 24px;
                height: 24px;
            }
        }

        button {
            height: 42px;
            border-width: 0 0 0 35px;

            &.play {
                border-style: solid;
                border-width: 21px 0 21px 35px;
            }
        }
    }
`

export default Controls

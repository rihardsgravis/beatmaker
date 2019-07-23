import * as React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'

/**
 * Create a button grid
 */
const Grid = ({ beats, setBeats, time }) => {
    const updateBeat = (rowIndex, beatIndex) => {
        const newBeats = beats.map((row) => row.slice())

        newBeats[rowIndex][beatIndex] = newBeats[rowIndex][beatIndex] !== 1 ? 1 : 0

        setBeats(newBeats)
    }

    return (
        <Wrapper>
            {beats.map((row, rowIndex) => (
                <div key={rowIndex} className={rowIndex === time ? 'on' : 'off'}>
                    {row.map((beat, beatIndex) => (
                        <Button
                            key={beatIndex}
                            index={beatIndex}
                            onClick={() => updateBeat(rowIndex, beatIndex)}
                            className={beat ? 'on' : 'off'}
                        />
                    ))}
                </div>
            ))}
        </Wrapper>
    )
}

Grid.propTypes = {
    beats: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
    setBeats: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired
}

const bump = keyframes`
  0% {
    transform: scale(1, 1);
  }
  40% {
   transform: scale(1.5, 1.5);
  }
  100% {
   transform: scale(1, 1);
  }
`

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 50vw;
    max-height: 100%;
    user-select: none;

    @media (max-width: 540px) {
        width: 100vw;
        height: 100vh;
        flex-direction: column;
    }

    > div {
        display: flex;
        flex-direction: column;
        width: 6.25%;
        height: 100%;

        @media (max-width: 540px) {
            flex-direction: row;
            width: 100%;
            height: 6.25%;
        }

        &.on > button:before {
            background: ${({ theme }) => theme.buttonOn};
        }

        &.on > button.on:after {
            animation: ${bump} 0.2s linear;
        }
    }
`

const Button = styled.button`
    display: block;
    position: relative;
    height: 12.5%;
    width: 100%;
    background: none;
    cursor: pointer;

    @media (max-width: 540px) {
        height: 100%;
    }

    &:before {
        content: '';
        position: absolute;
        width: 86%;
        height: 86%;
        background: ${({ theme }) => theme.buttonOff};
        left: 7%;
        top: 7%;
    }

    &:after {
        content: '';
        position: absolute;
        width: 40%;
        height: 40%;
        background: ${({ theme, index }) => theme[`beat-${index + 1}`]};
        left: 30%;
        top: 30%;
        opacity: 0;
    }

    &.on:after {
        opacity: 1;
    }

    @media (hover: hover) {
        &.off:hover {
            &:after {
                opacity: 0.45;
            }
        }

        &:hover {
            &:before {
                background: ${({ theme }) => theme.buttonOn};
            }
        }
    }
`

export default Grid

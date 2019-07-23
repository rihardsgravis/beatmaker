import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from 'styled-components'
import Tone from 'tone'
import initReactFastclick from 'react-fastclick'
import Koji from 'koji-tools'

import Controls from './components/Controls'
import Grid from './components/Grid'
import Pad from './components/Pad'
import Intro from './components/Intro'

/**
 * Initialise Tone.js sounds player
 */
const keys = new Tone.Players(Koji.config.sounds).toMaster()

/**
 * Initialise Tone.js sequence
 */
const Sequence = new Tone.Sequence(() => {}, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], '16n')

/**
 * Initialise fast click
 */
initReactFastclick()

const BeatMaker = () => {
    const [bpm, setBpm] = useState(Koji.config.general.bpm)
    const [loop, setLoop] = useState(false)
    const [time, setTime] = useState(0)
    const [beats, setBeats] = useState(Array(16).fill(Array(8).fill(0)))
    const [intro, setIntro] = useState(true)

    /**
     * Update Tone.js bpm when bpm changes
     */
    useEffect(() => {
        Tone.Transport.bpm.value = bpm
    }, [bpm])

    /**
     * Update Tone.js sequence play state when loop gets updated
     */
    useEffect(() => {
        if (loop) {
            Sequence.start()
        } else {
            Sequence.stop()
        }

        /**
         * Watch for SPACE key pressed
         */
        const onKeyPress = (e) => {
            if (e.keyCode === 32) {
                e.preventDefault()

                setLoop(!loop)
                return false
            }
            return true
        }

        window.addEventListener('keydown', onKeyPress)

        return () => {
            window.removeEventListener('keydown', onKeyPress)
        }
    }, [loop])

    /**
     * Update Tone.js sequence when beats get updated
     */
    useEffect(() => {
        Sequence.callback = (seconds, column) => {
            /**
             * Update time
             */
            if (column !== time) {
                setTime(column)
            }

            /**
             * Loop beats and play key if the ebat is enabled
             */
            beats[column].forEach((beat, index) => {
                if (beat) {
                    keys.get(`beat-${index + 1}`).start(seconds, 0, '8n', 0)
                }
            })
        }
    }, [beats, time])

    /**
     * Initialise the application with initial beats and bpm
     */
    const init = (initialState) => {
        Tone.Transport.start()
        setIntro(false)

        setBeats(initialState.beats)
        setBpm(initialState.bpm)
    }

    return (
        <ThemeProvider theme={Koji.config.style}>
            <Pad>
                {intro && <Intro init={init} settings={Koji.config.general} />}
                <Grid beats={beats} time={loop ? time : -1} setBeats={setBeats} />
                <Controls>
                    <button type="button" className={loop ? 'stop' : 'play'} onClick={() => setLoop(!loop)} />

                    <div>
                        {bpm} BPM
                        <input type="range" min="30" max="180" value={bpm} onChange={({ target }) => setBpm(target.value)} />
                    </div>
                </Controls>
            </Pad>
        </ThemeProvider>
    )
}

ReactDOM.render(<BeatMaker />, document.getElementById('beatmaker'))

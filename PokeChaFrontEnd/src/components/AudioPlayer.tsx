import "../assets/css/style.css"
import { BsFillPlayCircleFill, BsFillPauseCircleFill, BsFillFileMusicFill } from 'react-icons/bs'
import { songdata } from "../assets/audio/audio"
import React from "react"
let AudioPlayer = () => {
    let playlist = songdata.url
    let audio = new Audio(playlist)
    async function playMusic() {
        audio.loop = true;
        audio.volume = .04;
        audio.play()
    }

    function stopMusic() {
        audio.pause()
    }

    return (
        <div>
            <div>
                <button className="btn" onClick={playMusic}>< BsFillPlayCircleFill /></button>
                <button className="btn" onClick={stopMusic}>< BsFillPauseCircleFill /></button>
                <p><BsFillFileMusicFill/>Pokemon Collosseum - Pokemon Center<BsFillFileMusicFill/></p>
            </div>
        </div>
    )
}

export default AudioPlayer
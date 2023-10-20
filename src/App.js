import { useRef, useState } from 'react';
import './App.css';

function App() {

  const [currentMusicDetails, setCurrentMusicDetails] = useState({
    songName: 'After Dark',
    songArtist: 'Mr.Kitty',
    songSrc: './Assets/songs/1AfterDark.flac',
    songAvatar: './Assets/Images/image1.jpg'
  })

  //UseStates Variables
  const [audioProgress, setAudioProgress] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [musicIndex, setMusicIndex] = useState(0);
  const [musicTotalLength, setMusicTotalLength] = useState('04 : 38');
  const [musicCurrentTime, setMusicCurrentTime] = useState('00 : 00');
  const [videoIndex, setVideoIndex] = useState(0)

  const currentAudio = useRef()

  const handleMusicProgressBar = (e)=>{
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime = e.target.value * currentAudio.current.duration / 100;
  }

  //Change Avatar Class
  let avatarClass = ['objectFitCover','objectFitContain','none']
  const [avatarClassIndex, setAvatarClassIndex] = useState(0)
  const handleAvatar = ()=>{
    if (avatarClassIndex >= avatarClass.length - 1) {
      setAvatarClassIndex(0)
    }else{
      setAvatarClassIndex(avatarClassIndex + 1)
    }
  }


  //Play Audio Function
  const handleAudioPlay = ()=>{
    if (currentAudio.current.paused) {
      currentAudio.current.play();
      setIsAudioPlaying(true)
    }else{
      currentAudio.current.pause();
      setIsAudioPlaying(false)
    }
  }

  const musicAPI = [
    {
      songName: 'After Dark',
      songArtist: 'Mr.Kitty',
      songSrc: 'https://res.cloudinary.com/dvdola2py/video/upload/v1697515586/Mr_Kitty_-_Time_-_09_After_Dark_viz2st.flac',
      songAvatar: 'https://res.cloudinary.com/dvdola2py/image/upload/v1697515682/a6a543a0dd8f921e6c05e1987fba2170_j3dntq.jpg'
    },
    {
      songName: 'Irokousui',
      songArtist: 'Yoh Kamiyama',
      songSrc: './Assets/songs/Irokousui.flac',
      songAvatar: './Assets/Images/image5.jpg'
    },
    {
      songName: 'Little Dark Age',
      songArtist: 'MGMT',
      songSrc: './Assets/songs/Little Dark Age.mp3',
      songAvatar: './Assets/Images/image4.jpg'
    },
    {
      songName: 'I REALLY WANT TO STAY AT YOUR HOUSE',
      songArtist: 'Rosa Walton & Hallie Coggins',
      songSrc: './Assets/songs/IRWTSAYH.mp3',
      songAvatar: './Assets/Images/image2.jpg'
    },
    {
      songName: 'Bury The Light',
      songArtist: 'Casey Edwards',
      songSrc: './Assets/songs/Bury The Light.flac',
      songAvatar: './Assets/Images/image3.jpg'
    },
    {
      songName: 'Ghost City Tokyo',
      songArtist: 'Ayase | YOASOBI',
      songSrc: 'https://res.cloudinary.com/dvdola2py/video/upload/v1697759566/Ghost_City_Tokyo_aadm5o.mp3',
      songAvatar: 'https://res.cloudinary.com/dvdola2py/image/upload/v1697759558/Ghost_City_Tokyo_ythik1.jpg'
    }
  ]

  const handleNextSong = ()=>{
    if (musicIndex >= musicAPI.length - 1) {
      let setNumber = 0;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex + 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const handlePrevSong = ()=>{
    if (musicIndex === 0) {
      let setNumber = musicAPI.length - 1;
      setMusicIndex(setNumber);
      updateCurrentMusicDetails(setNumber);
    }else{
      let setNumber = musicIndex - 1;
      setMusicIndex(setNumber)
      updateCurrentMusicDetails(setNumber);
    }
  }

  const updateCurrentMusicDetails = (number)=>{
    let musicObject = musicAPI[number];
    currentAudio.current.src = musicObject.songSrc;
    currentAudio.current.play();
    setCurrentMusicDetails({
      songName: musicObject.songName,
      songArtist: musicObject.songArtist,
      songSrc: musicObject.songSrc,
      songAvatar: musicObject.songAvatar
    })
    setIsAudioPlaying(true);
  }

  const handleAudioUpdate = ()=>{
    //Input total length of the audio
    let minutes = Math.floor(currentAudio.current.duration / 60);
    let seconds = Math.floor(currentAudio.current.duration % 60);
    let musicTotalLength0 = `${minutes <10 ? `0${minutes}` : minutes} : ${seconds <10 ? `0${seconds}` : seconds}`;
    setMusicTotalLength(musicTotalLength0);

    //Input Music Current Time
    let currentMin = Math.floor(currentAudio.current.currentTime / 60);
    let currentSec = Math.floor(currentAudio.current.currentTime % 60);
    let musicCurrentT = `${currentMin <10 ? `0${currentMin}` : currentMin} : ${currentSec <10 ? `0${currentSec}` : currentSec}`;
    setMusicCurrentTime(musicCurrentT);

    const progress = parseInt((currentAudio.current.currentTime / currentAudio.current.duration) * 100);
    setAudioProgress(isNaN(progress)? 0 : progress)
  }


  const vidArray = ['./Assets/Videos/video1.mp4'];
  return (
    <>
    <div className="container">
      <audio src='./Assets/songs/1AfterDark.flac' ref={currentAudio} onEnded={handleNextSong} onTimeUpdate={handleAudioUpdate}></audio>
      <video src={vidArray[videoIndex]} loop muted autoPlay className='backgroundVideo'></video>
      <div className="blackScreen"></div>
      <div className="music-Container">
        <p className='musicPlayer'>My Fav Music</p>
        <p className='music-Head-Name'>{currentMusicDetails.songName}</p>
        <p className='music-Artist-Name'>{currentMusicDetails.songArtist}</p>
        <img src={currentMusicDetails.songAvatar} className={avatarClass[avatarClassIndex]} onClick={handleAvatar} alt="song Avatar" id='songAvatar'/>
        <div className="musicTimerDiv">
          <p className='musicCurrentTime'>{musicCurrentTime}</p>
          <p className='musicTotalLenght'>{musicTotalLength}</p>
        </div>
        <input type="range" name="musicProgressBar" className='musicProgressBar' value={audioProgress} onChange={handleMusicProgressBar} />
        <div className="musicControlers">
          <i className='fa-solid fa-backward musicControler' onClick={handlePrevSong}></i>
          <i className={`fa-solid ${isAudioPlaying? 'fa-pause-circle' : 'fa-circle-play'} playBtn`} onClick={handleAudioPlay}></i>
          <i className='fa-solid fa-forward musicControler' onClick={handleNextSong}></i>
        </div>
      </div>
      <span className='headset'>
        <img src='./Assets/headset.png' />
   
        <div className='spasi'> </div>
         Use Headset For More Experience
      </span>
    </div>
    </>
  );
}

export default App;

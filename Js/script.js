if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function (search, replacement) {
    return this.replace(new RegExp(search, 'g'), replacement);
  };
}

let songs;
let currentsong = new Audio()
function convertSecondsToMinutes(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "Invalid Input";
  }
  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format minutes and seconds to be two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  // Return the formatted time
  return `${formattedMinutes}:${formattedSeconds}`;
}
// Define a class for a Music Track
class MusicTrack {
  constructor(id, name, location) {
    this.id = id;         // Unique identifier for the track
    this.name = name;     // Name of the track
    this.location = location; // Location/URL of the audio file
  }
}
async function getsongs() {
  let a = await fetch('http://127.0.0.1:5500/songs')
  let response = await a.text();

  console.log(response)
  let div = document.createElement("div")
  div.innerHTML = response;
  let as = div.getElementsByTagName("a")
  let songs = []
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      console.log(element.href)
      songs.push(element.href.split("/songs/")[1])
    }
  }
  return songs



}
const playMusic = (track, pause = false) => {
  currentsong.src = "/songs/" + track
  if (!pause) {
    currentsong.play()
    playicon.src = "img/pause.svg"
  }
  document.querySelector(".song-name").innerHTML = decodeURI(track)
  document.querySelector(".song-time").innerHTML = "00:00 / 00:00"
}
async function main() {
  songs = await getsongs()
  playMusic(songs[0], true)
  console.log(songs)
  let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
  for (const song of songs) {

    songUL.innerHTML = songUL.innerHTML + `<li>
    <img class = "invert" src="img/music.svg" alt="">
    <div class="info">
        <div>${song.replaceAll("%20", " ").replaceAll("%2C", ",").trim()}</div>
        
    </div>
    <div class="playnow">
        <span >Play Now</span>
        <img class ="invert" src="img/play2.svg" alt="">
    </div></li>`
  }
  Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click", element => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML)
      playMusic(e.querySelector(".info").firstElementChild.innerHTML)

    })
  })
  
  
  
  
}


// if (!response.ok) {
// throw new Error('failed fetching songs' + response.statusText);
// }
// return response.json(); // Parse the JSON from the response
// }
// .then(data => {
// Use the data received from the server
// console.log(data);
// })
// .catch(error => {
// console.error('There was a problem with the fetch operation:', error);
// });
// }








// Example of creating instances of MusicTrack
// const track1 = new MusicTrack(1, 'Song One', 'songs/A Truly Dazzling Dream - National Sweetheart.mp3');
// const track2 = new MusicTrack(2, 'Song Two', 'songs/Skating On the Uppers - National Sweetheart.mp3');
// const track3 = new MusicTrack(3, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track4 = new MusicTrack(4, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track5 = new MusicTrack(5, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track6 = new MusicTrack(6, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track7 = new MusicTrack(7, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track8 = new MusicTrack(8, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track9 = new MusicTrack(9, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track10 = new MusicTrack(10, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// const track11 = new MusicTrack(11, 'Song Three', 'songs/Some College - National Sweetheart.mp3');
// filename = track1.location.split("/").pop();
// const name = filename.replace 


//play-pause function
// const playpause(){
// if(this.isplaying()){
// audio.pause()
// }
// else{
// this.play()
// }
//   }
// Storing the tracks in an array for easy management
// const musicLibrary = [track1, track2, track3];
// let songUL = document.querySelector(".songlist").getElementsByTagName("ul")[0]
// for ( track of Tracks) { 
// songUL.innerHTML = songUL.innerHTML + `<li>${track.split("/").pop().replace(".mp3"," ")}</li>`
// }
// Displaying the music library
// audio = new Audio(src=`${track1.location}`)
// console.log(track1.location);
// play = document.getElementById("playbar-play")
// playicon = document.getElementById("playbar-icon")
playbarplay.addEventListener("click", () => {
  if (currentsong.paused) {
    playicon.src = "img/pause.svg"
    currentsong.play()
  }
  else {
    playicon.src = "img/play2.svg"
    currentsong.pause()
  }
})
currentsong.addEventListener("timeupdate", () => {
  console.log(currentsong.currentTime, currentsong.duration)
  document.querySelector(".song-time").innerHTML = `${convertSecondsToMinutes(currentsong.currentTime)}/${convertSecondsToMinutes(currentsong.duration)}`
  document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%";
})
document.querySelector(".seekbar").addEventListener("click", (e) => {
  let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
  document.querySelector(".circle").style.left = percent + "%";
  currentsong.currentTime = ((currentsong.duration) * percent) / 100;
})
document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "0px";
  }
)
document.querySelector(".close").addEventListener("click",()=>{
  document.querySelector(".left").style.left="-120%"
})
document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e)=>{
  console.log("Setting volume to",e.target.value, "/ 100")
  currentsong.volume= parseInt(e.target.value)/100
  
  
  
})
if(currentsong.volume=0){
  document.querySelector("vol-img").src="img/vol-off.svg"
}

document.getElementById("previous").addEventListener("click",()=>{
  console.log("previous clicked")
  let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
  if((index-1) >= 0){
    playMusic(songs[index-1])
  }
})
document.getElementById("next").addEventListener("click",()=>{
  console.log("next clicked")
  let index = songs.indexOf(currentsong.src.split("/").slice(-1)[0])
  if((index+1)< songs.length - 1){
    playMusic(songs[index+1])
  }
})




main()






















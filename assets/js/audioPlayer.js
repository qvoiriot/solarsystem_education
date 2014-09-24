player = document.getElementById('audioPlayer');
player.volume=0.5; 

function volume(type){
  var player = document.getElementById('audioPlayer');
  var progress = document.getElementById('volumeProgress');
  var vol = player.volume;
  if(type == "minus"){
    if(vol - 0.1 >= 0)
      player.volume = vol - 0.1;
  }
  if(type == "plus" && vol < 1){
    if(vol + 0.1 <= 1)
      player.volume = vol + 0.1;
  }
  progress.value = player.volume;
}

///////////////////////////////////////
// Helper Functions
////////////////////////////////////////

function timeConversion(duration) {
    const portions = [];
  
    const msInHour = 1000 * 60 * 60;
    const hours = Math.trunc(duration / msInHour);
    if (hours > 0) {
      portions.push(hours + 'h');
      duration = duration - (hours * msInHour);
    }
  
    const msInMinute = 1000 * 60;
    const minutes = Math.trunc(duration / msInMinute);
    if (minutes > 0) {
      portions.push(minutes + 'min');
      duration = duration - (minutes * msInMinute);
    }
  
    const seconds = Math.trunc(duration / 1000);
    if (seconds > 0) {
      portions.push(seconds + 'sec');
    }
  
    return portions.join(' ');
}

function getAlbumLength(tracklist) {
    const trackTimes = [];

    tracklist.forEach(song =>{         
      trackTimes.push(song.duration_ms);         
    });

    const albumLength = trackTimes.reduce((partialSum, a) => partialSum + a, 0);
    const formatLength = timeConversion(albumLength);

    return formatLength
}

export {
    timeConversion,
    getAlbumLength
}
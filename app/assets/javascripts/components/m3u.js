var EXTM3U = '#EXTM3U';
var EXTINF = '#EXTINF:';
var REGEX_PARAMS = /\s*("([^"]+)"|([^=]+))=("([^"]+)"|(\S+))/g;
var REGEX_DURATION = /\s*(-?\d+)/g;

function parseParams(data){
  var result = {};
  var m, key, value;

  while ((m = REGEX_PARAMS.exec(data)) !== null) {
    if (m.index === REGEX_PARAMS.lastIndex) {
      REGEX_PARAMS.lastIndex++;
    }
    key = m[2] ? m[2] : m[3];
    value = m[5] ? m[5] : m[6];
    result[key] = value;
  }
  return result;
}

function formatParams(params){
  var result = '';

  for(var key in params){
    result += ' ' + key + '="' + params[key]+'"';
  }
  return result;
}

function parseM3U(content){
  var result = {
    tracks: []
  };
  var lines = content.split('\n');
  var line, current = {}, pos, duration;

  for(var i=0;i<lines.length;i++){
    line = lines[i].trim();
    if (line == ''){
      continue;
    }
    // if (line.indexOf(EXTM3U) == 0){
    //   result.header = parseParams(line.substr(EXTM3U.length));
    //     continue;
    // }
    if (line.indexOf(EXTINF) == 0){
      pos = line.lastIndexOf(',');
      current.title = line.substr(pos+1).trim();
      line = line.substring(EXTINF.length, pos).trim();
      duration = line.match(REGEX_DURATION);
      // current.length = parseInt(duration[0]);
      current.params = parseParams(line.substr(duration[0].length));
      continue;
    }
    if (line.indexOf("#") == 0){
      continue;
    }
    current.file = line;
    result.tracks.push(current);
    current = {};
  }
  return result;
}

function format(m3u){
  var result = EXTM3U;
  if (m3u.header){
    result += formatParams(m3u.header);
  }
  result+= '\n';
  m3u.tracks.forEach(function(track){
    result += EXTINF
      +track.length
      +formatParams(track.params)
      +","
      +track.title
      +'\n'
      +track.file
      +'\n';
  });
  return result;
}

function toSlug(text){
  st = text.toLowerCase();
  st = st.replace(/[\u00C0-\u00C5]/ig,'a')
  st = st.replace(/[\u00C8-\u00CB]/ig,'e')
  st = st.replace(/[\u00CC-\u00CF]/ig,'i')
  st = st.replace(/[\u00D2-\u00D6]/ig,'o')
  st = st.replace(/[\u00D9-\u00DC]/ig,'u')
  st = st.replace(/[\u00D1]/ig,'n')
  st = st.replace(/[^a-z0-9 ]+/gi,'')
  st = st.trim().replace(/ /g,'-');
  st = st.replace(/[\-]{2}/g,'');
  return (st.replace(/[^a-z\- ]*/gi,''));
}

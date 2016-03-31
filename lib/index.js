function cookieParse(cookies) {
  var output = {};
  var counters = {};
  cookies.split(';').map(function(cookie) {
      return cookie.trim().split('=');
    }).forEach(function(pair) {
        if (output[pair[0]]) {
              counters[pair[0]] = counters[pair[0]] || 1;
              var key = pair[0] + '(' + counters[pair[0]] + ')';
              output[key] = pair[1];
              counters[pair[0]]++;
            } else {
                  output[pair[0]] = pair[1];
                }
      });
  return output;
}

function removeAllCookies() {
  Object.keys(cookieParse(document.cookie))
    .forEach(function(cookie) {
      document.cookie = cookie + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/"; 
  });
}


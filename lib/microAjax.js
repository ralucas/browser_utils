function isObject(obj) {
  return obj.toString() === '[object Object]';
}

function isFunction(fn) {
  return typeof fn == 'function';
}

function ajax(url, options) {
  var request;
  // options defaults
  var method = options.method || 'GET';
  var isAsync = options.isAsync || true;
  var data = options.data || null;
  var successCb = isFunction(options.success) && options.success || function() {};
  var errorCb = isFunction(options.error) && options.error || function() {}; 
  
  if (window.XMLHttpRequest) {
    request = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    request = new ActiveXObject('Microsoft.XMLHTTP');
  }

  request.onreadystatechange = handleStateChange;
  request.open(method, url, isAsync);

  if (options.headers && isObject(options.headers)) {
    for (var key in options.headers) {
      if (options.headers.hasOwnProperty(key)) {
        request.setRequestHeader(key, options.headers[key]);
      }
    }
  }

  function handleStateChange() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        successCb(request.responseText);
      } else {
        errorCb(request);
      }
    }
  }

  request.send(data);
}


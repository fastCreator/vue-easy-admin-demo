export const deepClone = function (v) {
  return JSON.parse(JSON.stringify(v))
}

export const debounce = function (fn, wait, immediate = true) {
  let timer

  let startTimeStamp = 0
  let context, args

  let run = timerInterval => {
    timer = setTimeout(() => {
      let now = new Date().getTime()
      let interval = now - startTimeStamp
      if (interval < timerInterval) {
        // the timer start time has been reset，so the interval is less than timerInterval
        console.log('debounce reset', timerInterval - interval)
        startTimeStamp = now
        run(timerInterval - interval) // reset timer for left time
      } else {
        if (!immediate) {
          fn.apply(context, args)
        }
        clearTimeout(timer)
        timer = null
      }
    }, timerInterval)
  }

  return function () {
    context = this
    args = arguments
    let now = new Date().getTime()
    startTimeStamp = now // set timer start time

    if (!timer) {
      console.log('debounce set', wait)
      if (immediate) {
        fn.apply(context, args)
      }
      run(wait) // last timer alreay executed, set a new timer
    }
  }
}

export const MIME_type = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  zip: 'application/zip',
  xlm: 'application/vnd.ms-excel',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  docx:
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif,gif',
  jpeg: 'image/jpeg'
}

export const merge = function () {
  var one = arguments[0]
  for (let i = 1; i < arguments.length; i++) {
    if(arguments[i]){
      one = mer(one, arguments[i])
    }
  }
  return one
}

function mer (obj1, obj2) {
  let obj = Object.assign({}, obj2)
  for (let key in obj1) {
    if (typeof obj[key] === 'object') {
      if (obj[key] instanceof Array) {
        obj[key] = [].concat(obj1[key], obj[key])
      } else {
        obj[key] = Object.assign({}, obj1[key], obj[key])
      }
    }
  }
  return Object.assign({}, obj1, obj)
}

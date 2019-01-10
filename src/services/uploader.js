import axios from 'axios'

const UPLOADER_URL = '/upload'

export default {
  upload (file) {
    let data = new FormData()
    data.append('image', file)
    return axios.post(UPLOADER_URL, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}

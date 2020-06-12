import Constants from 'expo-constants'
const { manifest } = Constants;

export default (
  (typeof manifest === 'object') && 
  (manifest.packagerOpts?.dev)   && 
  (typeof manifest.debuggerHost !== 'undefined')
) 
  ? `http://${manifest.debuggerHost.split(':').shift()?.concat(':8000')}`
  : 'http://example.com'

// 删除vue-cli实现方式，改写为读取js的方式
const { BUILD_TYPE } = process.env;
const envMode = {
  'fat': {
    'NODE_ENV': 'development',
  },
  'uat': {
    'NODE_ENV': 'production',
  },
  'prod': {
    'NODE_ENV': 'production',
  }
}
const raw = envMode[BUILD_TYPE];
const stringified = Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key]);
    return env;
  }, {})
module.exports = stringified
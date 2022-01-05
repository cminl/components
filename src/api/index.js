import * as _ from 'lodash'

export * from './search'

function ajaxConfigCreator (...config) {
  const conf = _.assign({}, ...config)
  conf.method = conf.method.toLocaleLowerCase()
  return conf
}

export function pdAjax (obj, ...config) {
  const conf = ajaxConfigCreator(...config)
  if (obj.path) {
    for (const key in obj.path) {
      // foo.hasOwnProperty("bar")
      // Object.prototype.hasOwnProperty.call(foo, "bar");
      // if (obj.path.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(obj.path, 'key')) {
        conf.url = conf.url.replace('{' + key + '}', obj.path[key])
      }
    }
  }
  return obj.vm.axios(conf)
}

import * as _ from 'lodash'
import { pdCookies } from '../common/utils/cookie'
import tokenJson from '../../token.json'

let config = {}

export function initConfig (conf = { version: '1.0.0-alpha' }) {
  const host = window.location.host
  const hostname = window.location.hostname
  const protocol = window.location.protocol || 'http:'
  const s = '0123456789'
  const devDomain = [
    ['l', 'o', 'c', 'a', 'l', 'h', 'o', 's', 't'].join(''),
    [s[1], s[2], s[7], '.', s[0], '.', s[0], '.', s[1]].join('')
  ]
  const proUrl = protocol + '//' + host
  const devUrl = protocol + '//' + [s[1], s[9], s[2], '.', s[1], s[6], s[8], '.', s[4], '.', s[1], s[2]].join('')
  const profile = typeof conf.profile !== 'undefined' ? conf.profile : (_.indexOf(devDomain, hostname) >= 0 ? 'dev' : 'prod')
  const basePath = '//' + (profile === 'dev' ? [s[1], s[9], s[2], '.', s[1], s[6], s[8], '.', s[4], '.', s[1], s[2]].join('') : host)
  // const basePath = '//' + ([s[1], s[9], s[2], '.', s[1], s[6], s[8], '.', s[4], '.', s[1], s[2]].join('') + ':9810')
  const testPath = '//' + (profile === 'test' ? [s[1], s[9], s[2], '.', s[1], s[6], s[8], '.', s[4], '.', s[2], s[9]].join('') : host)
  const prefix = protocol + basePath + '/api/'
  const dev = {
    baseUrl: prefix,
    primalUrl: devUrl,
    indexUrl: prefix + '/plantdata'
  }
  const prod = {
    baseUrl: prefix,
    primalUrl: proUrl,
    indexUrl: prefix + '/plantdata'
  }
  const test = {
    baseUrl: protocol + testPath,
    indexUrl: prefix + '/plantdata'
  }
  const plantdata = _.assign({}, prod, {
    indexUrl: protocol + '//www.plantdata.ai'
  })
  const url = {
    dev,
    plantdata,
    prod,
    test
  }
  const projectName = 'kgdp'

  config = _.assign({}, url[profile], {
    appName: projectName,
    autoLogin: {
      phone: [s[1], s[8], s[6], s[5], s[5], s[3], s[3], s[2], s[6], s[1], s[8]].join(''),
      pwd: [s[1], s[2], s[3], s[3], s[2], s[1]].join(''),
      domain: devDomain
    },
    hostname,
    profile,
    projectName,
    cookieName: 'plantdata.token'
  }, conf)
  console.log(projectName + '-v' + config.version)

  if (profile === 'dev') {
    config.token = tokenJson.token
  } else {
    config.token = pdCookies.get(config.cookieName)
  }
  return config
}

export function getConfig () {
  return config
}

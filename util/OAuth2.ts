import config from '../env.json'
import OAuth2Credentials from './OAuth2Credentials'
import moment from 'moment'
import { AsyncStorage } from 'react-native'
import Server from '../api/Server'

export default class OAuth2 {
  static _credentials: OAuth2Credentials  

  static async _storeCrdentialsFromResponse(response: any) {
    this._credentials = {
      token_type: response.token_type,
      expires_at: moment().add(response.expires_in, 'seconds').toDate(),
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    }

    await AsyncStorage.setItem('credentials', JSON.stringify(this._credentials))
  }

  static async LoadCredentials() {
    const json = await AsyncStorage.getItem('credentials')
    
    if (json !== null) {
      this._credentials = JSON.parse(json)
      
      // TODO: Check if expired

      return true
    }
    else {
      return false
    }
  }

  static async Authenticate(email: string, password: string) {
    try {
      const response = await fetch(`${Server}${config.oauth2.endpoint}`, {
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          method: 'post',
          body: JSON.stringify({
            grant_type: 'password',
            client_id: config.oauth2.client_id,
            client_secret: config.oauth2.client_secret,
            username: email, 
            password: password,
            scope: '',
          })
      })

      if (response.status === 200) {
        const creds = await response.json()
        await this._storeCrdentialsFromResponse(creds)

        return true
      }
      else {
        return false
      }
    }
    catch (e) {
      return false
    }
  }

  static async Request(path: string, init?: RequestInit) {
    return fetch(`${Server}${path}`, {
      ...init,
      headers: {
        ...init?.headers,
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': `${this._credentials.token_type} ${this._credentials.access_token}`
      },
    })
  }
}

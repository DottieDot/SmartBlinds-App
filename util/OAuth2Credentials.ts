
export default interface OAuth2Credentials {
  token_type: string
  expires_at: Date
  access_token: string
  refresh_token: string
}

import Ajv from 'ajv'
import configSchema from './configSchema.json'

export class Config {
  constructor (configFile) {
    const ajv = new Ajv()

    var valid = ajv.validate(configSchema, configFile)
    if (!valid) {
      throw ajv.errors
    }

    this.title = configFile.title
    this.name = configFile.name
    this.email = configFile.email || ''
    this.social = configFile.social || []
    this.baseUrl = configFile.baseUrl || 'localhost'
    this.contentPath = configFile.contentPath || './content'
    this.storage = configFile.storage || 'file'
    if (this.storage === 'mongo') {
      this.mongoUrl = configFile.mongoUrl
    }
    this.specialFiles = configFile.specialFiles || ['about.md']
  }
}

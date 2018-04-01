// modules
import http from 'http'
import app from './server'
import './mongodb'
import '../logic/main/route'


http
  .createServer(app)
  .listen(3030)

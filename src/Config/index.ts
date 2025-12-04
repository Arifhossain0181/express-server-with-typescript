
import dotenv from 'dotenv';
import { connect } from 'http2';
import path from 'path'; 

dotenv.config({path:path.join(process.cwd(),'.env')});

const config ={
    connectionString: process.env.CONNECTION_STRING || '',
    port: process.env.PORT || 5000,
    jwtSecret: process.env.JWT_SECRET || '',
    ssl: {
        rejectUnauthorized: false
    }
}
export default config;
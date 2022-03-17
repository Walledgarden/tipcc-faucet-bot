import * as mysql from 'mysql2';
import config from '../../config';

let con = mysql.createConnection({
    host: config.sql.host,
    user: config.sql.username,
    password: config.sql.password,
    database: config.sql.database
});

export const db_query = async (query: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        con.query(query,
            (err: any, result: any) => {
                if(err) {
                    console.log(err)
                }
                return err ? false : resolve(result);
            }
        );
    });
}
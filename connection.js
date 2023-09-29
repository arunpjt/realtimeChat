var mysql=require('mysql')
var con=mysql.createConnection({
    host:'sql12.freemysqlhosting.net',
    user:'sql12649763',
    password:'t6uCDHuIEi',
    database:'sql12649763'
})

con.connect((err)=>{
    if(err) throw err
    console.log("Database is connected successfully");
})

module.exports=con
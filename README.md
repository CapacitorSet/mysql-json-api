mysql-json-api
==============

 - Powered by Node.js
 - JSON API
 - For a MySQL database
 - HTTP, HTTPS or both
 - Support for Basic authentication

#Usage

  0. Enter your endpoints in `endpoints.json`, and the queries in `queries/`.
  1. Edit `config.json` as needed, the names are self-descriptive.
  2. If you're using HTTPS, copy the required files in the directory of the server, namely `server.key` for the private key and `server.crt` for the certificate.
  3. Run `node app`.

#Example configuration

This repository contains a basic configuration. The existing setup is a MySQL server on 127.0.0.1:3306, with database `testdb`, username `root` and password `root`. The tables are set up like this:

    mysql> show tables;
    +------------------+
    | Tables_in_testdb |
    +------------------+
    | files            |
    | users            |
    +------------------+

    mysql> describe files;
    +---------+--------------+------+-----+---------+----------------+
    | Field   | Type         | Null | Key | Default | Extra          |
    +---------+--------------+------+-----+---------+----------------+
    | id      | int(11)      | NO   | PRI | NULL    | auto_increment |
    | content | varchar(100) | YES  |     | NULL    |                |
    | name    | varchar(100) | NO   |     | NULL    |                |
    | type    | varchar(100) | YES  |     | NULL    |                |
    +---------+--------------+------+-----+---------+----------------+

    mysql> describe users;
    +-------+--------------+------+-----+---------+----------------+
    | Field | Type         | Null | Key | Default | Extra          |
    +-------+--------------+------+-----+---------+----------------+
    | id    | int(11)      | NO   | PRI | NULL    | auto_increment |
    | name  | varchar(100) | NO   |     | NULL    |                |
    +-------+--------------+------+-----+---------+----------------+

If you run `node app`, the following routes are set up:

  - `http(s)://localhost/api/users`, returning the list of users;
  - `http(s)://localhost/api/file/:id`, returning data about a given file (eg. `/api/file/2`).

The HTTP response looks like this:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: text/json; charset=utf-8
    Access-Control-Allow-Origin: *
    Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
    Content-Length: 79
    ETag: W/"4f-Kc85MlEXlhMZb6f0Jzes7A"
    Date: Sat, 19 Dec 2015 09:52:59 GMT
    Connection: close

    {"err":null,"data":[{"id":1,"name":"redtaboo"},{"id":2,"name":"krispykrackers"}]}

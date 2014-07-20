### How to install
1. Install Laravel web framework by enter this command
```
composer install
```
Note that you need composer in order to install this.
2. Install front-end frameworks and components such as AngularJS, JQuery, Bootstrap, MomentJS, Underscore by enter this command
```
bower install
```
Since it uses Bower to manage the front-end components, you also need to install Bower in advance.
3. Install the grunt helpers in order to develop smoothly by enter this command
```
npm install
```
Since grunt is powered by NodeJS, you need to install NodeJS in advance to use the NPM.
4. You can find the SQL file inside this package.
5. After imported the SQL file into your preferred database, you may need to
tell Laravel what is the database name, database username, and so on.. to do that copy file app/config/database_original.php to app/config/database.php, and provide its your information.
6. You're now good to go.

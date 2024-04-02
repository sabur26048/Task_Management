# Task-manager-app

# Clone or download the repository

# Open the repository folder in any code editor

# Backend

### `npm install`

Open terminal type CD command and backend folder location do npm install for backend.

### `npm start`

run "npm start" (your server will listen the port no 3001)

N.B: Before running the code, please make sure to update the HOST,PORT,USER, PASSWORD, DATABASE environment
variable's value in the .env file of the frontend part.

# Frontend

### `npm install`

Open terminal, type CD command and frontend folder location do npm install for frontend.

### `npm start`

Open terminal Go inside frontend folder and run npm start (your react app will start in localhost:3000)

N.B: Before running the code, please make sure to update the REACT_APP_api_base variable in the .env file of the frontend part.

# Database

1. Download XAMPP from this link https://www.apachefriends.org/.
2. Run and install XAMPP in your system.
3. Open the application and run Mysql and apache server.
4. Now open http://127.0.0.1/dashboard/ and you will see the PhpMyAdmin tab. Click on it.
5. Now go to query tab and type the below query for creating a task_manager database inside this DB tasks table- >

CREATE TABLE `task_manager`.`tasks` (`id` INT UNSIGNED NOT NULL AUTO_INCREMENT , `title` VARCHAR NOT NULL , `description` VARCHAR NOT NULL , `priority` VARCHAR NOT NULL , `status` VARCHAR NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB;

Or you can create a table manually using create new table tab.

You can use any different mysql database(create the task_management table using above query), Update the below environment variables value in .env file for backend .

HOST : localhost
PORT : 127.0.0.1,
USER : 'root',
PASSWORD : '' ,
DATABASE : 'task_management'

For XAMMP server use the above value of environment variables and update .env file for backend.

Now restart your backend server using 'npm start'.
Now restart your frontend server using 'npm start'.
You will see in console of backend 'Connected to MySQL Database'

# Now in browser type 'http://localhost:3000/' you will see Task-management opening now you can create,update and delete your tasks.

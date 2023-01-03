# springAcademy

Spring Academy is a toy web assignment submission app that leverages Spring Boot and PostgreSQL in the backend and ReactJS with Bootstrap in the
front end. There are three types of user in the **Spring Academy** world: students, instructors and administrators. Administrators create courses and 
assign them to instructors. Instructors create assignments in each of their courses and students register for whichever course they want and their
only responsibility is to submit their assignments. For the purpose of learning, some very basic 
security features are implemented, like login and JWT verification/expiration. 


## Setup your environment
- Since we are using Docker to run our PostgreSQL instance, the docker daemon needs to be installed. To do that, follow the instructions here https://docs.docker.com/get-docker/
- Once docker is installed, run ```docker pull postgres``` from your terminal. This will pull the latest docker image containing PostgreSQL
- Then run ```docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres``` to start the docker container at port 
5432
- To verify that the container is up and running, ```docker ps``` should output something like this 
```
CONTAINER ID   IMAGE      COMMAND                  CREATED       STATUS          PORTS                    NAMES
e405b5bba671   postgres   "docker-entrypoint.s…"   5 hours ago   Up 17 minutes   0.0.0.0:5432->5432/tcp   some-postgres
```
Please note that the container id will probably differ. 

- Navigate to the ```front-end``` folder and run ```npm install``` followed by ```npm start```. A very basic **HOME** page should render at ```localhost:3000```. 
This view is not part of the project and should be disregarded. Future commits will make the application better and "prettier". Navigate to 
```http://localhost:3000/login``` to login in. This page should always be the starting point. 
- For the purpose of experimenting with the application, I provide a ```.sql``` file that can be run in PostgreSQL to populate the database with some sample data. 
To do that, copy the sql file provided in the docker container by running ```docker cp /location/to/sql/file <container-id>:/tmp```. 
This will copy the specified file to the ```/tmp``` folder of your container. For any practical purpose, you can think of ```docker cp``` 
as ```scp```ing a file in a remote server. Now access the docker shell by running ```docker exec -it <container-id> bash``` and access postgres 
```psql -U postgres```. Now run the ```.sql``` file by doing ```\i /tmp/sample_sql.sql```. Check some of the relations to verify that the data 
has been copied. 

- You are now ready to run the spring application. If you are an IntelliJ lover like I am, just create a Spring Boot application configuration 
and point it to the following file ```com.springsocial.springsocial.SpringsocialApplication```. 


## Playing with the application

**Instructor View**

- Navigate to ```localhost:3000/login``` and enter ```reviewer2``` as the username and ```admin1``` as the password. 
These credentials will give you access to the instructor view. The dashboard contains the courses that `reviewer2` is teaching this semester. It should look this

<img width="1439" alt="Screen Shot 2022-12-17 at 10 03 50 PM" src="https://user-images.githubusercontent.com/70917323/208287147-efa02328-5ff5-4b9e-9503-7187f045d9b1.png">

- By clicking the "Add Assignment" button, you can create an assignment for the specific course. After specifying the assignment number and the due date, click save. The students registered for that course are now able to see this assignment in their dashboards. 
- The "View Submissions" link on the nagivation bar renders a view where instructors can see the submissions for each assignment of each course. 

**Student View**

- To access a student view, logout or navigate to the login page and use ```student``` as the username and ```admin1``` as the password. As a student, your dashboard shows all the classes that you've registered for. 

<img width="1440" alt="Screen Shot 2022-12-17 at 10 07 23 PM" src="https://user-images.githubusercontent.com/70917323/208287343-24856397-94ff-464f-a886-9c3ddfee70a6.png">

If you want to attend more classes, click the "Register" option on the navigation bar. There you can register for any class you want. To see which assignments are available, go back to the dashboard and click on the "Assignments" option for a course. You can now use the dropdown menu to view and submit all the available assignments. After selecting one, you should see something like this 

<img width="1440" alt="Screen Shot 2022-12-17 at 10 07 35 PM" src="https://user-images.githubusercontent.com/70917323/208287492-5405a424-25c1-4450-98c2-285ae19c6381.png">

**Admin View**

Finally, one can access Spring Academy by using an admin role. To do that, navigate to the login page 
and use ```admin1``` as the username and ```admin1``` as the password. Admins have full control over the
courses and they are the ones who create them. The admin dashboard should look like this

<img width="1412" alt="Screen Shot 2022-12-17 at 10 14 17 PM" src="https://user-images.githubusercontent.com/70917323/208287583-c8a26cd7-7d6d-4645-b38b-7ed22cf782f9.png">

At the very bottom, there is an "Add Course" option you can play with. 

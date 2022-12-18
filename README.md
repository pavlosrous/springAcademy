# springAcademy

Spring Academy is a toy web assignment submission application that leverages Spring Boot and PostgreSQL in the backend and ReactJS with Bootstrap in the
front end. There are three types of user in the **Spring Academy** world: students, instructors and administrators. Administrators create courses and 
assign them to instructors. Instructors create assignments in each of their courses and students register for whichever course they want and their
only responsibility is to submit their assignments. For the purpose of learning more about the endless capabilities of Spring Boot, some very basic 
security features are implemented, like login and JWT verification/expiration. 


## Setup your environment
- Since we are using Docker to run a PostgreSQL instance, the docker daemon needs to be installed. To do that, follow the instructions here https://docs.docker.com/get-docker/
- Once docker is installed, run ```docker pull postgres``` from your terminal. This will pull the latest docker image containing PostgreSQL
- Then run ```docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres``` to start the docker container at port 
543
- To verify that the container is up and running, ```docker ps``` should output something like this 
```
CONTAINER ID   IMAGE      COMMAND                  CREATED       STATUS          PORTS                    NAMES
e405b5bba671   postgres   "docker-entrypoint.s…"   5 hours ago   Up 17 minutes   0.0.0.0:5432->5432/tcp   some-postgres
```
Please note that the container id will probably differ. 

- Navigate to the ```front-end``` folder and run ```npm install``` followed by ```npm start```. A very basic **HOME** page should render at ```localhost:3000```. 
This view is currently part of the project and should be disregarded. Future commits will make the application better and more beatiful. Navigate to 
```http://localhost:3000/login``` to login in. This page should always be the starting point. 
- For the purpose of experimenting with the application, I provide a ```.sql``` file that can be run in PostgreSQL to populate the database with some sample data. 
To do that, copy the sql file provided in the docker container by running ```docker cp /location/to/sql/file <container-id>:/tmp```. 
This will copy the specified file to the ```/tmp``` folder of your container. For any practical purpose, you can think of ```docker cp``` 
as ```scp```ing a file in a remote server. Now access the docker shell by running ```docker exec -it <container-id> bash``` and access postgres 
```psql -U postgres```. Now run the ```.sql``` file by doing ```\i /tmp/sample_sql.sql```. Check some of the relations to verify that the data 
has been copied. 

- You are now ready to run the spring application. If you are an IntelliJ lover like I am, just create a Spring Boot configuration 
and point it to the following file ```com.springsocial.springsocial.SpringsocialApplication```. 


## Playing with the application
- Assuming that you managed to run both the backed and the front end succesfully, navigate to ```localhost:3000/login``` and enter ```reviewer2``` as the
username and ```admin1``` as the password. These credentials will give you access to the instructor view. The dashboard contains the courses
that the instructor is teaching this semester. It should look
<img width="1439" alt="Screen Shot 2022-12-17 at 10 03 50 PM" src="https://user-images.githubusercontent.com/70917323/208287147-efa02328-5ff5-4b9e-9503-7187f045d9b1.png">
 like this 


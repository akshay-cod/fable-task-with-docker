# Blue print 
# database either mongodb or mysql
in .env if DB variable changed to sql db will be SQL or default mongodb both are running in cloud 

# Bull is used for file writing queue as file writing on concurrently will break the logic of getting data from the file or inserting
# Interval of 20 secs are maintained to dump the data to db just using simple SETINTERVAL function which javascript provides with a bull queue just to reduce the work load on cpu

JSON file will be cleared every 20 seconds and pushed to redis to start db operations

# To run project 
1.setup docker environment in your local machine 
2.to run project, run in terminal enter the command "docker container up" inside the project directory
3.to run load testing enter the command "docker compose -f docker-compose.tests.yml up" which runs 1000 request per second for 10 seconds using npm load test

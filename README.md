# Blue print 
# database either mongodb or mysql
in .env DB changed to sql db will be automatically switched to SQL or default mongodb both are cloud not running in local

# Bull is used for file writing queue as file writing on concurrently will break the logic of getting data file 
# Interval of 20 secs are maintained to dump the data to db just using simple SETINTERVAL function which javascript provides

JSON file will be cleared every 20 seconds and pushed to redis to start db operations

# To run project 
1.setup docker environment in your localmachine 
2.to start project, run in terminal "docker container up" inside the project directory
3.to run load testing "docker compose -f docker-compose.tests.yml up" which runs 1000 request per second for 10 seconds using npm load test

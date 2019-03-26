# sample-api
sample project using Node.js, TypeScript, Express.js, Swagger, Docker

### Requirements
- docker 


### How to run 

```
docker-compose up
```

then you can access to 

- http://localhost:3000/  (node)
- http://localhost:8081/  (swagger-ui)

### NOTE: 
> the db will be stored one level up from the clone directory `../mongo-data/db`
> change the docker-compose.yaml if other location is desired
> ```
>    volumes:
>      - ../mongo-data/db:/data/db
> ```
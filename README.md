# sample-api [![CircleCI](https://circleci.com/gh/emauricio/sample-api.svg?style=svg&circle-token=f03add2f74d71360b83eba3c8b26af9638ecc1a8)](https://circleci.com/gh/emauricio/sample-api) :satisfied:

sample project using Node.js, TypeScript, Express.js, Swagger, Docker

### Requirements
- docker 
  ```sh
    brew cask install docker
  ```
  or 
  ```text
  https://docs.docker.com/docker-for-mac/install/
  https://docs.docker.com/install/
  ```

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
> ```text
>    volumes:
>      - ../mongo-data/db:/data/db
> ```

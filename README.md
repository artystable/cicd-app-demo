# CICD App Project Demo

## Introduction

This is a project to practice several modern Software Engineering concepts and technologies closely related to DevOps and Back-end design. The main goal of the project is to create a CICD pipeline for an SPA where an AWS S3 nucket will be used to host static content while Circle CI will be used as the primary CICD management tool together with Terraform as the IAAS system. The SPA, while modest, will be created using modern technologies for web development including React and Material Design by laveraging modern frameworks such as Create React App and Material UI.

## .env.sample

Change the filename to ".env" and update all relevant variables per your specific project needs. Note that CircleCI uses the environment variables in the repo to run its jobs. This project's .gitignore file prevents the .env file to be added to your git history by default. If you make your respository private on GitHub, you should have no problems with CircleCI as it will use the variables from the .env file to run its jobs. Otherwise, you have to add any environment (.env) variables you want CircleCI jobs to use into the CircleCI project via the CircleCI web application's project configuration. And of course, there are many other alternatives, but since this is a fairly simple project and two perfectly simple and functional 

## Using Docker Image

The Dockerfile image builds a nice Ubuntu image with all the necessary packages to implement a basic TDD, CICD pipeline to use an AWS S3 bucket to host static files for a client-side React webapp. This project is quite modest in its starting objectives, yet from this setup it should be significantly easy to extend the CICD pipeline as well as infracstructure to meet more complex needs. specifically, transitioning to a server-sided webapp by swwapping the S3 host layer for an AWS EC2 image should be fairly straightforward while still retaining most (if not all) of the resources that make up the infracstructure of the project. Also, the simplicity of the project and the way I chose to organzie the resources should make it particularly helpful for anyone else who might be interested in learning about DevOps and/or specifically, about TDD and CICD principles.

**Build:** `docker build -t artystable/cicd-app-demo .`
**Run Container Bash Shell:** `docker-compose run cicd-app-demo bash`

## Terraform

`cd ./cicd-app-demo/.terraform`
`terraform init`
`terraform plan`
`terraform apply` (then confirm `yes` after prompt)

## CircleCI

Run the `circleci setup` command with host and token passed via ENV variables from docker-compose to negin using the tool.
`circleci setup --no-prompt --host $CIRCLECI_CLI_HOST --token $CIRCLECI_CLI_TOKEN`

To validate your CircleCI config to ensure it is useable. In the root of your project, run the following command: `circleci config validate`. You can learn more more about the CircleCI CLI at the [Getting Started with the CircleCI CLI
](https://circleci.com/docs/2.0/local-cli-getting-started/#section=getting-started) and [Using the CircleCI Local CLI](https://circleci.com/docs/2.0/local-cli/) documentation published by CircleCI.

Note that CircleCI's CLI tool requires Docker to execute most advanced commands. Since this project is setup to use Docker as a dev environment, CircleCI's CLI docker feature can be a bit limiting since using the CLI tool imediately leads to issues about Running Docker within Docker. There are two easy and simple solutions to this, however. Solution #1: Download CircleCI CLI to your host machine (where you should also have Docker installed) and use Circle CI CLI from your host machine. Solution #2: Use the CircleCI website to manage jobs, workflows, etc. I am sure further solutions could be created, but that is beyond the scope of this project.

## Working With Create React App

The app sits at the ./app directory once the docker-compose command is ran to boot up the development environment. Change directories to enter the /app directory and then use the following commands to begin the app development workflow:
`yarn install` - Gets yarn to install all dependencies listed in the package.json file so the app can work.
`yarn build` - Yarn builds the app in the /app/build directory.
`yarn start` - Starts the react-script server on port 3000.

---

## Now go and make something awesome!

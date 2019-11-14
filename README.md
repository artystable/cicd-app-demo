# CICD App Project Demo

## Introduction

This is a project to practice several modern Software Engineering concepts and technologies closely related to DevOps and Back-end design. The main goal of the project is to create a CICD pipeline for an SPA where an AWS S3 bucket will be used to host static content while CircleCI will be used as the primary CICD management tool together with Terraform as the IAAS system. The SPA, while modest, will be created using modern technologies for web development including React and Material Design by leveraging modern frameworks such as Create React App and Material UI to provide a fast, yet solid foundation for modern UI development.

This project is ideal for a software engineer who is interested in learning about or using a minimal CICD pipeline for software development with CircleCI and Terraform. Familiarity with Docker and AWS is highly recommended before making use of this project's resources. Other relevant technologies include React, CircleCI, Terraform Linux, and Git. That being said, the detailed instructions and simple requirements in this project, permit a relatively easy implementation with minimal mastery over these technologies so that the CICD conceptual understanding and/or basic usage can be readily available.

## Prerequisites Summary

You will need to have an *AWS user* with *programmatic access* along with a CircleCI account that is integrated to your GitHub account and a *CircleCI personal API token*. This may sound tedious, but it is actually incredibly easy to do. Review the *Detailed Prerequisites* section below for more details as needed. You will also need to have *Docker* installed in your system.

## Environment Setup Instructions

- Open up a terminal and clone this repository locally.
  - `git clone https://github.com/artystable/cicd-app-demo.git`
- Enter root directory. Rename `./env/.env.sample` to `./env/.env`. Then update the contents of your `.env` file with the information you should have handy from the *Prerequisites Summary*.
  - `cd cicd-app-demo && mv ./env/.env.sample ./env/.env`
- Change the Build the Docker image from the Dockerfile located in the `./env` directory.
  - `cd ./env && docker build -t cicd-app-demo/cicd-app-demo .`
- Start the development environment with docker-compose.
  - `docker-compose run --service-ports cicd-app-demo bash`
- Create an SSH key pair using the below command and pressing enter for default values.
  - `ssh-keygen -t rsa -b 4096 -C "your_username@yourmail.com"`
- Add your public key from the previous step to the GitHub repository you created from the *Prerequisites Summary*. Note, you can copy your keys into your current directory temporarily and then remove them in the following way.
  - `cp -avr /root/.ssh /cicd-app-dev-env/keys` ... `rm /cicd-app-dev-env/keys -R`
- Add your GitHub user configs.
  - `git config --global user.email "your_username@yourmail.com" && git config --global user.name "your_username"`
- Add and commit local repository changes. Please note that you must update the URL in the below command to reflect your GitHub username and the repository name from the previous steps.
  - `git remote set-url origin git@github.com:your_git_hub_username/your_git_hub_project_name.git && git add . && git commit -m "Update .env file."`
- Push local repository to your new GitHub repository.
  - `git push origin master`
- Setup your Terraform integration with AWS. Note, confirm `yes` after prompt.
  - `cd .terraform && terraform init && terraform plan && terraform apply`
- Setup your CircleCI an GitHub integration from local development environment.
  - `circleci setup --no-prompt --host $CIRCLECI_CLI_HOST --token $CIRCLECI_CLI_TOKEN`
- Login to the CircleCI and add the AWS environment variables from your `.env` file to your project. Note, you need to add an extra environment variable as AWS_REGION, with the same value as your AWS_DEFAULT_REGION variable. In the future, changing the name of this variable in the Dockerfile will prevent the need to do this, but for now this step must be taken.
  - `Settings -> Projects -> Edit -> Environment Variables -> Add Variable`
- From the CircleCI webapp, start building the project pipeline.
  - `Add Projects -> Set Up Project -> Start Building`
- At this point, Terraform has created your AWS S3 bucket and CircleCI is properly configured to watch for your `git push` and automatically deploy your code to the S3 bucket as is desired in a CICD pipeline. Furthermore, CircleCI has moved the contents of the remote repository's `./build` directory to the S3 bucket and you should be able to see the live demo by logging in to AWS and accessing your S3 bucket public URL.
  - `AWS -> S3 -> your-custom-bucket -> Properties -> Static website hosting -> Endpoint`.

## General Details On Key Project Files & Technologies

**About the `.env.sample` file:**

Change the filename to `.env` and update all relevant variables per your specific project needs. Note that CircleCI uses the environment variables in the repo to run its jobs. This project's `.gitignore` file prevents the `.env` file to be added to your git history by default. If you make your repository private on GitHub and update the `.gitignore` file so the `.env` file is tracked, you should have no problems with CircleCI as it will use the variables from the `.env` file to run its jobs. Otherwise, you have to add any environment (found in `.env`) variables you want CircleCI jobs to use into the CircleCI project via the CircleCI web application's project configuration. And of course, there are many other alternatives, but since this is a fairly simple project and two perfectly simple and functional

**Using the Docker image:**

The `Dockerfile` image builds a nice Ubuntu image with all the necessary packages to implement a basic TDD, CICD pipeline to use an AWS S3 bucket to host static files for a client-side React webapp. This project is quite modest in its starting objectives, yet from this setup it should be significantly easy to scale the CICD pipeline as well as infrastructure to meet more complex needs. Specifically, transitioning to a server-sided webapp by swamping the Terraform S3 host layer for an AWS EC2 image should be fairly straightforward while still retaining most (if not all) of the resources that make up the infrastructure of the project. Also, the simplicity of the project and the way I chose to organize the resources should make it particularly helpful for anyone else who might be interested in learning about DevOps and/or about TDD and CICD principles as applied to Software Engineering.

- *Build:* `docker build -t artystable/cicd-app-demo .`
- *Run Container Bash Shell:* `docker-compose run --service-ports cicd-app-demo bash`

**Terraform:**

The following commands from the terminal will trigger the Terraform CLI to build the AWS S3 (or other chosen) infrastructure automatically:

`cd .terraform`
`terraform init`
`terraform plan`
`terraform apply` (then confirm `yes` after prompt)

Finally, `terraform destroy` will effectively undo or more specifically, destroy the entire infrastructure (AWS S3 bucket).

**CircleCI:**

To validate your CircleCI config file, run the following command: `circleci config validate`. You can learn more more about the CircleCI CLI at the [Getting Started with the CircleCI CLI
](https://circleci.com/docs/2.0/local-cli-getting-started/#section=getting-started) and [Using the CircleCI Local CLI](https://circleci.com/docs/2.0/local-cli/) documentation published by CircleCI.

Note that CircleCI's CLI tool requires Docker to execute most advanced commands. Since this project is setup to use Docker as a dev environment, CircleCI's CLI docker feature can be a bit limiting since using the CLI tool immediatelsy leads to issues about Running Docker within Docker. There are two easy and simple solutions to this, however. Solution #1: Download CircleCI CLI to your host machine (where you should also have Docker installed) and use Circle CI CLI from your host machine. Solution #2: Use the CircleCI website to manage jobs, workflows, etc. I am sure further solutions could be created, but that is beyond the scope of this project.

## Working With Create React App

The app sits at the ./app directory once the docker-compose command is ran to boot up the development environment. Change directories to enter the /app directory and then use the following commands to begin the app development workflow:
`cd /cicd-app-dev-env/app`
`yarn install` - Gets yarn to install all dependencies listed in the package.json file so the app can work.
`yarn build` - Yarn builds the app in the /app/build directory.
`yarn start` - Starts the react-script server on port 3000.

---

## Detailed Prerequisites

Due to the minimalistic nature of this project, I have purposely chosen to omit step-by-step instructions concerning the prerequisites. There are plenty of online tutorials freely available that explain these steps in great detail and the general guidelines included here should be clear and specific enough for anyone to successfully research and find an online tutorial that explains any unfamiliar step. With that said, the following are the general details concerning the prerequisites to setup the the development environment for this CICD pipeline:

- Create a new repository on GitHub.

- Sign-up for an AWS Developer account if you don't already have one. Then create an AIM user with *programmatic access* and an *AmazonS3FullAccess* permission policy (see *Resources* section for tips.) Choose a name for your S3 Bucket (see *Resources* section for tips and use the bucket name to set the S3_BUCKET_URL environment variable as shown in the `.env.sample` file.) Keep the following user information and related AWS data handy as they will be used to setup the development environment: **S3 Bucket Name**, **Access key ID**,  **Secret access key**, **Account ID** (from your AWS developer account), **User ARN** and **AWS region**.

- Sign-up for a CircleCI account and connect this account to your GitHub account. Create a *Personal API Token* and keep the information handy to use during environment setup (see *Resources* section for tips.)

---

## Resources

- [AWS AIM user creation guide](https://serverless-stack.com/chapters/create-an-iam-user.html)
- [Bucket Restrictions and Limitations - Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/dev/BucketRestrictions.html#bucketnamingrules)
- [Creating CircleCI Personal API Token](https://circleci.com/docs/2.0/managing-api-tokens/#creating-a-personal-api-token)
- [Adding a new SSH key to your GitHub account - GitHub Help](https://help.github.com/en/enterprise/2.18/user/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account)
- [Removing CircleCI Account](https://support.circleci.com/hc/en-us/articles/360037058873-How-do-I-remove-my-account-)

---

**Now Go And Make Something Awesome!**

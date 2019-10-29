
# Standard image declaration for Dockerfile.
FROM ubuntu:18.04

# Basic identification labels.
LABEL maintainer="arturostable@gmail.com"
LABEL build_date="2019-10-27"

# Create sandbox directory for app development & access the directory.
COPY ./ /cicd-app-dev-env
WORKDIR /cicd-app-dev-env

# Update Ubuntu...
RUN apt update && apt -y upgrade

# Install tzdata (timezone) in noninteractive mode.
RUN DEBIAN_FRONTEND=noninteractive apt install -y tzdata
ENV TZ=America/New_York
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN unset TZ

# Set system locales in noninteractive mode.
RUN DEBIAN_FRONTEND=noninteractive apt install -y locales locales-all
ENV LANG=en_US.UTF-8
ENV LANGUAGE=en_US
ENV LC_ALL=en_US.UTF-8

## Used Dependencies.

# Install Git.
RUN apt install -y git
# Add basic Git user credential data.
RUN git config --global user.email "arturostable@gmail.com"
RUN git config --global user.name "artystable"

# Install Latest Node JS LTS Version (10) & Matching NPM.
RUN apt install -y build-essential apt-transport-https lsb-release ca-certificates curl
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt install -y nodejs

# Install Yarn.
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update
RUN apt install -y yarn

# Install sandbox directory for development.
RUN yarn global add create-react-app

# Install Circleci
RUN curl -fLSs https://circle.ci/cli | bash

## Install Wget to download latest Terraform
RUN apt install -y wget

## Install Terraform
RUN wget -q -O - https://tjend.github.io/repo_terraform/repo_terraform.key | apt-key add - && echo 'deb [arch=amd64] https://tjend.github.io/repo_terraform stable main' >> /etc/apt/sources.list.d/terraform.list && apt update && apt install terraform

# Frequently used ports.
EXPOSE 80 8080 3000

# Set container access directives.
CMD ["bash", "yarn", "terraform", "circleci"]
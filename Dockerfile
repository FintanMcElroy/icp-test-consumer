FROM node:8
 
COPY app.js app.js
COPY package.json package.json
COPY startup.sh startup.sh

RUN npm install

# I did this first - but this means that this starts rightaway and blocks the job of completing creating the Docker image
# What you need is instead an entry point script that will be invoked on container start
# RUN npm start

# Set execute permissions for all on the startup shell script
RUN chmod a+x startup.sh

# Not clear if this is needed - seemed to run on K8s without it
# EXPOSE 8080

# script that runs at container start and invokes npm start (which in turn runs 'node app.js')
ENTRYPOINT ["./startup.sh"]
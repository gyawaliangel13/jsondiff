FROM ubuntu:latest
 
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get install -y build-essential
RUN apt install git -y
RUN DEBIAN_FRONTEND="noninteractive" apt-get -y install tzdata
RUN apt install nginx -y
ARG ang=19314
RUN git clone https://github.com/gyawaliangel13/jsondiff
RUN cp -r jsondiff/* /var/www/html/
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 2000



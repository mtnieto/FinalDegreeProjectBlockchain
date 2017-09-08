
docker run -d -p 27017:27017 -p 28017:28017 -e MONGODB_USER="admin" -e MONGODB_DATABASE="blockchain" -e MONGODB_PASS="admin" -e JOURNALING="no"  tutum/mongodb 

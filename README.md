# Cloth Management
# Api Urls
This Api is hosted on Heroku 
Heroku Link:- https://boiling-tor-34942.herokuapp.com/

# Functions
This Api is making two types of users for Cloth Management
1. Admin 
2. Customer 

# Admin Functions
Only Admin can add, update , delete and share cloths with others users.<br>
Add Cloth Url (POST Method):- https://boiling-tor-34942.herokuapp.com/admin/addCloth <br>
Update Cloth Url (PUT Method):-  https://boiling-tor-34942.herokuapp.com/admin/updateCloth <br>
Delete Cloth Url (Delete Method):- https://boiling-tor-34942.herokuapp.com/admin/deleteCloth <br>
Share Cloth Url (POST Method):- https://boiling-tor-34942.herokuapp.com/admin/shareCloth <br>

Admin can also see all cloths.<br>
All Cloth Url (GET Method):- https://boiling-tor-34942.herokuapp.com/admin/allCloth <br>

# Customer Functions
Customer can only see shared cloths.<br>
Shared Cloth Url (GET Method):-https://boiling-tor-34942.herokuapp.com/customer/sharedCloths  <br>

# Setup

**Installing Dependencies**

Dependencies and versions are listed in the package.json "dependencies" key, and can be installed via the following command from root:

```sh
npm install
```
**Database Dependencies**

Add "MONGO_URI" in .env file for Database

**Starting the dev server**
```sh
npm start
```

# Contributors
- Dinesh Hardasani

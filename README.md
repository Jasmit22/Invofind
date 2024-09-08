<img width="185" alt="image" src="https://github.com/user-attachments/assets/90b7b759-8dfc-4ab9-901f-487a1c54c8ee">

**Invofind** is integrated with Postgres and utilizes the Sequelize library. Built with Node.js + Express and React.

## Introduction
We created a database for an inventory management system to address the challenge of employees and store administrators needing to accurately determine the location and quantity of products. Manually tracking products can be cumbersome and ineffective, leading to poor store organization and opening the possibility of errors in a company’s inventory. The database we developed aims to streamline this process and allow store employees to effectively track products. Everything is fully implemented, including authentication. We implemented our knowledge of DBMS concepts, such as many-to-many relationships. 

## Project Design
The system caters to two end-users: **Admins** and **Users**. Authentication is implemented with JWT and both end-users are rendered dynamic content based on their privileges. SQL relationships ensure users can only see what they are supposed to see. For example, companies can not see the data of other companies, and each employee is assigned to only 1 store (stores and companies are different, a company can own several stores).

### Admins
Admins are distinguished users within our system with elevated privileges, allowing them to use functionalities which aren’t accessible to regular users. Elevated permissions entrust Admins to effectively administer and oversee critical aspects of the inventory management system. This is particularly useful for store management as they may require additional permissions not suitable for employees.

### Users
Users represent regular employees within the inventory management system. Our website allows users to efficiently locate products within store inventory by equipping them with the necessary tools and access privileges. Users are limited in their level of access as they do not need to oversee all aspects of the inventory management system.

<img width="1705" alt="image" src="https://github.com/user-attachments/assets/51f5cce3-bed2-4df1-bb1a-dff5a6fadb78">


## User Authentication
We developed secure user authentication using a token-based system to ensure only authorized individuals, such as Users and Admins, have access to the inventory management system. Admins and Users can easily log out from the system through a user-friendly interface.

## Admin Access
Upon logging in, Admins are provided with elevated access to the following functionalities:
- View all listed tasks and change their status from Incomplete to Complete.
- Add and remove tasks.
- Report issues.
- Search and find items in the inventory.
- Add new items to and remove existing items from the inventory.
- Create and remove departments, categories, and locations.
- Create new users, including Admins and Users.

## User Access
Users have access to the following functionalities:
- View all listed tasks and change their status from Incomplete to Complete.
- Report issues to Admins.
- Search and find items in the inventory.
- Add new items to and remove existing items from the inventory.

## Individual Screens
# Tasks
Only Admins can add/delete tasks, but any user can mark resolved.

Admins view:
<img width="1708" alt="image" src="https://github.com/user-attachments/assets/a471f900-70dd-4af7-8da3-47ce72401c17">

Employees view:
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/41bd882a-08dc-4725-8c4d-81338a4aa68a">


# Items
Items can only be deleted by admins, but any user can add items or change their quantities.

Admins view:
<img width="1702" alt="image" src="https://github.com/user-attachments/assets/b1d8746a-2816-4e5c-939d-4552f32de187">

Employees view:
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/761d84e8-8c8b-4eb1-9dc9-9e6dc9273c47">


# Issues
Issues are primarily from employees to admins. Therefore, they have autonomy here.

Admins view:
<img width="1704" alt="image" src="https://github.com/user-attachments/assets/e4005100-c1de-48c8-a899-b83989ce8997">

Employees view:
<img width="1709" alt="image" src="https://github.com/user-attachments/assets/550a5e64-f0d7-4fef-b7d3-9e6d8a1af07d">


# Locations
An employee can only view locations. The associated items update automatically.

Admins view:
<img width="1706" alt="image" src="https://github.com/user-attachments/assets/89aaa2b2-7a09-444f-acb2-249c373fdd95">

Employees view:
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/9c1a4db2-1186-4b2e-8afb-f74cbf1a5c4d">


# Extra
An employee can add a department/category since both labels are quite flexible.

Admins view:
<img width="1709" alt="image" src="https://github.com/user-attachments/assets/6f0a89bd-52d2-47f1-b904-1c43018bfb5b">

Employees view:
<img width="1710" alt="image" src="https://github.com/user-attachments/assets/e79e5f93-b13d-4ef5-a911-aace57b66a35">





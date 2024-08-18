# Invofind

**Invofind** is integrated with Postgres and utilizes the Sequelize library. Built with Node.js + Express and React.

## Introduction
We created a database for an inventory management system to address the challenge of employees and store administrators needing to accurately determine the location and quantity of products. Manually tracking products can be cumbersome and ineffective, leading to poor store organization and opening the possibility of errors in a company’s inventory. The database we developed aims to streamline this process and allow store employees to effectively track products.

## Project Design
The system caters to two end-users: **Admins** and **Users**.

### Admins
Admins are distinguished users within our system with elevated privileges, allowing them to use functionalities which aren’t accessible to regular users. Elevated permissions entrust Admins to effectively administer and oversee critical aspects of the inventory management system. This is particularly useful for store management as they may require additional permissions not suitable for employees.

### Users
Users represent regular employees within the inventory management system. Our website allows users to efficiently locate products within store inventory by equipping them with the necessary tools and access privileges. Users are limited in their level of access as they do not need to oversee all aspects of the inventory management system.

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

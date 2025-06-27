## Student Registration

A non-public-facing application, for admin users of a school/university. The applications' main functionality is to register students that can later be updated and deleted

### Built With

- Vue
- TypeScript
- CSS
- HTML
- Element Plus
- Vue Router
- Pinia

### Getting Started

To get a local copy up and running of the application, follow these simple steps:

#### Prerequisites

##### npm

```sh
npm install npm@latest -g
```

##### Installation

1. Clone the repo

```sh
git clone https://github.com/PaoloCo008/vue-student-registration.git
```

2. Install NPM packages

```sh
npm install
```

3. Initialize your admin credentials in a .env.local file with these global variables

```js
VITE_ADMIN_USERNAME = 'YOUR ADMIN USERNAME'
VITE_ADMIN_PASSWORD = 'YOUR ADMIN PASSWORD'
```

4. Change git remote url to avoid accidental pushes to base project

```sh
git remote set-url origin github_username/repo_name
git remote -v
```

### Usage

#### Authorization

Once you enter the website, you will be faced with this login page:

![Image](https://github.com/user-attachments/assets/53b8ae9c-4479-4b60-85fe-93ddce750eb4)

To be able to be authorized to use the application, you must enter the same global variables

#### Forgot Password

The flow of the forgot password is straightforward. Once the "Forgot Password?" link is clicked you will be brought to this page:

![Image](https://github.com/user-attachments/assets/1ed66dee-43c3-47c2-be08-7ff28ee86b71)

Here you must enter your set username to be able to proceed to the forgot password page. Once the account is successfully found, you will be brought to the forgot password page.

![Image](https://github.com/user-attachments/assets/14b41eba-0d92-45d4-a936-56fb21ca191f)

A user must enter the new password twice, once as as the first input and the second time as a confirmation. If both passwords don't match, the operation will fail, but once successful, you will be brought back to the sign in page.

#### Main Page

Once logged in you will now be on the main page.

![Image](https://github.com/user-attachments/assets/0d445226-0f11-4dd8-bbf0-fb37e88d3ce6)

1. Admin user icon - When clicked it will show a dropdown menu with one button to logout.
2. Search filter - A search input to filter students by name or address
3. Course Filter - A select element with five (5) options:
   - Bachelor of Science in Information and Technology
   - Bachelor in Computer Science
   - Bachelor of Science in Tourism Management
   - Bachelor of Science in Hotel and Restaurant Management
   - Bachelor of Science in Nursing
4. Sort - A select element with 4 options:
   - Sort by age (descending)
   - Sort by age (ascending)
   - Sort by registered date (descending)
   - Sort by registered date (ascending)
5. Edit Student Dropdown Item - Once clicked, a drawer will open with a student editing form
6. Delete Student Dropdown Item - Once clicked, a message box pop up to confirm the action of deleting a student. Once confirmed, it will remove the student.
7. Registration Fixed Button - Once clicked, a drawer will open with the student registration form

#### Student Registration Form

![Image](https://github.com/user-attachments/assets/9dbe7d94-670a-49e3-bf89-faf4d7b16076)

#### Student Editing Form

![Image](https://github.com/user-attachments/assets/e58b5618-2619-45a5-ab04-9b4fe6435414)

#### Confirmation Message for Deletion

![Image](https://github.com/user-attachments/assets/ff74c5f2-75b2-4bae-a22f-fb7bbf0e03b2)

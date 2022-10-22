# ThesisProject

# `Coding Quiz App - Created by Robert Stone (TLM Student)`

- [About](#About)
- [How does it work](###How-does-it-work)
- [How does it work (additional information)](#Additional-Information)
- [Using the Front End as a typical user](#Using-the-Front-End-as-a-typical-user)
- [Research & Explanation](#Research-&-Explanation)
- [Resources](#Resources)

<details>
<summary><strong>Running this App / User Guide</strong></summary>

- This App requires three (3) individual terminals to properly run. Please follow the instructions carefully.
- Please review the provided [Additional Information](#Additional-Information) for clarification on the use of each terminal.

* [Terminal #1](###Terminal-1)
* [Terminal #2](###Terminal-2)
* [Terminal #3](###Terminal-3)
</details>
 <details>
<summary><strong>Using the Front End as a typical user</strong></summary>

* [For Starters...](###For-Starters...)
* [Student Home Page](###Student-Home-Page)
* [Student Quiz Page](###Student-Quiz-Page)
* [Student Profile Page](###Student-Profile-Page)
* [Logging Out](###Logging-Out)

</details>
<details>
<summary><strong>Research & Explanation</strong></summary>

- [Redux & React-Redux](##Redux-&-React-Redux)
- [Multiparty](##Multiparty)
- [ESLint](##ESLint)
- [One New Feature](##One-New-Feature)
- [Pitfalls This New Feature Entails](##Pitfalls-This-New-Feature-Entails)

</details>

---

# `About`

This project is designed to assist Students in testing and expanding their skills in the Web Development Fundamentals, and MERN Stack areas. The languages chosen for this project are as follows: HTML (Hyper Text Markup Language), CSS (Cascade Style Sheets), Javascript, JQuery, Bootstrap, MongoDB (Mongo Database), Express, React, Node. This project was created around the focus languages of 'The Last Mile' Program, and gives an insight and perspective into the material covered, and the capabilities of what the languages covered in 'The Last Mile' Program have to offer. In tracking your progress through this Quiz App, you will be able to pin-point your weaknesses, and assure that you have a foundation in building MERN Stack Applications.

---

# `Running this App`

## _How does it work_

- To get started, open a new terminal (Terminal #1), and run the following:

### `Terminal 1:`

```bash
mongod
```

- Running `mongod` will initialize and listen for the MongoDB Database, which is required to properly run this app.

Next, you will open a new terminal (Terminal #2), go into the project's `server directory` and run the below provided commands in a new Terminal (Use `cmd + n` while in your terminal to open a new window):

### `Terminal 2:`

```bash
npm install
npm run seed
npm start
```

After completing the steps for Terminal 2, you will then open you're third Terminal, navigate into the `client directory` of this project, and type the following commands:

### `Terminal 3: `

```bash
npm install
npm start
```

> **_Note_: The above instructions will require you to run three (3) seperate terminal tabs!**

## _Additional Information_

- "Terminal 1" will initalize your MongoDB and allow it to listen and connect to your server (mongoose).

- "Terminal 2" comes in three (3) parts.

      - Part 1:  The first command `npm install` will install the required dependancies for the project so you can properly utilize all functionality;

      - Part 2: The second part, `npm run seed` will load existing data into the database (this is needed for quiz data);

      - Part 3: The last part `npm start` runs the server so your app can access the required database through the appropriate server files;

- "Terminal 3" will load all appropriate dependancies and start the page through React, automatically accessing the browser, at which point it should open and display the page.

> **_Note_: The page will reload if you make edits and save!**

---

# `Using the Front-End as a typical user`

### _For Starters..._

- The first thing you will be able to do when using this App is choose between `logging in`, or signing up by `creating a new user account`. You will have the option to `add your user image`, and should you choose not to, you can update that option at a later time.

### _Student Home Page_

- Once logged into your personal account, you will be taken to your Student Home Page where you will see your Quiz options, Best Score, Proficiency Level, and how many times you have attempted to take the chosen Quiz. By using the "Quick Quiz" options, you will be taken directly into the quiz to immediately begin testing. To the right of these two 'Quick Quiz' choices, you will see a card representing your Student Profile that will track if you have passed or failed either of the taken quizzes. `You must score a 70% or above to pass`. You `MUST` pass the Web Development Fundamentals Quiz to `unlock` the MERN Stack Quiz
- From the Home Page, you will have the options to click "Take Quiz Now" under the corresponding quiz you choose, or you can navigate to your profile through the "view profile" button available. Likewise, all of these options are available through the user navigation bar at the top.

### _Student Quiz Page_

- If you chose to navigate to the `Quiz tab` in the user `navigation` at the top of the screen, you will see your two Quiz options. After clicking the chosen Quiz, you will notice a modal pop up informing you of the expected set of knowledge for the selected quiz, and how many questions the quiz contains. once clicking start, `you will begin testing immediately`.

### _Student Profile Page_

- On your Student Profile Page, you will have the options of updating your user information (i.e. First Name and Last Name), as well as your user photo.
- Once creating a user account, you WILL `NOT` be able to change your `email` address.
- You can select a new user image by hovering over/clicking the user image icon.
- Under the Profile section, you will be able to track your stats per language, so you can focus on the areas you have the most difficulty in, allowing great room for improvement.

### _Logging Out_

- At the `top right of the screen`, you will see a mini photo with a `dropdown arrow`. If you click that arrow, you will notice you can choose to navigate to your user profile, or `Sign Out`.

---

# `RESEARCH & EXPLANATION:`

In building this Project, I have decided to use multiple dependancies to obtain the desired product as easily, and efficiently as possible (i.e. `Redux`, `React-Redux`, `Multiparty`, `ESlint`) with the ability to maintain consistency, trace state updates, use middleware to add centralized application logic, and other powerful capabilities.

## _Redux & React-Redux_

In choosing to use `Redux` & `React Redux`, I was able to focus primarily on userdata, and how it could be accessed throughout this application. By taking the entire user `state` and storing it in an object tree in a single `store`, it allows store referencing throughout all children of this application by way of the react-redux `Connect()` function. While this approach is more used for larger applications, I see this project, conceptually, as something that could grow and be utilized by many students in the future, both inside, and outside of the classroom. By taking the Redux & React-Redux approach, and placing everything in one store, it also allows easier manipulation throughout the app in regards to affecting multiple components in the same window when one particular state is affected. The taken approach effectively resembles a global this.state in the outermost container component, but without the inevitable mess that comes with passing the said state down through nested layers of props, and any changes back up the component tree through a rats-nest of handler functions.

## _Multiparty_

In choosing to implement `Multiparty`, I was able to parse multi part form data (including file uploads) and send it directly to the back-end while replacing the deprecated `express.bodyParser()` functionality. When working with the file uploads, Multiparty allows easier access to selected files by routing them to a chosen absolute directory, at which point they can be targeted, the data can be collected, and the file removed from from the designated directory for memory optimization.

## _ESLint_

ESLint is implemented into this project to check, and apply consistency in coding patterns. To start with, I chose to use the `eslint-config-airbnb` package, as well as Airbnb's base JS using `eslint-config-airbnb-base`, utilizing the airbnb rules, standards, and extensions, including `ECMAScript 6+` and `React`. By using the `eslint-plugin-prettier`, I was able to include additional rules. This plugin uses `Prettier` under the hood and will raise issues when code differs from Prettier's expected output.

## _One New Feature_

When deciding on a new feature to add, I tried to answer these questions:

1. What would be a good feature to allow users to personalize their accounts?
2. How can I approach implementation with this new feature?
3. Are there pros and cons associated with this approach?

In building this project, one feature that was focused on was the ability to target user images by their absolute path, and collect the appropriate data for image uploads. This feature was chosen and designed to allow users more personalized user accounts with the ability to change and update their chosen image. In building this feature, `Multiparty` was a primary focus. By default, multiparty will not touch your hard drive, however, by utilizing 'uploadDir' I was able to choose the directory for placing file uploads in; having the ability to later move or remove them. Essentially , Multiparty was used to submit multiple text fields, and a single image file, via the HTML form. The parseForm function is used to bundle these into a single object to be saved to MongoDB for appropriate usage.

## _Pitfalls This New Feature Entails_

At this point in the application, the feature of uploading user images has a major pitfall. The obstacle I crossed was the `size` of the `data` required to push into `MongoDB` to maintain an image. Due to unique situations that could cause a potential crash in this application, I chose to replace the users `image data` opposed to add new data under a new image, limiting the user to a single image in the database. Not understanding how to properly store files in MongoDB using `GridFS`, I was unable to divide the image files into parts, or `chunks`, and store each chunk as a separate document (`metadata`). While a user may be pretty hard pressed to reach a data limit, when trying to afford the user an option to select a new image, or a previously uploaded image, the data becomes so large between the multiple images that the structure of the feature runs into issues.

---

# _Resources_

- [Semantic UI (css)](https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css)
- [Semantic UI (js)](https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js)
- [JQuery](https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js)

---

_This Project was heavily inspired by my Track 1 (Web Development Fundamentals) Capstone Project. You can further view this at [https://github.com/Robertstone0514/tlm-thesis](https://github.com/Robertstone0514/tlm-thesis) if you wish to further dive into the code._

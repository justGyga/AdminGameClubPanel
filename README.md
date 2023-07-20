# It's my test project
I created and am developing this back-end test project to test my level of knowledge and readiness to work in Leam.

# Libraries
- express
- sequelize
- lodash
- yup
- jsonwebtoken
- pg
- auto-bind

# Tasks
- [x] create a structure: \
    ├── .github             # GitHub folder \
    ├── .vscode             # VScode settings folder \
    ├── core                # Folder with main components \
    ├── documents           # Documentation for Front-end \
    ├── modules             # Modules folder \
    ├── node-modules        # Dependencies files\
    ├── main.json           # Main dependencies \
    ├── package.json        # Package dependencies \
    └── README.md
- [x] Create Git Repository
- [ ] User
    - [x] Model (Id, Login, Password)
    - [x] Service
    - [x] Controller
        - [x] Registration
        - [x] Authorization
        - [x] Change login
        - [x] Delete user
    - [ ] JWT (exc: login and up)

- [ ] Company
    - [ ] Model (Id, Login, Password, CompanyName)
    - [ ] Service
    - [ ] Controller
        - [ ] Create
        - [ ] Authorization
        - [ ] Change company Name
        - [ ] Delete company
        - [ ] Look company session
    - [ ] JWT (exc: login and up)

- [ ] Game
    - [ ] Model (Id, GameName, Description, Image, Min and Max numbers of users)
    - [ ] Service
    - [ ] Controller
        - [ ] Add game
        - [ ] Change game name
        - [ ] Delete image
        - [ ] Get all games (with pages)
        - [ ] Get one game by Id
    - [ ] JWT (exc: login and up)

- [ ] Session
    - [ ] Model (Id, Company Id, Duration, Date, Game Id, Users number)
    - [ ] Service
    - [ ] Controller
        - [ ] Add game
        - [ ] Change game name
        - [ ] Delete image
        - [ ] Get all games (with pages)
        - [ ] Get one game by Id
    - [ ] JWT (exc: login and up)


### Commands
- Use ```npm i``` to install all packages
- Use ```npm start``` to start
- Use ```npm run dev``` if you edit code
## Deployment Link

Deploy your project on Netlify/GitHub pages/etc and put your deployed link here.
Link: https://lyrics-finder-himu.netlify.app

# Instruction

You need to create a Lyrics app to show song lyrics. You are free to design the app as per your wishes. The only core requirement is that it should be usable from a user's perspective.

# Features

- User should be able to search songs based on artist name or song title words.
- On `Search` button click event, show list of matched songs based on user input.
- Support Pagination functionality. User should be able to go to next page and previous page.
- On `Show Lyrics` button click event, show that song's lyrics.
- There's an `assets` folder. You may use the background if you like it. Or you can skip it.

# Lyrics API Document

https://lyricsovh.docs.apiary.io/#

Endpoint to get song suggestions is not mentioned in API doc. mentioning it here.
https://api.lyrics.ovh/suggest/inputQuery

`inputQuery` is path parameter. Replace `inputQuery` with actual word(ex. stairway)

The above API does not return data when it is under load. You are free to look for a different API service or handle the error with a re-try feature.

# Additional feature

- You will get more points for writing test cases

# Restrictions

- You can use vanilla HTML, CSS, and JavaScript to build this application.
  - Or you can use React. Choose one and stick with it. You can use create-react-app if you want to use React.
- Development libraries and dependencies are allowed and recommended
  For example:
  - Jest + helpers(for testing purpose)
  - ESLint + Airbnb (for linting purpose)
- Do not remove or rename existing files and folder. you can add new files and folder though.

# Commands

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# References and Credits:
Favicon - https://thenounproject.com/search/?q=lyrics&i=3020237

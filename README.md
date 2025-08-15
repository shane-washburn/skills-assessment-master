# Instructions

This coding exercise will have you finish a small "feature" that will help you demonstrate your front-end skills.
You will be provided with a few mocks and a description of how the UI should behave.
But first, here are some guidelines for this task:

1. Expect to spend between 1.5 and 3 hours on this assessment. Do not submit any work done after the 3 hours.
   - Spend some time to familiarize yourself with the project requirements and structure
   - Your time starts the moment you start coding (you don't need to include prep in your 3 hour window).
2. Approach this in the same fashion as you would any new project at work. **Code quality should be more important than completion.**
   - You are not expected to write unit tests due to the time constraint.
   - We ask that you use either React or plain JavaScript for this project.
3. Do not use third-party UI components (such as a modal module).
4. **If you use AI coding tools**, ensure you can explain any code you submit. You should be able to discuss the logic and purpose of the code, as our goal is to assess your understanding and application of front-end concepts.
5. For the purposes of this exercise, pick a single modern browser to work in.
6. Write down any questions that come to mind. Whether these questions are about the assessment,
or questions you would have on the job, we'd love to understand areas we can improve
or things you considered while working on this project.

## Preparation

### Environment
1. You will need to have `node` and `npm` installed on your machine
2. `cd` into the project directory and `npm install`
3. Run the appropriate package script:
	- Use `npm run start` to start `webpack-dev-server` with a React setup
	- Use `npm run start:vanilla` to start `webpack-dev-server` with a vanilla JS setup

### Icons
There is a React icon component or vanilla function you can use in `icon.js`.
These are the available icon names:
* `circle-16x16`
* `circle-check-16x16`
* `error-14x14`
* `key-16x16`
* `key-check-16x16`
* `people-18x15`
* `x-14x14`

## What you'll be building
We've put 3 mocks up on Figma. You can access this project by using the following link:

https://www.figma.com/file/AZsiy94kB4a7HVyvSkef49/FE-Dev-Assessment?type=design&node-id=0-1&mode=design&t=EltuNo99rDV2RVw9-0

We suggest creating a free account so you can see basic information about the elements (font-size, dimensions, color, etc).

#### The Scenario
You've been asked by a product manager to build a simple list of employees someone would have access control over.
When selecting a user from the dropdown and then clicking the button "Update Employee",
it should open a modal where you can edit the information for this individual.
The modal should populate with the data associated with that user (including the name inputs). You don't need to worry about saving anything to an actual endpoint but there will be some validation states to work out:

1. The `First Name` and `Last Name` fields are required
2. Red error styles on inputs should:
   - only show after first clicking the "Save Employee Info" button
   - update when an input loses focus (_only_ after the first attempted submission)
3. The Update Password fields are optional when empty, but if data is added, the password should be checked to ensure it matches the criteria displayed in the UI.
   - The password checklist should update any time a password value is changed
   - An invalid password (using the checklist criteria) should prevent form submission
4. When you click the `Save Employee Info` button, it should log to the console or alert if the form is valid or not.

> Employee data required for this task has been included for you in the `index.react.js` or `index.vanilla.js` files (in a variable called `employees`).

## Submitting this assessment
You will receive access in an email to a google drive folder. Place your assessment files in the folder,
and respond to that same email with the following:
- How long you spent coding 
- What browser you used
- A description of your approach (if you used AI assistance, what role did it play in completing this project?)
- Any items that are unfinished or you didn't get to
- If you wrote your questions separate from your code, add any questions you may have had

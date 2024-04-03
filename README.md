# Project 3: Around The U.S.

### Overview

- Intro
- Project
- Project features
- Plans for improvement

**Intro**
This project was my first attempt to create a responsive website. As a Triple Ten Bootcamp student, I was charged with replicating the following Figma design: [Figma project design](https://www.figma.com/file/ii4xxsJ0ghevUOcssTlHZv/Sprint-3%3A-Around-the-US?node-id=0%3A1)

The instructors provided us with videos assisting us in the basic structure of the project, but they provided us with no written code. We had to write all the HTML and CSS ourselves. In addition, the details of the responsive design were also up to us to construct.

**Project**
Here is a link to my project: [Around the U.S. Project](https://lydiacodes04.github.io/se_project_aroundtheus/)

**Project features**
Here are a few screenshots of the project:
![desktop image](./images/demo/1280px%20desktop.png)
![tablet image](./images/demo/800px%20tablet.png)
![phone image](./images/demo/320px%20phone.png)

I created a video describing the project's features. You can view it here:
[Link to my video: Project 3 demo](https://drive.google.com/file/d/1IMFnQz4o8_h3-tnFMQuBl8rgOnsdqzyf/view?usp=drive_link/)

**Plans for improvement**
My plans for improving the project include making it more interactive. I would like for users to be able to see other users' profiles and for users to be able to comment on each others' pictures. In addition, I mentioned a few minor adjustments I would like to make in order for the responsiveness of the sight to be enhanced.

A technical area of improvement would be to consolidate all the close buttons under one universal handler:

closeButtons.forEach((button) => {
// find the closest modal popup
const modal = button.closest(".modal");
// create an event listener which would toggle the modal--in this case closed
button.addEventListener("click", () => toggleModal(modal));
});

# AnswEarApp
An android mobile application developed using TypeScript. It is an examination tool intended to aid the visually impaired students in a certain school in the Philippines by implementing speech recognition and speech synthesis.
_______________________________________________________________________________

Android Examination Application:

Contains the developed android examination app
utilizing Text-to-Speech API, MySQL Database, and Python GRU.
The Android application handles the exam creation for multiple choice type of question and for identification type of question.
The android application also handles the examination taking and scoring. Both are done using TTS and STT
The android application is in the Master branch.
https://github.com/Shioreta/AnswEarApp/tree/master
_______________________________________________________________________________


GRU MODEL: 

Contains the python file for prediction of words and letters:
There is a need for FFmpeg for local conversion of webm file to wav file.
The input voice file extension must be in wav file if the prediction is not done through the mobile application.

It also contains pre-trained Model for words:
Always, Another, Answer, Been, Began, Below, Example, For, Many, Often, Once, Than, Usually, Which, Who, Why, World	with accuracy of 100%
Against, Because, Children, Different, During, Earth, Enough, Every, First, Great, Heard, Important, New, People, Sentence, Since, Story, Study, Then, These, Young with accuracy of	80%
Above, Again, Any, Could, Here, Just, Know, Learn, Little, Might, Right, Several, Should, Something, Together, Toward, Very, What, Where, Your with accuracy of	60%
About, Change, Country, Other, Said, Through, Too, When	40%
Its, School, They, Thought, Until, Write	with accuracy of 20%
There, Their, While with 0% accuracy.

and letters:
A, B, C, and D with accuracy of 80%, 60%, 80%, and 80% respectively.

Speech data came from 200 highschool students in Caloocan City.
_______________________________________________________________________________


answEarServer: 

Contains the PHP connection for every interaction of the app to the database.
PHP files must be edited with appropriate IP address in order to run locally using XAMPP.
_______________________________________________________________________________


dbanswear.sql:
the MysqlTable file.
_______________________________________________________________________________


System Architecture for Answear Application: ![image](https://user-images.githubusercontent.com/89452958/169653684-102a3564-eba5-49e2-8569-0c93cb328afc.png)

The researchers proposed the architecture above for the tool AnswEar: an assistive examination tool for visually impaired students. 

The tool has two users which are the teachers and the visually impaired students. 
Teachers can create assessments for the students with the help of an authoring tool provided inside the application.

The questions created will go to the item bank where all the questions are stored. Along with the creation of the exam, the answers will be provided by the teacher. 
The answers will be then used to check the student’s answers and provide them with their respective scores.
All the students’ exam result will be stored inside the results database.


The application has a remote test module which is under the subject module. 
The students can access the exam through the subject's module after selecting the subject module. 
The application will display the available examinations which is called from the remote test bank.


Once the examination has started, the application will call the items from the item bank and will be translated into an audible file through the text to speech engine inside the application.
The application will take the student answers for each item, and it will be saved in the database. 
After the examination is completed, the teacher answers for specific examinations will be then used to check the student's answers and provide them with their respective scores.
The student's exam result will be displayed and stored inside the database.
_______________________________________________________________________________


System Architecture for Speech Recognition through Gated Recurrent Unit:  ![image](https://user-images.githubusercontent.com/89452958/169653907-0871c9cd-ebba-464e-a4db-d348d85c8e79.png)
_______________________________________________________________________________


Screenshot of Dataset:

![image](https://user-images.githubusercontent.com/89452958/169653945-dd4d80cd-a6e7-4a13-bf81-c3f8ed1e20fb.png)
![image](https://user-images.githubusercontent.com/89452958/169653950-54e766ce-75af-4d4f-a975-e194b7f48791.png)
_______________________________________________________________________________


Screen Layout: 

![image](https://user-images.githubusercontent.com/89452958/169653978-bc347fc9-1829-48be-8be2-762f2a19cac1.png)
![image](https://user-images.githubusercontent.com/89452958/169653988-af6d3625-ba2c-46f2-b101-2b66e0ed0546.png)
![image](https://user-images.githubusercontent.com/89452958/169653990-774ef6d8-674f-4566-91b3-3301769bae4a.png)
![image](https://user-images.githubusercontent.com/89452958/169653995-583ea010-2b15-4ab6-b420-94191f7c7605.png)
![image](https://user-images.githubusercontent.com/89452958/169654000-cb4e34df-48f7-4d0e-8c78-bd8885c587a8.png)
![image](https://user-images.githubusercontent.com/89452958/169654011-7a4782e0-a6f6-47cf-b0c5-bd09dc82ce94.png)
![image](https://user-images.githubusercontent.com/89452958/169654022-46a94984-dc21-4bd2-bf48-5286056953a0.png)
_______________________________________________________________________________







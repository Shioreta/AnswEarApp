import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { ExamResultsPage } from '../exam-results/exam-results.page';
import { SwiperComponent } from 'swiper/angular';
import { Storage } from '@ionic/storage';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { RecordingData, VoiceRecorder } from 'capacitor-voice-recorder';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-examination',
  templateUrl: './examination.page.html',
  styleUrls: ['./examination.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ExaminationPage implements AfterContentChecked {
  //initialize recording to false
  recording = false;
  storedFileNames = [];

  //get predict
  timestamp;
  predict;
  data;

  eid;
  examType;
  questions;
  predictedAnswer;
  studentAnswer;
  disableNext: false;
  studAnswer: string = '';
  userData;
  uName: string;
  multipleChoice:boolean=false;
  identification:boolean=false;
  @ViewChild('swiper') swiper: SwiperComponent;

  quesID;
  questionRightAns;

  unixTimestamp;

  examQuestion;
  // question variables
  question1;question2;question3;question4;question5;question6;question7;question8;question9;question10;question11;question12;question13;question14;question15;question16;question17;question18;question19;question20;question21;question22;question23;question24;question25;question26;question27;question28;question29;question30;question31;question32;question33;question34;question35;question36;question37;question38;question39;question40;question41;question42;question43;question44;question45;question46;question47;question48;question49;question50;
  // validation if question is already ready
  isQuestion1Read: boolean= false;isQuestion2Read: boolean= false;isQuestion3Read: boolean= false;isQuestion4Read: boolean= false;isQuestion5Read: boolean= false;isQuestion6Read: boolean= false;isQuestion7Read: boolean= false;isQuestion8Read: boolean= false;isQuestion9Read: boolean= false;isQuestion10Read: boolean= false;isQuestion11Read: boolean= false;isQuestion12Read: boolean= false;isQuestion13Read: boolean= false;isQuestion14Read: boolean= false;isQuestion15Read: boolean= false;isQuestion16Read: boolean= false;isQuestion17Read: boolean= false;isQuestion18Read: boolean= false;isQuestion19Read: boolean= false;isQuestion20Read: boolean= false;isQuestion21Read: boolean= false;isQuestion22Read: boolean= false;isQuestion23Read: boolean= false;isQuestion24Read: boolean= false;isQuestion25Read: boolean= false;isQuestion26Read: boolean= false;isQuestion27Read: boolean= false;isQuestion28Read: boolean= false;isQuestion29Read: boolean= false;isQuestion30Read: boolean= false;isQuestion31Read: boolean= false;isQuestion32Read: boolean= false;isQuestion33Read: boolean= false;isQuestion34Read: boolean= false;isQuestion35Read: boolean= false;isQuestion36Read: boolean= false;isQuestion37Read: boolean= false;isQuestion38Read: boolean= false;isQuestion39Read: boolean= false;isQuestion40Read: boolean= false;isQuestion41Read: boolean= false;isQuestion42Read: boolean= false;isQuestion43Read: boolean= false;isQuestion44Read: boolean= false;isQuestion45Read: boolean= false;isQuestion46Read: boolean= false;isQuestion47Read: boolean= false;isQuestion48Read: boolean= false;isQuestion49Read: boolean= false;isQuestion50Read: boolean= false;
  //read again
  readAgain1: boolean=false; readAgain2: boolean=false; readAgain3: boolean=false; readAgain4: boolean=false; readAgain5: boolean=false; readAgain6: boolean=false; readAgain7: boolean=false; readAgain8: boolean=false; readAgain9: boolean=false; readAgain10: boolean=false;
  // rightanswers variable
  rightAns1;rightAns2;rightAns3;rightAns4;rightAns5;rightAns6;rightAns7;rightAns8;rightAns9;rightAns10;rightAns11;rightAns12;
  // question ids variables
  quesID1;quesID2;quesID3;quesID4;quesID5;quesID6;quesID7;quesID8;quesID9;quesID10;quesID11;quesID12;quesID13;
  // option variables
  optionAques1;optionBques1;optionCques1;optionDques1;
  optionAques2;optionBques2;optionCques2;optionDques2;
  optionAques3;optionBques3;optionCques3;optionDques3;
  optionAques4;optionBques4;optionCques4;optionDques4;
  optionAques5;optionBques5;optionCques5;optionDques5;
  optionAques6;optionBques6;optionCques6;optionDques6;
  optionAques7;optionBques7;optionCques7;optionDques7;
  optionAques8;optionBques8;optionCques8;optionDques8;
  optionAques9;optionBques9;optionCques9;optionDques9;
  optionAques10;optionBques10;optionCques10;optionDques10;

  constructor(private router: Router,
              private modalCtrl: ModalController,
              private _apiService: ApiService,
              private speechRecognition: SpeechRecognition,
              private tts: TextToSpeech,
              private activatedRoute: ActivatedRoute,
              private alertCtrl: AlertController,
              private storage: Storage,
              private platform: Platform,
              private http: HttpClient) { 
    this.platform.backButton.subscribeWithPriority(10, () => {
      // console.log('Handler was called!');
      this.backButtonisDisabled();
    });
  }

  // Slider declaration
  ngAfterContentChecked(){
    if(this.swiper) {
      this.swiper.updateSwiper({});
    }
  }

  onSlideChange() {}

  // run automatically once this page is loaded
  ngOnInit() {
    var obj: JSON;
    let headers = new HttpHeaders({'Content-Type': 'application/json; charset=UTF-8'});
    let options = {headers:headers};
    //VOICE RECORDER
    VoiceRecorder.requestAudioRecordingPermission();


    this.eid = this.activatedRoute.snapshot.paramMap.get('eid');
    this.examType = this.activatedRoute.snapshot.paramMap.get('examType');
    // console.log(this.examType);
    this.getQuestions();

    if(this.examType == 'Multiple Choice'){
      this.multipleChoice = true;
    }else{
      this.identification = true;
    }
    
    this.speechRecognition.isRecognitionAvailable()
    .then((available: boolean) => console.log(available))

    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean) => {
      if (!hasPermission) {
        this.speechRecognition.requestPermission()
        .then(
          // () => console.log('granted'),
          // () => console.log('denied')
        ) 
      }
    });
  }

  // Student answer validation
  async noAnswerRegistered() {
    const alert = await this.alertCtrl.create({
      header: 'Sorry, Please enter your answer',
      buttons: [ {
          text: 'Okay',
          handler: () => {
            // console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    this.tts.speak('Sorry, Please enter your answer!');
    this.listen(0,'none');
  }

  // disabling back button
  async backButtonisDisabled(){
    const alert = await this.alertCtrl.create({
      header: 'Sorry, Back button is disabled at the moment!',
      buttons: [ {
          text: 'Okay',
          handler: () => {
            // console.log('Confirm Okay');
          }
        }
      ]
    });
    await alert.present();
    this.tts.speak('Sorry, Back button is disabled at the moment!');
  }


  // get questions
  getQuestions() {
    this._apiService.getQuestionaire(this.eid).subscribe((res:any) => {
      this.questions = res;
      // console.log(this.questions);

      // console.log(this.examType)
      if(this.examType == 'Multiple Choice'){

        // question10
        if(this.questions[9]) {
          // console.log('has value on question 10');
          this.question10 = this.questions[9].question;
          this.quesID10 = this.questions[9].QID;
          this.rightAns10 = this.questions[9].answer;
          this.optionAques10 = this.questions[9].optionA;
          this.optionBques10 = this.questions[9].optionB;
          this.optionCques10 = this.questions[9].optionC;
          this.optionDques10 = this.questions[9].optionD;
          this.readQuestion10();
        }else{
          // console.log('no value on question 10');
        }

        // question9
        if(this.questions[8]) {
          // console.log('has value on question 9');
          this.question9 = this.questions[8].question;
          this.quesID9 = this.questions[8].QID;
          this.rightAns9 = this.questions[8].answer;
          this.optionAques9 = this.questions[8].optionA;
          this.optionBques9 = this.questions[8].optionB;
          this.optionCques9 = this.questions[8].optionC;
          this.optionDques9 = this.questions[8].optionD;
          this.readQuestion8();
        }else{
          // console.log('no value on question 9');
        }

        // question8
        if(this.questions[7]) {
          // console.log('has value on question 8');
          this.question8 = this.questions[7].question;
          this.quesID8 = this.questions[7].QID;
          this.rightAns8 = this.questions[7].answer;
          this.optionAques8 = this.questions[7].optionA;
          this.optionBques8 = this.questions[7].optionB;
          this.optionCques8 = this.questions[7].optionC;
          this.optionDques8 = this.questions[7].optionD;
          this.readQuestion7();
        }else{
          // console.log('no value on question 8');
        }

        // question7
        if(this.questions[6]) {
          // console.log('has value on question 7');
          this.question7 = this.questions[6].question;
          this.quesID7 = this.questions[6].QID;
          this.rightAns7 = this.questions[6].answer;
          this.optionAques7 = this.questions[6].optionA;
          this.optionBques7 = this.questions[6].optionB;
          this.optionCques7 = this.questions[6].optionC;
          this.optionDques7 = this.questions[6].optionD;
          this.readQuestion7();
        }else{
          // console.log('no value on question 7');
        }

        // question6
        if(this.questions[5]) {
          // console.log('has value on question 6');
          this.question6 = this.questions[5].question;
          this.quesID6 = this.questions[5].QID;
          this.rightAns6 = this.questions[5].answer;
          this.optionAques6 = this.questions[5].optionA;
          this.optionBques6 = this.questions[5].optionB;
          this.optionCques6 = this.questions[5].optionC;
          this.optionDques6 = this.questions[5].optionD;
          this.readQuestion6();
        }else{
          // console.log('no value on question 6');
        }

        // question5
        if(this.questions[4]) {
          // console.log('has value on question 5');
          this.question5 = this.questions[4].question;
          this.quesID5 = this.questions[4].QID;
          this.rightAns5 = this.questions[4].answer;
          this.optionAques5 = this.questions[4].optionA;
          this.optionBques5 = this.questions[4].optionB;
          this.optionCques5 = this.questions[4].optionC;
          this.optionDques5 = this.questions[4].optionD;
          this.readQuestion5();
        }else{
          // console.log('no value on question 5');
        }

        // question4
        if(this.questions[3]) {
          // console.log('has value on question 4');
          this.question4 = this.questions[3].question;
          this.quesID4 = this.questions[3].QID;
          this.rightAns4 = this.questions[3].answer;
          this.optionAques4 = this.questions[3].optionA;
          this.optionBques4 = this.questions[3].optionB;
          this.optionCques4 = this.questions[3].optionC;
          this.optionDques4 = this.questions[3].optionD;
          this.readQuestion4();
        }else{
          // console.log('no value on question 4');
        }

        // question3
        if(this.questions[2]) {
          // console.log('has value on question 3');
          this.question3 = this.questions[2].question;
          this.quesID3 = this.questions[2].QID;
          this.rightAns3 = this.questions[2].answer;
          this.optionAques3 = this.questions[2].optionA;
          this.optionBques3 = this.questions[2].optionB;
          this.optionCques3 = this.questions[2].optionC;
          this.optionDques3 = this.questions[2].optionD;
          this.readQuestion3();
        }else{
          // console.log('no value on question 3');
        }

        // question2
        if(this.questions[1]) {
          // console.log('has value on question 2');
          this.question2 = this.questions[1].question;
          this.quesID2 = this.questions[1].QID;
          this.rightAns2 = this.questions[1].answer;
          this.optionAques2 = this.questions[1].optionA;
          this.optionBques2 = this.questions[1].optionB;
          this.optionCques2 = this.questions[1].optionC;
          this.optionDques2 = this.questions[1].optionD;
          this.readQuestion2();
        }else{
          // console.log('no value on question 2');
        }

        // question1
        if(this.questions[0]) {
          // console.log('has value on question 1');
          this.question1 = this.questions[0].question;
          this.quesID1 = this.questions[0].QID;
          this.rightAns1 = this.questions[0].answer;
          this.optionAques1 = this.questions[0].optionA;
          this.optionBques1 = this.questions[0].optionB;
          this.optionCques1 = this.questions[0].optionC;
          this.optionDques1 = this.questions[0].optionD;
          this.readQuestion1();
        }else{
          // console.log('no value on question 1');
        }

      // IDENTIFICATION

      }else{
        if(this.questions[0]) {
          // console.log('has value on question 1');
          this.question1 = this.questions[0].question;
          this.quesID1 = this.questions[0].QID;
          this.rightAns1 = this.questions[0].answer;
          this.readQuestion1();
        }else {
          // console.log('no value on question 1');
        }
  
        if(this.questions[1]) {
          // console.log('has value on question 2');
          this.question2 = this.questions[1].question;
          this.quesID2 = this.questions[1].QID;
          this.rightAns2 = this.questions[1].answer;
          this.readQuestion2();
        }else {
          // console.log('no value on question 2');
        }
  
        // ques3
        if(this.questions[2]) {
          // console.log('has value on question 3');
          this.question3 = this.questions[2].question;
          this.quesID3 = this.questions[2].QID;
          this.rightAns3 = this.questions[2].answer;
          this.readQuestion3();
        }else {
          // console.log('no value on question 3');
        }
  
        if(this.questions[3]) {
          // console.log('has value on question 4');
          this.question4 = this.questions[3].question;
          this.quesID4 = this.questions[3].QID;
          this.rightAns4 = this.questions[3].answer;
          this.readQuestion4();
        }else {
          // console.log('no value on question 4');
        }
  
        if(this.questions[4]) {
          // console.log('has value on question 5');
          this.question5 = this.questions[4].question;
          this.quesID5 = this.questions[4].QID;
          this.rightAns5 = this.questions[4].answer;
          this.readQuestion5();
        }else {
          // console.log('no value on question 5');
        }
  
        if(this.questions[5]) {
          // console.log('has value on question 6');
          this.question6 = this.questions[5].question;
          this.quesID6 = this.questions[5].QID;
          this.rightAns6 = this.questions[5].answer;
          this.readQuestion6();
        }else {
          // console.log('no value on question 6');
        }
  
        if(this.questions[6]) {
          // console.log('has value on question 7');
          this.question7 = this.questions[6].question;
          this.quesID7 = this.questions[6].QID;
          this.rightAns7 = this.questions[6].answer;
          this.readQuestion7();
        }else {
          // console.log('no value on question 7');
        }
  
        if(this.questions[7]) {
          // console.log('has value on question 8');
          this.question8 = this.questions[7].question;
          this.quesID8 = this.questions[7].QID;
          this.rightAns8 = this.questions[7].answer;
          this.readQuestion8();
        }else {
          // console.log('no value on question 8');
        }
  
        if(this.questions[8]) {
          // console.log('has value on question 9');
          this.question9 = this.questions[8].question;
          this.quesID9 = this.questions[8].QID;
          this.rightAns9 = this.questions[8].answer;
          this.readQuestion9();
        }else {
          // console.log('no value on question 9');
        }
  
        if(this.questions[9]) {
          // console.log('has value on question 10');
          this.question10 = this.questions[9].question;
          this.quesID10 = this.questions[9].QID;
          this.rightAns10 = this.questions[9].answer;
          this.readQuestion10();
        }else {
          // console.log('no value on question 10');
        }
      }

      
    });
  }

  // read Options
  readOptionsOnQuestion1(){
    this.tts.speak('Letter A: '+this.optionAques1).then(() => {
      this.tts.speak('Letter B: '+this.optionBques1).then(() => {
        this.tts.speak('Letter C: '+this.optionCques1).then(() => {
          this.tts.speak('Letter D: '+this.optionDques1).then(() => {
            // console.log('Proceed on Reading Question 2');
            this.listen(this.quesID1, this.rightAns1);
          })
        })
      })
    })
  }

  readOptionsOnQuestion2(){
    this.tts.speak('Letter A: '+this.optionAques2).then(() => {
      this.tts.speak('Letter B: '+this.optionBques2).then(() => {
        this.tts.speak('Letter C: '+this.optionCques2).then(() => {
          this.tts.speak('Letter D: '+this.optionDques2).then(() => {
            // console.log('Proceed on Reading Question 3');
            this.listen(this.quesID2, this.rightAns2);
          })
        })
      })
    })
  }

  readOptionsOnQuestion3(){
    this.tts.speak('Letter A: '+this.optionAques3).then(() => {
      this.tts.speak('Letter B: '+this.optionBques3).then(() => {
        this.tts.speak('Letter C: '+this.optionCques3).then(() => {
          this.tts.speak('Letter D: '+this.optionDques3).then(() => {
            // console.log('Proceed on Reading Question 4');
            this.listen(this.quesID3, this.rightAns3);
          })
        })
      })
    })
  }

  readOptionsOnQuestion4(){
    this.tts.speak('Letter A: '+this.optionAques4).then(() => {
      this.tts.speak('Letter B: '+this.optionBques4).then(() => {
        this.tts.speak('Letter C: '+this.optionCques4).then(() => {
          this.tts.speak('Letter D: '+this.optionDques4).then(() => {
            // console.log('Proceed on Reading Question 4');
            this.listen(this.quesID4, this.rightAns4);
          })
        })
      })
    })
  }

  readOptionsOnQuestion5(){
    this.tts.speak('Letter A: '+this.optionAques5).then(() => {
      this.tts.speak('Letter B: '+this.optionBques5).then(() => {
        this.tts.speak('Letter C: '+this.optionCques5).then(() => {
          this.tts.speak('Letter D: '+this.optionDques5).then(() => {
            // console.log('Proceed on Reading Question 5');
            this.listen(this.quesID5, this.rightAns5);
          })
        })
      })
    })
  }

  readOptionsOnQuestion6(){
    this.tts.speak('Letter A: '+this.optionAques6).then(() => {
      this.tts.speak('Letter B: '+this.optionBques6).then(() => {
        this.tts.speak('Letter C: '+this.optionCques6).then(() => {
          this.tts.speak('Letter D: '+this.optionDques6).then(() => {
            // console.log('Proceed on Reading Question 6');
            this.listen(this.quesID6, this.rightAns6);
          })
        })
      })
    })
  }

  readOptionsOnQuestion7(){
    this.tts.speak('Letter A: '+this.optionAques7).then(() => {
      this.tts.speak('Letter B: '+this.optionBques7).then(() => {
        this.tts.speak('Letter C: '+this.optionCques7).then(() => {
          this.tts.speak('Letter D: '+this.optionDques7).then(() => {
            // console.log('Proceed on Reading Question 7');
            this.listen(this.quesID7, this.rightAns7);
          })
        })
      })
    })
  }

  readOptionsOnQuestion8(){
    this.tts.speak('Letter A: '+this.optionAques8).then(() => {
      this.tts.speak('Letter B: '+this.optionBques8).then(() => {
        this.tts.speak('Letter C: '+this.optionCques8).then(() => {
          this.tts.speak('Letter D: '+this.optionDques8).then(() => {
            // console.log('Proceed on Reading Question 8');
            this.listen(this.quesID8, this.rightAns8);
          })
        })
      })
    })
  }

  readOptionsOnQuestion9(){
    this.tts.speak('Letter A: '+this.optionAques9).then(() => {
      this.tts.speak('Letter B: '+this.optionBques9).then(() => {
        this.tts.speak('Letter C: '+this.optionCques9).then(() => {
          this.tts.speak('Letter D: '+this.optionDques9).then(() => {
            // console.log('Proceed on Reading Question 9');
            this.listen(this.quesID9, this.rightAns9);
          })
        })
      })
    })
  }

  readOptionsOnQuestion10(){
    this.tts.speak('Letter A: '+this.optionAques10).then(() => {
      this.tts.speak('Letter B: '+this.optionBques10).then(() => {
        this.tts.speak('Letter C: '+this.optionCques10).then(() => {
          this.tts.speak('Letter D: '+this.optionDques10).then(() => {
            // console.log('Proceed on Reading Question 10');
            this.listen(this.quesID10, this.rightAns10);
          })
        })
      })
    })
  }


  // Read Questions
  readQuestion1() {
    if(this.question1 == undefined) {
      // console.log('skip question 2');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 1...'+this.question1).then(() => {
        // console.log(this.examType);
        if(this.examType == 'Multiple Choice'){
          this.readOptionsOnQuestion1();
        }else if(this.examType == 'Identification'){
          this.listen(this.quesID1, this.rightAns1);
        }
        this.isQuestion1Read = true;
      });
      this.readAgain1 = true;
    }
  }

  readQuestion2() {
    if(this.question2 == undefined) {
      // console.log('skip question 2');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 2...'+this.question2).then(() => {
        if(this.examType == 'Multiple Choice'){
          this.readOptionsOnQuestion2();
        }else if(this.examType == 'Identification'){
          this.listen(this.quesID2, this.rightAns2);
        }
      });
    }
  }

  readQuestion3() {
    if(this.question3 == undefined) {
      // console.log('skip question 3');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 3...'+this.question3).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion3();
        }else if(this.identification = true){
          this.listen(this.quesID3, this.rightAns3);
        }
      });
    }
  }

  readQuestion4() {
    if(this.question4 == undefined) {
      // console.log('skip question 4');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 4...'+this.question4).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion4();
        }else if(this.identification = true){
          this.listen(this.quesID4, this.rightAns4);
        }
      });
    }
  }

  readQuestion5() {
    if(this.question5 == undefined) {
      // console.log('skip question 5');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 5...'+this.question5).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion5();
        }else if(this.identification = true){
          this.listen(this.quesID5, this.rightAns5);
        }
      });
    }
  }

  readQuestion6() {
    if(this.question6 == undefined) {
      // console.log('skip question 6');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 6...'+this.question6).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion6();
        }else if(this.identification = true){
          this.listen(this.quesID6, this.rightAns6);
        }
      });
    }
  }

  readQuestion7() {
    if(this.question7 == undefined) {
      // console.log('skip question 7');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 7...'+this.question7).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion7();
        }else if(this.identification = true){
          this.listen(this.quesID7, this.rightAns7);
        }
      });
    }
  }

  readQuestion8() {
    if(this.question8 == undefined) {
      // console.log('skip question 8');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 8...'+this.question8).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion8();
        }else if(this.identification = true){
          this.listen(this.quesID8, this.rightAns8);
        }
      });
    }
  }

  readQuestion9() {
    if(this.question9 == undefined) {
      // console.log('skip question 9');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 9...'+this.question9).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion9();
        }else if(this.identification = true){
          this.listen(this.quesID9, this.rightAns9);
        }
      });
    }
  }

  readQuestion10() {
    if(this.question10 == undefined) {
      // console.log('skip question 10');
      this.swiper.swiperRef.slideNext(500);
    }else{
      this.tts.speak('Question number 10...'+this.question10).then(() => {
        if(this.multipleChoice = true){
          this.readOptionsOnQuestion10();
        }else if(this.identification = true){
          this.listen(this.quesID10, this.rightAns10);
        }
      });
    }
  }

  listen(quesID, questionRightAns) {
    /*

    if(this.isQuestion1Read == true && this.isQuestion2Read == false) {     
      quesID = this.quesID1
      questionRightAns = this.rightAns1      
    } 
    
    else if(this.isQuestion2Read == true && this.isQuestion3Read == false) {      
      quesID = this.quesID2
      questionRightAns = this.rightAns2
    } 
    
    else if(this.isQuestion3Read == true && this.isQuestion4Read == false) {
      quesID = this.quesID3
      questionRightAns = this.rightAns3
    } 
    
    else  if(this.isQuestion4Read == true && this.isQuestion5Read == false) {
      quesID = this.quesID4
      questionRightAns = this.rightAns4
    } 
    
    else  if(this.isQuestion5Read == true && this.isQuestion6Read == false) {
      quesID = this.quesID5
      questionRightAns = this.rightAns5
    } 
    
    else  if(this.isQuestion6Read == true && this.isQuestion7Read == false) {
      quesID = this.quesID6
      questionRightAns = this.rightAns6
    } 
    
    else if(this.isQuestion7Read == true && this.isQuestion8Read == false) {
      quesID = this.quesID7
      questionRightAns = this.rightAns7
    } 
    
    else if(this.isQuestion8Read == true && this.isQuestion9Read == false) {
      quesID = this.quesID8
      questionRightAns = this.rightAns8
    } 
    
    else if(this.isQuestion9Read == true && this.isQuestion10Read == false) {
      quesID = this.quesID9
      questionRightAns = this.rightAns9
    } 
    
    else if(this.isQuestion10Read == true) {
      quesID = this.quesID10
      questionRightAns = this.rightAns10
    } else {
      
    }

    console.log(quesID+" = "+this.quesID1);
    console.log(questionRightAns+" = "+this.rightAns1);
    */

    // this.quesID = quesID
    // this.questionRightAns
    this.tts.speak('Please say your answer');
    if (this.recording){      
      return;
    }
    this.recording = true;
    
    setTimeout(function(){
      VoiceRecorder.startRecording();
    },1000)
    

    setTimeout(() => {
      this.stop(quesID, questionRightAns);
    },3000)      

  }

  stop(questionID, questionRightAns) {

    if (!this.recording){      
      return;
    }

    VoiceRecorder.stopRecording().then(async(result: RecordingData) => {
      if (result.value && result.value.recordDataBase64) {
        const recordData = result.value.recordDataBase64;
        const newModel = 'data:audio/wav;base64,'+ recordData;

        
        //create and call two variables for timestamp according to exam type
        this.unixTimestamp=Math.floor(Date.now()/1000);    
      
        let data = {
          newModel: newModel,
          unixTimestamp: this.unixTimestamp
        }
        

        //put base64 file to database according to exam type
        if(this.examType == 'Multiple Choice') {
          this._apiService.putMCAudio(data).subscribe((res:any)=> {});
          //run python multiple choice
        }

        else {
          this._apiService.putIDENTAudio(data).subscribe((res:any)=> {});
          //run python identification
        }
        
        console.log(data);
        this.recording = false;     

      }
    });



    this.tts.speak('Answer recorded.');
    setTimeout(() => {
      this.onPredict(questionID, questionRightAns);
    }, 3000) 

  }
  
  onPredict(questionID, questionRightAns){
    if (this.examType == 'Multiple Choice') {      
      //this.http.get('http://answear.site/STTMC/predict/1643881394').subscribe(res => {
      this.http.get('http://192.168.100.26:5000/predict/'+this.unixTimestamp).subscribe(res => {
          this.predict = res; 
          console.log(res)
          this.predictedAnswer = this.predict.predict;
          this.studAnswer = this.predictedAnswer;        

      });
    }

    else if (this.examType =='Identification') {  
      this.http.get('http://192.168.100.26:5001/predict/'+this.unixTimestamp).subscribe(res => {
          this.predict = res; 
          console.log(res)
          this.predictedAnswer = this.predict.predict;
          this.studAnswer = this.predictedAnswer;     
   
      });
    }

    setTimeout(() => {
      this.readExamineeAnswer(questionID, questionRightAns);
    }, 2000)    
  }
  

  async readExamineeAnswer(qid, qans) {
    console.log("stud answer: "+this.studAnswer)
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Your answer is <strong>'+'"'+this.studAnswer+'"'+'</strong>. Please confirm by saying YES, if answer captured is correct, or please say NO, when you want to change it!'
    });

    await alert.present();

    this.tts.speak('Your answer is'+'"'+this.studAnswer+'"'+'.'+'Please confirm by saying YES, if answer captured is correct, or please say NO, when you want to change it.').then(()=> {
      this.speechRecognition.startListening()
      .subscribe(
        (matches: Array<string>) => {
          let confirmationStatus = matches[0];
          if(confirmationStatus == 'yes'){
            this.saveStudAnswer(qid,qans);
            //this.autoNext();
            alert.dismiss().then(() => {
              this.validateWhatQuestionToRead();
            })
          }else if(confirmationStatus == 'no'){
            this.studAnswer = '';
            alert.dismiss().then(() => {
              this.tts.speak('Sorry for that, so what\'s your answer?').then(() => {
                this.listen(qid, qans);
              })
            }) 
          }else {
            this.tts.speak('Sorry, I dont undestand. Please say "YES" or "NO" only.').then(()=> {
              this.listen(qid, qans);
            })
          }
        }
      )
    })
  }


  validateWhatQuestionToRead() {
    if(this.isQuestion1Read == true && this.isQuestion2Read == false) {
      this.readQuestion2();
      this.isQuestion2Read = true;
      this.readAgain2 = true;            
    }
    else if(this.isQuestion2Read == true && this.isQuestion3Read == false){
      this.readQuestion3();
      this.isQuestion3Read = true;
      this.readAgain3 = true;            
    }
    else if(this.isQuestion3Read == true && this.isQuestion4Read == false){
      this.readQuestion4();
      this.isQuestion4Read = true;
      this.readAgain4 = true;            
    }
    else if(this.isQuestion4Read == true && this.isQuestion5Read == false){
      this.readQuestion5();
      this.isQuestion5Read = true;
      this.readAgain5 = true;            
    }
    else if(this.isQuestion5Read == true && this.isQuestion6Read == false){
      this.readQuestion6(); 
      this.isQuestion6Read = true;
      this.readAgain6 = true;           
    }
    else if(this.isQuestion6Read == true && this.isQuestion7Read == false){
      this.readQuestion7();
      this.isQuestion7Read = true;
      this.readAgain7 = true;            
    }
    else if(this.isQuestion7Read == true && this.isQuestion8Read == false){
      this.readQuestion8();
      this.isQuestion8Read = true;
      this.readAgain8 = true;            
    }
    else if(this.isQuestion8Read == true && this.isQuestion9Read == false){
      this.readQuestion9(); 
      this.isQuestion9Read = true;
      this.readAgain9 = true;           
    }
    else if(this.isQuestion9Read == true && this.isQuestion10Read == false){
      this.readQuestion10();
      this.isQuestion10Read = true;
      this.readAgain10 = true;      
    }
  }
   
  autoNext(){
    if(this.studAnswer == undefined || this.studAnswer == '') {
      this.noAnswerRegistered();
    }else{
      this.studAnswer = '';
      this.swiper.swiperRef.slideNext(500);
    }
  }

  async submitExam() {
    const modal = await this.modalCtrl.create({
      component: ExamResultsPage,
      componentProps: {
        'eid': this.eid,
        'total': this.questions.length
      }
    });
    await modal.present();
    await modal.onDidDismiss().then(()=>{
      this.router.navigateByUrl('/subjects');
    })
  }

  saveStudAnswer(qid, qans){
    this.storage.get('userData').then((res:any)=> {
      this.userData = res;
      this.uName = this.userData.username
      let answer = {
        eid: this.eid,
        qid: qid,
        username: this.uName,
        rightanswer: qans,
        studanswer: this.studAnswer
      }
      
      this._apiService.putAnswer(answer).subscribe((res:any) => {
        this.autoNext();
      })
    })
  }  

  next(question){
    if(this.studAnswer == undefined || this.studAnswer == '') {
      this.noAnswerRegistered();
    }else{
      // console.log(question)
      this.storage.get('userData').then((res:any)=> {
        this.userData = res;
        this.uName = this.userData.username
        let answer = {
          eid: this.eid,
          qid: question.QID,
          username: this.uName,
          rightanswer: question.answer,
          studanswer: this.studAnswer
        }
        // console.log(answer)
        
        this._apiService.putAnswer(answer).subscribe((res:any) => {
          this.studAnswer = '';
          this.swiper.swiperRef.slideNext(500);
        })
      })
    }
  }

  readAgain() {
    console.log(this.readAgain1);
    console.log(this.readAgain2);
    if(this.readAgain1 == true && this.readAgain2 == false) {
      this.readQuestion1();      
    }
    else if(this.readAgain2 == true && this.readAgain3 == false){
      this.readQuestion2();      
    }
    else if(this.readAgain3 == true && this.readAgain4 == false){
      this.readQuestion3();      
    }
    else if(this.readAgain4 == true && this.readAgain5 == false){
      this.readQuestion4();      
    }
    else if(this.readAgain5 == true && this.readAgain6 == false){
      this.readQuestion5();      
    }
    else if(this.readAgain6 == true && this.readAgain7 == false){
      this.readQuestion6();      
    }
    else if(this.readAgain7 == true && this.readAgain8 == false){
      this.readQuestion7();      
    }
    else if(this.readAgain8 == true && this.readAgain9 == false){
      this.readQuestion8();      
    }
    else if(this.readAgain9 == true && this.readAgain10 == false){
      this.readQuestion9();      
    }
    else if(this.readAgain10 == true) {
      this.readQuestion10();
    }

  }

}
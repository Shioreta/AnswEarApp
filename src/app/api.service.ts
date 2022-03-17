import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  headers: HttpHeaders;
  constructor(public http: HttpClient) { 
    this.headers = new HttpHeaders();
    this.headers.append("Accept", 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Methods', "POST, GET, DELETE, PUT, PATCH, OPTIONS");
    this.headers.append('Access-Control-Allow-Headers', '*')
  }


  // Login
  checkCredentials(data){
    return this.http.put('http://192.168.100.26/answEarServer/loginAPI/count.php', data);
  }
  // login
  getLoginCredentials(data){
    return this.http.put('http://192.168.100.26/answEarServer/loginAPI/login.php', data);
  }

  getSubjects(username) {
    return this.http.get('http://192.168.100.26/answEarServer/subjectsAPI/getSubjects.php?username='+username);
  }
  // for teacher
  getUpcomingExams(username,subjDesc) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getUpcomingExams.php?username='+username+'&subjDesc='+subjDesc)
  }

  getUpcomingExamsStudent(username, subjDesc) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getUpcomingExamsStudent.php?username='+username+'&subjDesc='+subjDesc)
  }

  getUpcomingExamsAllSubjs(username) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getUpcomingExamsAllSubjs.php?username='+username)
  }

  getUpcomingExamsStudentAllSubjs(username) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getUpcomingExamsStudentAllSubjs.php?username='+username);
  }

  getCompletedExams(username,subjDesc) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getCompletedExams.php?username='+username+'&subjDesc='+subjDesc)
  }

  getCompletedExamsStudent(username,subjDesc){
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getCompletedExamsStudent.php?username='+username+'&subjDesc='+subjDesc)
  }

  getSubjMembers(subjDesc) {
    return this.http.get('http://192.168.100.26/answEarServer/subjectsAPI/getSubjMembers.php?subjDesc='+subjDesc);
  }

  getStudents(subjDesc){
    return this.http.get('http://192.168.100.26/answEarServer/getStudents.php?subjDesc='+subjDesc);
  }

  putSubjMember(newMember) {
    return this.http.put('http://192.168.100.26/answEarServer/subjectsAPI/putSubjMember.php', newMember);
  }

  putNewExam(newExam){
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putExam.php', newExam);
  }

  putNewAccount(newAccount){
    return this.http.put('http://192.168.100.26/answEarServer/adminAPI/putAccount.php', newAccount);
  }

  putQuestionaire(question){
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putQuestionaire.php', question);
  }

  getExamIDs(subjDesc){
    return this.http.get('http://192.168.100.26/answEarServer/subjectsAPI/getExamIDs.php?subjDesc='+subjDesc);
  }

  putExamMember(newExamMember) {
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putExamMember.php', newExamMember);
  }

  getLastEID() {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getlastEIDCreated.php');
  }

  getLastUID() {
    return this.http.get('http://192.168.100.26/answEarServer/adminAPI/getlastUIDCreated.php');
  }
  
  getQuestionaire(eid) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getQuestionaire.php?eid='+eid);
  }

  putAnswer(answer) {
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putAnswer.php', answer);
  }

  getexamResults(eid,username) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getAnswers.php?eid='+eid+'&username='+username);
  }

  getTotalExamItems(eid){
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getExamTotalItems.php?eid='+eid);
  }

  getDateAttempted(username,eid){
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getDateAttempted.php?username='+username+'&eid='+eid);
  }

  getTakenExam(username, subjDesc){
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getTakenExams.php?username='+username+'&subjDesc='+subjDesc);
  }

  cleanExams(){
    return this.http.delete('http://192.168.100.26/answEarServer/examsAPI/cleanExams.php');
  }
  
  putExamAttempt(data){
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putAttempt.php', data);
  }

  lockExam(eid, status) {
    return this.http.post('http://192.168.100.26/answEarServer/examsAPI/lockExam.php?EID='+eid,status);
  }

  putExamResult(result) {
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/putExamResult.php',result);
  }

  getExamResults(subjDesc,eid) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getExamResults.php?subjDesc='+subjDesc+'&eid='+eid);
  }

  getNoResultsExaminees(subjDesc,eid) {
    return this.http.get('http://192.168.100.26/answEarServer/examsAPI/getExamineesNoResults.php?subjDesc='+subjDesc+'&eid='+eid);
  }

  getNotMySubjs(username) {
    return this.http.get('http://192.168.100.26/answEarServer/subjectsAPI/getNotMySubjs.php?username='+username);
  }

  getUsers() {
    return this.http.get('http://192.168.100.26/answEarServer/adminAPI/getUsers.php');
  }

  enchanceGRU(newModel) {
    return this.http.put('http://192.168.100.26/answEarServer/GRU/enhanceModel.php',newModel);
  }

  putMCAudio(newModel) {
    return this.http.put('http://192.168.100.26/answEarServer/GRU/putMCAudio.php',newModel, {responseType:'text'});
  }

  putIDENTAudio(newModel) {
    return this.http.put('http://192.168.100.26/answEarServer/GRU/putIDENTAudio.php',newModel, {responseType:'text'});
  }

  getPredict(unixTimestamp, predict) {
    return this.http.get('http://192.168.100.26/answEarServer/GRU/getPredict.php?unixTimestamp='+unixTimestamp+'&predict='+predict, {responseType : 'json'});
  }

  updateQuestionnaire(qid) {
    return this.http.put('http://192.168.100.26/answEarServer/examsAPI/updateQuestionnaire.php', qid);
  }

  deleteQuestion(qid) {
    return this.http.delete('http://192.168.100.26/answEarServer/examsAPI/deleteQuestion.php',qid);
  }
}

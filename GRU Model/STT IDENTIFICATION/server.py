import os
from flask.helpers import url_for

from werkzeug.utils import redirect
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import librosa
import tensorflow as tf
import numpy as np
import base64
import mysql.connector
from predict import Keyword_Spotting_Service

from flask_restful import Resource, Api,request
from ffmpy import FFmpeg
from flask import Flask, jsonify
from flask_cors import CORS


app = Flask (__name__)
api = Api(app)

CORS(app)

# http request, depending on url, routes the request to different views




mydb = mysql.connector.connect(
host="localhost",
user="root",
password="",
database= "dbanswear"
)



@app.route('/predict/<timestamp>')
def base_wav (timestamp):
        mycursor = mydb.cursor()
        
        mycursor.execute("SELECT identBase64 FROM tblidentaudio WHERE identTimestamp=%s" %timestamp) 
        

        # print(timestamp)
        myresult = mycursor.fetchone()
        mydb.commit()

        # print(myresult)

        for x in myresult:
                # print(myresult)
                audio_str64 = myresult[0].split(",")[1]
        #     print(myresult)
        # mycursor.close()
        

        dirName = "./"
        file =  "recordedAudio.txt" #this should be the wav from database
        filename = (dirName + file.split('.')[0])
        # SAVED_MODEL_PATH = "model.h5"
        # SAMPLES_TO_CONSIDER = 22050 # 1 sec
        decodedData = base64.b64decode(audio_str64)
        
        webmfile = (filename + ".webm")
        with open(webmfile, 'wb') as file:
                file.write(decodedData)
        decoded_webm = webmfile

        wavfile = (filename + ".wav")

        decoded_wav = wavfile

      #print(wavfile)

        if os.path.exists(wavfile):
                # conversion()
                print ("overwriting")
                # print(myresult)
                ff = FFmpeg(
                        executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
                        inputs={decoded_webm:None},
                        outputs = {decoded_wav:'-c:a pcm_f32le -y'})
                ff.cmd
                ff.run()
        
        else :
                print ("creating")
                # print(myresult)
                ff = FFmpeg(
                        executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
                        inputs={decoded_webm:None},
                        outputs = {decoded_wav:'-c:a pcm_f32le -y'})
                ff.cmd
                ff.run()
                print("created")
                
        kss = Keyword_Spotting_Service()
        kss1 = Keyword_Spotting_Service()

        # check that different instances of the keyword spotting service point back to the same object (singleton)
        assert kss is kss1

        # make a prediction
        keyword = kss.predict(decoded_wav)

        print(jsonify(keyword))
        print(keyword)
        # print(myresult)
       
        # print(url_for("base_wav"))
    
        
        return jsonify(predict = keyword)
        
        # create 2 instances of the keyword spotting service

# def reroute():
#         app.route("/predict/")


# def run():
        
#         reroute()

if __name__ == "__main__":
#     print("test");  
        # run()
        app.run(host='0.0.0.0', port= 5001)       
    
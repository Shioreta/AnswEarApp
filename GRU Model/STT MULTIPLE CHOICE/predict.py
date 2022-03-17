import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import librosa
import tensorflow as tf
import numpy as np
import base64
import mysql.connector
from ffmpy import FFmpeg

# accuracy 81.66666626930237


# mydb = mysql.connector.connect(
# host="localhost",
# user="root",
# password="",
# database= "dbanswear"
# )

# mycursor = mydb.cursor()
# def base_wav ():
        # mycursor.execute("SELECT audio FROM tblgrumodel WHERE gruid = 1") 

        # myresult = mycursor.fetchone()

        # for x in myresult:
        #     audio_str64 = myresult[0].split(",")[1]
        #     #print(audio_str64)
        # dirName = "./"
        # file =  "recordedAudio.txt" #this should be the wav from database
        # filename = (dirName + file.split('.')[0] )
        # # audio_wav = filename + ".wav"

        # decodedData = base64.b64decode(audio_str64)
        
        # webmfile = (filename + ".webm")
        # with open(webmfile, 'wb') as file:
        #         file.write(decodedData)
        # decoded_webm = webmfile

        # wavfile = (filename + ".wav")

        # decoded_wav = wavfile

      #print(wavfile)

        # if os.path.exists(wavfile):
        #         # conversion()
        #         print ("overwriting")
        #         ff = FFmpeg(
        #                 executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
        #                 inputs={decoded_webm:None},
        #                 outputs = {decoded_wav:'-c:a pcm_f32le -y'})
        #         ff.cmd
        #         ff.run()
        #         print("overwritten")
        # else :
        #         print ("creating")
        #         ff = FFmpeg(
        #                 executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
        #                 inputs={decoded_webm:None},
        #                 outputs = {decoded_wav:'-c:a pcm_f32le -y'})
        #         ff.cmd
        #         ff.run()
        #         print("created")
        # return wavfile
       
SAVED_MODEL_PATH = "mcmodel.h5"
SAMPLES_TO_CONSIDER = 22050 # 1 sec

# wavfile = base_wav()
# keyword =''

class _Keyword_Spotting_Service:
    """Singleton class for keyword spotting inference with trained models.
    :param model: Trained model
    """

    model = None
    _mapping = [
        "a",
        "b",
        "c",
        "d"
    ]
    _instance = None


    def predict(self, file_path):
        

        # extract MFCC
        MFCCs = self.preprocess(file_path)

        # we need a 4-dim array to feed to the model for prediction: (# samples, # time steps, # coefficients, 1)
        MFCCs = MFCCs[np.newaxis, ..., np.newaxis]

        # get the predicted label
        predictions = self.model.predict(MFCCs)
        predicted_index = np.argmax(predictions)
        predicted_keyword = self._mapping[predicted_index]
        return predicted_keyword


    def preprocess(self, file_path, num_mfcc=13, n_fft=2048, hop_length=512):
        

        # load audio file
        signal, sample_rate = librosa.load(file_path)

        if len(signal) >= SAMPLES_TO_CONSIDER:
            # ensure consistency of the length of the signal
            signal = signal[:SAMPLES_TO_CONSIDER]

            # extract MFCCs
            MFCCs = librosa.feature.mfcc(signal, sample_rate, n_mfcc=num_mfcc, n_fft=n_fft,
                                         hop_length=hop_length)
        return MFCCs.T


def Keyword_Spotting_Service():
        """Factory function for Keyword_Spotting_Service class.
        :return _Keyword_Spotting_Service._instance (_Keyword_Spotting_Service):
        """

        # ensure an instance is created only the first time the factory function is called
        if _Keyword_Spotting_Service._instance is None:
            _Keyword_Spotting_Service._instance = _Keyword_Spotting_Service()
            _Keyword_Spotting_Service.model = tf.keras.models.load_model(SAVED_MODEL_PATH)
        return _Keyword_Spotting_Service._instance

def predict_output():
        # wavfile = cv.wavfile
        # create 2 instances of the keyword spotting service
        kss = Keyword_Spotting_Service()
        kss1 = Keyword_Spotting_Service()

        # check that different instances of the keyword spotting service point back to the same object (singleton)
        assert kss is kss1

        # make a prediction
        keyword = kss.predict(r"C:\Users\chuaj\Desktop\stt alphabet\recording1.wav")
    
        print(keyword)
        return keyword



if __name__ == "__main__":

    # predicted_keyword=predict_output()
    # print(predicted_keyword)
    # create 2 instances of the keyword spotting service
    #while (1) :
    predict_output()
    
        

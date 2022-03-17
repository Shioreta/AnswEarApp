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
#         mycursor.execute("SELECT audio FROM tblgrumodel WHERE gruid = 1") 

#         myresult = mycursor.fetchone()

#         for x in myresult:
#             audio_str64 = myresult[0].split(",")[1]
#             #print(audio_str64)
#         dirName = "./"
#         file =  "recordedAudio.txt" #this should be the wav from database
#         filename = (dirName + file.split('.')[0] )
#         # audio_wav = filename + ".wav"

#         decodedData = base64.b64decode(audio_str64)
        
#         webmfile = (filename + ".webm")
#         with open(webmfile, 'wb') as file:
#                 file.write(decodedData)
#         decoded_webm = webmfile

#         wavfile = (r"C:\Users\chuaj\Desktop\stt identification\test\together_ALCAIDE.wav")

#         decoded_wav = wavfile

#       #print(wavfile)

#         if os.path.exists(wavfile):
#                 # conversion()
#                 print ("overwriting")
#                 ff = FFmpeg(
#                         executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
#                         inputs={decoded_webm:None},
#                         outputs = {decoded_wav:'-c:a pcm_f32le -y'})
#                 ff.cmd
#                 ff.run()
#                 print("overwritten")
#         else :
#                 print ("creating")
#                 ff = FFmpeg(
#                         executable = 'F:/Downloads/ffmpeg/bin/ffmpeg.exe',
#                         inputs={decoded_webm:None},
#                         outputs = {decoded_wav:'-c:a pcm_f32le -y'})
#                 ff.cmd
#                 ff.run()
#                 print("created")
#         return wavfile
       
SAVED_MODEL_PATH = "model.h5"
SAMPLES_TO_CONSIDER = 22050 # 1 sec

# wavfile = base_wav()
# keyword =''

class _Keyword_Spotting_Service:
    """Singleton class for keyword spotting inference with trained models.
    :param model: Trained model
    """

    model = None
    _mapping = [
        "about",
        "above",
        "again",
        "against",
        "always",
        "another",
        "answer",
        "any",
        "because",
        "been",
        "began",
        "below",
        "change",
        "children",
        "could",
        "country",
        "different",
        "during",
        "earth",
        "enough",
        "every",
        "example",
        "first",
        "for",
        "great",
        "heard",
        "here",
        "important",
        "its",
        "just",
        "know",
        "learn",
        "little",
        "many",
        "might",
        "new",
        "often",
        "once",
        "other",
        "people",
        "right",
        "said",
        "school",
        "sentence",
        "several",
        "should",
        "since",
        "something",
        "story",
        "study",
        "than",
        "their",
        "then",
        "there",
        "these",
        "they",
        "thought",
        "through",
        "together",
        "too",
        "toward",
        "until",
        "usually",
        "very",
        "what",
        "when",
        "where",
        "which",
        "while",
        "who",
        "why",
        "world",
        "write",
        "young",
        "your"
    ]
    _instance = None


    def predict(self, file_path):
        """
        :param file_path (str): Path to audio file to predict
        :return predicted_keyword (str): Keyword predicted by the model
        """

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
        """Extract MFCCs from audio file.
        :param file_path (str): Path of audio file
        :param num_mfcc (int): # of coefficients to extract
        :param n_fft (int): Interval we consider to apply STFT. Measured in # of samples
        :param hop_length (int): Sliding window for STFT. Measured in # of samples
        :return MFCCs (ndarray): 2-dim array with MFCC data of shape (# time steps, # coefficients)
        """

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
        #change kung magtatry kayo r"C:\Users\chuaj\Desktop\stt identification\recording1.wav"
        keyword = kss.predict(wavfile)
    
        print(keyword)
        return keyword



if __name__ == "__main__":

    # predicted_keyword=predict_output()
    # print(predicted_keyword)
    # create 2 instances of the keyword spotting service
    #while (1) :
    predict_output()
    
        

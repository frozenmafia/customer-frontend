from flask import Flask,jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

@app.route('/')
def upload_data():
    customer_db = readFile()['customers']

    return jsonify(customer_db)

def readFile():

    dir_path = os.path.dirname(os.path.realpath(__file__))
    file_name=dir_path+'\db.json'
    with open(file_name) as file:
        data=json.load(file)
    file.close()
    return data
if __name__ =='__main__':
    app.run(debug=True)
    readFile()
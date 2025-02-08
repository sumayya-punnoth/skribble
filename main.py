from flask import Flask
from flask import render_template
import random

# creates a Flask application
app = Flask(__name__)


@app.route("/")
def hello():
	return render_template('draw.html')

@app.route("/this")
def lmaoo():
	return render_template('hello.html')

@app.route('/getwords',methods=['GET','POST'])
def home():
    
    file=open("t1.txt","r")
    text=file.read().split(',')
    words=list(text)


    for i in range(30):
        s=random.randint(0,30)
        word1=text[s]
        s=random.randint(0,30)
        word2=text[s]
        s=random.randint(0,30)
        word3=text[s]
               
    if(request.method=='GET'):
        data1="word1"
        data2="word2"
        data3="word3"
        return jsonify({'word1':word1,
                        'word2':word2,
                        'word3':word3})


if __name__ == "__main__":
	app.run(debug=True)

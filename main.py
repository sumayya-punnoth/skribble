from flask import Flask
from flask import render_template

# creates a Flask application
app = Flask(__name__)


@app.route("/")
def hello():
	return render_template('draw.html')

@app.route("/this")
def lmaoo():
	return render_template('hello.html')

if __name__ == "__main__":
	app.run(debug=True)

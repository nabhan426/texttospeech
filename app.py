from flask import Flask, request, send_file, render_template
from gtts import gTTS
import os
from io import BytesIO
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allows frontend to access backend

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/tts', methods=['POST'])
def tts():
    data = request.json
    text = data.get('text')
    speed = data.get('speed', 1.0)


    tts = gTTS(text=text, lang='en', slow=speed < 1.0)

    # Save to a BytesIO stream
    mp3_fp = BytesIO()
    tts.write_to_fp(mp3_fp)
    mp3_fp.seek(0)

    return send_file(mp3_fp, mimetype="audio/mpeg", as_attachment=False, download_name="speech.mp3")

if __name__ == '__main__':
    app.run(debug=True)

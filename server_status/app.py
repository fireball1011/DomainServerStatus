from flask import Flask, render_template
from .status import collect_status

app = Flask(__name__)

@app.route('/')
def index():
    servers = collect_status()
    return render_template('index.html', servers=servers)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

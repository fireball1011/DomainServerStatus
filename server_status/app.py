import os
from flask import Flask, render_template, url_for
from .status import collect_status

# Locate the template folder one directory above this package so
# ``render_template`` can find ``index.html`` when the package is executed
# as a module via ``python -m server_status.app``.
TEMPLATE_FOLDER = os.path.join(os.path.dirname(__file__), '..', 'templates')

app = Flask(__name__, template_folder=TEMPLATE_FOLDER)

@app.route('/')
def index():
    servers = collect_status()
    return render_template('index.html', servers=servers)


@app.route('/pki-game')
def pki_game():
    return render_template('pki_game.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)


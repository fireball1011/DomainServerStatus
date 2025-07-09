var info;
var cursors;
var player;
var tokens;

function preload() {
    // no assets to preload
}

function create() {
    info = document.getElementById('info');

    const ground = this.add.rectangle(400, 390, 800, 20, 0x654321);
    this.physics.add.existing(ground, true);

    player = this.add.rectangle(100, 340, 32, 48, 0x0000ff);
    this.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, ground);

    tokens = this.physics.add.group();
    addToken.call(this, 200, 350, 'Public Key: Ein \u00f6ffentlicher Schl\u00fcssel wird zum Verschl\u00fcsseln verwendet.');
    addToken.call(this, 400, 350, 'Private Key: Ein privater Schl\u00fcssel dient zum Entschl\u00fcsseln und muss geheim bleiben.');
    addToken.call(this, 600, 350, 'Zertifikat: Beglaubigt den \u00f6ffentlichen Schl\u00fcssel eines Kommunikationspartners.');

    this.physics.add.collider(tokens, ground);
    this.physics.add.overlap(player, tokens, collectToken, null, this);
}

function addToken(x, y, message) {
    const token = this.add.rectangle(x, y - 20, 20, 20, 0xff0000);
    this.physics.add.existing(token);
    token.body.setBounce(0.2);
    token.message = message;
    tokens.add(token);
}

function collectToken(player, token) {
    token.disableBody(true, true);
    info.innerText = token.message;
    info.style.display = 'block';
}

function update() {
    if (cursors.left.isDown) {
        player.body.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        player.body.setVelocityX(160);
    } else {
        player.body.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.blocked.down) {
        player.body.setVelocityY(-330);
    }
}

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    parent: 'game',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false
        }
    },
    scene: { preload: preload, create: create, update: update }
};

new Phaser.Game(config);

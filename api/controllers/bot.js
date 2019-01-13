const fetch = require('node-fetch');
const postMessageUrl = 'https://slack.com/api/chat.postMessage';

exports.connect = (req, res) => {
    fetch(postMessageUrl, {
        method: 'POST',
        body: JSON.stringify({
            text: req.body.text,
            channel: '#avtoservisi'
        }),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer xoxb-522501517668-521937098864-Opj97sMav0DMNJ7JPUvlbeDd'
        }
    });
    res.status(204).send();
};

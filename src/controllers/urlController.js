const urlModel = require('../models/urlModel')
const validURl = require('valid-url');
const shortId = require('shortid');

const urlControl = async (req, res) => {
    try {
        const { longUrl } = req.body
        if (!validURl.isWebUri(longUrl)) {
            return res.status(400).json({ error: 'Invalid URL' });
        }
        const baseUrl = "localhost:3000/"
        //shortURl=baseUrl+urlCode concatenate
        //generate urlCode
        const urlCode = shortId.generate(longUrl);
        console.log(urlCode); // Output: Something like "r4rGze22"
        //"http://localhost:3000/ghfgfg",
        const shortUrl = `${baseUrl}/${urlCode}`;
        //const response={longUrl:longUrl,shortUrl:shortUrl,urlCode:urlCode}
        savedResponse = await urlModel.create({
            longUrl,
            shortUrl,
            urlCode,
        })
        return res.status(201).send({ status: true, data: savedResponse })

    } catch (error) {
        res.status(500).send({ status: false, message: `Error detected : ${error.message}` })

    }

}
module.exports.urlControl = urlControl



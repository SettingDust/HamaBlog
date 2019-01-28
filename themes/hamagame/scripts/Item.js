class Item {
    constructor(title, timestamp, link, type) {
        this._title = title;
        this._timestamp = timestamp;
        this._link = link;
        this._type = type;
    }

    get title() {
        return this._title;
    }

    get timestamp() {
        return this._timestamp;
    }

    get link() {
        return this._link;
    }

    get type() {
        return this._type;
    }
}

module.exports.Video = class Video extends Item {
    constructor(title, timestamp, link, type, image) {
        super(title, timestamp, link, type);
        this._image = image;
    }

    get image() {
        return this._image;
    }
};
module.exports.Article = class Article extends Item {
    constructor(title, timestamp, link, content) {
        super(title, timestamp, link, 'article');
        this._content = content;
    }

    get content() {
        return this._content;
    }
};

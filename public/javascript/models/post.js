function Post(id = null, title, body) {

    this._id = id;
    this.post_title = title;
    this.post_body = body;
}

export {Post};

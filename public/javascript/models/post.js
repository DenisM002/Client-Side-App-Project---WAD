function Post(id = null, title, body, userId) {

    this._id = id;
    this.post_title = title;
    this.post_body = body;
    this.user_id = userId;
}

export {Post};

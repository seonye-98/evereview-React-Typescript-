from evereview.models.video import db, Video


def get_video(video_id):
    video = Video.query.filter_by(video_id=video_id).one_or_none()

    return video


def get_videos(channel_id):
    videos = Video.query.filter_by(channel_id=channel_id).all()

    result = []
    for video in videos:
        result.append(video.to_dict())

    return result


def insert_video(**kwargs):
    try:
        new_video = Video(
            video_id=kwargs.get("video_id"),
            channel_id=kwargs.get("channel_id"),
            published_at=kwargs.get("published_at"),
            thumbnail_url=kwargs.get("thumbnail_url"),
            category_id=kwargs.get("category_id"),
            view_count=kwargs.get("view_count"),
            like_count=kwargs.get("like_count"),
            comment_count=kwargs.get("comment_count"),
        )

        db.session.add(new_video)
        db.session.commit()
        return new_video
    except Exception:
        db.session.rollback()
        raise


def update_video(video_id, **kwargs):
    try:
        video = Video.query.filter_by(id=video_id).one_or_none()
        if video is None:
            return video

        video.thumbnail_url = kwargs.get("thumbnail_url")
        video.category_id = kwargs.get("category_id")
        video.view_count = kwargs.get("view_count")
        video.like_count = kwargs.get("like_count")
        video.comment_count = kwargs.get("comment_count")
        db.session.commit()
        return video
    except:
        db.session.rollback()
        raise


def delete_video(video_id):
    try:
        video = Video.query.filter_by(id=video_id).one_or_none()
        if video is None:
            return video

        db.session.delete(video)
        return video
    except:
        db.session.rollback()
        raise

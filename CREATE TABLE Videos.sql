CREATE TABLE Videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    video_url VARCHAR(255),
    channel_name VARCHAR(255),
    channel_image_url VARCHAR(255),
    subscribers INT,
    views INT,
    publish_date DATE,
    comments INT
);


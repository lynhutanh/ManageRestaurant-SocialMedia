const express = require('express');
const fs = require('fs');
const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());



const POSTS_FILE = 'posts.json';

// Đọc dữ liệu từ file JSON
const readPosts = () => {
    if (!fs.existsSync(POSTS_FILE)) return [];
    return JSON.parse(fs.readFileSync(POSTS_FILE, 'utf8'));
};

// Ghi dữ liệu vào file JSON
const writePosts = (posts) => {
    fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2), 'utf8');
};

// Route kiểm tra server hoạt động
app.get('/', (req, res) => {
    res.send('Instagram Scheduler API is running...');
});

// API thêm bài đăng
app.post('/schedule-post', (req, res) => {
    try {
        const { imageUrl, caption, scheduledTime, igBusinessId, accessToken, pageName } = req.body;

        if (!igBusinessId || !accessToken || !pageName) {
            return res.status(400).json({ error: 'Missing igBusinessId, accessToken, or pageName' });
        }

        const posts = readPosts();
        const newPost = {
            id: Date.now(),
            imageUrl,
            caption,
            scheduledTime,
            status: 'pending',
            igBusinessId,
            accessToken,
            pageName
        };

        posts.push(newPost);
        writePosts(posts);
        res.status(201).json({ message: 'Post scheduled successfully', post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.get('/scheduled-posts', (req, res) => {
    try {
        const posts = readPosts();
        res.status(200).json(posts.map(post => ({
            id: post.id,
            imageUrl: post.imageUrl,
            caption: post.caption,
            scheduled_publish_time: post.scheduledTime,
            status: post.status,
            platform: "Instagram",
            pageName: post.pageName
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// API lấy danh sách bài đăng
app.get('/posts', (req, res) => {
    res.json(readPosts());
});

app.delete('/posts/:id', (req, res) => {
    let posts = readPosts();
    let postIndex = posts.findIndex(post => post.id == req.params.id);

    if (postIndex === -1) {
        return res.status(404).json({ error: 'Post not found' });
    }

    let post = posts[postIndex];

    if (post.status !== 'pending') {
        return res.status(400).json({ error: 'Cannot delete a post that is not pending' });
    }

    posts.splice(postIndex, 1);
    writePosts(posts);

    res.json({ message: 'Scheduled post deleted successfully' });
});



app.put('/posts/:id', (req, res) => {
    try {
        const { caption, scheduledTime, imageUrl } = req.body;
        let posts = readPosts();
        let postIndex = posts.findIndex(post => post.id == req.params.id);

        if (postIndex === -1) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Kiểm tra scheduledTime hợp lệ (nếu có)
        if (scheduledTime && isNaN(scheduledTime)) {
            return res.status(400).json({ error: 'Invalid scheduledTime format' });
        }

        // Cập nhật bài đăng
        posts[postIndex] = {
            ...posts[postIndex],
            caption: caption || posts[postIndex].caption,
            scheduledTime: scheduledTime || posts[postIndex].scheduledTime,
            imageUrl: imageUrl || posts[postIndex].imageUrl
        };

        writePosts(posts);

        res.json({
            message: 'Post updated successfully',
            updatedPost: posts[postIndex]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// API xóa tất cả bài đăng (bao gồm pending, failed, published...)
app.delete('/scheduled-posts', (req, res) => {
    try {
        writePosts([]); // Ghi mảng rỗng vào file => Xóa toàn bộ dữ liệu

        res.json({ message: 'All posts deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Cron job kiểm tra và đăng bài
cron.schedule('* * * * *', async () => {
    const now = Math.floor(Date.now() / 1000);
    let posts = readPosts();
    const pendingPosts = posts.filter(post => post.status === 'pending' && post.scheduledTime <= now);

    for (let post of pendingPosts) {
        try {
            // Bước 1: Tạo media trên Instagram
            const mediaResponse = await axios.post(`https://graph.facebook.com/v21.0/${post.igBusinessId}/media`, {
                image_url: post.imageUrl,
                caption: post.caption,
                access_token: post.accessToken
            });

            if (!mediaResponse.data.id) throw new Error("Failed to create media.");

            // Bước 2: Đăng media lên Instagram
            const publishResponse = await axios.post(`https://graph.facebook.com/v21.0/${post.igBusinessId}/media_publish`, {
                creation_id: mediaResponse.data.id,
                access_token: post.accessToken
            });

            posts = posts.filter(p => p.id !== post.id); // Xóa bài đã đăng
            post.creation_id = mediaResponse.data.id; // Lưu lại ID bài viết trên Instagram
            console.log(`✅ Đã đăng bài: ${post.id}`);
        } catch (error) {
            console.error(` ${post.id}:`, error.response?.data || error.message);
            post.status = 'retry'; // Đánh dấu để thử lại sau
        }
    }
    writePosts(posts);
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

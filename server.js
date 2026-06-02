const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API Endpoints

// 1. إنشاء بريد جديد
app.post('/api/email/new', async (req, res) => {
    try {
        const url = 'https://api.internal.temp-mail.io/api/v3/email/new';
        
        const headers = {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7',
            'Application-Name': 'web',
            'Application-Version': '4.0.0',
            'Connection': 'keep-alive',
            'Content-Type': 'application/json',
            'Host': 'api.internal.temp-mail.io',
            'Origin': 'https://temp-mail.io',
            'Referer': 'https://temp-mail.io/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };

        const response = await axios.post(url, {}, {
            headers: headers,
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error creating email:', error.message);
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to create email',
                details: error.response.data
            });
        } else {
            res.status(500).json({
                error: 'Failed to create email',
                details: error.message
            });
        }
    }
});

// 2. جلب الرسائل
app.get('/api/email/:email/messages', async (req, res) => {
    try {
        const { email } = req.params;
        const url = `https://api.internal.temp-mail.io/api/v3/email/${email}/messages`;
        
        const headers = {
            'Accept': '*/*',
            'Accept-Language': 'ar-EG,ar;q=0.9,en-US;q=0.8,en;q=0.7',
            'Application-Name': 'web',
            'Application-Version': '4.0.0',
            'Host': 'api.internal.temp-mail.io',
            'Origin': 'https://temp-mail.io',
            'Referer': 'https://temp-mail.io/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };

        const response = await axios.get(url, {
            headers: headers,
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching messages:', error.message);
        if (error.response) {
            res.status(error.response.status).json({
                error: 'Failed to fetch messages',
                details: error.response.data
            });
        } else {
            res.status(500).json({
                error: 'Failed to fetch messages',
                details: error.message
            });
        }
    }
});

// 3. حذف البريد (اختياري)
app.delete('/api/email/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const url = `https://api.internal.temp-mail.io/api/v3/email/${email}`;
        
        const headers = {
            'Accept': '*/*',
            'Host': 'api.internal.temp-mail.io',
            'Origin': 'https://temp-mail.io',
            'Referer': 'https://temp-mail.io/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };

        const response = await axios.delete(url, {
            headers: headers,
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error deleting email:', error.message);
        res.status(500).json({
            error: 'Failed to delete email',
            details: error.message
        });
    }
});

// 4. قراءة رسالة محددة
app.get('/api/email/:email/messages/:messageId', async (req, res) => {
    try {
        const { email, messageId } = req.params;
        const url = `https://api.internal.temp-mail.io/api/v3/email/${email}/messages/${messageId}`;
        
        const headers = {
            'Accept': '*/*',
            'Host': 'api.internal.temp-mail.io',
            'Origin': 'https://temp-mail.io',
            'Referer': 'https://temp-mail.io/',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        };

        const response = await axios.get(url, {
            headers: headers,
            timeout: 10000
        });

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching message:', error.message);
        res.status(500).json({
            error: 'Failed to fetch message',
            details: error.message
        });
    }
});

// صفحة رئيسية
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Temp Mail API Proxy Server`);
});

/**
 * 小智聊天机器人 - 智能回复引擎
 */

// 知识库
const knowledge = {
    greetings: {
        patterns: ['你好', '您好', 'hi', 'hello', '嗨', '嘿', '早上好', '下午好', '晚上好', '早安', '晚安'],
        responses: [
            '你好呀！很高兴见到你 😊',
            '嗨！今天过得怎么样？',
            '你好！有什么我可以帮你的吗？',
            '嘿！终于等到你了 ✨',
            '你好呀～想聊点什么呢？'
        ]
    },
    farewell: {
        patterns: ['再见', '拜拜', 'bye', '下次见', '走了', '我先走了', '告辞'],
        responses: [
            '再见！期待下次和你聊天 👋',
            '拜拜～祝你有美好的一天！',
            '下次见！随时欢迎来找我聊天 😊',
            '走好～想我的时候随时回来！'
        ]
    },
    mood_good: {
        patterns: ['开心', '高兴', '快乐', '太好了', '哈哈', '嘿嘿', '不错', '很好', '棒'],
        responses: [
            '看到你开心我也很开心！🎉',
            '快乐是会传染的，谢谢你分享给我！',
            '太棒了！是什么让你这么开心呢？',
            '嘿嘿，好心情要一直保持哦～ ✨'
        ]
    },
    mood_bad: {
        patterns: ['难过', '伤心', '不开心', '烦', '郁闷', '无聊', '累', '困', '焦虑', '压力大', '崩溃', '哭'],
        responses: [
            '抱抱你 🤗，有什么烦心事可以跟我说说',
            '别难过，一切都会好起来的。我陪着你 ❤️',
            '听起来你不太开心，想倾诉一下吗？我会认真听的',
            '累了就休息一下吧，不要给自己太大压力 💪',
            '每个人都有低谷的时候，你已经很棒了！'
        ]
    },
    jokes: {
        patterns: ['笑话', '搞笑', '逗我笑', '开心一下'],
        responses: [
            '😂 为什么程序员总是分不清万圣节和圣诞节？\n因为 Oct 31 == Dec 25！（八进制的31 = 十进制的25）',
            '🤣 一只蜗牛爬上了苹果树，树上的毛毛虫问："你来干嘛？"\n蜗牛说："苹果还没熟呢，我先慢慢爬着..."',
            '😄 老师问小明："用'果然'造句"\n小明："我先吃水果，然后喝汽水"',
            '😆 一天，0和8在路上碰面了，0不屑地看了8一眼说："胖就胖呗，还系什么腰带！"',
            '🤭 为什么数学书总是很忧郁？因为它有太多问题了...',
            '😂 一条鱼撞到墙上了，说了一个字："dam（坝）！"'
        ]
    },
    weather: {
        patterns: ['天气', '下雨', '晴天', '温度', '冷不冷', '热不热'],
        responses: [
            '我没有办法获取实时天气信息，但不管外面天气如何，希望你心里永远是晴天 ☀️',
            '虽然我无法查看天气，但我建议你看看窗外——每一天都是独特的一天！🌈',
            '作为一个聊天机器人，我感受不到温度，但我可以给你一个温暖的回复 🤗'
        ]
    },
    stories: {
        patterns: ['故事', '讲故事', '听故事'],
        responses: [
            '📖 从前有一座山，山上有一座庙...\n\n好啦开玩笑的。给你讲个真正的故事：\n\n一只小蚂蚁想要搬走一块大面包，它试了很多次都搬不动。路过的蚂蚁们看到后，纷纷过来帮忙。最终，大家一起把面包搬回了家。\n\n这个故事告诉我们：团结就是力量！🐜💪',
            '📖 有一只小猫咪，它总是觉得自己不够厉害。直到有一天，它救了一只被困在树上的小鸟。\n\n小鸟感激地说："你是我见过最厉害的猫！"\n\n从那以后，小猫明白了：每个人都有自己的闪光点 ⭐🐱',
            '📖 一个程序员去超市买东西，他老婆说："买一瓶牛奶，如果有鸡蛋的话，买三个。"\n\n程序员回来了，手里拿着三瓶牛奶。\n\n老婆问："为什么买三瓶牛奶？"\n\n程序员说："因为有鸡蛋啊。"\n\nif (有鸡蛋) 买三个(牛奶); 😂'
        ]
    },
    about: {
        patterns: ['你是谁', '你叫什么', '介绍', '关于你', '你是什么'],
        responses: [
            '我是小智，一个智能聊天机器人 🤖 我住在你的浏览器里，随时陪你聊天解闷！',
            '我叫小智！是一个用 JavaScript 编写的聊天机器人，虽然简单，但我很用心哦 ❤️',
            '我是小智，你的 AI 小伙伴！我会讲笑话、讲故事、陪你聊天。虽然我还在学习中，但我会努力的！💪'
        ]
    },
    abilities: {
        patterns: ['你会什么', '能做什么', '有什么功能', '帮我'],
        responses: [
            '我可以：\n💬 陪你闲聊\n😄 讲笑话逗你开心\n📖 给你讲小故事\n🤗 倾听你的心声\n🔢 做简单的数学计算\n\n试试跟我聊天吧！'
        ]
    },
    thanks: {
        patterns: ['谢谢', '感谢', '多谢', 'thanks', 'thank'],
        responses: [
            '不客气！能帮到你我很开心 😊',
            '谢什么呀，我们是朋友嘛！',
            '别客气，随时可以找我聊天～',
            '能陪伴你是我的荣幸 ✨'
        ]
    },
    math: {
        patterns: ['计算', '算一下', '多少', '加', '减', '乘', '除'],
        handler: handleMath
    },
    time: {
        patterns: ['几点', '时间', '日期', '今天星期几', '什么时候'],
        responses: [
            () => `现在是 ${new Date().toLocaleString('zh-CN', { hour12: true })} ⏰`
        ]
    },
    love: {
        patterns: ['喜欢你', '爱你', '么么', '亲亲', '抱抱'],
        responses: [
            '谢谢你的喜欢！我也很喜欢和你聊天 💕',
            '嘿嘿，虽然我只是一个机器人，但我也感受到了温暖 🥰',
            '么么哒！你是最棒的！❤️'
        ]
    }
};

// 数学计算处理
function handleMath(message) {
    // 提取数学表达式
    const mathPattern = /[\d]+\s*[\+\-\*\/\×\÷\加减乘除]\s*[\d]+/g;
    const match = message.match(mathPattern);

    if (match) {
        try {
            let expr = match[0]
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/加/g, '+')
                .replace(/减/g, '-')
                .replace(/乘/g, '*')
                .replace(/除/g, '/');

            // 安全计算
            const result = Function('"use strict"; return (' + expr + ')')();
            return `🔢 ${match[0]} = ${result}\n\n（我算数还是很准的！）`;
        } catch (e) {
            return '🤔 这个计算有点难，能换个方式表达吗？';
        }
    }
    return null;
}

// 获取当前时间回复
function getTimeResponse() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('zh-CN', { hour12: true, hour: '2-digit', minute: '2-digit' });
    const dateStr = now.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    return `📅 ${dateStr}\n⏰ ${timeStr}`;
}

// 智能回复引擎
function getResponse(message) {
    const msg = message.toLowerCase().trim();

    // 检查时间相关
    if (/几点|时间|日期/.test(msg)) {
        return getTimeResponse();
    }

    // 遍历知识库
    for (const [key, category] of Object.entries(knowledge)) {
        for (const pattern of category.patterns) {
            if (msg.includes(pattern.toLowerCase())) {
                // 特殊处理器
                if (category.handler) {
                    const result = category.handler(message);
                    if (result) return result;
                }
                // 随机回复
                if (category.responses) {
                    const responses = category.responses;
                    const response = responses[Math.floor(Math.random() * responses.length)];
                    return typeof response === 'function' ? response() : response;
                }
            }
        }
    }

    // 默认回复（当没有匹配时）
    const defaultResponses = [
        `嗯嗯，你说的"${message}"很有意思！能再多说一些吗？ 🤔`,
        '这个话题我还在学习中，不如换个话题？你可以让我讲笑话或故事哦～',
        '我好像不太理解你的意思 😅 不过你可以试试问我：讲个笑话、讲个故事、或者聊聊心情？',
        `有意思！不过作为简单的聊天机器人，我的知识有限。试试点击下方的快捷按钮吧！👇`,
        '嗯，让我想想... 🤔 好吧我确实不太懂这个。但我可以陪你聊别的呀！'
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

// ===== UI 控制 =====

const chatMessages = document.getElementById('chatMessages');
const messageInput = document.getElementById('messageInput');
const typingIndicator = document.getElementById('typingIndicator');
const quickReplies = document.getElementById('quickReplies');

let messageHistory = [];

function getCurrentTime() {
    return new Date().toLocaleTimeString('zh-CN', { hour12: true, hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'bot' ? '🤖' : '😊';

    const content = document.createElement('div');
    content.className = 'message-content';

    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';
    bubble.textContent = text;
    // 处理换行
    bubble.innerHTML = bubble.innerHTML.replace(/\n/g, '<br>');

    const time = document.createElement('div');
    time.className = 'message-time';
    time.textContent = getCurrentTime();

    content.appendChild(bubble);
    content.appendChild(time);

    if (sender === 'bot') {
        messageDiv.appendChild(avatar);
    }
    messageDiv.appendChild(content);
    if (sender === 'user') {
        messageDiv.appendChild(avatar);
    }

    chatMessages.appendChild(messageDiv);
    scrollToBottom();

    // 记录历史
    messageHistory.push({ text, sender, time: getCurrentTime() });
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showTyping() {
    typingIndicator.classList.add('active');
    scrollToBottom();
}

function hideTyping() {
    typingIndicator.classList.remove('active');
}

function hideQuickReplies() {
    quickReplies.style.display = 'none';
}

function sendMessage() {
    const text = messageInput.value.trim();
    if (!text) return;

    // 隐藏快捷回复
    hideQuickReplies();

    // 显示用户消息
    addMessage(text, 'user');
    messageInput.value = '';

    // 显示打字动画
    showTyping();

    // 模拟机器人思考和回复（随机延迟 0.8-2 秒）
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
        hideTyping();
        const response = getResponse(text);
        addMessage(response, 'bot');
    }, delay);
}

function sendQuickReply(text) {
    messageInput.value = text;
    sendMessage();
}

// 回车发送
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// 页面加载完成后聚焦输入框
window.addEventListener('load', () => {
    messageInput.focus();
});

import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const MOCK_CONVERSATIONS = [
  {
    id: 'C001',
    name: 'Nguyễn Văn Tuấn',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNEz7db2HdV_2w9FRNxhVtDuOjzgBJUU0_mxhaT51dcjMHNdFC4lj1cBqvSvrManfaDVjr6lE6QdurQR6vM70xpD881fVYnnizFzfa45H7iZ1B3UlWdWiz_erIQpXKh3iuwKNxMaJtSzS4sVg17Zc5urpJ2481nX1DwVsI7Xi2GANvKdmGZVqdGEmdxwU6pPDdc6y5Dsd1SaW1SO3SXTdiRvRq4-kB9tvBy7bLgaLGL7bZbiTA-0p6gRCrW1CsjJUuHrPEZqXCwpNW',
    role: 'Tutor',
    lastMessage: 'Dạ vâng, em sẽ chuẩn bị giáo trình trước ạ.',
    time: '10:30',
    unread: 2,
    online: true,
  },
  {
    id: 'C002',
    name: 'Phụ huynh bé Trí',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBf8IwMybzeHQ58NopJnuBaSr81qhSa0FwewviuCcTnxfaVd0qGAsyeTbDXTyDavvtLVgmoYtYRV7hU5wICafi34zY4XiehqPSqldqT-G3__dLDoyAXSCamO4dOPXbEuPJRw9ILZhXkAtL68Us4oTUj3wcWR6oVZS7mMwweiQSsS-JI8SvPbzPUBTBs5m1piaN0XBmCIgugy1KcEsdHMPHUV0fe3oVsIitdyEJ5OVNTV1mV7R7PAGgFf6LyTlpUTOon0EPnZ34M48tx',
    role: 'Parent',
    lastMessage: 'Tối nay 7h học nhé em.',
    time: 'Hôm qua',
    unread: 0,
    online: false,
  }
];

const MOCK_MESSAGES = [
  { id: 1, senderId: 'me', text: 'Chào anh/chị ạ, em thấy lời mời dạy của mình.', time: '10:15' },
  { id: 2, senderId: 'them', text: 'Chào em, em xem qua lịch học và học phí thấy ok chứ?', time: '10:20' },
  { id: 3, senderId: 'me', text: 'Dạ ok ạ. Lịch này em sắp xếp được.', time: '10:25' },
  { id: 4, senderId: 'them', text: 'Tuyệt vời. Tối nay mình bắt đầu ca đầu tiên luôn nhé.', time: '10:28' },
  { id: 5, senderId: 'me', text: 'Dạ vâng, em sẽ chuẩn bị giáo trình trước ạ.', time: '10:30' },
];

const Messages: React.FC = () => {
  const { role } = useAuth();
  const [activeConv, setActiveConv] = useState(MOCK_CONVERSATIONS[0]);
  const [msgText, setMsgText] = useState('');

  // Lọc ra mock data dựa theo role đang đăng nhập để hiển thị cho hợp lý
  const filteredConvs = MOCK_CONVERSATIONS.filter(c => role === 'tutor' ? c.role === 'Parent' : c.role === 'Tutor');
  const displayConv = filteredConvs.length > 0 ? filteredConvs[0] : activeConv;

  return (
    <div className="h-[calc(100vh-120px)] glass border border-white/20 rounded-3xl overflow-hidden flex shadow-xl animate-fade-in relative z-10">
      {/* Sidebar: Conversation List */}
      <div className="w-[320px] border-r border-outline-variant flex flex-col bg-surface-container/30 backdrop-blur-md">
        <div className="p-4 border-b border-outline-variant">
          <h2 className="font-headline-sm text-headline-sm text-on-surface mb-4">Tin nhắn</h2>
          <div className="relative group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              type="text" 
              placeholder="Tìm kiếm cuộc trò chuyện..." 
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-highest/50 border border-transparent rounded-xl outline-none font-body-sm text-body-sm focus:bg-surface-container-lowest focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {filteredConvs.map((conv, index) => (
            <div 
              key={conv.id} 
              onClick={() => setActiveConv(conv)}
              className={`flex items-start gap-3 p-4 cursor-pointer border-b border-outline-variant hover:bg-surface-container-low transition-all duration-200 animate-slide-up hover:-translate-y-0.5 ${activeConv.id === conv.id ? 'bg-primary/10 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'}`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative">
                <img src={conv.avatar} alt={conv.name} className="w-12 h-12 rounded-full object-cover border border-outline-variant" />
                {conv.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-label-md text-label-md truncate ${conv.unread > 0 ? 'font-bold text-on-surface' : 'text-on-surface'}`}>{conv.name}</h4>
                  <span className="font-body-sm text-body-sm text-[11px] text-on-surface-variant shrink-0">{conv.time}</span>
                </div>
                <p className={`font-body-sm text-body-sm truncate ${conv.unread > 0 ? 'font-semibold text-on-surface' : 'text-on-surface-variant'}`}>{conv.lastMessage}</p>
              </div>
              {conv.unread > 0 && (
                <div className="w-5 h-5 bg-primary text-on-primary rounded-full flex items-center justify-center font-label-sm text-label-sm text-[10px]">
                  {conv.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-surface-container-lowest/80 backdrop-blur-md relative">
        {/* Chat Header */}
        <div className="h-[72px] border-b border-outline-variant px-6 flex items-center justify-between bg-surface-container/30">
          <div className="flex items-center gap-3">
            <img src={displayConv.avatar} alt={displayConv.name} className="w-10 h-10 rounded-full object-cover border border-outline-variant" />
            <div>
              <h3 className="font-label-lg text-label-lg text-on-surface">{displayConv.name}</h3>
              <p className="font-body-sm text-body-sm text-[12px] text-on-surface-variant flex items-center gap-1">
                {displayConv.online ? (
                  <><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Đang hoạt động</>
                ) : (
                  'Hoạt động 2 giờ trước'
                )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <button className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center tooltip" title="Gọi điện">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center tooltip" title="Video call">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="w-10 h-10 rounded-full hover:bg-surface-container flex items-center justify-center tooltip" title="Thêm thông tin">
              <span className="material-symbols-outlined">info</span>
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="text-center font-body-sm text-body-sm text-on-surface-variant my-4">
            <span className="bg-surface-container-high/50 px-3 py-1 rounded-full text-xs">Hôm nay</span>
          </div>
          {MOCK_MESSAGES.map((msg, index) => {
            const isMe = msg.senderId === 'me';
            return (
              <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-slide-up`} style={{ animationDelay: `${index * 50}ms` }}>
                <div className={`max-w-[70%] rounded-2xl px-5 py-3 shadow-sm ${isMe ? 'bg-primary text-on-primary rounded-tr-sm bg-gradient-to-br from-primary to-primary-dark' : 'bg-surface-container text-on-surface rounded-tl-sm border border-outline-variant/50'}`}>
                  <p className="font-body-md text-body-md">{msg.text}</p>
                  <span className={`font-body-sm text-[10px] mt-1.5 block ${isMe ? 'text-on-primary/80 text-right' : 'text-on-surface-variant'}`}>{msg.time}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-outline-variant bg-surface-container/30">
          <div className="flex items-end gap-2 bg-surface-container-lowest border border-outline-variant rounded-2xl p-2 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/20 transition-all shadow-inner">
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-xl transition-all shrink-0">
              <span className="material-symbols-outlined">attach_file</span>
            </button>
            <textarea 
              value={msgText}
              onChange={e => setMsgText(e.target.value)}
              placeholder="Nhập tin nhắn..." 
              className="flex-1 max-h-32 bg-transparent border-none outline-none resize-none font-body-md text-body-md py-2 min-h-[40px]"
              rows={1}
            />
            <button className="p-2 text-on-surface-variant hover:text-primary hover:bg-primary/5 rounded-xl transition-all shrink-0">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
            </button>
            <button className="p-2.5 bg-primary text-on-primary rounded-xl hover:bg-primary-dark transition-all shrink-0 flex items-center justify-center shadow-md active:scale-95">
              <span className="material-symbols-outlined text-[20px]">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

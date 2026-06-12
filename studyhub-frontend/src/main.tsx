import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { Toaster, toast } from 'react-hot-toast'

// Ghi đè window.alert để hiển thị thông báo đẹp hơn thay vì popup mặc định của trình duyệt
window.alert = (message: string) => {
  if (message.toLowerCase().includes('lỗi') || message.toLowerCase().includes('không')) {
    toast.error(message, { duration: 4000 });
  } else if (message.toLowerCase().includes('thành công') || message.toLowerCase().includes('cảm ơn')) {
    toast.success(message, { duration: 3000 });
  } else {
    toast(message, { duration: 3000 });
  }
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
      <Toaster position="top-center" />
    </AuthProvider>
  </React.StrictMode>,
)

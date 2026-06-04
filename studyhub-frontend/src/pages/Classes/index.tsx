

const Classes = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <main className="min-h-screen">
        {/* Hero Search Section */}
        <section className="bg-primary pt-12 pb-16 px-margin-desktop text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline-xl text-headline-xl text-on-primary mb-6">Tìm kiếm lớp học phù hợp</h1>
            <div className="relative max-w-2xl mx-auto">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full h-14 pl-12 pr-32 rounded-xl border-none ring-1 ring-outline-variant focus:ring-2 focus:ring-secondary-container shadow-lg font-body-md text-body-md" placeholder="Tìm kiếm theo tên lớp, môn học hoặc từ khóa..." type="text" />
              <button className="absolute right-2 top-2 bottom-2 bg-primary-container text-on-primary px-6 rounded-lg font-label-md hover:bg-primary transition-colors">
                Tìm kiếm
              </button>
            </div>
            <div className="mt-4 flex justify-center gap-4 text-primary-fixed font-body-sm">
              <span>Gợi ý:</span>
              <a className="underline hover:text-white" href="#">Luyện thi đại học</a>
              <a className="underline hover:text-white" href="#">Tiếng Anh Giao tiếp</a>
              <a className="underline hover:text-white" href="#">Toán 12</a>
            </div>
          </div>
        </section>
        {/* Main Content Area */}
        <div className="max-w-[1440px] mx-auto px-margin-desktop py-12 flex flex-col md:flex-row gap-gutter">
          {/* Left Sidebar: Filters */}
          <aside className="w-full md:w-sidebar-width flex-shrink-0">
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-headline-sm text-headline-sm">Bộ lọc</h2>
                <button className="text-primary font-label-sm hover:underline">Xóa tất cả</button>
              </div>
              {/* Môn học */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Môn học</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Toán học</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Vật lý</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Hóa học</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Tiếng Anh</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Tin học</span>
                  </label>
                </div>
              </div>
              {/* Học phí */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Học phí (vnđ/buổi)</h3>
                <input className="w-full h-2 bg-surface-container-high rounded-full appearance-none cursor-pointer filter-range" max="1000000" min="50000" step="50000" type="range" defaultValue="500000" />
                <div className="flex justify-between mt-3 font-body-sm text-on-surface-variant">
                  <span>50k</span>
                  <span>1.000k</span>
                </div>
              </div>
              {/* Hình thức học */}
              <div className="mb-8">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Hình thức học</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 px-3 border border-outline-variant rounded-lg font-label-sm hover:border-primary hover:text-primary transition-colors bg-white">Online</button>
                  <button className="py-2 px-3 border border-primary text-primary bg-primary-container/10 rounded-lg font-label-sm">Offline</button>
                </div>
              </div>
              {/* Lớp học */}
              <div className="mb-2">
                <h3 className="font-label-md text-label-md mb-4 uppercase tracking-wider text-outline">Lớp học</h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Lớp 10</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input defaultChecked className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Lớp 11</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" type="checkbox" />
                    <span className="font-body-md text-body-md group-hover:text-primary">Lớp 12</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>
          {/* Right Content Area: Grid of class cards */}
          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <p className="font-body-md text-body-md text-on-surface-variant">Tìm thấy <span className="font-bold text-on-surface">124</span> lớp học phù hợp</p>
              <div className="flex items-center gap-3">
                <span className="font-label-md text-label-md text-outline">Sắp xếp:</span>
                <select className="bg-surface-container-lowest border border-outline-variant rounded-lg font-body-sm text-body-sm px-4 py-2 focus:ring-primary">
                  <option>Mới nhất</option>
                  <option>Học phí thấp đến cao</option>
                  <option>Học phí cao đến thấp</option>
                  <option>Đánh giá cao nhất</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Class Card 1 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <img alt="Mathematics class" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDobmyZYwTjxvdHL3Sqwi2L0zPN7FwbJx_Gbvqwj2kqqLIOvg8BdFj0BqEUI2o2OpS0NlCvwBlg1sti820Fv0d_ByQIj1dxos6DSZWbOCGEXfUhoVee7rbvn8f3QQRpTkh_T74GM1QDsSUp3fWtA12_ZfMa4ogjqoX5EdSWaRO0IdMba7y38xZdyOveW9m30sB1ZQnflxG038PwQKtRZP5nwRLEIsTHDtn2u31xIHLz_m_8JU5smJMF_0mvoKlAoeDrZVE6xj9MRAeO" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Luyện thi đại học Toán chuyên sâu</h3>
                    <div className="flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="ml-1 font-label-md">4.9</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Quận 1, TP. Hồ Chí Minh (Offline)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-low rounded-lg">
                    <img alt="Tutor avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD615SmZRBCorxhGncMRvFsOimYLqoEg-DPdHsonv88oOZMeRtZA-SjpidwTSOJoX0DqHtfTj-Kx2rBgUjDl___OIt0-TzGCEHdNjcPvL0ikLmYARIcf6RxKvrAMiGtq_Bd6BnR6aFixrPMxC_B-0ZemkcwgiR0UJAX3hOs5jXuTYBTWBi_vunN7Y0okbDMFs8n-lcpWZbOHF0mDTwSoMbqTMlJjK9XJ6cytQCVEwpF_j5vWGJWvY6NNe6u4xvPlVdCHwuE3qCDUD1Q" />
                    <div>
                      <p className="font-label-md text-label-md">Thầy Nguyễn Văn A</p>
                      <p className="text-body-sm text-outline">ĐH Sư Phạm TP.HCM</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="block text-outline font-label-sm uppercase tracking-wider">Học phí</span>
                      <span className="font-headline-sm text-primary">250.000đ<span className="text-body-sm font-normal text-on-surface-variant">/buổi</span></span>
                    </div>
                    <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95">
                      Chi tiết lớp học
                    </button>
                  </div>
                </div>
              </div>
              {/* Class Card 2 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <img alt="Physics class" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB0f69dnQfJ4J7tMGzCDVUDr9QrHu6MhPL8RSrXeyhKggYa49aGkAkup2pCaB7gsHfmf6qQnuRzV7F9WDsVhMRMMHnkHj5bbXOMDqlKmj-ArRaFJc4Os_UnHbQbM6ypHHt2TeiWN_Z9-_bSfanI99Wq1jf5-LGj8L2zYS2srZpeSrsxeY3qfud2kErgJ9W2-VVh2Ki5F54OaTLKbw2cHufc1bE7XGdIwc55SvnNIb9C5amWlsoWG7fEAeNfyjYCKodQSagdvOJP-jOW" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Bồi dưỡng HSG Vật lý 11</h3>
                    <div className="flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="ml-1 font-label-md">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span>Học qua Zoom/Google Meet (Online)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-low rounded-lg">
                    <img alt="Tutor avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtWYaJCa6CVLmXJeBcogl-hwVBngR75TCXiEeG8EjX4qyfHuMcnLmF6llde6IHrAj7xdBXVz2qaNtP5eag5C9zfmE9_BLP-yEiUjXMKhgdtNxdwibHzT8plxNXLwBJniUYoA2gj4LaOlGZAwzeNKhvxruqKdJ9_x1hWO6zs9jftFvJp7ZG5z22o7rtbC3rMg4M6-Sl9LqmMAvN-xMZ6Tgnb9LpB2h0YGDO9X6P_nbVWCG96PhCS_ysR2UgszVZUJn6CSatcSH_X1Ob" />
                    <div>
                      <p className="font-label-md text-label-md">Cô Trần Thị B</p>
                      <p className="text-body-sm text-outline">Thạc sĩ Vật Lý</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="block text-outline font-label-sm uppercase tracking-wider">Học phí</span>
                      <span className="font-headline-sm text-primary">180.000đ<span className="text-body-sm font-normal text-on-surface-variant">/buổi</span></span>
                    </div>
                    <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95">
                      Chi tiết lớp học
                    </button>
                  </div>
                </div>
              </div>
              {/* Class Card 3 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <img alt="English class" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsww2u5oa5qwxVe-9bNPB_vQmei40EJ9TnSYcvnVRJkk3bFDSj9CvjB70quYnAN7W1VzBaM-X7f6R_zK5VSO5KVdjEqumY-iUfID7hBRJ4O-uXfXa8wlYYIYwUoQnm1nuI0USh6imog8j-QGEaLIJbxRilqjZcEJ7v3fUQiH8NALroXwMofFU7kVOkngI3szncaWKSa_0GJJS-iwzZD4dy2JAh9s_RexAzKOUVtETWMoQXeBk4tfIuwmtpavAoh-ftEW_hf4PLZ3hc" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">IELTS General 6.5+ Cam kết</h3>
                    <div className="flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="ml-1 font-label-md">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                    <span className="material-symbols-outlined text-[18px]">location_on</span>
                    <span>Quận Bình Thạnh, TP.HCM (Offline)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-low rounded-lg">
                    <img alt="Tutor avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdrfwB44ycnxTpwcPdtzbIEHqAaJTZvTu7uu9eXLC3zO82QWicHDpv35wxGqlugp1SNhCmi0gHzz1XMG7csf6To81y646g7B_pR8I42BVTE_-HftyZ5y_0Dgwu6PUC7ApkExse8kzD-6CVC7eD2yMAnz5plJtMzHaebeVrcZBJMlLQbbxKNLSbjEjC74T88lei8J2fhMm4rTygpM0TZIMvGhYL88or4jHhudnp-az6cZpI4tUhzABfONZmuzd_IBJn7JyTtsxFwopF" />
                    <div>
                      <p className="font-label-md text-label-md">Mr. David Smith</p>
                      <p className="text-body-sm text-outline">Bản ngữ (USA), IELTS 9.0</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="block text-outline font-label-sm uppercase tracking-wider">Học phí</span>
                      <span className="font-headline-sm text-primary">450.000đ<span className="text-body-sm font-normal text-on-surface-variant">/buổi</span></span>
                    </div>
                    <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95">
                      Chi tiết lớp học
                    </button>
                  </div>
                </div>
              </div>
              {/* Class Card 4 */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden hover:shadow-md transition-all group flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <img alt="IT class" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjFLIh2pu_Jq431A63HFR2hveAZoN897F8QGmNyORoSLdeu3cwywQSKa-41JU34EEVKnAHoIOAuOdfV1HfIO3HM21flDkt1n-oEB18dGUdpZHLqpV8YC-PDIn-31A-B8DfMck74UWpBK3R3rj0QyBFfE3bVP8p5dQHhIijC2Rsefpg43S5hyLpa02wJ6ZhC-9JAcpnnDS15I2yYrNic6g6n94G_Y5445Z2XXuXur8onu2fdUoibJ4mRMw-g2_FvwMMDVnListGPU3B" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">Lập trình Python cho người mới</h3>
                    <div className="flex items-center text-tertiary">
                      <span className="material-symbols-outlined text-[20px]" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                      <span className="ml-1 font-label-md">4.7</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4 text-on-surface-variant font-body-sm">
                    <span className="material-symbols-outlined text-[18px]">videocam</span>
                    <span>Học qua Discord (Online)</span>
                  </div>
                  <div className="flex items-center gap-3 mb-6 p-3 bg-surface-container-low rounded-lg">
                    <img alt="Tutor avatar" className="w-10 h-10 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5SpdaJrBSDO6TXUmQ2SlYCdRDDWxKzBEpM6znI7vcTjAwDmvqVJuvRYlWVA6PYpr9U0IcudqUulAaDNxgOv7n-gaXOKOjBnfvxfMztQykB-H79pT4OUMjvsLk-AWvGD-tKSr4rVRO6RmkCepQFKtpubC8XYkU5pXnlUVnRHZxPMo2bYzVD94CxQX3VkWiLtMLgmzsFYIN6bQgpmNvFOwmI2N-7pCIKleQuN9Lcf9qzpvkQuHrDdTpnCGTv-8aiLGKrvjxAyA7KKDi" />
                    <div>
                      <p className="font-label-md text-label-md">Lê Minh C</p>
                      <p className="text-body-sm text-outline">Software Engineer at FPT</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="block text-outline font-label-sm uppercase tracking-wider">Học phí</span>
                      <span className="font-headline-sm text-primary">300.000đ<span className="text-body-sm font-normal text-on-surface-variant">/buổi</span></span>
                    </div>
                    <button className="bg-primary text-on-primary px-6 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all active:scale-95">
                      Chi tiết lớp học
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Pagination */}
            <div className="mt-12 flex justify-center items-center gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors disabled:opacity-30" disabled>
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-on-primary font-label-md">1</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">2</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">3</button>
              <span className="px-2">...</span>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors font-label-md">12</button>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-outline-variant hover:bg-surface-container-low transition-colors">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Classes;

package com.management.studyhub.config;

import com.management.studyhub.entity.Course;
import com.management.studyhub.entity.TutorProfile;
import com.management.studyhub.repository.CourseRepository;
import com.management.studyhub.repository.TutorProfileRepository;
import com.management.studyhub.entity.Testimonial;
import com.management.studyhub.repository.TestimonialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DatabaseSeeder implements CommandLineRunner {

    private final TutorProfileRepository tutorProfileRepository;
    private final CourseRepository courseRepository;
    private final TestimonialRepository testimonialRepository;

    @Override
    public void run(String... args) throws Exception {
        if (courseRepository.count() == 0) {
            seedTutorsAndCourses();
        }
        if (testimonialRepository.count() == 0) {
            seedTestimonials();
        }
    }

    private void seedTestimonials() {
        Testimonial t1 = new Testimonial();
        t1.setName("Chị Nguyễn Lan Anh");
        t1.setRole("Phụ huynh bé lớp 10");
        t1.setAvatar("https://ui-avatars.com/api/?name=Nguyen+Lan+Anh&background=random");
        t1.setQuote("Chỉ trong 2 ngày đăng bài đã có hơn 5 gia sư ứng tuyển. Thầy dạy con tôi bây giờ rất tận tâm và điểm số cải thiện rõ rệt. Cảm ơn StudyHub!");
        t1.setStars(5);
        testimonialRepository.save(t1);

        Testimonial t2 = new Testimonial();
        t2.setName("Em Trần Hoàng");
        t2.setRole("Gia sư — Sinh viên ĐH Bách Khoa");
        t2.setAvatar("https://ui-avatars.com/api/?name=Tran+Hoang&background=random");
        t2.setQuote("Nhờ StudyHub em đã có thêm thu nhập ổn định từ việc dạy 3 lớp song song. Hệ thống quản lý lịch dạy và tính phí rất minh bạch, em hoàn toàn tin tưởng. Đặc biệt nền tảng rất dễ sử dụng và hỗ trợ nhiệt tình, giải quyết thắc mắc nhanh chóng.");
        t2.setStars(5);
        testimonialRepository.save(t2);

        Testimonial t3 = new Testimonial();
        t3.setName("Anh Phạm Việt");
        t3.setRole("Phụ huynh bé lớp 5");
        t3.setAvatar("https://ui-avatars.com/api/?name=Pham+Viet&background=random");
        t3.setQuote("Ứng dụng tốt, gia sư chất lượng cao. Tuy nhiên giao diện đăng bài đôi khi hơi lag một chút, nhưng tổng thể dịch vụ tuyệt vời.");
        t3.setStars(4);
        testimonialRepository.save(t3);

        Testimonial t4 = new Testimonial();
        t4.setName("Chị Mai Chi");
        t4.setRole("Gia sư Tiếng Anh");
        t4.setAvatar("https://ui-avatars.com/api/?name=Mai+Chi&background=random");
        t4.setQuote("Nền tảng tuyệt vời giúp mình kết nối được với nhiều phụ huynh có nhu cầu. Nhờ StudyHub mình đã có thể tự chủ tài chính khi còn là sinh viên. Chắc chắn mình sẽ gắn bó lâu dài.");
        t4.setStars(5);
        testimonialRepository.save(t4);
    }

    private void seedTutorsAndCourses() {
        // Tutor 1
        TutorProfile t1 = new TutorProfile();
        t1.setFullName("Thầy Nguyễn Hoàng Nam");
        t1.setIntroduction("Thạc sĩ Toán học - ĐH Sư Phạm HN");
        t1.setAvatarUrl("https://ui-avatars.com/api/?name=Nguyen+Hoang+Nam&background=random");
        tutorProfileRepository.save(t1);

        Course c1 = new Course();
        c1.setTitle("Ôn thi Đại học môn Toán - Lớp 12: Chuyên sâu Giải tích & Hình học");
        c1.setDescription("Khóa học này được thiết kế đặc biệt dành cho học sinh lớp 12 đang chuẩn bị cho kỳ thi Tốt nghiệp THPT và xét tuyển Đại học.");
        c1.setLocation("Trực tuyến qua Zoom (Online)");
        c1.setLocationType("computer");
        c1.setPrice("350.000đ");
        c1.setImage("https://images.unsplash.com/photo-1632516643720-e7f0d0e12e1b?w=600");
        c1.setSchedule("Thứ 2 - Thứ 4 - Thứ 6");
        c1.setRating(4.9);
        c1.setReviewCount(120);
        c1.setTutor(t1);
        courseRepository.save(c1);

        // Tutor 2
        TutorProfile t2 = new TutorProfile();
        t2.setFullName("Cô Trần Thị B");
        t2.setIntroduction("Thạc sĩ Vật Lý");
        t2.setAvatarUrl("https://ui-avatars.com/api/?name=Tran+Thi+B&background=random");
        tutorProfileRepository.save(t2);

        Course c2 = new Course();
        c2.setTitle("Bồi dưỡng HSG Vật lý 11");
        c2.setDescription("Khóa học bồi dưỡng học sinh giỏi Vật lý 11 giúp các em tiếp cận với các dạng bài tập nâng cao.");
        c2.setLocation("Học qua Zoom/Google Meet (Online)");
        c2.setLocationType("videocam");
        c2.setPrice("180.000đ");
        c2.setImage("https://images.unsplash.com/photo-1610486045864-180a068019b8?w=600");
        c2.setSchedule("Thứ 3 - Thứ 5");
        c2.setRating(4.8);
        c2.setReviewCount(85);
        c2.setTutor(t2);
        courseRepository.save(c2);

        // Tutor 3
        TutorProfile t3 = new TutorProfile();
        t3.setFullName("Mr. David Smith");
        t3.setIntroduction("Bản ngữ (USA), IELTS 9.0");
        t3.setAvatarUrl("https://ui-avatars.com/api/?name=David+Smith&background=random");
        tutorProfileRepository.save(t3);

        Course c3 = new Course();
        c3.setTitle("IELTS General 6.5+ Cam kết");
        c3.setDescription("Khóa học luyện thi IELTS General cam kết đầu ra 6.5+ dành cho người định cư hoặc làm việc nước ngoài.");
        c3.setLocation("Quận Bình Thạnh, TP.HCM (Offline)");
        c3.setLocationType("location_on");
        c3.setPrice("450.000đ");
        c3.setImage("https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600");
        c3.setSchedule("Thứ Bảy - Chủ Nhật");
        c3.setRating(5.0);
        c3.setReviewCount(200);
        c3.setTutor(t3);
        courseRepository.save(c3);

        // Course 4
        TutorProfile t4 = new TutorProfile();
        t4.setFullName("Lê Minh C");
        t4.setIntroduction("Software Engineer at FPT");
        t4.setAvatarUrl("https://ui-avatars.com/api/?name=Le+Minh+C&background=random");
        tutorProfileRepository.save(t4);

        Course c4 = new Course();
        c4.setTitle("Lập trình Python cho người mới");
        c4.setDescription("Khóa học Python căn bản trang bị tư duy lập trình cốt lõi, cú pháp Python, cách xử lý dữ liệu.");
        c4.setLocation("Học qua Discord (Online)");
        c4.setLocationType("videocam");
        c4.setPrice("300.000đ");
        c4.setImage("https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600");
        c4.setSchedule("Thứ 2 - Thứ 5");
        c4.setRating(4.7);
        c4.setReviewCount(50);
        c4.setTutor(t4);
        courseRepository.save(c4);

        // Course 5
        Course c5 = new Course();
        c5.setTitle("Tiếng Anh Giao Tiếp Người Đi Làm");
        c5.setDescription("Khóa học giúp cải thiện khả năng giao tiếp, tự tin thuyết trình bằng tiếng Anh trong công việc.");
        c5.setLocation("Quận 1, TP.HCM (Offline)");
        c5.setLocationType("location_on");
        c5.setPrice("500.000đ");
        c5.setImage("https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=600&auto=format&fit=crop");
        c5.setSchedule("Thứ 3 - Thứ 5 - Thứ 7");
        c5.setRating(4.9);
        c5.setReviewCount(150);
        c5.setTutor(t3); // reuse David Smith
        courseRepository.save(c5);

        // Course 6
        Course c6 = new Course();
        c6.setTitle("Hóa Học 10 - Lấy Gốc Nhanh Chóng");
        c6.setDescription("Lấy lại căn bản Hóa học lớp 10, nắm vững bảng tuần hoàn và các phản ứng hóa học cơ bản.");
        c6.setLocation("Học qua Google Meet (Online)");
        c6.setLocationType("videocam");
        c6.setPrice("200.000đ");
        c6.setImage("https://images.unsplash.com/photo-1603126859738-4b216ce22a12?q=80&w=600&auto=format&fit=crop");
        c6.setSchedule("Chủ Nhật");
        c6.setRating(4.6);
        c6.setReviewCount(30);
        c6.setTutor(t1); // reuse Nguyễn Hoàng Nam
        courseRepository.save(c6);
    }
}

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
    private final com.management.studyhub.repository.SubjectRepository subjectRepository;

    @Override
    public void run(String... args) throws Exception {
        if (subjectRepository.count() == 0) {
            seedSubjects();
        }
        if (courseRepository.count() == 0) {
            seedTutorsAndCourses();
        } else {
            fixCourseSubjects();
        }
        if (testimonialRepository.count() == 0) {
            seedTestimonials();
        }
    }

    private void seedSubjects() {
        String[] subjectNames = {"Toán học", "Vật lý", "Hóa học", "Tiếng Anh", "Tin học", "Ngữ văn", "Sinh học", "Lịch sử", "Địa lý"};
        for (String name : subjectNames) {
            com.management.studyhub.entity.Subject subject = new com.management.studyhub.entity.Subject();
            subject.setName(name);
            subjectRepository.save(subject);
        }
    }

    private void fixCourseSubjects() {
        List<com.management.studyhub.entity.Subject> subjects = subjectRepository.findAll();
        com.management.studyhub.entity.Subject mathSubject = subjects.stream().filter(s -> s.getName().equals("Toán học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject physicsSubject = subjects.stream().filter(s -> s.getName().equals("Vật lý") || s.getName().equals("Vật lí")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject chemistrySubject = subjects.stream().filter(s -> s.getName().equals("Hóa học") || s.getName().equals("Hoá học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject englishSubject = subjects.stream().filter(s -> s.getName().equals("Tiếng Anh")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject itSubject = subjects.stream().filter(s -> s.getName().equals("Tin học")).findFirst().orElse(null);

        List<Course> courses = courseRepository.findAll();
        for (Course c : courses) {
            if (c.getSubject() == null) {
                String title = c.getTitle() != null ? c.getTitle().toLowerCase() : "";
                if (title.contains("toán")) c.setSubject(mathSubject);
                else if (title.contains("vật lý") || title.contains("vật lí")) c.setSubject(physicsSubject);
                else if (title.contains("ielts") || title.contains("tiếng anh")) c.setSubject(englishSubject);
                else if (title.contains("python") || title.contains("tin học") || title.contains("lập trình")) c.setSubject(itSubject);
                else if (title.contains("hóa học") || title.contains("hoá học")) c.setSubject(chemistrySubject);
                courseRepository.save(c);
            }
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
        List<com.management.studyhub.entity.Subject> subjects = subjectRepository.findAll();
        
        com.management.studyhub.entity.Subject mathSubject = subjects.stream().filter(s -> s.getName().equals("Toán học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject physicsSubject = subjects.stream().filter(s -> s.getName().equals("Vật lý")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject chemistrySubject = subjects.stream().filter(s -> s.getName().equals("Hóa học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject englishSubject = subjects.stream().filter(s -> s.getName().equals("Tiếng Anh")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject itSubject = subjects.stream().filter(s -> s.getName().equals("Tin học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject literatureSubject = subjects.stream().filter(s -> s.getName().equals("Ngữ văn")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject biologySubject = subjects.stream().filter(s -> s.getName().equals("Sinh học")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject historySubject = subjects.stream().filter(s -> s.getName().equals("Lịch sử")).findFirst().orElse(null);
        com.management.studyhub.entity.Subject geographySubject = subjects.stream().filter(s -> s.getName().equals("Địa lý")).findFirst().orElse(null);

        // Tutor 1
        TutorProfile t1 = new TutorProfile();
        t1.setFullName("Thầy Nguyễn Hoàng Nam");
        t1.setIntroduction("Thạc sĩ Toán học - ĐH Sư Phạm HN");
        t1.setAvatarUrl("https://ui-avatars.com/api/?name=Nguyen+Hoang+Nam&background=random");
        t1.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t1.setPrice(350000.0);
        t1.setTeachingMethod("ONLINE");
        t1.setAverageRating(4.9);
        t1.setTotalReviews(120);
        if (mathSubject != null) t1.setSubjects(java.util.Set.of(mathSubject));
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
        c1.setSubject(mathSubject);
        courseRepository.save(c1);

        // Tutor 2
        TutorProfile t2 = new TutorProfile();
        t2.setFullName("Cô Trần Thị B");
        t2.setIntroduction("Thạc sĩ Vật Lý");
        t2.setAvatarUrl("https://ui-avatars.com/api/?name=Tran+Thi+B&background=random");
        t2.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t2.setPrice(180000.0);
        t2.setTeachingMethod("ONLINE");
        t2.setAverageRating(4.8);
        t2.setTotalReviews(85);
        if (physicsSubject != null) t2.setSubjects(java.util.Set.of(physicsSubject));
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
        c2.setSubject(physicsSubject);
        courseRepository.save(c2);

        // Tutor 3
        TutorProfile t3 = new TutorProfile();
        t3.setFullName("Mr. David Smith");
        t3.setIntroduction("Bản ngữ (USA), IELTS 9.0");
        t3.setAvatarUrl("https://ui-avatars.com/api/?name=David+Smith&background=random");
        t3.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t3.setPrice(450000.0);
        t3.setTeachingMethod("OFFLINE");
        t3.setAverageRating(5.0);
        t3.setTotalReviews(200);
        if (englishSubject != null) t3.setSubjects(java.util.Set.of(englishSubject));
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
        c3.setSubject(englishSubject);
        courseRepository.save(c3);

        // Course 4
        TutorProfile t4 = new TutorProfile();
        t4.setFullName("Lê Minh C");
        t4.setIntroduction("Software Engineer at FPT");
        t4.setAvatarUrl("https://ui-avatars.com/api/?name=Le+Minh+C&background=random");
        t4.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t4.setPrice(300000.0);
        t4.setTeachingMethod("ONLINE");
        t4.setAverageRating(4.7);
        t4.setTotalReviews(50);
        if (itSubject != null) t4.setSubjects(java.util.Set.of(itSubject));
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
        c4.setSubject(itSubject);
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
        c5.setSubject(englishSubject);
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
        c6.setSubject(chemistrySubject);
        courseRepository.save(c6);

        // Tutor 5 (Literature)
        TutorProfile t5 = new TutorProfile();
        t5.setFullName("Cô Lê Hà");
        t5.setIntroduction("Giáo viên chuyên Văn 10 năm kinh nghiệm");
        t5.setAvatarUrl("https://ui-avatars.com/api/?name=Le+Ha&background=random");
        t5.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t5.setPrice(200000.0);
        t5.setTeachingMethod("ONLINE");
        t5.setAverageRating(4.9);
        t5.setTotalReviews(150);
        if (literatureSubject != null) t5.setSubjects(java.util.Set.of(literatureSubject));
        tutorProfileRepository.save(t5);

        Course c7 = new Course();
        c7.setTitle("Luyện Thi Đại Học Môn Ngữ Văn");
        c7.setDescription("Hệ thống kiến thức trọng tâm, rèn kỹ năng viết bài nghị luận xã hội và văn học.");
        c7.setLocation("Trực tuyến (Zoom)");
        c7.setLocationType("computer");
        c7.setPrice("200.000đ");
        c7.setImage("https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600");
        c7.setSchedule("Thứ 4 - Thứ 6");
        c7.setRating(4.9);
        c7.setReviewCount(150);
        c7.setTutor(t5);
        c7.setSubject(literatureSubject);
        courseRepository.save(c7);

        // Tutor 6 (Biology)
        TutorProfile t6 = new TutorProfile();
        t6.setFullName("Thầy Vũ Dũng");
        t6.setIntroduction("Sinh viên Y Dược loại giỏi");
        t6.setAvatarUrl("https://ui-avatars.com/api/?name=Vu+Dung&background=random");
        t6.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t6.setPrice(150000.0);
        t6.setTeachingMethod("OFFLINE");
        t6.setAverageRating(4.8);
        t6.setTotalReviews(90);
        if (biologySubject != null) t6.setSubjects(java.util.Set.of(biologySubject));
        tutorProfileRepository.save(t6);

        Course c8 = new Course();
        c8.setTitle("Bồi Dưỡng Sinh Học 12");
        c8.setDescription("Tổng ôn Sinh học, nắm vững di truyền và tiến hóa.");
        c8.setLocation("Hà Nội (Offline)");
        c8.setLocationType("location_on");
        c8.setPrice("150.000đ");
        c8.setImage("https://images.unsplash.com/photo-1530213786676-4189f1756920?w=600");
        c8.setSchedule("Thứ 7 - CN");
        c8.setRating(4.8);
        c8.setReviewCount(90);
        c8.setTutor(t6);
        c8.setSubject(biologySubject);
        courseRepository.save(c8);

        // Tutor 7 (History)
        TutorProfile t7 = new TutorProfile();
        t7.setFullName("Cô Đinh Hương");
        t7.setIntroduction("Thạc sĩ Sử học");
        t7.setAvatarUrl("https://ui-avatars.com/api/?name=Dinh+Huong&background=random");
        t7.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t7.setPrice(250000.0);
        t7.setTeachingMethod("ONLINE");
        t7.setAverageRating(4.7);
        t7.setTotalReviews(60);
        if (historySubject != null) t7.setSubjects(java.util.Set.of(historySubject));
        tutorProfileRepository.save(t7);

        Course c9 = new Course();
        c9.setTitle("Lịch Sử 12 Lấy Gốc");
        c9.setDescription("Bí quyết ghi nhớ các sự kiện lịch sử không bao giờ quên.");
        c9.setLocation("Học qua Google Meet");
        c9.setLocationType("videocam");
        c9.setPrice("250.000đ");
        c9.setImage("https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=600");
        c9.setSchedule("Thứ 2 - Thứ 4");
        c9.setRating(4.7);
        c9.setReviewCount(60);
        c9.setTutor(t7);
        c9.setSubject(historySubject);
        courseRepository.save(c9);

        // Tutor 8 (Geography)
        TutorProfile t8 = new TutorProfile();
        t8.setFullName("Thầy Phan Bách");
        t8.setIntroduction("Chuyên gia luyện thi Địa Lý");
        t8.setAvatarUrl("https://ui-avatars.com/api/?name=Phan+Bach&background=random");
        t8.setStatus(com.management.studyhub.entity.enums.TutorStatus.APPROVED);
        t8.setPrice(220000.0);
        t8.setTeachingMethod("ONLINE");
        t8.setAverageRating(4.8);
        t8.setTotalReviews(80);
        if (geographySubject != null) t8.setSubjects(java.util.Set.of(geographySubject));
        tutorProfileRepository.save(t8);

        Course c10 = new Course();
        c10.setTitle("Địa Lý Thực Hành Atlat");
        c10.setDescription("Kỹ năng xem Atlat và xử lý số liệu biểu đồ cực nhanh.");
        c10.setLocation("Trực tuyến (Zoom)");
        c10.setLocationType("computer");
        c10.setPrice("220.000đ");
        c10.setImage("https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600");
        c10.setSchedule("Chủ Nhật");
        c10.setRating(4.8);
        c10.setReviewCount(80);
        c10.setTutor(t8);
        c10.setSubject(geographySubject);
        courseRepository.save(c10);
    }
}
